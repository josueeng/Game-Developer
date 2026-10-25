# Short: 2º turno no exterior, o voto mudou desde o 1º turno?

Short vertical (1080x1920, 30 fps, ~63 s) do canal **Viralmente Viral**,
retrato de 25/10/2026, início da tarde (boletins parciais).

```bash
npm install
npm run render      # out/short.mp4
npm run thumbnail   # out/capa.png (1080x1920)
```

- Roteiro e fontes: `roteiro_narracao.md`
- Dados por país: `src/dados.ts` (percentuais calculados só entre os dois candidatos)
- Composição: `src/ShortExterior.tsx` (uma cena; animações presas às legendas)
- Narração: `scripts/gerar-narracao.py --velocidade 1.0`; trilha: `npm run trilha`
