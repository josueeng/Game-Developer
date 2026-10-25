# Notas do repositório

## Vídeos do canal Viralmente Viral (Remotion)

Cada vídeo é um projeto próprio: `voto-consciente/` (vídeo 1),
`bets-30-bilhoes/` (vídeo 2), `gasolina/` (vídeo 3), `flamengo-rojo/` (vídeo 4), `deputado-federal/` (vídeo 5) e `trem-passageiros/` (vídeo 6); Short avulso em `exterior-2turno/`. Para um vídeo novo, copie o projeto mais recente
(sem `node_modules`/`out`) e troque roteiro e cenas.

Leia `voto-consciente/APRENDIZADOS.md` antes de criar ou editar vídeos: ele
registra o processo, os erros e as soluções dos vídeos já feitos.

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
- Cheque a premissa do pedido (ex.: "perdem R$ 30 bi" era "enviam") e
  pesquise o estado atual do tema antes do roteiro.
- Valores monetários sempre com `whiteSpace: 'nowrap'`; contadores escondidos
  até a legenda que os cita.
- Se as parcelas de um dado não somam o total, algum número está
  desatualizado: pesquise de novo antes de usar.
- Temas polêmicos ou em andamento: atribuir cada argumento a quem o fez,
  não opinar, marcar a data da situação e checar novidades antes de animar.
  Sem escudos, logotipos ou camisas (direito de marca).
- Shorts: só trechos contínuos do vídeo aprovado (`src/shorts.ts` +
  `src/Short.tsx`, `npm run shorts`), cortados entre frases e sem promessa
  sem resposta. Títulos e descrições em `shorts_publicacao.md`.
