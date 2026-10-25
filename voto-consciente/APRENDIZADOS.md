# Aprendizados: vídeo "Por que o seu voto vale mais do que você imagina"

Registro do que funcionou, do que deu errado e de como foi resolvido na
criação do primeiro vídeo do canal (Remotion + TypeScript, out/2026). Serve de
guia para os próximos vídeos.

---

## 1. Processo que funcionou

1. **Pesquisa → roteiro → aprovação → animação.** Escrever o roteiro com os
   dados e as fontes antes de qualquer animação, mostrar e só animar depois do
   "ok". Isso evitou retrabalho: o roteiro foi aprovado sem mudanças.
2. **Roteiro como fonte única.** `src/roteiro.ts` guarda o texto já quebrado em
   trechos de legenda; a narração sintética, as legendas e os tempos das
   animações saem dele. `roteiro_narracao.md` é a versão para leitura humana.
3. **Primeiro quadros soltos, depois o vídeo inteiro.** Renderizar ~20 stills
   em meia resolução (um bundle só, via `@remotion/renderer`) e montar
   "folhas de contato" 2×N com PIL achou quase todos os problemas de layout
   em ~1 min, contra 7 min de um render completo.
4. **Conferir o MP4 final extraindo quadros com ffmpeg** nos momentos em que a
   narração diz algo específico (meio de cada legenda-chave). Foi assim que
   apareceu o gráfico ainda crescendo enquanto a voz já dizia "21,08%".
5. **Commits pequenos e push a cada etapa** (roteiro → projeto → ajuste →
   narração).

## 2. Dados e checagem de fatos

- **Verificar a data atual antes de pesquisar.** Hoje era 24/10/2026: as
  "últimas eleições" eram o 1º turno de 04/10/2026, não 2022. Assumir 2022
  teria deixado o vídeo desatualizado.
- **Fontes oficiais usadas:** notas do TSE (eleitorado 2026: 158.745.463;
  SP 34.104.226; MG 16.377.659; RR ~401 mil), totalização do 1º turno
  (comparecimento 125.275.835; brancos 2.300.798 = 1,84%; nulos 3.674.249 =
  2,93%), Agência Brasil e Agência Senado (abstenção 21,08%, maior desde 1998).
  Série de abstenção no 1º turno: 2014 19,39% · 2018 20,33% · 2022 20,95% ·
  2026 21,08%.
- **Derivar quando possível:** abstenção absoluta = aptos − comparecimento
  (158.745.463 − 125.275.835 = 33.469.628). A conta fecha com o 21,08%.
- **Não usar o que não dá para confirmar:** o eleitorado dos 27 estados não
  foi confirmado em fonte oficial, então o mapa mostra números só de SP, MG e
  RR. "Roraima, o menor colégio" virou "um dos menores", porque a fonte só
  dizia isso.
- **Leis citadas:** compra de votos = Código Eleitoral (Lei 4.737/1965),
  art. 299 (até 4 anos de reclusão e multa, para quem oferece e para quem
  aceita); cassação do candidato = Lei 9.504/1997, art. 41-A (incluído pela
  Lei 9.840/1999). Denúncia: app Pardal (TSE). Boatos: Fato ou Boato
  (Justiça Eleitoral). Mandatos: CF arts. 28, 44, 46 e 82.
- **Apartidário de verdade:** nenhum nome de candidato ou partido, ficha de
  candidato genérica ("CANDIDATO(A) — ficha de exemplo"), jornal e mensagem
  falsa inventados.
- **Ser transparente:** o contêiner não acessava tse.jus.br, então os números
  vieram de buscas que citam o TSE. Isso foi dito ao usuário, com a sugestão de
  conferir em resultados.tse.jus.br antes de publicar.

## 3. Ambiente (sessão na nuvem): erros e soluções

