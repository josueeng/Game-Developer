"""Narração com pausas por fala, em duas faixas alinhadas:
- public/narracao.mp3: narrador (pm_alex, mais grave, compressão e eco leve);
- public/sussurro.mp3: sussurros (pf_dora, lenta, sem graves, eco longo).
Também grava public/narracao-tempos.json ({"falas": [{de, ate}], "fim"}).
Uso: <venv>/bin/python scripts/narrar.py --modelo DIR
"""
import argparse, json, subprocess, tempfile
from pathlib import Path
import numpy as np, soundfile as sf
from kokoro_onnx import Kokoro

RAIZ = Path(__file__).resolve().parent.parent
SR = 24000
TOM = 0.92  # narrador: ~1,5 semitom mais grave e 8% mais lento
INICIO = 0.4

# (texto falado, pausa depois, tipo) — tipo "S" = sussurro. Mesma ordem de src/falas.ts.
FALAS = [
    ("Loira do banheiro...", 0.35, "S"),
    ("Loira do banheiro...", 0.35, "S"),
    ("Loira do banheiro...", 0.9, "S"),
    ("Toda escola do Brasil tem essa história.", 0.4, "N"),
    ("Mas quase ninguém sabe que ela pode ter começado com uma mulher de verdade.", 2.2, "N"),
    ("A lenda muda de escola para escola.", 0.3, "N"),
    ("Em umas, é preciso chamar o nome dela três vezes na frente do espelho.", 0.3, "N"),
    ("Em outras, dar descarga, chutar a porta ou falar um palavrão.", 0.4, "N"),
    ("Ela aparece de vestido branco, cabelo loiro e algodão no nariz.", 0.6, "N"),
    ("Parece invenção de criança.", 0.3, "N"),
    ("Mas a origem mais contada leva a uma cidade do interior de São Paulo.", 0.8, "N"),
    ("Guaratinguetá, mil oitocentos e sessenta e quatro.", 0.5, "N"),
    ("Nasce Maria Augusta de Oliveira Borges,", 0.2, "N"),
    ("filha do Visconde de Guaratinguetá, uma das famílias mais ricas da região.", 0.4, "N"),
    ("Ela cresce num casarão no centro da cidade.", 1.4, "N"),
    ("E é aqui que a história fica estranha.", 0.8, "N"),
    ("Segundo os relatos da cidade, aos catorze anos, Maria Augusta foi casada à força", 0.2, "N"),
    ("com um homem vinte e um anos mais velho.", 0.5, "N"),
    ("Um casamento arranjado, comum entre famílias ricas da época.", 0.8, "N"),
    ("Alguns anos depois, ela foge do casamento e vai para Paris.", 0.3, "N"),
    ("Segundo os relatos, vendeu as próprias joias para pagar a viagem.", 0.5, "N"),
    ("Em vinte e dois de abril de mil oitocentos e noventa e um, Maria Augusta morre em Paris, com apenas vinte e seis anos.", 0.6, "N"),
    ("A causa nunca foi esclarecida.", 0.3, "N"),
    ("E o atestado de óbito desapareceu.", 1.6, "N"),
    ("Mas o mais assustador ainda vem.", 0.8, "N"),
    ("O corpo foi embalsamado e trazido de volta para Guaratinguetá.", 0.4, "N"),
    ("E, segundo relatos, a mãe não quis enterrar a filha:", 0.3, "N"),
    ("manteve o corpo numa urna de vidro, dentro de casa.", 1.0, "N"),
    ("Há quem diga que ficou lá por meses.", 1.4, "N"),
    ("Anos depois, o casarão da família virou uma escola:", 0.3, "N"),
    ("a Escola Estadual Conselheiro Rodrigues Alves, que existe até hoje.", 0.5, "N"),
    ("E foi entre os alunos que começou a história", 0.1, "N"),
    ("de uma moça loira que aparecia no banheiro.", 1.4, "N"),
    ("Então, o que é verdade?", 0.5, "N"),
    ("É fato que Maria Augusta existiu, morreu em Paris em mil oitocentos e noventa e um,", 0.1, "N"),
    ("e que a casa dela virou escola.", 0.4, "N"),
    ("Já a ligação dela com o banheiro nunca foi provada.", 0.4, "N"),
    ("E a lenda tem muito em comum com uma história americana, a Blâdi Méri,", 0.1, "N"),
    ("que também é chamada no espelho.", 0.8, "N"),
    ("E você, já chamou a Loira do Banheiro na escola? Conta aqui nos comentários.", 0.4, "N"),
    ("E escolhe a próxima lenda: Corpo Seco, Mulher de Branco ou Homem do Saco?", 1.0, "N"),
    ("Loira do banheiro...", 2.0, "S"),
]

