// Gera public/eventos.json (momentos de flash, punch-in, riser, digitação...) a
// partir de public/narracao-tempos.json, e public/sons.mp3 com o desenho de som,
// tudo sintetizado: drone, batidas na porta, risers, sub-drops, impactos,
// máquina de escrever, coração, whooshes e uma caixinha de música.
import fs from 'node:fs';
import {execSync} from 'node:child_process';

const pub = (f) => new URL(`../public/${f}`, import.meta.url).pathname;
const {falas, fim} = JSON.parse(fs.readFileSync(pub('narracao-tempos.json')));
const F = (i) => falas[i];
const r3 = (x) => +x.toFixed(3);

// Cenas (índice da primeira fala de cada uma).
const CENAS = [0, 5, 11, 15, 19, 24, 29, 33, 39];
const ev = {
	cenas: CENAS.map((i, k) => r3(k === 0 ? 0 : F(i).de - 0.35)),
	titulo: r3(F(4).ate + 0.15),
	drops: [r3(F(4).ate + 0.15), r3(F(23).ate + 0.15), r3(F(27).ate + 0.1), r3(F(41).ate + 0.25)],
	risers: [F(15).de, F(24).de, F(33).de].map(r3),
	punch: [r3(F(4).ate - 0.7), r3(F(16).ate - 0.7), r3(F(17).de + 0.6), r3(F(21).ate - 0.9), r3(F(23).ate - 0.8), r3(F(27).de + 1.0), r3(F(36).ate - 0.9)],
	batidas: [F(0).ate, F(1).ate, F(2).ate].map((t) => r3(t + 0.1)),
	digita: [
		{de: r3(F(11).de), texto: 'GUARATINGUETÁ · 1864'},
		{de: r3(F(21).de + 0.2), texto: 'PARIS · 22/04/1891'},
	],
	coracao: [r3(F(25).de), r3(F(28).ate + 1.0)],
	caixinha: [
		[r3(F(11).de - 0.3), r3(F(14).ate + 1.2)],
		[r3(F(39).de), r3(F(41).ate)],
	],
	apagao: r3(F(41).ate + 0.25),
	fim: r3(fim),
};
fs.writeFileSync(pub('eventos.json'), JSON.stringify(ev, null, 1));

const SR = 44100;
const N = Math.ceil(SR * ev.fim);
const L = new Float32Array(N);
const R = new Float32Array(N);
let sd = 17;
const rnd = () => ((sd = (sd * 16807) % 2147483647) / 2147483647) * 2 - 1;
const add = (i, v, pan = 0) => {
	if (i < 0 || i >= N) return;
	L[i] += v * (1 - pan);
	R[i] += v * (1 + pan);
};

// Drone (sobe nas cenas 1, 6 e 9; mais baixo nas cenas de "documento").
let lp = 0;
const intensidade = (t) => {
	if (t < ev.cenas[1]) return 1;
	if (t >= ev.cenas[5] && t < ev.cenas[6]) return 1.1;
	if (t >= ev.cenas[8]) return 0.9;
	return 0.55;
};
for (let i = 0; i < N; i++) {
	const t = i / SR;
	lp += 0.012 * (rnd() - lp);
	const resp = 0.65 + 0.35 * Math.sin(2 * Math.PI * 0.09 * t);
	const g = t < ev.apagao ? intensidade(t) : 0.2;
	add(i, (0.08 * Math.sin(2 * Math.PI * 46.25 * t) + 0.05 * Math.sin(2 * Math.PI * 69.3 * t) + 0.04 * Math.sin(2 * Math.PI * 92.5 * t + 2) + 0.2 * lp) * resp * g * Math.min(1, t / 1.2));
}

// Batida/tremor de porta.
const batida = (t0, vol, pan = 0.3) => {
	const i0 = Math.floor(t0 * SR);
	let f = 0;
	for (let k = 0; k < SR * 0.35; k++) {
		const t = k / SR;
		f += 0.25 * (rnd() - f);
		const chacoalha = Math.exp(-t * 9) * (Math.sin(2 * Math.PI * 14 * t) > 0 ? 1 : 0.3);
		add(i0 + k, vol * (Math.exp(-t * 20) * Math.sin(2 * Math.PI * 100 * t) + chacoalha * f * 0.6), pan);
	}
};
ev.batidas.forEach((t, i) => batida(t, 0.5 + 0.2 * i));

