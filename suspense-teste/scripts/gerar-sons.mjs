// Gera public/sons.mp3: drone grave, passos do Lucas, passos de "alguém" atrás,
// zumbido da lâmpada piscando e o susto final. Tudo sintetizado (sem samples).
import fs from 'node:fs';
import {execSync} from 'node:child_process';

const SR = 44100;
const DUR = 16;
const N = SR * DUR;
const L = new Float32Array(N);
const R = new Float32Array(N);
let s = 7;
const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647) * 2 - 1;
const add = (i, v, pan = 0) => {
	if (i < 0 || i >= N) return;
	L[i] += v * (1 - pan);
	R[i] += v * (1 + pan);
};

// Drone: duas senoides graves com respiração lenta + ruído filtrado.
let lp = 0;
for (let i = 0; i < N; i++) {
	const t = i / SR;
	const resp = 0.6 + 0.4 * Math.sin(2 * Math.PI * 0.12 * t);
	const ate = t < 13.6 ? 1 : 0.15;
	lp += 0.02 * (rnd() - lp);
	const v = (0.10 * Math.sin(2 * Math.PI * 55 * t) + 0.06 * Math.sin(2 * Math.PI * 82.4 * t + 1) + 0.25 * lp) * resp * ate * Math.min(1, t / 1.5);
	add(i, v);
}

// Passo: batida grave curta + estalo.
const passo = (t0, vol, pan) => {
	const i0 = Math.floor(t0 * SR);
	let f = 0;
	for (let k = 0; k < SR * 0.18; k++) {
		const t = k / SR;
		const env = Math.exp(-t * 28);
		f += 0.3 * (rnd() - f);
		add(i0 + k, vol * env * (0.7 * Math.sin(2 * Math.PI * 90 * t) + 0.5 * f), pan);
	}
};
for (let t = 0.3; t < 7.9; t += 0.5) passo(t, 0.55, 0.1); // Lucas
for (let t = 1.55; t < 10.7; t += 0.5) passo(t, 0.12 + 0.3 * ((t - 1.55) / 9), -0.3); // alguém atrás, cada vez mais perto

// Zumbido da lâmpada piscando (8,6 a 10,2 s), em rajadas.
for (let i = Math.floor(8.6 * SR); i < 10.2 * SR; i++) {
	const t = i / SR;
	const on = Math.sin(2 * Math.PI * 7 * t) > 0.2 ? 1 : 0;
	add(i, on * 0.08 * Math.sign(Math.sin(2 * Math.PI * 120 * t)), 0.2);
}

// Susto (13,6 s): pancada grave + acorde dissonante agudo.
for (let k = 0; k < SR * 2.2; k++) {
	const t = k / SR;
	const i = Math.floor(13.6 * SR) + k;
	const boom = Math.exp(-t * 3) * Math.sin(2 * Math.PI * (60 - 25 * t) * t) * 0.9;
	const grito = Math.exp(-t * 1.6) * 0.12 * [1046, 1108, 1568, 1661].reduce((a, f) => a + Math.sin(2 * Math.PI * f * t), 0);
	add(i, boom + grito);
}

// Normaliza e grava WAV 16-bit.
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
const wav = new URL('../public/sons.wav', import.meta.url).pathname;
fs.writeFileSync(wav, buf);
execSync(`ffmpeg -loglevel error -y -i ${wav} -b:a 192k ${wav.replace('.wav', '.mp3')}`);
fs.unlinkSync(wav);
console.log('public/sons.mp3');
