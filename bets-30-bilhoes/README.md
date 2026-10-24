# R$ 30 bilhões por mês: para onde ia o dinheiro das bets?

Segundo vídeo do canal **Viralmente Viral**, feito com Remotion + TypeScript a
partir da mesma base do vídeo `../voto-consciente`. 1920x1080, 30 fps, 2min34s.

```bash
npm install
npm run dev         # Remotion Studio
npm run render      # out/video.mp4
npm run thumbnail   # out/thumbnail.png (1280x720)
```

- Roteiro com fontes: `roteiro_narracao.md`
- Título, descrição, tags e comentário: `publicacao_youtube.md`
- Legendas e duração por cena: `src/roteiro.ts`
- Cenas: `src/scenes/Cena1Gancho.tsx` … `Cena7Fechamento.tsx`
- Narração sintética: `scripts/gerar-narracao.py` (veja o README do
  `voto-consciente` para instalar o Kokoro). Para usar a sua voz, substitua
  `public/narracao.mp3` e rode `npm run tempos`.
- Trilha própria (Lá menor, 100 BPM): `npm run trilha`.
