# O presidente eleito só assume em 5 de janeiro. O que acontece até lá?

Sétimo vídeo do canal **Viralmente Viral** (Remotion + TypeScript), feito a partir
da base do `../trem-passageiros`. 1920x1080, 30 fps, 2min13s. Escrito em 25/10/2026,
dia do 2º turno; serve para qualquer resultado.

```bash
npm install
npm run dev         # Remotion Studio
npm run render      # out/video.mp4
npx remotion still Thumbnail|ThumbRiscado|Thumb72 out/<nome>.png
```

- Roteiro com fontes: `roteiro_narracao.md`
- Título, descrição, tags, comentário e Shorts sugeridos: `publicacao_youtube.md`
- Cenas: `src/scenes/Cena1Gancho.tsx` … `Cena7Calendario.tsx`
- Componentes (folha de calendário, carimbo, diploma, Congresso, ampulheta):
  `src/components/Posse.tsx`
- Narração sintética: `scripts/gerar-narracao.py` ("TSE" → "tê ésse é" só no áudio).
- Trilha própria (Ré maior, 100 BPM): `npm run trilha`.
