# A história real da Loira do Banheiro

Vídeo do canal **Viralmente Viral** (YouTube, 1920x1080, 30 fps, 2min51s), suspense +
fato, para o Halloween/Finados de 2026. Ilustrações são representação artística.

```bash
npm install
<venv>/bin/python scripts/narrar.py --modelo <pasta do Kokoro>   # narração + sussurros + tempos
npm run sons      # eventos.json + sons.mp3 (drone, batidas, risers, sub-drops, digitação, coração, caixinha)
npm run render    # out/video.mp4
npm run thumbs    # out/thumb1..3.png
```

Shorts verticais (cortes do vídeo, com fundo desfocado): ver comando ffmpeg em
`publicacao_youtube.md` → `out/shorts/`.

- Roteiro e fontes: `roteiro_narracao.md`
- Efeitos (glitch RGB, grão, flash, legenda karaokê, datilografia, carimbo): `src/Efeitos.tsx`
- Cenas: `src/Cenas.tsx`; montagem (punch-in, tremor, cortes, áudio): `src/Video.tsx`
- Ilustrações: `src/Desenhos.tsx`; legendas e palavras-chave: `src/falas.ts`
