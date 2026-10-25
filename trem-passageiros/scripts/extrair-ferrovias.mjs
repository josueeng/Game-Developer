// Extrai as ferrovias do Brasil do Natural Earth (ne_10m_railroads, domínio
// público) e grava src/data/ferrovias-brasil.json (linhas [lon, lat] simplificadas).
// Uso: node scripts/extrair-ferrovias.mjs caminho/ne_10m_railroads.geojson
import fs from 'node:fs';
import {geoContains} from 'd3-geo';
import {feature} from 'topojson-client';

const topo = JSON.parse(fs.readFileSync(new URL('../src/data/brasil-uf.topo.json', import.meta.url)));
const brasil = feature(topo, topo.objects.uf);
const ne = JSON.parse(fs.readFileSync(process.argv[2]));
const r = (v) => Math.round(v * 100) / 100;
const linhas = [];
for (const f of ne.features) {
	const g = f.geometry;
	if (!g) continue;
	const partes = g.type === 'MultiLineString' ? g.coordinates : [g.coordinates];
	for (const p of partes) {
		if (!p.some(([x, y]) => x > -75 && x < -33 && y > -35 && y < 6)) continue;
		let atual = [];
		for (const [x, y] of p) {
			if (geoContains(brasil, [x, y])) {
				const pt = [r(x), r(y)];
				const u = atual[atual.length - 1];
				if (!u || u[0] !== pt[0] || u[1] !== pt[1]) atual.push(pt);
			} else {
				if (atual.length > 1) linhas.push(atual);
				atual = [];
			}
		}
		if (atual.length > 1) linhas.push(atual);
	}
}
fs.writeFileSync(new URL('../src/data/ferrovias-brasil.json', import.meta.url), JSON.stringify(linhas));
console.log(linhas.length, 'linhas,', linhas.reduce((s, l) => s + l.length, 0), 'pontos');
