# Série de Shorts: Mistérios e lendas do Brasil

Projeto base dos Shorts verticais (9:16 nativo, 25–35 s) do canal.

```bash
npm install
# por episódio (NN = 01..07):
<venv>/bin/python scripts/narrar-ep.py --modelo <pasta do Kokoro> --ep NN   # narração ~58 s
node scripts/sons-ep.mjs NN                                               # sons sincronizados
npx remotion render EpNN out/epNN.mp4
npx remotion render Vitrine out/vitrine.mp4   # demonstração do kit
```

Episódio novo: copie um `episodios/epNN.json` (falas, cenas com `fundo` e `elementos`,
`punch`), registre-o em `src/Root.tsx` e rode os três comandos.
- Motor: `src/serie/Episodio.tsx`; cenários: `src/serie/Fundos.tsx`; elementos: `src/serie/Elementos.tsx`

- Roteiros do lote: `roteiros.md`
- Kit de efeitos: `src/serie/Vertical.tsx` (legenda pop, gancho do 1º quadro, câmera de mão,
  neblina, partículas, light leak, motion blur, ficha datilografada, selo da série)
- Cenários noturnos: `src/serie/Cenarios.tsx`
- Fontes novas (SIL OFL): Anton (impacto), Creepster (títulos de terror), Special Elite
  (documentos), Oswald (apoio)
- Pacotes novos: @remotion/light-leaks, @remotion/motion-blur, @remotion/noise,
  @remotion/paths, @remotion/shapes
- Efeitos herdados da Loira do Banheiro: `src/Efeitos.tsx` (glitch, grão, flash, carimbo)
