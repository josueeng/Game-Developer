# Para onde vai cada real que você paga na gasolina?

Terceiro vídeo do canal **Viralmente Viral** (Remotion + TypeScript), feito a
partir da base do `../bets-30-bilhoes`. 1920x1080, 30 fps, 2min25s.

```bash
npm install
npm run dev         # Remotion Studio
npm run render      # out/video.mp4
npm run thumbnail   # out/thumbnail.png (1280x720)
```

- Roteiro com fontes: `roteiro_narracao.md`
- Título, descrição, tags e comentário: `publicacao_youtube.md`
- Legendas e duração por cena: `src/roteiro.ts`
- Cenas: `src/scenes/Cena1Gancho.tsx` … `Cena7Data.tsx`
- Dados da composição do preço e componentes (rosca, bomba, barril, béquer,
  calendário, caminhão): `src/components/Gasolina.tsx`
- Narração sintética: `scripts/gerar-narracao.py` (instalação do Kokoro no
  README do `voto-consciente`). Voz própria: substitua `public/narracao.mp3`
  e rode `npm run tempos`.
- Trilha própria (Ré menor, 96 BPM): `npm run trilha`.
