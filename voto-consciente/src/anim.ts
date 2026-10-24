import React from 'react';
import {Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

// Converte uma fração da cena (0–1) em quadro. Assim, quando a duração da cena
// muda para acompanhar a narração, todas as animações acompanham.
export const useTempoCena = () => {
	const {durationInFrames} = useVideoConfig();
	return (fracao: number) => Math.round(fracao * durationInFrames);
};

// Mola de entrada (0 → 1) que começa no quadro `inicio`.
export const useEntrada = (inicio: number, config = {damping: 14, mass: 0.7}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	return spring({frame: frame - inicio, fps, config});
};

// Progresso linear suavizado entre dois quadros.
export const progresso = (frame: number, de: number, ate: number) =>
	interpolate(frame, [de, ate], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.45, 0, 0.2, 1),
	});

// Opacidade de um bloco que aparece em `de` e some em `ate` (para trocar
// partes dentro da mesma cena).
export const janela = (frame: number, de: number, ate: number, fade = 12) =>
	interpolate(frame, [de, de + fade, ate - fade, ate], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

// Quadro (relativo ao início da cena) em que começa cada legenda da cena.
// Preenchido por Video.tsx a partir dos tempos da narração (ou da estimativa
// do roteiro, quando não há narração).
export const MarcasCena = React.createContext<number[]>([]);

// Retorna m(i, ajuste): quadro em que a i-ésima legenda da cena começa.
// m(i + 0.5) cai no meio do trecho i (útil para palavras no fim da frase).
export const useMarcas = () => {
	const marcas = React.useContext(MarcasCena);
	const {durationInFrames} = useVideoConfig();
	return (i: number, ajuste = 0) => {
		const base = Math.floor(i);
		const fr = i - base;
		const a = marcas[base] ?? 0;
		const b = marcas[base + 1] ?? durationInFrames - 30;
		return Math.round(a + (b - a) * fr + ajuste);
	};
};