| Problema | Causa | Solução |
|---|---|---|
| `curl` para tse.jus.br e IBGE → 403 | proxy de saída bloqueia esses hosts | WebSearch para os dados; malha do IBGE via GitHub (`fititnt/gis-dataset-brasil`, ODbL) |
| WebFetch → `ENOTFOUND` em tse.jus.br, agenciabrasil, congressoemfoco | sem DNS para esses domínios | usar o resumo e as citações do WebSearch (modo `extended`) |
| `git push` → 403 no começo | GitHub App sem acesso ao repositório | avisar o usuário com o link de reconexão; depois de liberado, o push funcionou. Retentar não adianta para 403 (só para erro de rede). |
| `remotion still` tentou baixar o Chrome (`remotion.media` ENOTFOUND) | sem acesso ao CDN do Remotion | `Config.setBrowserExecutable()` apontando para o Chromium pré-instalado em `/opt/pw-browsers/.../chrome-headless-shell`, condicional a `existsSync`, para não quebrar na máquina do usuário |
| Aviso "Detected differing memory amounts" | cgroup do contêiner | inofensivo, pode ignorar |
| HuggingFace bloqueado (sem Piper, Whisper etc.) | proxy | Kokoro: modelo baixado de **GitHub Releases** (`thewh1teagle/kokoro-onnx`), que funciona; espeak-ng vem embutido no pip (`espeakng-loader`) |
| Sem ferramenta para ouvir o áudio | ambiente sem saída de som | validar a pronúncia pelos **fonemas** (`kokoro.tokenizer.phonemize(texto, 'pt-br')`) e medir volume com `ebur128`/`volumedetect`. Avisar o usuário que o áudio não foi ouvido. |

O que funciona na rede: registry do npm, PyPI, raw.githubusercontent.com,
downloads de GitHub Releases. Google Fonts respondeu, mas as fontes foram
servidas localmente (Fontsource → `public/fonts`) para não depender de rede no
render.

## 4. Remotion: lições técnicas

- **TransitionSeries encurta o vídeo:** cada transição sobrepõe as cenas. Para
  cada cena começar exatamente no seu tempo, dei a cada cena (menos a última)
  `duração + TRANSICAO`. Total = soma das durações.
- **Armadilha:** dentro da cena, `useVideoConfig().durationInFrames` é a
  duração **com** a transição (ex.: 1070, não 1050). Animações por fração
  ficaram ~2% atrasadas. Foi uma das razões para trocar frações por marcas de
  legenda.
- **Animar por marcas de legenda, não por segundos fixos.** `useMarcas()` em
  `src/anim.ts` dá `m(i, ajuste)` = quadro em que a legenda *i* da cena
  começa (`m(2.5)` = meio da legenda 2). Com isso, qualquer narração nova
  realinha tudo sozinha. Começar só com frações (`t(0.3)`) causou
  dessincronia.
- **Legendas sem "piscar":** quando o intervalo entre duas legendas é menor
  que 20 quadros, a anterior fica na tela até a próxima.
- **`calculateMetadata`** decide a duração em tempo de render: detecta
  `public/narracao.mp3` com `fetch(staticFile(...), {method: 'HEAD'})`, lê
  `narracao-tempos.json` se existir ou estica as cenas proporcionalmente ao
  áudio (`getAudioDurationInSeconds`).
- **Fontes:** `@remotion/fonts` `loadFont` + `delayRender` no Root. O subset
  "latin" do Fontsource cobre acentos, `–`, `—` e `…`, mas **não** `≈` nem
  `✓`: troquei por `~401 mil` e `Inscrito!`. Conferir glifos especiais antes.
- **Recorte de papel:** `clip-path: polygon(...)` com variação determinística
  (`random(seed)`) e `filter: drop-shadow` no elemento **pai** (no mesmo
  elemento, o clip corta a sombra).
- **Marca-texto:** `background-size` animado de 0 a 100% num gradiente. As
  bordas transparentes de 0,4em deixavam a última letra sem cor; 0,04–0,12em
  resolveu.
- **Mapa:** `d3-geo` (`geoMercator().fitExtent`) + `topojson-client`, JSON
  importado direto (`resolveJsonModule`). As ilhas oceânicas encolhem um pouco
  o mapa; aceitável. Entrada dos estados ordenada por `cx + cy` (varredura
  noroeste→sudeste).
- **Gráfico honesto:** barras com base no zero, mesmo com valores próximos
  (19–21%). Os rótulos de valor fazem a diferença aparecer.
- **Render:** ~7 min para 166 s em 1080p30 com 4 núcleos (CRF 18, JPEG 90),
  ~62 MB. Renderizar a thumbnail ao mesmo tempo deixa o render mais lento.

## 5. Erros de layout encontrados na conferência (e correções)

