# Pipeline do canal dark Viralmente Viral

Do tema ao vídeo publicado, em 10 etapas. Cada etapa diz **o que fazer**, **com
qual ferramenta** e **o que sai dela**. Os erros já cometidos estão em
`../voto-consciente/APRENDIZADOS.md`; leia antes de começar.

```
1 Tema → 2 Pesquisa → 3 Roteiro → [aprovação] → 4 Narração → 5 Sons
→ 6 Animação → 7 Conferência → 8 Render → 9 Embalagem → 10 Publicação e Shorts
```

## Formatos (modelos prontos)

| Formato | Para quê | Modelo | Duração |
|---|---|---|---|
| `explicativo` | notícia/dado ("quanto ganha", "por que") | `posse-2027` | 2–3 min, 16:9 |
| `lenda` | lenda urbana / mistério real + efeitos virais | `loira-do-banheiro` | 2–4 min, 16:9 |
| `historia` | ficção de suspense animada (série) | `apartamento-305` | ≤ 60 s, 9:16 |
| `short-dados` | números do dia, pergunta no final | `short-1x2turno` | ≤ 60 s, 9:16 |

```bash
pipeline/setup-tts.sh                 # uma vez por máquina/sessão: voz (Kokoro)
pipeline/novo-video.sh lenda corpo-seco   # cria ./corpo-seco com tudo instalado
```

---

## 1 · Tema (15 min)

- Fontes de ideia: Google Trends Brasil (tempo real), datas do calendário (abaixo),
  perguntas que o público fez nos comentários, `../pesquisa/temas-lacuna.md`.
- Critério para escolher (precisa de 3 de 4):
  1. **Pergunta** que as pessoas digitam ("por que…", "quanto…", "existiu?").
  2. **Momento**: pico de busca agora ou nos próximos 7 dias.
  3. **Surpresa verificável** para o gancho (um fato que contraria o senso comum).
  4. **Série**: rende parte 2, 3… ou Shorts.
- Evitar: polêmica em andamento sem lado neutro possível, marca/clube/partido em
  imagem, tema sem fonte confiável.

**Sai:** uma frase de título-pergunta + o fato-surpresa.

## 2 · Pesquisa (30–60 min)

- Fonte oficial primeiro (lei, órgão, documento); imprensa para contexto.
- Anote cada número com fonte e data. Se as partes não somam o total, algo está
  desatualizado: pesquise de novo.
- Cheque a **premissa** do pedido (ex.: "perdem R$ 30 bi" era "enviam").
- O que só aparece em relato vira "segundo relatos" no texto.

**Sai:** tabela de fontes (vai no fim do `roteiro_narracao.md`).

## 3 · Roteiro (30 min) → **aprovação**

Estrutura de retenção:

| Tempo | Função |
|---|---|
| 0–15 s | **gancho** sem logo: o fato-surpresa ou o susto |
| a cada ~45 s | **reengajamento**: "e é aqui que fica estranho", "mas o pior ainda vem" |
| final | resposta + **pergunta para comentários** + gancho do próximo vídeo |

- Frases curtas (uma ideia por legenda); pausas escritas no roteiro.
- `roteiro_narracao.md` (texto + "na tela" + fontes) e a lista de falas no script
  de narração.
- **Mostrar ao usuário e esperar aprovação antes de animar.**

## 4 · Narração (10 min)

```bash
~/tts/venv/bin/python fon.py "Guaratinguetá" "Bloody Mary"   # conferir pronúncia
~/tts/venv/bin/python scripts/narrar.py --modelo ~/tts       # (lenda/historia)
~/tts/venv/bin/python scripts/gerar-narracao.py --modelo ~/tts  # (explicativo)
```

- Narrador: `pm_alex`, tom 0,92 (mais grave), compressão e eco leve.
- Sussurro: `pf_dora` lenta, passa-alta, eco longo (só em suspense).
- Palavra que sai errada → tabela `PRONUNCIA` (muda só o áudio).
- Voz humana gravada sempre ganha: substitua `public/narracao.mp3` e rode
  `npm run tempos`.

**Sai:** `public/narracao.mp3` + `public/narracao-tempos.json`.

## 5 · Sons (5 min)

```bash
npm run sons     # ou: npm run trilha (explicativo)
```

- Tudo sintetizado (sem direitos autorais): drone, risers antes das viradas,
  sub-drop nas revelações, impactos, batidas, digitação, coração, caixinha.
- Os momentos saem dos tempos da narração (`eventos.json`): som **nas pausas**,
  nunca por cima da voz.

