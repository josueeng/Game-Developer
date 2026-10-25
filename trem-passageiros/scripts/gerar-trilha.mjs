// Gera public/trilha.mp3: trilha instrumental simples, sintetizada do zero
// (pads + arpejo suave + pulso leve). Sem nenhuma amostra de terceiros.
// Uso: node scripts/gerar-trilha.mjs [duracaoEmSegundos]
import {execFileSync} from 'node:child_process';
import {writeFileSync, rmSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SR = 44100;
const DUR = Number(process.argv[2] ?? 170);
const BPM = 92;
const beat = 60 / BPM;
const N = Math.floor(SR * DUR);
const L = new Float32Array(N);
const R = new Float32Array(N);

const midi = (m) => 440 * 2 ** ((m - 69) / 12);
// Progressão em Lá menor: Am - F - C - G (cada acorde = 4 tempos)
const acordes = [
	[45, 52, 57, 60, 64],
	[41, 48, 53, 57, 60],
	[48, 55, 60, 64, 67],
	[43, 50, 55, 59, 62],
];
const compasso = beat * 4;

// Gerador pseudoaleatório determinístico
let semente = 202;
const rnd = () => ((semente = (semente * 16807) % 2147483647) / 2147483647);

function soma(buf, i, v) {
	if (i >= 0 && i < N) buf[i] += v;
}

// Pad: senoides levemente desafinadas com ataque/release longos
for (let c = 0; c * compasso < DUR; c++) {
	const acorde = acordes[c % 4];
	const t0 = c * compasso;
	const len = compasso + 1.2;
	for (const nota of acorde) {
		const f = midi(nota);
		for (const det of [-0.12, 0.12]) {
			const ff = f * 2 ** (det / 12);
			const pan = det < 0 ? 0.65 : 0.35;
			const s0 = Math.floor(t0 * SR);
			const n = Math.floor(len * SR);
			for (let k = 0; k < n; k++) {
				const t = k / SR;
				const env = Math.min(1, t / 0.9) * Math.min(1, (len - t) / 1.2);
				const v = env * 0.018 * (Math.sin(2 * Math.PI * ff * t) + 0.25 * Math.sin(4 * Math.PI * ff * t));
				soma(L, s0 + k, v * pan);
				soma(R, s0 + k, v * (1 - pan));
			}
		}
	}
}

// Arpejo: notas curtas tipo "pluck" em colcheias, a partir do compasso 2
const padrao = [2, 3, 4, 3, 1, 3, 4, 2];
for (let c = 1; c * compasso < DUR - 2; c++) {
	const acorde = acordes[c % 4];
	for (let p = 0; p < 8; p++) {
		if (rnd() < 0.12) continue; // pequenas pausas para soar humano
		const nota = acorde[padrao[p]] + 12;
		const f = midi(nota);
		const t0 = c * compasso + p * (beat / 2);
		const s0 = Math.floor(t0 * SR);
		const n = Math.floor(0.9 * SR);
		const pan = 0.3 + 0.4 * rnd();
		for (let k = 0; k < n; k++) {
			const t = k / SR;
			const env = Math.exp(-t * 6) * Math.min(1, t / 0.004);
			const v = env * 0.05 * (Math.sin(2 * Math.PI * f * t) + 0.3 * Math.sin(2 * Math.PI * 2 * f * t) * Math.exp(-t * 10));
			soma(L, s0 + k, v * pan);
			soma(R, s0 + k, v * (1 - pan));
		}
	}
}

// Pulso grave suave no 1º e 3º tempo, a partir do compasso 4
for (let b = 16; b * beat < DUR - 2; b += 2) {
	const s0 = Math.floor(b * beat * SR);
	const n = Math.floor(0.35 * SR);
	for (let k = 0; k < n; k++) {
		const t = k / SR;
		const f = 55 + 40 * Math.exp(-t * 25);
		const v = Math.exp(-t * 9) * 0.09 * Math.sin(2 * Math.PI * f * t);
		soma(L, s0 + k, v);
		soma(R, s0 + k, v);
	}
}

// Fade in/out e normalização
let pico = 0;
for (let i = 0; i < N; i++) {
	const t = i / SR;
	const fade = Math.min(1, t / 2) * Math.min(1, (DUR - t) / 4);
	L[i] *= fade;
	R[i] *= fade;
	pico = Math.max(pico, Math.abs(L[i]), Math.abs(R[i]));
}
const ganho = 0.85 / pico;

const wav = Buffer.alloc(44 + N * 4);
wav.write('RIFF', 0);
wav.writeUInt32LE(36 + N * 4, 4);
wav.write('WAVEfmt ', 8);
wav.writeUInt32LE(16, 16);
wav.writeUInt16LE(1, 20);
wav.writeUInt16LE(2, 22);
wav.writeUInt32LE(SR, 24);
wav.writeUInt32LE(SR * 4, 28);
wav.writeUInt16LE(4, 32);
wav.writeUInt16LE(16, 34);
wav.write('data', 36);
wav.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) {
	wav.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i] * ganho)) * 32767), 44 + i * 4);
	wav.writeInt16LE(Math.round(Math.max(-1, Math.min(1, R[i] * ganho)) * 32767), 46 + i * 4);
}

const tmp = path.join(raiz, 'public', 'trilha.tmp.wav');
const saida = path.join(raiz, 'public', 'trilha.mp3');
writeFileSync(tmp, wav);
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', tmp, '-b:a', '160k', saida]);
rmSync(tmp);
console.log(`Trilha salva em ${saida} (${DUR}s)`);
