# Série de Shorts: Mistérios e lendas do Brasil

Projeto base dos Shorts verticais (9:16 nativo, 25–35 s) do canal.

```bash
npm install
npx remotion render Vitrine out/vitrine.mp4   # demonstração do kit
```

- Roteiros do lote: `roteiros.md`
- Kit de efeitos: `src/serie/Vertical.tsx` (legenda pop, gancho do 1º quadro, câmera de mão,
  neblina, partículas, light leak, motion blur, ficha datilografada, selo da série)
- Cenários noturnos: `src/serie/Cenarios.tsx`
- Fontes novas (SIL OFL): Anton (impacto), Creepster (títulos de terror), Special Elite
  (documentos), Oswald (apoio)
- Pacotes novos: @remotion/light-leaks, @remotion/motion-blur, @remotion/noise,
  @remotion/paths, @remotion/shapes
- Efeitos herdados da Loira do Banheiro: `src/Efeitos.tsx` (glitch, grão, flash, carimbo)
