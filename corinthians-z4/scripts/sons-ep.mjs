// Sons de um episódio, sincronizados com a narração: drone, vento, whoosh nas
// trocas de cena, riser + impacto + sub-drop nos punches, digitação e carimbo nas
// fichas, assobio, batidas, ferrão nos olhos e no final. Tudo sintetizado.
// Uso: node scripts/sons-ep.mjs 01
import fs from 'node:fs';
import {execSync} from 'node:child_process';

const NUM = process.argv[2];
const raiz = new URL('..', import.meta.url).pathname;
const ep = JSON.parse(fs.readFileSync(`${raiz}episodios/ep${NUM}.json`));
const {falas, fim} = JSON.parse(fs.readFileSync(`${raiz}public/ep${NUM}/tempos.json`));
const tF = (i, campo = 'de') => falas[Math.min(i, falas.length - 1)][campo];

const SR = 44100;
const N = Math.ceil(SR * fim);
const L = new Float32Array(N);
const R = new Float32Array(N);
let sd = 7 + Number(NUM);
const rnd = () => ((sd = (sd * 16807) % 2147483647) / 2147483647) * 2 - 1;
const add = (i, v, p = 0) => {
	if (i >= 0 && i < N) {
		L[i] += v * (1 - p);
		R[i] += v * (1 + p);
	}
};
const em = (t, dur, fn, pan = 0) => {
	const i0 = Math.floor(t * SR);
	for (let k = 0; k < SR * dur; k++) add(i0 + k, fn(k / SR), pan);
};

// Drone + vento (some na cena "preto" para dar contraste).
let lp = 0;
let vento = 0;
const base = ep.ficcao ? 41.2 : 46.25;
for (let i = 0; i < N; i++) {
	const t = i / SR;
	lp += 0.012 * (rnd() - lp);
	vento += (0.02 + 0.015 * Math.sin(t * 0.6)) * (rnd() - vento);
	const fade = Math.min(1, t / 0.3) * Math.min(1, (fim - t) / 0.6);
	add(i, (0.08 * Math.sin(2 * Math.PI * base * t) + 0.05 * Math.sin(2 * Math.PI * base * 1.5 * t) + 0.04 * Math.sin(2 * Math.PI * base * 2.01 * t) + 0.18 * lp + 0.2 * vento * (0.5 + 0.5 * Math.sin(t * 1.1))) * fade, 0.3 * Math.sin(t * 0.4));
}

// Whoosh nas trocas de cena.
for (const c of ep.cenas.slice(1)) {
	const t0 = tF(c.de) - 0.35;
	let f = 0;
	em(t0, 0.6, (t) => {
		const p = t / 0.6;
		f += (0.05 + 0.3 * Math.sin(Math.PI * p)) * (rnd() - f);
		return 0.35 * Math.sin(Math.PI * p) * f;
	});
}

// Punch: riser antes, impacto + sub-drop no fim da fala.
for (const i of ep.punch) {
	const tp = i === 0 ? 0.05 : tF(i, 'ate') - 0.35;
	if (tp > 1.8) em(tp - 1.5, 1.5, (t) => (t / 1.5) ** 2 * 0.25 * rnd());
	let ph = 0;
	em(tp, 2.0, (t) => {
		ph += (2 * Math.PI * (72 - 40 * Math.min(1, t / 1.4))) / SR;
		return Math.exp(-t * 1.8) * Math.sin(ph) * 0.9 + Math.exp(-t * 30) * rnd() * 0.55;
	});
}

// Elementos com som próprio.
for (const c of ep.cenas) {
	for (const e of c.elementos) {
		const t0 = tF(e.em ?? c.de);
		if (e.tipo === 'ficha') {
			const letras = e.linhas.join('').replace(/ /g, '').length;
			for (let k = 0; k < letras; k++) em(t0 + 0.4 + (k * 2) / 30, 0.04, (t) => 0.3 * Math.exp(-t * 160) * rnd(), 0.1);
			if (e.carimbo) em(t0 + 0.4 + (e.linhas.join('').length * 2 + 16) / 30, 0.4, (t) => 0.8 * Math.exp(-t * 18) * Math.sin(2 * Math.PI * 90 * t) + 0.3 * Math.exp(-t * 50) * rnd());
		}
		if (e.tipo === 'ondas') {
			// assobio: senoide com vibrato, 2 notas
			[[0.3, 1250], [1.1, 1480]].forEach(([dt, f0]) => em(t0 + dt, 0.7, (t) => 0.12 * Math.sin(Math.PI * Math.min(1, t / 0.7)) * Math.sin(2 * Math.PI * (f0 + 30 * Math.sin(2 * Math.PI * 6 * t)) * t), -0.2));
		}
		if (e.tipo === 'olhos' || e.tipo === 'retrovisor') em(t0 + 0.2, 1.4, (t) => Math.exp(-t * 2) * 0.08 * [880, 932, 1318].reduce((a, f) => a + Math.sin(2 * Math.PI * f * t), 0));
		if (e.tipo === 'caixao') [0, 0.9, 1.8].forEach((dt) => em(t0 + 0.3 + dt, 0.5, (t) => 0.6 * Math.exp(-t * 10) * Math.sin(2 * Math.PI * 55 * t) + 0.2 * Math.exp(-t * 25) * rnd()));
		if (e.tipo === 'batidas') [0, 0.55, 1.1].forEach((dt) => em(tF(e.em, 'ate') + 0.2 + dt, 0.35, (t) => 0.8 * Math.exp(-t * 20) * Math.sin(2 * Math.PI * 100 * t) + 0.3 * Math.exp(-t * 45) * rnd(), -0.3));
		if (e.tipo === 'saco') em(t0 + 0.2, 1.6, (t) => 0.12 * Math.sin(t * 9) * rnd() * Math.exp(-t * 0.8));
	}
}

// Ferrão final (antes da pergunta).
const tFinal = tF(falas.length - 1) - 0.2;
em(tFinal, 1.6, (t) => Math.exp(-t * 2.4) * 0.07 * [440, 466, 659, 698].reduce((a, f) => a + Math.sin(2 * Math.PI * f * t), 0));

let pico = 0;
for (let i = 0; i < N; i++) pico = Math.max(pico, Math.abs(L[i]), Math.abs(R[i]));
const buf = Buffer.alloc(44 + N * 4);
buf.write('RIFF', 0);
buf.writeUInt32LE(36 + N * 4, 4);
buf.write('WAVEfmt ', 8);
buf.writeUInt32LE(16, 16);
buf.writeUInt16LE(1, 20);
buf.writeUInt16LE(2, 22);
buf.writeUInt32LE(SR, 24);
buf.writeUInt32LE(SR * 4, 28);
buf.writeUInt16LE(4, 32);
buf.writeUInt16LE(16, 34);
buf.write('data', 36);
buf.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) {
	buf.writeInt16LE(Math.round((L[i] / pico) * 0.9 * 32767), 44 + i * 4);
	buf.writeInt16LE(Math.round((R[i] / pico) * 0.9 * 32767), 46 + i * 4);
}
const wav = `${raiz}public/ep${NUM}/sons.wav`;
fs.writeFileSync(wav, buf);
execSync(`ffmpeg -loglevel error -y -i ${wav} -b:a 192k ${wav.replace('.wav', '.mp3')}`);
fs.unlinkSync(wav);
console.log(`ep${NUM} sons ok`);
