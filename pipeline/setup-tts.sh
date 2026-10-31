#!/usr/bin/env bash
# Instala a narração sintética (Kokoro, pt-BR) fora do repositório.
# Uso: pipeline/setup-tts.sh [pasta]   (padrão: ~/tts)
# O modelo vem do GitHub Releases (HuggingFace fica bloqueado na nuvem).
set -euo pipefail
DIR="${1:-$HOME/tts}"
mkdir -p "$DIR"
cd "$DIR"
[ -d venv ] || python3 -m venv venv
./venv/bin/pip install -q kokoro-onnx soundfile
BASE=https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0
[ -f kokoro-v1.0.onnx ] || curl -sSL -o kokoro-v1.0.onnx "$BASE/kokoro-v1.0.onnx"
[ -f voices-v1.0.bin ] || curl -sSL -o voices-v1.0.bin "$BASE/voices-v1.0.bin"
cat > fon.py <<'PY'
import sys
from kokoro_onnx import Kokoro
k = Kokoro("kokoro-v1.0.onnx", "voices-v1.0.bin")
for t in sys.argv[1:]:
    print(t, "=>", k.tokenizer.phonemize(t, "pt-br"))
PY
echo "Pronto: $DIR  (vozes pt-BR: pf_dora, pm_alex, pm_santa)"
echo "Conferir pronúncia: cd $DIR && ./venv/bin/python fon.py \"palavra difícil\""
