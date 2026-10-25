// Lê public/narracao.mp3, encontra as pausas entre as cenas e grava
// public/narracao-tempos.json com o início de cada cena.
// Uso: npm run tempos   (depois: npm run render)
//
// Estratégia: o ffmpeg lista todos os silêncios; escolhemos os 6 que ficam
// mais perto dos cortes previstos no roteiro (proporcionalmente à duração
// real do áudio), dando preferência aos silêncios mais longos.
import {spawnSync} from 'node:child_process';
import {existsSync, writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const audio = path.join(raiz, 'public', 'narracao.mp3');
if (!existsSync(audio)) {
	console.error('Não encontrei public/narracao.mp3');
	process.exit(1);
}

// Durações previstas no roteiro (segundos), na mesma ordem de src/roteiro.ts
const PREVISTO = [15, 20, 20, 34, 20, 28, 18];

// O ffmpeg escreve o relatório de silêncios no stderr.
const texto = spawnSync('ffmpeg', ['-hide_banner', '-i', audio, '-af', 'silencedetect=noise=-35dB:d=0.35', '-f', 'null', '-'], {
	encoding: 'utf8',
}).stderr;

const duracao = Number(/Duration: (\d+):(\d+):([\d.]+)/.exec(texto)?.slice(1).reduce((acc, v, i) => acc + Number(v) * [3600, 60, 1][i], 0));
const silencios = [];
const re = /silence_start: ([\d.]+)[\s\S]*?silence_end: ([\d.]+)/g;
let m;
while ((m = re.exec(texto))) silencios.push({ini: Number(m[1]), fim: Number(m[2])});

const totalPrevisto = PREVISTO.reduce((a, b) => a + b, 0);
const inicios = [0];
let acumulado = 0;
for (let i = 0; i < PREVISTO.length - 1; i++) {
	acumulado += PREVISTO[i];
	const alvo = (acumulado / totalPrevisto) * duracao;
	const anterior = inicios[inicios.length - 1];
	const candidatos = silencios.filter((s) => s.fim > anterior + 3);
	let melhor = null;
	let melhorNota = Infinity;
	for (const s of candidatos) {
		const nota = Math.abs((s.ini + s.fim) / 2 - alvo) - (s.fim - s.ini) * 4;
		if (nota < melhorNota) {
			melhorNota = nota;
			melhor = s;
		}
	}
	// Corta no fim do silêncio, com 0,15 s de folga antes da próxima fala
	inicios.push(melhor ? Math.max(anterior + 3, melhor.fim - 0.15) : alvo);
}

const tempos = {inicios: inicios.map((v) => Math.round(v * 100) / 100), fim: Math.round((duracao + 1.0) * 100) / 100};
writeFileSync(path.join(raiz, 'public', 'narracao-tempos.json'), JSON.stringify(tempos, null, 2) + '\n');
console.log('Duração da narração:', duracao.toFixed(2), 's');
tempos.inicios.forEach((v, i) => console.log(`Cena ${i + 1}: começa em ${v.toFixed(2)} s`));
console.log('Gravado em public/narracao-tempos.json — confira e rode "npm run render".');