ap = argparse.ArgumentParser()
ap.add_argument("--modelo", required=True)
args = ap.parse_args()
k = Kokoro(str(Path(args.modelo) / "kokoro-v1.0.onnx"), str(Path(args.modelo) / "voices-v1.0.bin"))

def corta(a):
    idx = np.where(np.abs(a) > 0.01)[0]
    return a[max(0, idx[0] - 600): idx[-1] + 1500]

# Tudo em "tempo final" (segundos já com o fator do narrador): o narrador é gerado
# esticado por 1/TOM no tratamento; os sussurros entram no tempo final direto.
narr_segs, sus_segs, tempos, t = [], [], [], INICIO
for texto, pausa, tipo in FALAS:
    if tipo == "S":
        a, _ = k.create(texto, voice="pf_dora", speed=0.72, lang="pt-br")
        a = corta(a)
        dur = len(a) / SR
        sus_segs.append((t, a))
    else:
        a, _ = k.create(texto, voice="pm_alex", speed=0.95, lang="pt-br")
        a = corta(a)
        dur = len(a) / SR / TOM
        narr_segs.append((t, a))
    tempos.append({"de": round(t, 3), "ate": round(t + dur, 3), "tipo": tipo})
    t += dur + pausa
fim = round(t + 0.5, 3)

with tempfile.TemporaryDirectory() as d:
    d = Path(d)
    # narrador: monta no tempo "lento" (antes do asetrate) e trata
    n = np.zeros(int(fim * TOM * SR) + SR)
    for t0, a in narr_segs:
        i = int(t0 * TOM * SR)
        n[i:i + len(a)] += a
    sf.write(d / "n.wav", n, SR)
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", str(d / "n.wav"), "-af",
        f"asetrate={int(SR * TOM)},aresample=44100,highpass=f=70,equalizer=f=140:t=q:w=1:g=4,"
        "equalizer=f=3500:t=q:w=1.5:g=2,lowpass=f=9500,acompressor=threshold=-20dB:ratio=3:attack=5:release=120:makeup=4,"
        "aecho=0.8:0.6:45|90:0.18|0.10,loudnorm=I=-16:TP=-1.5", "-t", str(fim), "-b:a", "192k", str(RAIZ / "public" / "narracao.mp3")], check=True)
    # sussurros
    s = np.zeros(int(fim * SR) + SR)
    for t0, a in sus_segs:
        i = int(t0 * SR)
        s[i:i + len(a)] += a
    sf.write(d / "s.wav", s, SR)
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", str(d / "s.wav"), "-af",
        "aresample=44100,highpass=f=350,lowpass=f=7000,tremolo=f=6:d=0.25,"
        "aecho=0.8:0.85:300|620|950:0.45|0.3|0.2,volume=0.9,loudnorm=I=-22:TP=-3", "-t", str(fim), "-b:a", "192k", str(RAIZ / "public" / "sussurro.mp3")], check=True)

(RAIZ / "public" / "narracao-tempos.json").write_text(json.dumps({"falas": tempos, "fim": fim}, indent=1))
print("duração", fim)
