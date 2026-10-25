# Quanto ganha um deputado federal? O salário é só 17% da conta

Quinto vídeo do canal **Viralmente Viral** (Remotion + TypeScript), feito a
partir da base do `../flamengo-rojo`. 1920x1080, 30 fps, 3min04s. Valores de
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
- Cenas: `src/scenes/Cena1Gancho.tsx` … `Cena7Fiscalizar.tsx`
- Valores oficiais e componentes (contracheque, envelope):
  `src/components/Deputado.tsx`
- Narração sintética: `scripts/gerar-narracao.py` ("CPIs" → "cê pê is" só no
  áudio). Voz própria: substitua `public/narracao.mp3` e rode `npm run tempos`.
- Trilha própria (Sol maior, 98 BPM): `npm run trilha`.
