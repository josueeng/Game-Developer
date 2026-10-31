// Sons da vitrine (12 s): drone, sussurro de vento, impacto no punch, glitch,
// digitação da ficha e carimbo. Tudo sintetizado.
import fs from 'node:fs';
import {execSync} from 'node:child_process';
const pub = (f) => new URL(`../public/${f}`, import.meta.url).pathname;
const SR = 44100, DUR = 12, N = SR * DUR;
const L = new Float32Array(N), R = new Float32Array(N);
let sd = 5;
const rnd = () => ((sd = (sd * 16807) % 2147483647) / 2147483647) * 2 - 1;
const add = (i, v, p = 0) => { if (i >= 0 && i < N) { L[i] += v * (1 - p); R[i] += v * (1 + p); } };
let lp = 0, vento = 0;
for (let i = 0; i < N; i++) {
	const t = i / SR;
	lp += 0.012 * (rnd() - lp);
	vento += (0.02 + 0.02 * Math.sin(t * 0.7)) * (rnd() - vento);
	const fade = Math.min(1, t / 0.4) * Math.min(1, (DUR - t) / 0.5);
	add(i, (0.09 * Math.sin(2 * Math.PI * 46 * t) + 0.05 * Math.sin(2 * Math.PI * 69 * t) + 0.2 * lp + 0.25 * vento * (0.5 + 0.5 * Math.sin(t * 1.3))) * fade, Math.sin(t * 0.5) * 0.4);
}
// impacto + sub-drop no punch (5 s)
for (let k = 0; k < SR * 2; k++) {
	const t = k / SR; let ph = 2 * Math.PI * (70 - 40 * Math.min(1, t / 1.4)) * t;
	add(Math.floor(5 * SR) + k, Math.exp(-t * 1.8) * Math.sin(ph) * 0.9 + Math.exp(-t * 30) * rnd() * 0.6);
}
// riser antes do punch
for (let k = 0; k < SR * 1.6; k++) { const p = k / (SR * 1.6); add(Math.floor(3.4 * SR) + k, p * p * 0.3 * rnd()); }
// glitch (5,7 s)
for (let k = 0; k < SR * 0.9; k++) { const t = k / SR; add(Math.floor(5.67 * SR) + k, (Math.sin(2 * Math.PI * 1200 * t) > 0 ? 0.08 : -0.08) * (Math.sin(t * 60) > 0.3 ? 1 : 0)); }
// digitação da ficha (7 s em diante, 2 quadros por letra)
const letras = 'ARQUIVONº01LOCAL??????STATUSSEMEXPLICAÇÃO'.length;
for (let c = 0; c < letras; c++) { const i0 = Math.floor((7 + (c * 2) / 30) * SR); for (let k = 0; k < SR * 0.04; k++) add(i0 + k, 0.3 * Math.exp(-(k / SR) * 160) * rnd(), 0.1); }
// carimbo
const tc = 7 + (letras * 2 + 16) / 30;
for (let k = 0; k < SR * 0.4; k++) { const t = k / SR; add(Math.floor(tc * SR) + k, 0.8 * Math.exp(-t * 18) * Math.sin(2 * Math.PI * 90 * t) + 0.3 * Math.exp(-t * 50) * rnd()); }
let pico = 0; for (let i = 0; i < N; i++) pico = Math.max(pico, Math.abs(L[i]), Math.abs(R[i]));
const buf = Buffer.alloc(44 + N * 4);
buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVEfmt ', 8); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write('data', 36); buf.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) { buf.writeInt16LE(Math.round((L[i] / pico) * 0.9 * 32767), 44 + i * 4); buf.writeInt16LE(Math.round((R[i] / pico) * 0.9 * 32767), 46 + i * 4); }
fs.writeFileSync(pub('vitrine.wav'), buf);
execSync(`ffmpeg -loglevel error -y -i ${pub('vitrine.wav')} -b:a 192k ${pub('vitrine.mp3')}`);
fs.unlinkSync(pub('vitrine.wav'));
console.log('ok');
