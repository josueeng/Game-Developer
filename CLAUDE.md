# Notas do repositório

## voto-consciente/ (vídeos do canal com Remotion)

Leia `voto-consciente/APRENDIZADOS.md` antes de criar ou editar vídeos: ele
registra o processo, os erros e as soluções do primeiro vídeo.

Regras rápidas:
- Fluxo: pesquisar em fonte oficial → roteiro (`src/roteiro.ts` +
  `roteiro_narracao.md`) → mostrar ao usuário → só então animar.
- Confirme a data atual antes de falar em "últimas eleições" ou dados recentes.
  Dado sem fonte oficial confirmada não entra no vídeo.
- Animações-chave usam `useMarcas()` (início das legendas), nunca segundos
  fixos.
- Conteúdo acima de y = 830 (faixa de legenda) e ~60 px longe das bordas (zoom
  Ken Burns).
- Subset latin das fontes não tem `≈` nem `✓`.
- Na nuvem: o Remotion usa o Chromium de `/opt/pw-browsers` (ver
  `remotion.config.ts`); tse.jus.br, IBGE e HuggingFace ficam bloqueados;
  GitHub Releases funciona.
- Confira stills em meia resolução antes do render completo (~7 min) e
  extraia quadros do MP4 final para checar a sincronia.
- Rode `npx tsc --noEmit` depois de cada lote de edições.
