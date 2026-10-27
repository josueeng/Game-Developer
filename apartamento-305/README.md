# Short de suspense: "O apartamento 305"

História original de ficção, vertical 1080x1920, 58 s, animação 2D em recorte.

```bash
npm install
../tts/venv/bin/python scripts/narrar.py --modelo <pasta do Kokoro>   # narração + tempos
npm run sons     # eventos.json (batidas, rangido, apagão) + sons.mp3, a partir dos tempos
npm run render   # out/short.mp4
```

- Roteiro com pausas: `roteiro_narracao.md`
- Narração melhorada (`scripts/narrar.py`): voz pm_alex, 1,5 semitom mais grave, pausas
  por fala, graves, compressão e eco leve.
- Cenas: `src/Historia.tsx` (quarto, portaria, segunda noite, armário, final)
- Personagens articulados: `src/Pessoa.tsx` (`Corpo` para usar dentro de SVG)
