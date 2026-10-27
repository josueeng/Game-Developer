"""Narração da história com pausas por fala e tratamento de áudio.

Gera public/narracao.mp3 e public/narracao-tempos.json ({"falas": [{de, ate}], "fim"}).
Uso: ./venv/bin/python scripts/narrar.py --modelo DIR
"""
import argparse, json, subprocess, tempfile
from pathlib import Path
import numpy as np, soundfile as sf
from kokoro_onnx import Kokoro

RAIZ = Path(__file__).resolve().parent.parent
VOZ, VELOCIDADE = "pm_alex", 0.95
TOM = 0.92  # asetrate: abaixa ~1,5 semitom e deixa ~8% mais lento
INICIO = 0.6

# (texto falado, pausa depois em segundos). Mesmo texto das legendas em src/historia.ts.
FALAS = [
    ("Toda noite, às três e dezessete, a Marina acordava com o mesmo som.", 0.6),
    ("Três batidas na parede.", 1.6),
    ("Vinham do apartamento trezentos e cinco, do outro lado.", 0.8),
    ("De manhã, ela desceu para reclamar com o porteiro.", 0.5),
    ("Ele ficou em silêncio por um tempo, e disse:", 1.0),
    ("Ninguém mora no trezentos e cinco... faz dois anos.", 1.4),
    ("Naquela noite, às três e dezessete, as batidas voltaram.", 1.6),
    ("Ela encostou o ouvido na parede...", 0.6),
    ("e bateu de volta. Três vezes.", 1.8),
    ("Silêncio.", 2.0),
    ("Então, as batidas responderam.", 1.2),
    ("Mas não vinham mais da parede.", 1.0),
    ("Vinham do armário. Atrás dela.", 1.4),
    ("Quer a parte dois? Comenta aí.", 1.5),
]

ap = argparse.ArgumentParser()
ap.add_argument("--modelo", required=True)
args = ap.parse_args()
k = Kokoro(str(Path(args.modelo) / "kokoro-v1.0.onnx"), str(Path(args.modelo) / "voices-v1.0.bin"))

partes, tempos, t = [np.zeros(int(24000 * INICIO))], [], INICIO
for texto, pausa in FALAS:
    a, sr = k.create(texto, voice=VOZ, speed=VELOCIDADE, lang="pt-br")
    # corta silêncio das pontas
    idx = np.where(np.abs(a) > 0.01)[0]
    a = a[max(0, idx[0] - 600): idx[-1] + 1200]
    partes += [a, np.zeros(int(sr * pausa))]
    tempos.append({"de": round(t / TOM, 3), "ate": round((t + len(a) / sr) / TOM, 3)})
    t += len(a) / sr + pausa
bruto = np.concatenate(partes)

with tempfile.TemporaryDirectory() as d:
    w = Path(d) / "bruto.wav"
    sf.write(w, bruto, 24000)
    filtro = (
        f"asetrate={int(24000 * TOM)},aresample=44100,"
        "highpass=f=70,equalizer=f=140:t=q:w=1:g=4,equalizer=f=3500:t=q:w=1.5:g=2,lowpass=f=9500,"
        "acompressor=threshold=-20dB:ratio=3:attack=5:release=120:makeup=4,"
        "aecho=0.8:0.6:45|90:0.18|0.10,loudnorm=I=-16:TP=-1.5"
    )
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", str(w), "-af", filtro, "-b:a", "192k", str(RAIZ / "public" / "narracao.mp3")], check=True)
fim = round(t / TOM + 0.5, 3)
(RAIZ / "public" / "narracao-tempos.json").write_text(json.dumps({"falas": tempos, "fim": fim}, indent=1))
print("duração", fim, "s")
