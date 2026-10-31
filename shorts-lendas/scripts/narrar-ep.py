"""Narração de um episódio (episodios/epNN.json) com ajuste automático de velocidade
para caber em ~58 s. Grava public/epNN/narracao.mp3, sussurro.mp3 e tempos.json.
Uso: <venv>/bin/python scripts/narrar-ep.py --modelo DIR --ep 01 [--alvo 58]
"""
import argparse, json, subprocess, tempfile
from pathlib import Path
import numpy as np, soundfile as sf
from kokoro_onnx import Kokoro

RAIZ = Path(__file__).resolve().parent.parent
SR, TOM, INICIO = 24000, 0.92, 0.25

ap = argparse.ArgumentParser()
ap.add_argument("--modelo", required=True)
ap.add_argument("--ep", required=True)
ap.add_argument("--alvo", type=float, default=58.0)
a = ap.parse_args()
ep = json.loads((RAIZ / "episodios" / f"ep{a.ep}.json").read_text())
k = Kokoro(str(Path(a.modelo) / "kokoro-v1.0.onnx"), str(Path(a.modelo) / "voices-v1.0.bin"))
out = RAIZ / "public" / f"ep{a.ep}"
out.mkdir(parents=True, exist_ok=True)

def corta(x):
    i = np.where(np.abs(x) > 0.01)[0]
    return x[max(0, i[0] - 500): i[-1] + 1200]

def gera(vel, fator_pausa):
    narr, sus, tempos, t = [], [], [], INICIO
    for f in ep["falas"]:
        if f["tipo"] == "S":
            x = corta(k.create(f["t"], voice="pf_dora", speed=0.75, lang="pt-br")[0]); dur = len(x) / SR; sus.append((t, x))
        else:
            x = corta(k.create(f["t"], voice="pm_alex", speed=vel, lang="pt-br")[0]); dur = len(x) / SR / TOM; narr.append((t, x))
        tempos.append({"de": round(t, 3), "ate": round(t + dur, 3), "tipo": f["tipo"]})
        t += dur + f["pausa"] * fator_pausa
    return narr, sus, tempos, t + 0.9

vel, fp = 1.0, 1.0
for _ in range(6):
    narr, sus, tempos, fim = gera(vel, fp)
    if fim > a.alvo + 0.5:  # longo demais: acelera e encurta pausas
        excesso = fim / a.alvo
        vel = min(1.35, vel * excesso ** 0.8)
        fp = max(0.6, fp / excesso ** 0.5)
    elif fim < a.alvo - 4 and (vel > 0.9 or fp < 1.9):  # curto: mais lento e mais pausa (suspense)
        vel = max(0.9, vel * 0.97)
        fp = min(1.9, fp * 1.3)
    else:
        break
print(f"ep{a.ep}: velocidade {vel:.2f}, pausas x{fp:.2f}, duração {fim:.1f}s")

with tempfile.TemporaryDirectory() as d:
    d = Path(d)
    n = np.zeros(int(fim * TOM * SR) + SR)
    for t0, x in narr:
        i = int(t0 * TOM * SR); n[i:i + len(x)] += x
    sf.write(d / "n.wav", n, SR)
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", str(d / "n.wav"), "-af",
        f"asetrate={int(SR * TOM)},aresample=44100,highpass=f=70,equalizer=f=140:t=q:w=1:g=4,equalizer=f=3500:t=q:w=1.5:g=2,"
        "lowpass=f=9500,acompressor=threshold=-20dB:ratio=3:attack=5:release=120:makeup=4,aecho=0.8:0.6:45|90:0.18|0.10,loudnorm=I=-15:TP=-1.5",
        "-t", str(fim), "-b:a", "192k", str(out / "narracao.mp3")], check=True)
    s = np.zeros(int(fim * SR) + SR)
    for t0, x in sus:
        i = int(t0 * SR); s[i:i + len(x)] += x
    sf.write(d / "s.wav", s, SR)
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", str(d / "s.wav"), "-af",
        "aresample=44100,highpass=f=350,lowpass=f=7000,tremolo=f=6:d=0.25,aecho=0.8:0.85:300|620|950:0.45|0.3|0.2,volume=0.9" + (",loudnorm=I=-22:TP=-3" if sus else ""),
        "-t", str(fim), "-b:a", "192k", str(out / "sussurro.mp3")], check=True)
(out / "tempos.json").write_text(json.dumps({"falas": tempos, "fim": round(fim, 3)}, indent=1))
