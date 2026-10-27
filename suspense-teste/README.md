# Cena-teste: suspense com personagem andando

Teste de formato (vertical 1080x1920, 16 s) para histórias de suspense animadas:
personagem em recorte 2D com ciclo de caminhada, corredor com câmera acompanhando,
lâmpadas piscando, silhueta passando atrás, zoom no rosto e apagão.

```bash
npm install
npm run sons     # public/sons.mp3 (drone, passos, zumbido, susto; tudo sintetizado)
npm run render   # out/teste.mp4
```

- Cena: `src/Corredor.tsx` (personagem `Lucas`, `Silhueta`, tempos em segundos no topo)
- Narração: `scripts/gerar-narracao.py --velocidade 0.85`; os trechos são colocados
  com pausas no vídeo (`FALAS`), para dar tempo ao suspense.
