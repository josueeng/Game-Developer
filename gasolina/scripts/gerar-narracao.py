"""Gera uma narração sintética (voz neural Kokoro, pt-BR) a partir das legendas
de src/roteiro.ts e grava:

- public/narracao.mp3          áudio completo, normalizado
- public/narracao-tempos.json  início de cada cena + tempo de cada legenda

Use só como narração provisória: quando você gravar a sua, substitua
public/narracao.mp3 e rode `npm run tempos`.

Requisitos (fora do projeto Node):
    python3 -m venv venv && ./venv/bin/pip install kokoro-onnx soundfile
    baixe kokoro-v1.0.onnx e voices-v1.0.bin de
    https://github.com/thewh1teagle/kokoro-onnx/releases/tag/model-files-v1.0

Uso:
    ./venv/bin/python scripts/gerar-narracao.py --modelo DIR [--voz pf_dora] [--velocidade 0.9]
"""
import argparse
import json
import re
import subprocess
import tempfile
from pathlib import Path

import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

RAIZ = Path(__file__).resolve().parent.parent
SR = 24000

# Pausas (segundos)
INICIO = 0.5  # antes da primeira fala
ENTRE_FRASES = 0.28
FIM_DE_CENA = 0.9  # silêncio no fim de cada cena, antes da próxima
FINAL = 2.0  # sobra no fim do vídeo

# Ajustes de pronúncia: como o texto deve ser LIDO (a legenda continua igual).
PRONUNCIA = [
    ("ICMS", "i cê ême ésse"),
    ("Petrobras", "Petrobrás"),
    ("—", ","),
    ('"', ""),
]


def ler_roteiro() -> list[list[str]]:
    """Extrai as listas `legendas: [...]` de src/roteiro.ts, cena a cena."""
    fonte = (RAIZ / "src" / "roteiro.ts").read_text(encoding="utf-8")
    cenas = []
    for bloco in re.findall(r"legendas:\s*\[(.*?)\]", fonte, re.S):
        cenas.append(re.findall(r"'([^']*)'", bloco))
    return cenas


def para_fala(texto: str) -> str:
    for de, para in PRONUNCIA:
        texto = texto.replace(de, para)
    return re.sub(r"\s+", " ", texto).strip()


def agrupar_frases(legendas: list[str]) -> list[list[int]]:
    """Junta trechos de legenda até fechar uma frase (. ? ! :)."""
    grupos, atual = [], []
    for i, t in enumerate(legendas):
        atual.append(i)
        if t.rstrip().endswith((".", "?", "!", ":")):
            grupos.append(atual)
            atual = []
    if atual:
        grupos.append(atual)
    return grupos


def aparar(audio: np.ndarray, limiar: float = 0.01) -> np.ndarray:
    idx = np.where(np.abs(audio) > limiar)[0]
    if len(idx) == 0:
        return audio
    return audio[max(0, idx[0] - int(0.03 * SR)) : idx[-1] + int(0.08 * SR)]


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--modelo", required=True, help="pasta com kokoro-v1.0.onnx e voices-v1.0.bin")
    ap.add_argument("--voz", default="pf_dora")
    ap.add_argument("--velocidade", type=float, default=0.9)
    args = ap.parse_args()

    modelo = Path(args.modelo)
    kokoro = Kokoro(str(modelo / "kokoro-v1.0.onnx"), str(modelo / "voices-v1.0.bin"))

    pedacos: list[np.ndarray] = []
    t = 0.0

    def silencio(seg: float) -> None:
        nonlocal t
        pedacos.append(np.zeros(int(seg * SR), dtype=np.float32))
        t += seg

    inicios, legendas_tempos = [], []
    for c, legendas in enumerate(ler_roteiro()):
        inicios.append(round(t, 3))
        silencio(INICIO if c == 0 else 0.25)
        for g, grupo in enumerate(agrupar_frases(legendas)):
            if g > 0:
                silencio(ENTRE_FRASES)
            falas = [para_fala(legendas[i]) for i in grupo]
            audio, sr = kokoro.create(" ".join(falas), voice=args.voz, speed=args.velocidade, lang="pt-br")
            assert sr == SR
            audio = aparar(audio.astype(np.float32))
            dur = len(audio) / SR
            # Divide o tempo da frase entre os trechos de legenda pelo número
            # de fonemas de cada trecho.
            pesos = [len(kokoro.tokenizer.phonemize(f, "pt-br")) + 2 for f in falas]
            cursor = t
            for i, p in zip(grupo, pesos):
                d = dur * p / sum(pesos)
                legendas_tempos.append({"de": round(cursor, 3), "ate": round(cursor + d, 3)})
                cursor += d
            pedacos.append(audio)
            t += dur
            print(f"cena {c + 1} · {dur:5.2f}s · {' '.join(legendas[i] for i in grupo)}")
        silencio(FIM_DE_CENA if c < 6 else FINAL)

    fim = round(t, 3)
    completo = np.concatenate(pedacos)

    with tempfile.TemporaryDirectory() as tmp:
        wav = Path(tmp) / "narracao.wav"
        sf.write(wav, completo, SR)
        subprocess.run(
            ["ffmpeg", "-y", "-loglevel", "error", "-i", str(wav),
             "-af", "loudnorm=I=-16:TP=-1.5:LRA=11", "-ar", "44100", "-b:a", "192k",
             str(RAIZ / "public" / "narracao.mp3")],
            check=True,
        )

    tempos = {"inicios": inicios, "fim": fim, "legendas": legendas_tempos}
    (RAIZ / "public" / "narracao-tempos.json").write_text(json.dumps(tempos, indent=2) + "\n", encoding="utf-8")
    print(f"\nDuração total: {fim:.1f}s · início das cenas: {inicios}")


if __name__ == "__main__":
    main()
