import React from 'react';
import {noise2D} from '@remotion/noise';

// Cenários noturnos em camadas (paralaxe): céu, lua, morros, árvores, estrada.
const T = {stroke: '#020306', strokeWidth: 4};

export const Floresta: React.FC<{frame: number; avanco?: number; lua?: boolean}> = ({frame, avanco = 0, lua = true}) => {
	const arvores = (n: number, base: number, alt: number, cor: string, desloc: number, seed: string) =>
		Array.from({length: n}).map((_, i) => {
			const x = ((i * (1080 / (n - 2)) - desloc) % (1080 + 400)) - 200 + 1400 * (desloc > 0 ? 0 : 0);
			const h = alt * (0.75 + 0.5 * Math.abs(noise2D(seed, i, 0)));
			const w = h * 0.32;
			return <path key={i} d={`M${x} ${base} L${x + w / 2} ${base - h} L${x + w} ${base}Z`} fill={cor} {...T} />;
		});
	return (
		<svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}>
			<defs>
				<linearGradient id="ceu" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0" stopColor="#03050B" />
					<stop offset="0.6" stopColor="#0E1830" />
					<stop offset="1" stopColor="#1A2238" />
				</linearGradient>
				<radialGradient id="halo" cx="0.5" cy="0.5" r="0.5">
					<stop offset="0" stopColor="#DCE6FF" stopOpacity="0.55" />
					<stop offset="1" stopColor="#DCE6FF" stopOpacity="0" />
				</radialGradient>
			</defs>
			<rect width="1080" height="1920" fill="url(#ceu)" />
			{Array.from({length: 60}).map((_, i) => (
				<circle key={i} cx={(i * 197) % 1080} cy={(i * 131) % 900} r={1.5 + (i % 3)} fill="#fff" opacity={0.25 + 0.35 * Math.abs(noise2D('st', i, frame / 30))} />
			))}
			{lua ? (
				<g>
					<circle cx="760" cy="420" r="260" fill="url(#halo)" />
					<circle cx="760" cy="420" r="96" fill="#E8EDFF" />
					<circle cx="730" cy="400" r="18" fill="#C9D2EE" />
					<circle cx="790" cy="450" r="12" fill="#C9D2EE" />
				</g>
			) : null}
			<path d="M0 1180 Q270 1020 540 1120 T1080 1060 L1080 1920 L0 1920Z" fill="#0B1322" />
			{arvores(10, 1260, 520, '#070C16', avanco * 0.3, 'a1')}
			<path d="M0 1320 L1080 1320 L1080 1920 L0 1920Z" fill="#05080F" />
			<path d={`M440 1320 L640 1320 L1000 1920 L80 1920Z`} fill="#141820" />
			{Array.from({length: 8}).map((_, i) => {
				const p = ((i / 8 + (avanco / 900)) % 1);
				const y = 1330 + 590 * p * p;
				const w = 6 + 24 * p;
				return <rect key={i} x={540 - w / 2} y={y} width={w} height={14 + 60 * p} fill="#C9B46A" opacity={0.7} />;
			})}
			{arvores(7, 1500, 900, '#02040A', avanco * 0.9, 'a2')}
		</svg>
	);
};
