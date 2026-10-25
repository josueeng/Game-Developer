# O Flamengo foi eliminado… e pediu para ir à final. Entenda o caso Rojo

Quarto vídeo do canal **Viralmente Viral** (Remotion + TypeScript), feito a
partir da base do `../gasolina`. 1920x1080, 30 fps, 2min29s. Situação em
25/10/2026 (caso em andamento).

```bash
npm install
npm run dev         # Remotion Studio
npm run render      # out/video.mp4
npm run thumbnail   # out/thumbnail.png (1280x720)
```

- Roteiro com fontes: `roteiro_narracao.md`
- Título, descrição, tags e comentário: `publicacao_youtube.md`
- Legendas e duração por cena: `src/roteiro.ts`
- Cenas: `src/scenes/Cena1Gancho.tsx` … `Cena7Agora.tsx`
- Componentes de futebol (placar, balança, escada de recursos):
  `src/components/Futebol.tsx`
- Narração sintética: `scripts/gerar-narracao.py` (pronúncia: "Rojo" → "Rorro",
  "Sánchez" → "Sântches" só no áudio). Voz própria: substitua
  `public/narracao.mp3` e rode `npm run tempos`.
- Trilha própria (Mi menor, 104 BPM): `npm run trilha`.
