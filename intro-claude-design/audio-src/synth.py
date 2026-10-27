"""Synthesises the music bed and the whoosh SFX for the 60s intro.

Everything here is generated from scratch, so it is free to use.
Usage: python3 synth.py <public-dir>
"""
import sys

import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, sosfilt

SR = 44100
DUR = 60.0
BPM = 96
BEAT = 60 / BPM
BAR = 4 * BEAT
rng = np.random.default_rng(22)


def midi(n):
    return 440.0 * 2 ** ((n - 69) / 12)


def lowpass(x, f, order=2):
    return sosfilt(butter(order, f, btype="low", fs=SR, output="sos"), x)


def highpass(x, f, order=2):
    return sosfilt(butter(order, f, btype="high", fs=SR, output="sos"), x)


def bandpass(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo, hi], btype="band", fs=SR, output="sos"), x)


def saw(freq, n):
    t = np.arange(n) / SR
    p = t * freq
    return 2 * (p - np.floor(0.5 + p))


def sweep_noise(n, f0, f1):
    """Noise whose band centre glides from f0 to f1, by crossfading fixed bands."""
    noise = rng.standard_normal(n)
    centres = np.geomspace(min(f0, f1), max(f0, f1), 10)
    bands = [bandpass(noise, c * 0.7, min(c * 1.4, SR / 2 - 200)) for c in centres]
    pos = np.linspace(0, 1, n)
    if f1 < f0:
        pos = 1 - pos
    idx = pos * (len(centres) - 1)
    out = np.zeros(n)
    for i, band in enumerate(bands):
        out += band * np.clip(1 - np.abs(idx - i), 0, 1)
    return out


def norm(x, peak):
    return (x / (np.max(np.abs(x)) + 1e-9) * peak).astype(np.float32)


def write(path, x):
    wavfile.write(path, SR, x.astype(np.float32))


# ---------- whooshes ----------

def whoosh(dur, f0, f1, peak):
    n = int(SR * dur)
    t = np.linspace(0, 1, n)
    env = np.where(t < peak, (t / peak) ** 2, ((1 - t) / (1 - peak)) ** 1.5)
    return norm(sweep_noise(n, f0, f1) * env, 0.8)


def boom(dur=1.4):
    n = int(SR * dur)
    t = np.arange(n) / SR
    phase = 2 * np.pi * np.cumsum(30 + 80 * np.exp(-t * 6)) / SR
    x = np.sin(phase) * np.exp(-t * 3) + highpass(rng.standard_normal(n), 3000) * np.exp(-t * 4) * 0.25
    return norm(x, 0.9)


# ---------- drums ----------

def kick(level=1.0):
    n = int(SR * 0.4)
    t = np.arange(n) / SR
    phase = 2 * np.pi * np.cumsum(45 + 110 * np.exp(-t * 30)) / SR
    return np.sin(phase) * np.exp(-t * 9) * level


def clap(level=1.0):
    n = int(SR * 0.3)
    t = np.arange(n) / SR
    noise = bandpass(rng.standard_normal(n), 900, 5000)
    env = np.exp(-t * 18)
    for offset in (0.0, 0.011, 0.022):
        env += np.where(t >= offset, np.exp(-(t - offset) * 120), 0) * 0.6
    return noise * env * 0.5 * level


def hat(level=1.0, open_=False):
    n = int(SR * (0.25 if open_ else 0.06))
    t = np.arange(n) / SR
    return highpass(rng.standard_normal(n), 7000) * np.exp(-t * (12 if open_ else 60)) * 0.35 * level


def crash():
    n = int(SR * 2.5)
    t = np.arange(n) / SR
    return highpass(rng.standard_normal(n), 4000) * np.exp(-t * 1.6) * 0.35


# ---------- tonal ----------

# Am – F – C – G, one chord per bar.
CHORDS = [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]]
ROOTS = [45, 41, 48, 43]


def pad_note(freq, dur):
    n = int(SR * dur)
    x = sum(saw(freq * d, n) for d in (0.996, 1.0, 1.004)) / 3
    t = np.arange(n) / SR
    env = np.minimum(1, t / 0.5) * np.minimum(1, (dur - t) / 0.8)
    return x * env


def pluck(freq, dur=0.35, bright=1.0):
    n = int(SR * dur)
    t = np.arange(n) / SR
    x = saw(freq, n) * 0.6 + np.sin(2 * np.pi * freq * t) * 0.4
    return lowpass(x, 1800 + 2500 * bright) * np.exp(-t * 9)


def bass_note(freq, dur):
    n = int(SR * dur)
    t = np.arange(n) / SR
    x = np.sin(2 * np.pi * freq * t) * 0.8 + saw(freq, n) * 0.3
    return lowpass(x, 500) * np.exp(-t * 3) * np.minimum(1, (dur - t) / 0.02)