## 6 · Animação (1–3 h)

- Animações presas às falas (`useMarcas()` / tempos), nunca segundos fixos.
- Mudança visual a cada **2–4 s**; nada parado mais de 5 s.
- Efeitos de retenção prontos em `loira-do-banheiro/src/Efeitos.tsx`:
  glitch RGB, grão + vinheta, flash, **legenda karaokê** (palavra-chave amarela),
  texto datilografado, carimbo. Punch-in + tremor em `Video.tsx`.
- Personagens articulados: `apartamento-305/src/Pessoa.tsx`.
- Mapas: `MapaBrasil.tsx` (+ `projecaoBrasil()` para desenhar por cima).
- Regras: conteúdo longe das bordas (~60 px) e fora da faixa de legenda; valores
  com `whiteSpace: 'nowrap'`; sem logotipos, escudos ou fotos de pessoas reais.

```bash
npx tsc --noEmit     # depois de cada lote de edições
```

## 7 · Conferência (15 min)

```bash
# um still por legenda, em meia resolução, e folha de contato
node ../pipeline/tools/stills.mjs $PWD <saida> <quadro1> <quadro2> …
python3 ../pipeline/tools/sheet.py <folha.png> <saida>/*.png
```

Checklist: texto cortado? sobreposição? legenda em cima do desenho? palavra
grudada? elemento aparecendo antes da fala? fonte do dado na tela?

## 8 · Render (5–15 min)

```bash
npm run render                     # out/video.mp4 (ou out/short.mp4)
ffmpeg -ss 30 -i out/video.mp4 -frames:v 1 q.png   # extrair quadros e conferir sincronia
ffmpeg -i out/video.mp4 -af volumedetect -f null -   # volume médio ~ -20 dB, pico < -1 dB
```

## 9 · Embalagem (20 min)

- **3 thumbnails** em estilos diferentes (um objeto central, ≤ 4 palavras, fundo
  variando entre vídeos, nada no canto inferior direito) → "Testar e comparar".
- `publicacao_youtube.md`: título principal + 3 alternativos, descrição com
  capítulos (dos inícios das cenas) e fontes, tags, comentário fixado com pergunta
  ou votação.

## 10 · Publicação e Shorts

- Horário: 18h–21h (explicativo); 20h–23h (suspense/lenda).
- 3 Shorts por vídeo longo, trechos contínuos e sem promessa sem resposta:

```bash
V="[0:v]split[a][b];[a]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=30:5,eq=brightness=-0.25[bg];[b]scale=1080:-2[fg];[bg][fg]overlay=0:(H-h)/2"
ffmpeg -ss 58.7 -to 99.3 -i out/video.mp4 -filter_complex "$V" -c:v libx264 -crf 20 -c:a aac out/shorts/s2.mp4
```

- Cada Short com "Vídeo relacionado" apontando para o longo.
- Depois de 48 h e 7 dias: anotar impressões, CTR, duração média e % assistida;
  trocar a thumbnail perdedora; responder os primeiros comentários.

---

## Calendário semanal sugerido

| Dia | Entrega |
|---|---|
| Seg | tema + pesquisa + roteiro (aprovação) |
| Ter–Qua | narração, sons, animação, render |
| Qui | **vídeo longo** (18h–21h) |
| Sex | Short 1 |
| Sáb | Short 2 (ou episódio de `historia`) |
| Dom | Short 3 + leitura das métricas da semana |

## Datas que rendem (2026–2027)

| Quando | Tema |
|---|---|
| nov | Consciência Negra (20/11), Black Friday (golpes, "desconto falso") |
| dez | 13º salário, retrospectiva, diplomação (até 18/12) |
| jan | posse (5/1), IPVA/IPTU, volta às aulas (lendas de escola) |
| fev | Carnaval (história, custos), posse do Congresso (1/2) |
| mar–abr | Imposto de Renda (prazo), Páscoa (preço do chocolate) |
| jun | festas juninas (lendas do interior) |
| out | Halloween e Finados (lendas, mistérios) |

## Ambiente na nuvem (lembretes)

- Remotion usa o Chromium de `/opt/pw-browsers` (`remotion.config.ts`).
- Bloqueados: tse.jus.br, IBGE, HuggingFace, Instagram. GitHub Releases funciona.
- A pasta da voz (`~/tts`) some quando a sessão acaba: rode `setup-tts.sh` de novo.
- `out/` não vai para o git: entregue os arquivos direto ao usuário.
