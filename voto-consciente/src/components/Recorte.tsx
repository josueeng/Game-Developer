import React, {useMemo} from 'react';
import {interpolate, random} from 'remotion';
import {CORES} from '../config';
import {useEntrada} from '../anim';

// Borda irregular de papel recortado à mão (polígono com pequenas variações).
const bordaRecortada = (seed: string, intensidade: number) => {
	const pts: string[] = [];
	const passos = 14;
	const j = (k: string) => random(`${seed}-${k}`) * intensidade;
	for (let i = 0; i <= passos; i++) pts.push(`${(i / passos) * 100}% ${j(`t${i}`)}%`);
	for (let i = 0; i <= passos; i++) pts.push(`${100 - j(`r${i}`) * 0.6}% ${(i / passos) * 100}%`);
	for (let i = passos; i >= 0; i--) pts.push(`${(i / passos) * 100}% ${100 - j(`b${i}`)}%`);
	for (let i = passos; i >= 0; i--) pts.push(`${j(`l${i}`) * 0.6}% ${(i / passos) * 100}%`);
	return `polygon(${pts.join(',')})`;
};

type Props = {
	children?: React.ReactNode;
	seed: string;
	inicio?: number; // quadro em que o recorte "cai" na mesa
	cor?: string;
	rotacao?: number;
	intensidade?: number; // quão irregular é a borda (em %)
	padding?: number | string;
	style?: React.CSSProperties;
	sombra?: boolean;
};

export const Recorte: React.FC<Props> = ({
	children,
	seed,
	inicio = 0,
	cor = CORES.papel,
	rotacao = 0,
	intensidade = 1.2,
	padding = 0,
	style,
	sombra = true,
}) => {
	const e = useEntrada(inicio);
	const clip = useMemo(() => bordaRecortada(seed, intensidade), [seed, intensidade]);
	const giroExtra = (random(`${seed}-giro`) - 0.5) * 14;
	return (
		<div
			style={{
				position: 'absolute',
				filter: sombra
					? 'drop-shadow(0px 10px 14px rgba(40,30,15,0.28)) drop-shadow(0px 2px 2px rgba(40,30,15,0.25))'
					: undefined,
				opacity: interpolate(e, [0, 0.25], [0, 1], {extrapolateRight: 'clamp'}),
				transform: `translateY(${interpolate(e, [0, 1], [40, 0])}px) scale(${interpolate(e, [0, 1], [1.15, 1])}) rotate(${rotacao + giroExtra * (1 - e)}deg)`,
				...style,
			}}
		>
			<div style={{background: cor, clipPath: clip, padding, width: '100%', height: '100%', boxSizing: 'border-box'}}>
				{children}
			</div>
		</div>
	);
};
