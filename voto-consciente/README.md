# Por que o seu voto vale mais do que você imagina

Vídeo explicativo apartidário sobre voto consciente, feito com
[Remotion](https://www.remotion.dev/) + TypeScript. 1920x1080, 30 fps, ~2min46s.

## Comandos

```bash
npm install
npm run dev         # abre o Remotion Studio para ver/ajustar as cenas
npm run render      # gera out/video.mp4
npm run thumbnail   # gera out/thumbnail.png (1280x720)
npm run tempos      # (com narração) detecta as pausas e ajusta as cenas
```

## Narração

1. Grave seguindo `roteiro_narracao.md`, com ~0,5 s de silêncio entre as cenas.
2. Salve como `public/narracao.mp3`.
3. Rode `npm run tempos`. O script cria `public/narracao-tempos.json` com o
   segundo em que cada cena começa. Confira os valores e ajuste à mão se precisar.
4. Rode `npm run render`.

Quando não existe `public/narracao.mp3`, o vídeo sai sem voz, com as durações
do roteiro, as legendas e a trilha instrumental. Com narração mas sem
`narracao-tempos.json`, as cenas são esticadas proporcionalmente ao áudio. A
trilha abaixa sozinha para ficar sob a voz.

## Onde mexer

| O quê | Arquivo |
|-------|---------|
| Nome do canal, cores, fontes | `src/config.ts` |
| Texto das legendas e duração de cada cena | `src/roteiro.ts` |
| Cada cena | `src/scenes/Cena1Gancho.tsx` … `Cena7Fechamento.tsx` |
| Componentes (recorte, jornal, marca-texto, gráfico, mapa, linha do tempo, legendas) | `src/components/` |
| Transições entre cenas | `src/Video.tsx` |
| Thumbnail | `src/Thumbnail.tsx` |

As animações dentro de cada cena são marcadas em **fração da cena**
(`t(0.3)` = 30% da cena), então acompanham automaticamente quando a duração
muda para casar com a narração.

## Recursos gerados (sem direitos de terceiros)

- `public/textura-papel.jpg`: textura procedural (`npm run textura`).
- `public/trilha.mp3`: trilha sintetizada do zero (`npm run trilha`).
- Fontes: Archivo, Archivo Black, Playfair Display, Caveat (SIL Open Font
  License, via Fontsource), em `public/fonts`.
- Mapa: malha das UFs do IBGE em TopoJSON, do projeto público
  [gis-dataset-brasil](https://github.com/fititnt/gis-dataset-brasil) (ODbL),
  projetada com d3-geo.

As fontes de todos os dados citados estão no fim de `roteiro_narracao.md`.