| Onde | Erro | Correção |
|---|---|---|
| Linha do tempo | texto da faixa "4 anos" cortado (barra estreita, fonte 30) | fonte 26 e texto mais curto |
| Linha do tempo | rótulo "2034" encostado na borda direita | marco movido de 0,98 para 0,94 |
| Linha do tempo | marco 2034 aparecia depois da frase "valendo em 2034" | duração da linha calculada para chegar em `m(8)` |
| Cena 2 | linha do tempo entrava enquanto a voz ainda falava de "obras da cidade" | troca de parte ligada à legenda certa |
| Números | card "6 milhões" estourando a largura | "6" e "milhões" em linhas separadas, card mais largo |
| Números | gráfico ainda crescendo quando a voz dizia "21,08%" | gráfico entra antes, com barras mais rápidas (intervalo 10) |
| Crime | carimbo "CRIME" quase saindo da tela com o zoom Ken Burns | fonte 150→124 e reposicionado. Lembrar que o zoom amplia as bordas. |
| Desinformação | "NA DÚVIDA, NÃO COMPARTILHE." numa linha só passaria de 1920 px | duas linhas, fonte 56 |
| Desinformação | item longo "Busque no Fato ou Boato (Justiça Eleitoral)" quebrava | título curto + subtítulo menor |
| Fechamento | nome do canal quebrava em 2 linhas ao lado de "Inscreva-se" | `whiteSpace: 'nowrap'` |
| Thumbnail | nome do jornal quebrava em 2 linhas | nome mais curto, sem a data |

**Regra:** estimar a largura antes de escrever. Archivo Black ≈ 0,72 em por
caractere; Archivo 800 ≈ 0,55 em. Conteúdo sempre acima de y = 830 (a faixa de
legenda ocupa a parte de baixo). Deixar ~60 px de folga nas bordas por causa
do zoom.

## 6. Erros de processo meus (para não repetir)

- **Edição por substring ambígua:** num script Python de substituição, procurei
  `"\t\t\t\t\t{["` (5 tabs), que também casava dentro de uma linha com 7 tabs.
  Isso apagou metade da Cena 5. Usar trechos únicos e maiores, ou a ferramenta
  Edit. Rodar `tsc --noEmit` depois de cada lote de edições pegou o erro na
  hora.
- **Nome de arquivo errado ao montar a folha de contato** (`Video-000170`
  em vez de `Video-00170`): usar glob ou nomes gerados, não digitados.
- **Captura do stderr do ffmpeg:** a primeira versão de `detectar-tempos.mjs`
  rodava o ffmpeg 3 vezes para pegar o log. O certo é
  `spawnSync(...).stderr` (o ffmpeg escreve o relatório no stderr).
- **`sed` apagou uma linha que eu ainda usaria** (`fibras = Image.new`) na
  textura. Funcionou porque a variável era redefinida logo depois, mas foi
  sorte: revisar antes de aplicar `sed -i`.
- **Gerar a narração sem pensar na velocidade:** o Kokoro pt-BR a 1,0 sai a
  ~3,8 palavras/s, rápido demais. 0,9 deu 2min43s e ritmo melhor.

## 7. Narração sintética (Kokoro)

- Vozes pt-BR: `pf_dora` (feminina, usada), `pm_alex`, `pm_santa`.
- Pronúncia: números, datas e porcentagens saem por extenso corretamente.
  Siglas não: "TSE" era lido como uma palavra ("tsy"), então virou
  "tê ésse ê". Decimais foram escritos por extenso por segurança. A tabela
  `PRONUNCIA` em `scripts/gerar-narracao.py` muda só o texto **falado**; a
  legenda continua igual.
- Gerar **por frase** (juntando trechos de legenda até `. ? ! :`), não por
  trecho: preserva a entonação. O tempo de cada trecho dentro da frase é
  dividido pelo número de fonemas, o que dá legendas bem alinhadas.
- Pausas: 0,28 s entre frases, 0,9 s no fim de cada cena, 2 s no final.
  Normalizar com `loudnorm=I=-16:TP=-1.5`. Resultado: -17,4 LUFS na mistura,
  trilha ~16 dB abaixo da voz (volume da trilha 0,12 com narração e 0,45
  sem).

## 8. Recursos próprios (sem direitos de terceiros)

- Textura de papel: ruído multioitava + fibras + vinheta em NumPy/PIL
  (`npm run textura`).
- Trilha: síntese em Node puro (pad C–Am–F–G, arpejo tipo pluck, pulso grave,
  92 BPM) → WAV → MP3 via ffmpeg (`npm run trilha`).
