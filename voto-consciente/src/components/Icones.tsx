import React from 'react';
import {CORES} from '../config';

// Ícones simples desenhados à mão em SVG (sem bibliotecas de terceiros).
type P = {tamanho?: number; cor?: string};
const traco = {stroke: CORES.preto, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};

export const IconeSaude: React.FC<P> = ({tamanho = 120, cor = CORES.azul}) => (
	<svg width={tamanho} height={tamanho} viewBox="0 0 100 100">
		<path d="M37 12h26v25h25v26H63v25H37V63H12V37h25z" fill={cor} {...traco} />
	</svg>
);

export const IconeEducacao: React.FC<P> = ({tamanho = 120, cor = CORES.amarelo}) => (
	<svg width={tamanho} height={tamanho} viewBox="0 0 100 100">
		<path d="M50 26 C38 18 22 18 10 22 V82 C22 78 38 78 50 86 C62 78 78 78 90 82 V22 C78 18 62 18 50 26Z" fill={cor} {...traco} />
		<path d="M50 26 V86" {...traco} fill="none" />
	</svg>
);

export const IconeSeguranca: React.FC<P> = ({tamanho = 120, cor = CORES.azul}) => (
	<svg width={tamanho} height={tamanho} viewBox="0 0 100 100">
		<path d="M50 8 L86 22 V48 C86 70 70 84 50 92 C30 84 14 70 14 48 V22Z" fill={cor} {...traco} />
		<path d="M34 50 L46 62 L68 38" fill="none" {...traco} stroke={CORES.papel} strokeWidth={8} />
	</svg>
);

export const IconeOrcamento: React.FC<P> = ({tamanho = 120, cor = CORES.amarelo}) => (
	<svg width={tamanho} height={tamanho} viewBox="0 0 100 100">
		{[70, 56, 42].map((y) => (
			<g key={y}>
				<ellipse cx="44" cy={y + 10} rx="30" ry="10" fill={cor} {...traco} />
				<rect x="14" y={y} width="60" height="10" fill={cor} stroke="none" />
				<path d={`M14 ${y} v10 M74 ${y} v10`} {...traco} />
				<ellipse cx="44" cy={y} rx="30" ry="10" fill={cor} {...traco} />
			</g>
		))}
		<circle cx="74" cy="30" r="20" fill={CORES.papel} {...traco} />
		<text x="74" y="39" textAnchor="middle" fontFamily="Archivo Black" fontSize="24" fill={CORES.preto}>R$</text>
	</svg>
);

export const IconeCheck: React.FC<P & {progresso?: number}> = ({tamanho = 48, cor = CORES.azul, progresso = 1}) => (
	<svg width={tamanho} height={tamanho} viewBox="0 0 50 50">
		<rect x="4" y="4" width="42" height="42" rx="6" fill={CORES.papel} {...traco} strokeWidth={4} />
		<path d="M12 26 L21 35 L39 14" fill="none" stroke={cor} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - progresso} />
	</svg>
);

export const IconeX: React.FC<P> = ({tamanho = 48, cor = CORES.preto}) => (
	<svg width={tamanho} height={tamanho} viewBox="0 0 50 50">
		<path d="M12 12 L38 38 M38 12 L12 38" stroke={cor} strokeWidth={8} strokeLinecap="round" />
	</svg>
);

// Silhueta genérica de pessoa (cabeça + ombros).
export const Pessoa: React.FC<P> = ({tamanho = 80, cor = CORES.azul}) => (
	<svg width={tamanho} height={tamanho * 1.2} viewBox="0 0 100 120">
		<circle cx="50" cy="34" r="22" fill={cor} {...traco} strokeWidth={5} />
		<path d="M10 116 C10 80 28 64 50 64 C72 64 90 80 90 116Z" fill={cor} {...traco} strokeWidth={5} />
	</svg>
);
