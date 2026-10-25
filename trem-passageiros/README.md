# Por que o Brasil (quase) não tem trem de passageiros?

Sexto vídeo do canal **Viralmente Viral** (Remotion + TypeScript), feito a partir
da base do `../deputado-federal`. 1920x1080, 30 fps, 3min03s. Situação em
outubro de 2026.

```bash
npm install
npm run dev         # Remotion Studio
npm run render      # out/video.mp4
npm run thumbnail   # out/thumbnail.png (1280x720)
```

- Roteiro com fontes: `roteiro_narracao.md`
- Título, descrição, tags e comentário: `publicacao_youtube.md`
- Legendas por cena: `src/roteiro.ts`
- Cenas: `src/scenes/Cena1Gancho.tsx` … `Cena7Futuro.tsx`
- Componentes de trem (malha real, linha no mapa, locomotiva, bitola, bilhete,
  carimbo): `src/components/Trem.tsx`
- Malha ferroviária real: `src/data/ferrovias-brasil.json`, extraída do Natural
  Earth (domínio público) com `node scripts/extrair-ferrovias.mjs ne_10m_railroads.geojson`
  (baixe o GeoJSON do repositório nvkelso/natural-earth-vector no GitHub).
- Narração sintética: `scripts/gerar-narracao.py` ("Giesbrecht" → "Guísbréc",
  "Intercidades" → "Inter cidades" só no áudio).
- Trilha própria (Lá menor, 92 BPM): `npm run trilha`.