def music():
    n = int(SR * DUR)
    drums = np.zeros(n)
    pad = np.zeros(n)
    arp = np.zeros(n)
    bass = np.zeros(n)
    fx = np.zeros(n)
    kicks = []

    def add(track, start, sig, gain=1.0):
        i = int(start * SR)
        if i >= n:
            return
        sig = sig[: n - i]
        track[i : i + len(sig)] += sig * gain

    bars = int(np.ceil(DUR / BAR))
    for b in range(bars):
        t0 = b * BAR
        chord = CHORDS[b % 4]
        root = ROOTS[b % 4]
        loop = 2 <= b <= 6  # 5 s – 17.5 s: "el bucle"
        freeze = 17.0 <= t0 + BAR and t0 < 25.0  # silence/riser window
        groove = 10 <= b <= 17 or b >= 20  # from the title onwards
        mantra = 18 <= b <= 19
        final = b >= 23

        # Pad under everything except the freeze.
        if not (17.0 <= t0 < 25.0):
            for note in chord:
                add(pad, t0, pad_note(midi(note), BAR + 0.8), 0.18 if not groove else 0.22)

        # Arpeggio: 8ths in the intro, a nagging 16th loop in "el bucle", brighter in the groove.
        pattern = [0, 1, 2, 1, 0, 1, 2, 3]
        notes = chord + [chord[0] + 12]
        if b <= 1 or loop or groove or mantra:
            steps = 16 if (loop or groove) else 8
            for s in range(steps):
                t = t0 + s * BAR / steps
                if t >= 17.0 and t < 25.0:
                    continue
                if final and t > 57.5:
                    continue
                note = notes[pattern[s % 8]] + 12
                level = 0.22 if b <= 1 else 0.28 if loop else 0.24
                add(arp, t, pluck(midi(note), bright=0.5 if loop else 1.0), level)

        # Drums.
        for beat in range(4):
            t = t0 + beat * BEAT
            if 17.0 <= t < 25.0 or t > 57.5:
                continue
            if loop and b >= 3 and beat in (0, 2):
                add(drums, t, kick(0.7))
                kicks.append(t)
            if groove:
                add(drums, t, kick())
                kicks.append(t)
                if beat in (1, 3):
                    add(drums, t, clap())
            if mantra and beat == 0:
                add(drums, t, kick())
                kicks.append(t)
            if mantra and beat == 2:
                add(drums, t, clap(0.8))
            for h in range(2 if not (groove or b == 6) else 4):
                th = t + h * BEAT / (2 if not (groove or b == 6) else 4)
                if (loop or groove) and th < 57.5:
                    add(drums, th, hat(0.8 if h % 2 else 1.0))

        # Bass in the groove.
        if groove and not final:
            for e in range(8):
                t = t0 + e * BEAT / 2
                if t < 57.5:
                    add(bass, t, bass_note(midi(root), BEAT / 2), 0.55 if e % 2 == 0 else 0.35)

    # Freeze at 17 s: a short tape-stop style drop.
    stop_n = int(SR * 0.5)
    ts = np.arange(stop_n) / SR
    phase = 2 * np.pi * np.cumsum(220 * (1 - ts / 0.55)) / SR
    add(fx, 17.0, np.sin(phase) * np.exp(-ts * 4) * 0.25)

    # Riser from 21 s into the hit at 25 s, with a snare roll.
    rise_n = int(SR * 3.9)
    tr = np.linspace(0, 1, rise_n)
    add(fx, 21.0, sweep_noise(rise_n, 300, 9000) * tr**2 * 0.5)
    add(fx, 21.0, np.sin(2 * np.pi * np.cumsum(150 + 650 * tr**2) / SR) * tr**2 * 0.12)
    roll_t = 22.5
    step = BEAT / 2
    while roll_t < 24.9:
        add(drums, roll_t, clap(0.3 + 0.7 * (roll_t - 22.5) / 2.4))
        step = max(step * 0.85, BEAT / 8)
        roll_t += step

    # Hits: the title at 25 s and the last chord at 57.5 s.
    add(fx, 25.0, boom(), 0.8)
    add(fx, 25.0, crash())
    add(fx, 57.5, boom(), 0.6)
    add(fx, 57.5, crash(), 0.8)
    for note in CHORDS[0]:
        add(pad, 57.5, pad_note(midi(note), 2.6), 0.25)

    # Sidechain pump on pad and bass.
    duck = np.ones(n)
    t_axis = np.arange(n) / SR
    for k in kicks:
        i = int(k * SR)
        seg = t_axis[i : i + int(SR * 0.4)] - k
        duck[i : i + len(seg)] = np.minimum(duck[i : i + len(seg)], 1 - 0.55 * np.exp(-seg / 0.12))

    pad = lowpass(pad, 1400) * duck
    bass = bass * duck
    mix = drums * 0.9 + pad + arp + bass + fx
    fade = np.minimum(1, (DUR - t_axis) / 1.0)
    return norm(np.tanh(mix * 1.2) * fade, 0.89)


if __name__ == "__main__":
    out = sys.argv[1]
    write(f"{out}/sfx/whoosh-short.wav", whoosh(0.35, 400, 4000, 0.6))
    write(f"{out}/sfx/whoosh-long.wav", whoosh(0.8, 250, 5000, 0.7))
    write(f"{out}/sfx/whoosh-down.wav", whoosh(0.6, 5000, 300, 0.25))
    write(f"{out}/sfx/boom.wav", boom())
    m = music()
    write(f"{out}/music/music-bed.wav", np.stack([m, m], axis=1))
    print("done")
