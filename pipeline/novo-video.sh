#!/usr/bin/env bash
# Cria um projeto novo a partir de um modelo, sem node_modules/out/áudio.
# Uso: pipeline/novo-video.sh <modelo> <nome-do-projeto> [pasta-destino]
#   modelos: explicativo (dados, 16:9) · lenda (suspense+fato, 16:9, efeitos virais)
#            historia (ficção animada, 9:16) · short-dados (Short de números, 9:16)
set -euo pipefail
RAIZ="$(cd "$(dirname "$0")/.." && pwd)"
declare -A MODELOS=([explicativo]=posse-2027 [lenda]=loira-do-banheiro [historia]=apartamento-305 [short-dados]=short-1x2turno)
MODELO="${1:-}"; NOME="${2:-}"; DEST="${3:-$RAIZ}"
if [ -z "$MODELO" ] || [ -z "$NOME" ] || [ -z "${MODELOS[$MODELO]:-}" ]; then
	echo "uso: $0 <explicativo|lenda|historia|short-dados> <nome-do-projeto> [pasta-destino]"; exit 1
fi
ORIGEM="$RAIZ/${MODELOS[$MODELO]}"
ALVO="$DEST/$NOME"
[ -e "$ALVO" ] && { echo "já existe: $ALVO"; exit 1; }
mkdir -p "$ALVO"
tar -C "$ORIGEM" --exclude=node_modules --exclude=out \
	--exclude='public/narracao*' --exclude='public/sussurro.mp3' --exclude='public/sons.mp3' \
	--exclude='public/trilha.mp3' --exclude='public/eventos.json' -cf - . | tar -C "$ALVO" -xf -
sed -i "s/\"name\": \"${MODELOS[$MODELO]}\"/\"name\": \"$NOME\"/" "$ALVO/package.json" "$ALVO/package-lock.json"
echo "# $NOME" > "$ALVO/README.md"
echo "Projeto criado a partir de \`${MODELOS[$MODELO]}\` ($MODELO). Veja ../pipeline/PIPELINE.md." >> "$ALVO/README.md"
(cd "$ALVO" && npm ci --silent >/dev/null 2>&1) && echo "npm ok"
echo "Criado: $ALVO"
echo "Próximo passo: pesquisa + roteiro_narracao.md (etapa 2 do PIPELINE.md)."