- Fontes OFL (Archivo, Archivo Black, Playfair Display, Caveat).
- Ícones SVG desenhados à mão no código.
- Nada da identidade da Vox (nome, logo, vinheta, fontes, trilha).

## 9. Checklist para o próximo vídeo

- [ ] Confirmar a data de hoje e o contexto recente do tema.
- [ ] Pesquisar dados em fonte oficial; anotar fonte e valor; descartar o que
      não for confirmado.
- [ ] Escrever o roteiro (trechos de legenda ≤ ~55 caracteres) e mostrar antes
      de animar.
- [ ] Copiar este projeto como base: `config.ts`, componentes, `anim.ts`
      (useMarcas), `timing.ts`, scripts.
- [ ] Amarrar cada animação-chave a `m(i)` desde o começo.
- [ ] Stills em meia resolução + folha de contato antes do render completo.
- [ ] Gerar ou receber a narração → `narracao-tempos.json` → render.
- [ ] Extrair quadros do MP4 final no meio das frases-chave e conferir a
      sincronia.
- [ ] Medir o volume (`ebur128`); ~-16/-17 LUFS para o YouTube.
- [ ] Thumbnail 1280x720 com 3–5 palavras grandes, um destaque amarelo e um
      número.
- [ ] Lembrar a licença do Remotion: gratuita só para pessoas físicas e
      empresas de até 3 pessoas.

---

# Vídeo 2: "R$ 30 bilhões por mês: para onde ia o dinheiro das bets?" (`../bets-30-bilhoes`)

