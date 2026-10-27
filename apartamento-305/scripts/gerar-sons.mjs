// Gera public/eventos.json (momentos das batidas, rangido e apagão, a partir de
// public/narracao-tempos.json) e public/sons.mp3 com tudo sintetizado:
// drone noturno, ambiente de dia, batidas na parede, batidas da Marina,
// rangido do armário e o susto final.
import fs from 'node:fs';
import {execSync} from 'node:child_process';

const pub = (f) => new URL(`../public/${f}`, import.meta.url).pathname;
const {falas, fim} = JSON.parse(fs.readFileSync(pub('narracao-tempos.json')));
const tr = (t0, d = [0.3, 0.75, 1.2]) => d.map((x) => +(t0 + x).toFixed(3));
const ev = {
	batidas1: tr(falas[1].ate),
	batidas2: tr(falas[6].ate),
	marina: tr(falas[8].ate, [0.2, 0.65, 1.1]),
	resposta: tr(falas[10].ate, [0.15, 0.5, 0.85]),
	rangidoDe: falas[12].de,
	rangidoAte: +(falas[12].ate + 1.0).toFixed(3),
	apagao: +(falas[12].ate + 1.2).toFixed(3),
	diaDe: +(falas[3].de - 0.3).toFixed(3),
	diaAte: +(falas[6].de - 0.3).toFixed(3),
	fim: Math.min(60, +(fim + 0.6).toFixed(3)),
};
fs.writeFileSync(pub('eventos.json'), JSON.stringify(ev, null, 1));

const SR = 44100;
const N = Math.ceil(SR * ev.fim);
const L = new Float32Array(N);
const R = new Float32Array(N);
let sd = 11;
const rnd = () => ((sd = (sd * 16807) % 2147483647) / 2147483647) * 2 - 1;
const add = (i, v, pan = 0) => {
	if (i < 0 || i >= N) return;
	L[i] += v * (1 - pan);
	R[i] += v * (1 + pan);
};
const noite = (t) => !(t > ev.diaDe + 0.4 && t < ev.diaAte - 0.4) && t < ev.apagao;

// Drone de noite / ambiente de dia.
let lp = 0;
let lp2 = 0;
for (let i = 0; i < N; i++) {
	const t = i / SR;
	lp += 0.015 * (rnd() - lp);
	lp2 += 0.2 * (rnd() - lp2);
	const resp = 0.65 + 0.35 * Math.sin(2 * Math.PI * 0.1 * t);
	const subida = t > ev.rangidoDe ? 1 + (t - ev.rangidoDe) * 0.4 : 1;
	if (noite(t)) add(i, (0.09 * Math.sin(2 * Math.PI * 49 * t) + 0.05 * Math.sin(2 * Math.PI * 73.4 * t) + 0.22 * lp) * resp * subida * Math.min(1, t / 1.5));
	else if (t < ev.apagao) add(i, 0.02 * lp2 + 0.03 * Math.sin(2 * Math.PI * 60 * t)); // portaria: zumbido leve de lâmpada
}

// Batida em madeira: pancada grave + ruído filtrado curto.
const batida = (t0, vol, pan, grave = 110) => {
	const i0 = Math.floor(t0 * SR);
	let f = 0;
	for (let k = 0; k < SR * 0.25; k++) {
		const t = k / SR;
		f += 0.25 * (rnd() - f);
		add(i0 + k, vol * (Math.exp(-t * 22) * Math.sin(2 * Math.PI * grave * t) * 0.9 + Math.exp(-t * 60) * f * 0.8), pan);
	}
};
ev.batidas1.forEach((t) => batida(t, 0.7, 0.35));
ev.batidas2.forEach((t) => batida(t, 0.8, 0.35));
ev.marina.forEach((t) => batida(t, 0.9, 0.15, 140));
ev.resposta.forEach((t) => batida(t, 0.9, -0.45, 95)); // agora do outro lado (armário)

// Rangido do armário: guincho com frequência oscilando.
for (let i = Math.floor(ev.rangidoDe * SR); i < ev.rangidoAte * SR; i++) {
	const t = i / SR - ev.rangidoDe;
	const dur = ev.rangidoAte - ev.rangidoDe;
	const env = Math.sin(Math.PI * Math.min(1, t / dur)) * 0.9;
	const fr = 380 + 140 * Math.sin(2 * Math.PI * 1.3 * t) + 60 * Math.sin(2 * Math.PI * 9 * t);
	const ph = 2 * Math.PI * fr * t;
	add(i, env * 0.07 * (Math.sin(ph) + 0.5 * Math.sin(2 * ph) + 0.3 * rnd() * (Math.sin(2 * Math.PI * 23 * t) > 0 ? 1 : 0.2)), -0.4);
}

// Susto no apagão.
for (let k = 0; k < SR * 2.4; k++) {
	const t = k / SR;
	const boom = Math.exp(-t * 2.6) * Math.sin(2 * Math.PI * (58 - 22 * t) * t) * 1.0;
	const corda = Math.exp(-t * 1.4) * 0.1 * [880, 932, 1318, 1396].reduce((a, f) => a + Math.sin(2 * Math.PI * f * t), 0);
	add(Math.floor(ev.apagao * SR) + k, boom + corda);
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
console.log(JSON.stringify(ev));
