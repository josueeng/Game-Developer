import React from 'react';

// Personagem em recorte, de perfil, olhando para a direita (use `lado={-1}`
// para a esquerda). Origem (0,0) nos pés. Altura ~640 px.
export type PessoaProps = {
	pele?: string;
	roupa?: string;
	roupa2?: string;
	calca?: string;
	cabelo?: 'longo' | 'bone';
	corCabelo?: string;
	bigode?: boolean;
	lado?: 1 | -1;
	vira?: number; // 1 = olha para frente do corpo, -1 = vira a cabeça para trás
	susto?: number; // 1 normal, >1 olhos arregalados
	inclina?: number; // graus de inclinação da cabeça
	bracoFrente?: number; // graus (0 = para baixo, negativo = para frente)
	bracoTras?: number;
	pernas?: number; // abertura das pernas (passo), graus
	olhosFechados?: boolean;
	semPernas?: boolean;
};

const T = {stroke: '#0A0C12', strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};

export const Cabeca: React.FC<Pick<PessoaProps, 'pele' | 'cabelo' | 'corCabelo' | 'bigode' | 'susto' | 'olhosFechados'>> = ({
	pele = '#D8A884',
	cabelo = 'longo',
	corCabelo = '#2A1A12',
	bigode,
	susto = 1,
	olhosFechados,
}) => (
	<g>
		{cabelo === 'longo' ? <path d="M-62 -10 Q-70 -70 0 -70 Q60 -68 60 -10 L52 40 Q20 10 -10 -20 Q-30 30 -20 120 Q-70 100 -62 -10Z" fill={corCabelo} {...T} /> : null}
		<circle cx="0" cy="0" r="58" fill={pele} {...T} />
		{cabelo === 'longo' ? <path d="M-58 -10 Q-56 -64 2 -66 Q52 -64 58 -24 Q20 -44 -10 -30 Q-30 -20 -58 -10Z" fill={corCabelo} {...T} /> : null}
		{cabelo === 'bone' ? (
			<>
				<path d="M-60 -10 Q-58 -70 4 -70 Q56 -66 60 -14Z" fill="#2D4F7A" {...T} />
				<path d="M40 -18 L96 -10 L92 -2 L40 -6Z" fill="#2D4F7A" {...T} />
				<path d="M-58 0 Q-62 30 -46 44" fill="none" stroke="#9A9A9A" strokeWidth="14" />
			</>
		) : null}
		<ellipse cx="-14" cy="8" rx="11" ry="15" fill={pele} {...T} />
		{olhosFechados ? (
			<path d="M20 2 q10 6 20 0" fill="none" {...T} strokeWidth={5} />
		) : (
			<>
				<ellipse cx="30" cy="0" rx={9 * susto} ry={12 * susto} fill="#FFFFFF" {...T} strokeWidth={4} />
				<circle cx="33" cy="1" r={5 / susto + 1} fill="#0A0C12" />
			</>
		)}
		<path d={`M18 ${-22 - 6 * (susto - 1)} L44 ${-26 - 6 * (susto - 1)}`} {...T} strokeWidth={6} />
		{bigode ? <path d="M28 26 q14 -8 26 4 q-14 4 -26 -4Z" fill="#9A9A9A" {...T} strokeWidth={3} /> : null}
		<path d={`M30 34 q8 ${4 * susto} 14 0`} fill="none" {...T} strokeWidth={4} />
	</g>
);

export const Pessoa: React.FC<PessoaProps> = (p) => (
	<svg width="400" height="680" viewBox="-200 -660 400 680" style={{position: 'absolute', left: -200, top: -660, overflow: 'visible'}}>
		<Corpo {...p} />
	</svg>
);

// Mesmo personagem como <g>, para usar dentro de outro SVG.
export const Corpo: React.FC<PessoaProps> = (p) => {
	const {roupa = '#7A4E8C', roupa2 = '#5E3A6E', calca = '#2E2A3A', pele = '#D8A884', lado = 1, vira = 1, inclina = 0, bracoFrente = 0, bracoTras = 0, pernas = 0, semPernas} = p;
	return (
			<g transform={`scale(${lado} 1)`}>
				{semPernas ? null : (
					<g transform={`rotate(${-pernas} 0 -250)`}>
						<rect x="-24" y="-260" width="48" height="250" rx="20" fill={calca} {...T} />
						<path d="M-26 -14 L46 -14 L46 6 L-26 6Z" fill="#151515" {...T} />
					</g>
				)}
				<g transform={`rotate(${bracoTras} 0 -420)`}>
					<rect x="-20" y="-430" width="40" height="190" rx="18" fill={roupa2} {...T} />
				</g>
				<path d="M-58 -440 Q0 -470 58 -440 L56 -240 L-56 -240Z" fill={roupa} {...T} />
				<g transform={`translate(4 -505) rotate(${inclina}) scale(${vira} 1)`}>
					<Cabeca {...p} pele={pele} />
				</g>
				{semPernas ? null : (
					<g transform={`rotate(${pernas} 0 -250)`}>
						<rect x="-24" y="-260" width="48" height="250" rx="20" fill={calca} {...T} />
						<path d="M-26 -14 L46 -14 L46 6 L-26 6Z" fill="#1E1E1E" {...T} />
					</g>
				)}
				<g transform={`rotate(${bracoFrente} 0 -420)`}>
					<rect x="-20" y="-430" width="40" height="190" rx="18" fill={roupa} {...T} />
					<circle cx="0" cy="-236" r="18" fill={pele} {...T} />
				</g>
			</g>
	);
};