## O que funcionou
- **Checar a premissa do pedido.** O título sugerido ("os brasileiros
  *perdem* R$ 30 bi por mês") era falso: R$ 30 bi é o valor **enviado**; 93–94%
  volta em prêmios e a perda real (GGR) é ~R$ 2,9 bi/mês. Corrigir isso virou
  o melhor trecho do vídeo ("por que a casa sempre ganha").
- **Pesquisar o estado atual antes de roteirizar.** A busca revelou a MP nº
  1.394/2026 (proibição das bets, sites fora do ar em 06/10/2026), que mudou
  o vídeo inteiro e o deixou muito mais atual.
- **Cálculo próprio explicado na tela.** 100 × 0,93ⁿ (10 rodadas ≈ 48;
  20 ≈ 23) mostra a ideia sem precisar de dado extra, com a fórmula na fonte.
- **Curiosidade em aberto no gancho** ("fica até o final: tem um golpe novo
  circulando"), paga na cena 6 (golpe da "taxa de liberação de saldo").
- **Conferência por legenda:** um still no meio de **cada** legenda (48 quadros
  em meia resolução, ~3 min) pegou todos os problemas de sincronia e layout
  antes do render completo.
- **Reaproveitar a base:** copiar o projeto (sem `node_modules`/`out`),
  `npm ci`, trocar `roteiro.ts`, cenas, `Video.tsx` e `Root.tsx`. No contêiner
  não há `rsync`; usar `cp`.

## Dados: o que entrou e o que ficou de fora
- Entrou: BC na CPI (R$ 20–30 bi/mês, jan–mar/2025); retorno de 93–94% (SPA/MF
  citado pelo presidente do BC); SPA 1º sem. 2025 (17,7 mi apostadores, GGR
  R$ 17,4 bi, R$ 164/mês); MP 1.394/2026; devolução de R$ 1,3 bi para 26,5 mi
  de contas (Agência Brasil); "9 em 10 contas com menos de R$ 1" (dado das
  empresas, dito assim na tela).
- Ficou de fora: R$ 30 bi+ de 2026 (CNC, setorial), R$ 3 bi do Bolsa Família
  (metodologia do BC contestada), números de consultorias, debate eleitoral.

## Erros de layout desta vez (e correções)
| Erro | Correção |
|---|---|
| Moedas "caíam" no cofre mas sumiam | o cofre era desenhado **depois** das moedas; a ordem no JSX é a ordem de empilhamento. Desenhar o cofre antes. |
| "R$ 2,00" quebrava em "R$" / "2,00" | `whiteSpace: 'nowrap'` em todo valor monetário |
| Card "R$ 1,3 bi" mostrava "0,0 milhões" antes da narração | `Numero` mostra 0 antes de começar: esconder (opacity) até a marca da legenda |
| Balões "GANHEI!" cobriam a fileira de cima | vencedores na primeira fileira |
| Último marco da linha do tempo saía da tela | posições até 0,90, não 0,95 |
| Frase final colada na borda direita | fonte menor (70→60); o zoom inicial do Ken Burns amplia |
| "R$" espelhado na moeda girando | `scaleX = |cos|` em vez de `cos` |
| Texto "CASA" estourando a moeda | tamanho da fonte da `Moeda` depende do comprimento do texto |

## Componentes novos (copiar para os próximos vídeos)
- `components/Personagem.tsx`: personagem genérico espantado (thumbnail).
- `MapaBrasil.pontosNoMapa()`: pontos aleatórios dentro do território
  (`geoContains`), marcados na tela como "pontos ilustrativos".
- `Icones`: `Moeda`, `IconeAlerta`, `IconeInterrogacao`.

---

# Vídeo 3: "Para onde vai cada real que você paga na gasolina?" (`../gasolina`)

## O que funcionou
- **Somar antes de acreditar.** As primeiras parcelas encontradas (Petrobras
  R$ 1,83 de maio etc.) davam bem menos que R$ 6,53. Só a composição de
  out/2026 da Petrobras (2,08 + 1,83 + 1,57 + 0,99 + 0,06 = 6,53; 31,9 + 28 + 24
  + 15,2 + 0,9 = 100%) fechou a conta. Regra: se as parcelas não somam o total,
  algum número está desatualizado.
- **Contexto que muda rápido:** em 2026 a política de combustíveis mudou várias
  vezes (subvenção de R$ 0,44 em maio → corte de R$ 0,63 em setembro → PIS,
  Cofins e Cide zerados de 10/10 a 09/11). Pesquisar a cronologia até a data
  de hoje antes de escrever.
- **A curiosidade em aberto virou uma data real** ("a data de novembro que pode
  mudar o preço"), sem opinião política.
- **Pronúncia:** "ICMS" saía como uma palavra só e "Petrobras" com a tônica
  errada. A tabela `PRONUNCIA` usa "i cê ême ésse" e "Petrobrás" só no áudio.

## Erros de layout desta vez (e correções)
| Erro | Correção |
|---|---|
| "R$ 6,53" estourando o visor da bomba | fonte 56→40 |
| Fatia "destacada" da rosca cortada na borda | `overflow: 'visible'` no `<svg>` |
| Créditos de fonte longos saindo pela direita | textos de fonte com no máximo ~45 caracteres quando começam depois de x ≈ 1000 |
| Caminhão passando por cima dos nomes das etapas | nomes mais abaixo (o caminhão anda na linha) |
| "R$ 6,53" maior que o miolo da rosca | fonte 64→38 |
| Usei "≠" (não existe no subset latin) | sinal desenhado em SVG. A regra do `CLAUDE.md` existe por isso: conferir glifos antes |

## Componentes novos
- `components/Gasolina.tsx`: `Pizza` (rosca com fatias que entram e se
  destacam), `Bomba`, `Barril`, `Bequer`, `Calendario`, `Caminhao`, ícones das
  etapas e `EtiquetaCidade` (preço sem número, quando não há fonte oficial).
- `components/Inscricao.tsx`: card de inscrição extraído para reutilizar.

---

# Shorts (todos os vídeos)

- **Fidelidade:** o Short não tem roteiro novo. `src/Short.tsx` renderiza o
  próprio `<Video>` dentro de `<Series>` + `<Sequence from={-início}>`, ou
  seja, trechos contínuos do vídeo principal com a mesma narração, as mesmas
  cenas e as mesmas fontes. Na vertical (1080x1920), o vídeo ocupa a largura
  (escala 0,5625), com título no topo, as fontes do trecho em texto legível
  logo abaixo e legendas grandes remapeadas para o tempo do Short.
- **Cortar entre frases:** usar os tempos de `public/narracao-tempos.json`.
  Início de trecho = início da cena + 0,2 s; fim = início da cena seguinte
  − 0,2 s.
- **Não deixar promessa sem resposta:** se o trecho do gancho tem "fica até o
  final…" e o Short não chega lá, cortar antes dessa frase.
- **Erro encontrado:** começar um trecho no início de uma cena mostra a
  transição original, com o fim da cena anterior por cima, inclusive o adesivo
  da promessa que tinha sido cortada. Solução: uma cortina de papel nos
  primeiros 22 quadros de cada trecho depois do primeiro. A narração segue
  inteira.
- `Video` ganhou as props `semLegendas` (o Short desenha as próprias legendas)
  e `fimTrilha` (o fade da trilha usa a duração do vídeo original, não a do
  Short).
- Config dos Shorts em `src/shorts.ts`; render com `npm run shorts`
  (`out/shorts/<id>.mp4`). Títulos e descrições em `../shorts_publicacao.md`.

---

# Vídeo 4: "O Flamengo foi eliminado… e pediu para ir à final" (`../flamengo-rojo`)

## O que funcionou
- **Premissa:** "jogador irregular" era a **acusação** do Flamengo, não um
  fato. O jogador entrou em campo com liminar do CAS. O vídeo atribui cada
  argumento a quem o fez e não diz quem tem razão.
- **Caso em andamento:** checar de novo se houve decisão antes de animar (não
  havia em 25/10) e marcar a data da situação no roteiro, na descrição e no
  comentário fixado.
- **Divergência de fontes:** a nota do Flamengo cita o art. 24.1.b do Código
  Disciplinar; outras matérias citam o art. 19. O vídeo fala só "Código
  Disciplinar da Conmebol", sem número.
- **Marcas:** nada de escudos, camisas ou logotipos. Times em cores neutras
  do canal (Flamengo em preto, Estudiantes em azul).
- **Pronúncia de nomes estrangeiros:** "Rojo" saía "Rójo" e virou "Rorro";
  "Sánchez" virou "Sântches". Conferir sempre pelos fonemas.

## Erros desta vez (e correções)
| Erro | Correção |
|---|---|
| `rm -f scenes/*` depois de `cd` foi bloqueado pela checagem de segurança | não era necessário: copiar só o que precisa, em vez de copiar e apagar |
| "MARCOS ROJO" cortado no card | card mais largo (600→720) |
| Risco do placar antigo caía sobre o nome do time | prop `riscado` no próprio `Placar`, desenhada sobre o placar |
| "SANTOS" saindo do placar (nome longo do outro lado) | prop `fonteTime` menor nesse placar |
| "ESTUDIANTES × PALMEIRAS" cortado | card mais largo e fonte 92→80 |
| Primeira frase de cena sem nada na tela ("E não seria a primeira vez") | "2018" grande com marca-texto até a legenda seguinte |

---

# Vídeo 5: "Quanto ganha um deputado federal?" (`../deputado-federal`)

## O que funcionou
- **Tema validado pela busca:** pergunta entre as mais buscadas da eleição
  (Google Trends, via Folha PE). Título com a pergunta e o dado surpresa
  ("o salário é só 17% da conta").
- **Fontes divergentes:** a verba de gabinete aparecia como R$ 133 mil,
  R$ 151 mil e R$ 165.806,07. Valeu a página da Câmara citando o ato mais
  recente (Ato da Mesa 243/2026). A Wikipedia ainda tinha o salário antigo.
- **Não induzir ao erro:** verbas são tetos de gasto, não salário. O vídeo diz
  isso em voz e num carimbo na tela, e a descrição e o comentário fixado
  repetem.
- **Número estimado:** "~R$ 40 mi em emendas" entra como "em média".
- **Dados por estado incertos** (redistribuição de cadeiras pelo Censo 2022):
  usar só os extremos garantidos pela Constituição (8 e 70).
- Valores oficiais centralizados em `src/components/Deputado.tsx`; os
  contadores leem de lá.

## Erros de layout desta vez (e correções)
| Erro | Correção |
|---|---|
| Barras do gancho cresciam para baixo (posição absoluta pelo topo) | contêiner flex ancorado embaixo |
| "R$ 46.366,19" cortado no recorte | recorte 660→840 px |
| Valor e detalhe do cartão do envelope cortados / escondidos atrás da frente | envelope 500→540, fonte 52→40, cartão sobe 130 px |
| Carimbo "TETO DE GASTO" sobre os títulos dos envelopes e depois sobre a fonte | carimbo abaixo dos títulos; crédito da fonte encurtado |
| "cerca de R$ 3,3 mi" e "~R$ 40 milhões" cortados | recortes mais largos e fonte menor |
| Na cena final, duas partes visíveis ao mesmo tempo (fim da parte A em m(4), início da B em m(3)) | a parte A termina em `iniB + 12` |
| Contracheque pequeno demais, tela vazia | `scale(1.25)` com `transformOrigin: top left` |
| Etiqueta da thumbnail saindo pela direita | x 860→820, fonte 46→40 |