// Riser: ruído + tom subindo por 2 s, terminando em t1.
for (const t1 of ev.risers) {
	const i0 = Math.floor((t1 - 2) * SR);
	let f = 0;
	for (let k = 0; k < SR * 2; k++) {
		const p = k / (SR * 2);
		f += (0.05 + 0.5 * p) * (rnd() - f);
		add(i0 + k, p * p * (0.25 * f + 0.06 * Math.sin(2 * Math.PI * (200 + 900 * p * p) * (k / SR))));
	}
}

// Sub-drop (grave que cai) + impacto.
const drop = (t0, vol = 1) => {
	const i0 = Math.floor(t0 * SR);
	let ph = 0;
	for (let k = 0; k < SR * 2.2; k++) {
		const t = k / SR;
		ph += (2 * Math.PI * (75 - 45 * Math.min(1, t / 1.6))) / SR;
		add(i0 + k, vol * (Math.exp(-t * 1.6) * Math.sin(ph) * 0.9 + Math.exp(-t * 30) * rnd() * 0.5));
	}
};
ev.drops.forEach((t) => drop(t));

// Impacto curto nos punch-ins.
for (const t0 of ev.punch) {
	const i0 = Math.floor(t0 * SR);
	for (let k = 0; k < SR * 0.4; k++) {
		const t = k / SR;
		add(i0 + k, 0.5 * Math.exp(-t * 12) * Math.sin(2 * Math.PI * 60 * t) + 0.15 * Math.exp(-t * 40) * rnd());
	}
}

// Máquina de escrever: um clique por letra (a cada 2 quadros) + sino no fim.
for (const d of ev.digita) {
	const n = d.texto.length;
	for (let c = 0; c < n; c++) {
		if (d.texto[c] === ' ') continue;
		const i0 = Math.floor((d.de + (c * 2) / 30) * SR);
		for (let k = 0; k < SR * 0.04; k++) add(i0 + k, 0.35 * Math.exp(-(k / SR) * 160) * rnd(), 0.1);
	}
	const sino = Math.floor((d.de + (n * 2) / 30 + 0.1) * SR);
	for (let k = 0; k < SR * 0.8; k++) add(sino + k, 0.12 * Math.exp(-(k / SR) * 5) * Math.sin(2 * Math.PI * 2100 * (k / SR)));
}

// Coração (lub-dub) a cada 0,85 s.
for (let t = ev.coracao[0]; t < ev.coracao[1]; t += 0.85) {
	for (const [dt, v] of [[0, 0.45], [0.18, 0.3]]) {
		const i0 = Math.floor((t + dt) * SR);
		for (let k = 0; k < SR * 0.2; k++) add(i0 + k, v * Math.exp(-(k / SR) * 18) * Math.sin(2 * Math.PI * 55 * (k / SR)));
	}
}

// Whoosh nas trocas de cena.
for (const t0 of ev.cenas.slice(1)) {
	const i0 = Math.floor((t0 - 0.25) * SR);
	let f = 0;
	for (let k = 0; k < SR * 0.6; k++) {
		const p = k / (SR * 0.6);
		f += (0.05 + 0.3 * Math.sin(Math.PI * p)) * (rnd() - f);
		add(i0 + k, 0.35 * Math.sin(Math.PI * p) * f, -0.6 + 1.2 * p);
	}
}

// Caixinha de música (lá menor, desafinando de leve).
const notas = [69, 72, 76, 81, 79, 76, 72, 74, 71, 68, 71, 76];
const freq = (m) => 440 * 2 ** ((m - 69) / 12);
for (const [t0, t1] of ev.caixinha) {
	let n = 0;
	for (let t = t0; t < t1; t += 0.42, n++) {
		const f0 = freq(notas[n % notas.length] + 12) * (1 - 0.004 * Math.sin(n));
		const i0 = Math.floor(t * SR);
		for (let k = 0; k < SR * 1.2; k++) {
			const tt = k / SR;
			add(i0 + k, 0.05 * Math.exp(-tt * 3.5) * (Math.sin(2 * Math.PI * f0 * tt) + 0.3 * Math.sin(2 * Math.PI * 2 * f0 * tt)), 0.2);
		}
	}
}

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
fs.writeFileSync(pub('sons.wav'), buf);
execSync(`ffmpeg -loglevel error -y -i ${pub('sons.wav')} -b:a 192k ${pub('sons.mp3')}`);
fs.unlinkSync(pub('sons.wav'));
console.log('ok', ev.fim);
