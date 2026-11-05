import React from 'react';
import {AbsoluteFill, random} from 'remotion';
import {noise2D} from '@remotion/noise';
import {Floresta} from './Cenarios';
import {Banheiro, Casarao, Torre} from '../Desenhos';
import {MapaBrasil} from '../components/MapaBrasil';
import {COR, FONTE} from './Vertical';

// Cenários verticais (1080x1920). Conteúdo importante entre y 250 e 1150.
const T = {stroke: '#020306', strokeWidth: 5, strokeLinejoin: 'round' as const};
export type FundoProps = {frame: number; t: number; extra?: Record<string, unknown>};

const Ceu: React.FC<{frame: number; lua?: boolean; cor2?: string}> = ({frame, lua = true, cor2 = '#14203A'}) => (
	<>
		<defs>
			<linearGradient id="ceuN" x1="0" y1="0" x2="0" y2="1">
				<stop offset="0" stopColor="#03050B" />
				<stop offset="1" stopColor={cor2} />
			</linearGradient>
			<radialGradient id="haloN" cx="0.5" cy="0.5" r="0.5">
				<stop offset="0" stopColor="#DCE6FF" stopOpacity="0.5" />
				<stop offset="1" stopColor="#DCE6FF" stopOpacity="0" />
			</radialGradient>
		</defs>
		<rect width="1080" height="1920" fill="url(#ceuN)" />
		{Array.from({length: 50}).map((_, i) => (
			<circle key={i} cx={(i * 197) % 1080} cy={(i * 131) % 800} r={1.5 + (i % 3)} fill="#fff" opacity={0.2 + 0.35 * Math.abs(noise2D('st', i, frame / 30))} />
		))}
		{lua ? (
			<>
				<circle cx="800" cy="360" r="230" fill="url(#haloN)" />
				<circle cx="800" cy="360" r="84" fill="#E8EDFF" />
			</>
		) : null}
	</>
);

const Chuva: React.FC<{frame: number; forca?: number}> = ({frame, forca = 1}) => (
	<svg width="1080" height="1920" style={{position: 'absolute', inset: 0}}>
		{Array.from({length: 120}).map((_, i) => {
			const x = (random(`cx${i}`) * 1300 + frame * 6) % 1300 - 110;
			const y = (random(`cy${i}`) * 1920 + frame * 48) % 1920;
			return <line key={i} x1={x} y1={y} x2={x - 10} y2={y + 46} stroke="#9FB2D8" strokeWidth="2" opacity={0.35 * forca} />;
		})}
	</svg>
);

export const fundos: Record<string, React.FC<FundoProps>> = {
	preto: () => <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 42%, #1A1714 0%, #050404 75%)'}} />,
	floresta: ({frame}) => <Floresta frame={frame} avanco={frame * 2} />,
	estrada: ({frame}) => <Floresta frame={frame} avanco={frame * 9} />,
	casaNoite: ({frame}) => (
		<svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}>
			<Ceu frame={frame} />
			<path d="M0 1250 Q540 1150 1080 1250 L1080 1920 L0 1920Z" fill="#070B14" />
			<path d="M200 760 L540 520 L880 760Z" fill="#1E1410" {...T} />
			<rect x="250" y="760" width="580" height="520" fill="#2A2420" {...T} />
			<rect x="320" y="840" width="150" height="170" fill={random(`j${Math.floor(frame / 50)}`) > 0.1 ? '#F2C35A' : '#5A4A2A'} {...T} />
			<line x1="395" y1="840" x2="395" y2="1010" stroke="#020306" strokeWidth="6" />
			<rect x="610" y="840" width="150" height="170" fill="#141A2A" {...T} />
			<rect x="480" y="1060" width="120" height="220" fill="#140E0A" {...T} />
			<path d="M320 1010 L180 1280 L600 1280 L470 1010Z" fill="#F2C35A" opacity="0.08" />
			{Array.from({length: 6}).map((_, i) => (
				<path key={i} d={`M${i * 200 - 40} 1320 L${i * 200 + 40} ${980 - 60 * (i % 2)} L${i * 200 + 120} 1320Z`} fill="#02040A" {...T} />
			))}
		</svg>
	),
	cemiterio: ({frame}) => (
		<svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}>
			<Ceu frame={frame} />
			<path d="M0 1150 Q300 1080 540 1130 T1080 1100 L1080 1920 L0 1920Z" fill="#0A0F18" />
			{[120, 300, 760, 940].map((x, i) => (
				<g key={x} transform={`translate(${x} ${1130 + (i % 2) * 40})`}>
					<rect x="-14" y="-170" width="28" height="200" fill="#3A3F48" {...T} />
					<rect x="-70" y="-130" width="140" height="28" fill="#3A3F48" {...T} />
				</g>
			))}
			<path d="M380 1300 Q540 1250 700 1300 L720 1380 L360 1380Z" fill="#2A1E14" {...T} />
			<rect x="0" y="1380" width="1080" height="540" fill="#05070C" />
			<path d="M60 1000 Q90 700 40 520 M60 820 L-20 760 M70 740 L150 680" fill="none" stroke="#02040A" strokeWidth="18" strokeLinecap="round" />
		</svg>
	),
	terreno: ({frame}) => (
		<AbsoluteFill>
			<svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}>
				<Ceu frame={frame} lua={false} cor2="#1E2230" />
				<rect x="0" y="900" width="1080" height="300" fill="#3A3530" {...T} />
				{Array.from({length: 9}).map((_, i) => (
					<line key={i} x1={i * 130} y1="900" x2={i * 130} y2="1200" stroke="#2A2622" strokeWidth="4" />
				))}
				<rect x="820" y="620" width="18" height="580" fill="#2A2A30" />
				<circle cx="829" cy="610" r="22" fill="#FFE7A8" opacity={0.6 + 0.4 * (random(`p${Math.floor(frame / 4)}`) > 0.15 ? 1 : 0)} />
				<path d="M829 620 L700 1200 L960 1200Z" fill="#FFE7A8" opacity="0.07" />
				<rect x="0" y="1200" width="1080" height="720" fill="#14170F" />
				{Array.from({length: 70}).map((_, i) => {
					const x = random(`m${i}`) * 1080;
					const h = 40 + random(`h${i}`) * 110;
					const sway = 8 * noise2D('mt', i, frame / 40);
					return <path key={i} d={`M${x} 1260 Q${x + sway} ${1260 - h / 2} ${x + sway * 2} ${1260 - h}`} stroke="#1F2616" strokeWidth="7" fill="none" />;
				})}
			</svg>
			<Chuva frame={frame} />
		</AbsoluteFill>
	),
	rua: ({frame}) => (
		<svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}>
			<defs>
				<linearGradient id="tarde" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0" stopColor="#1B1430" />
					<stop offset="0.55" stopColor="#7A3A2A" />
					<stop offset="1" stopColor="#D88A4A" />
				</linearGradient>
			</defs>
			<rect width="1080" height="1300" fill="url(#tarde)" />
			{[0, 260, 520, 780].map((x, i) => (
				<g key={x}>
					<path d={`M${x - 10} ${820 + (i % 2) * 40} L${x + 125} ${700 + (i % 2) * 40} L${x + 270} ${820 + (i % 2) * 40}Z`} fill="#2A1712" {...T} />
					<rect x={x} y={820 + (i % 2) * 40} width="260" height={480 - (i % 2) * 40} fill={['#5A3A30', '#4A3A4A', '#5A4A30', '#3A3A4A'][i]} {...T} />
					<rect x={x + 40} y={900} width="70" height="90" fill={i === 2 ? '#F2C35A' : '#1A1418'} {...T} />
					<rect x={x + 150} y={1100} width="70" height="200" fill="#1A120E" {...T} />
				</g>
			))}
			<rect x="0" y="1300" width="1080" height="620" fill="#3A2C22" />
			{Array.from({length: 20}).map((_, i) => (
				<ellipse key={i} cx={(i * 211) % 1080} cy={1360 + ((i * 97) % 500)} rx="40" ry="10" fill="#2E2219" />
			))}
		</svg>
	),
	carro: ({frame}) => (
		<svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}>
			<rect width="1080" height="1920" fill="#04060A" />
			<path d="M140 520 L940 520 L1040 1240 L40 1240Z" fill="#0E1626" />
			<path d={`M440 1240 L640 1240 L560 760 L520 760Z`} fill="#20242C" />
			{Array.from({length: 6}).map((_, i) => {
				const p = ((i / 6 + frame / 60) % 1);
				const y = 770 + 470 * p * p;
				return <rect key={i} x={538 - 2 - 10 * p} y={y} width={4 + 20 * p} height={10 + 40 * p} fill="#C9B46A" opacity="0.8" />;
			})}
			<path d="M440 1240 L640 1240 L560 760 L520 760Z" fill="#FFE7A8" opacity="0.08" />
			<path d="M0 0 L1080 0 L1080 520 L940 520 L140 520 L0 520Z" fill="#090B10" />
			<path d="M0 1240 L1080 1240 L1080 1920 L0 1920Z" fill="#0A0C12" />
			<path d="M0 1240 Q540 1180 1080 1240" fill="none" stroke="#1A1E28" strokeWidth="30" />
			<circle cx="300" cy="1500" r="230" fill="none" stroke="#151A24" strokeWidth="46" />
		</svg>
	),
	banheiro: ({frame, extra}) => {
		const luz = random(`lb${Math.floor(frame / 3)}`) > 0.85 ? 0.3 : 1;
		return (
			<AbsoluteFill style={{background: '#000'}}>
				<div style={{position: 'absolute', left: -895, top: 30, width: 1920, height: 1080, transform: 'scale(1.75)', transformOrigin: '0 0'}}>
					<Banheiro nevoa={(extra?.nevoa as number) ?? 0.5} tremePorta={(extra?.treme as number) ?? 0} fantasma={(extra?.fantasma as number) ?? 0} luz={luz} />
				</div>
			</AbsoluteFill>
		);
	},
	paris: ({frame}) => (
		<AbsoluteFill>
			<svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}>
				<Ceu frame={frame} cor2="#1A1F38" />
			</svg>
			<div style={{position: 'absolute', left: 560, top: 620}}>
				<Torre altura={700} />
			</div>
			<div style={{position: 'absolute', left: 0, right: 0, top: 1280, bottom: 0, background: '#05060A'}} />
		</AbsoluteFill>
	),
	escola: ({frame}) => (
		<AbsoluteFill style={{background: 'linear-gradient(#0A1020, #1E2A44)'}}>
			<svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}>
				<Ceu frame={frame} />
			</svg>
			<div style={{position: 'absolute', left: 40, top: 700}}>
				<Casarao largura={1000} noite placa="ESCOLA" />
			</div>
			<div style={{position: 'absolute', left: 0, right: 0, top: 1250, bottom: 0, background: '#06080E'}} />
		</AbsoluteFill>
	),
	mapa: ({extra}) => {
		const ufs = (extra?.ufs as string[]) ?? [];
		return (
			<AbsoluteFill style={{background: '#0B0E14'}}>
				<div style={{position: 'absolute', left: 90, top: 300}}>
					<MapaBrasil largura={900} altura={900} inicio={-100} destaques={ufs.map((uf) => ({uf, cor: COR.sangue, inicio: -100}))} corBase="#1A1F2A" />
				</div>
				{extra?.mundo ? <div style={{position: 'absolute', left: 0, right: 0, top: 230, textAlign: 'center', fontFamily: FONTE.impacto, fontSize: 70, color: COR.osso, textShadow: '0 6px 0 #000'}}>NOTÍCIA NO MUNDO INTEIRO</div> : null}
			</AbsoluteFill>
		);
	},
	quarto: ({frame, extra}) => {
		const escuro = extra?.escuro as boolean;
		return (
			<svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0, filter: escuro ? 'brightness(0.55)' : undefined}}>
				<rect width="1080" height="1400" fill="#141C34" />
				<rect x="600" y="380" width="300" height="380" fill="#0E1426" stroke="#05070D" strokeWidth="14" />
				<circle cx="800" cy="470" r="38" fill="#E6ECFF" />
				<line x1="750" y1="380" x2="750" y2="760" stroke="#05070D" strokeWidth="10" />
				<line x1="600" y1="570" x2="900" y2="570" stroke="#05070D" strokeWidth="10" />
				<path d="M600 760 L900 760 L1000 1400 L520 1400Z" fill="#B9C8F0" opacity="0.06" />
				<rect y="1400" width="1080" height="520" fill="#160F0B" />
				{Array.from({length: 8}).map((_, i) => (
					<line key={i} x1={i * 160} y1="1400" x2={i * 160 - 200} y2="1920" stroke="#24180F" strokeWidth="6" />
				))}
				<rect x="560" y="1150" width="480" height="90" fill="#3B2A1C" {...T} />
				<rect x="560" y="1240" width="20" height="160" fill="#2B1D12" />
				<rect x="1020" y="1240" width="20" height="160" fill="#2B1D12" />
				<path d="M570 1150 Q800 1100 1030 1150 L1030 1190 L570 1190Z" fill="#4E5E86" {...T} />
			</svg>
		);
	},
	portaria: () => (
		<svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}>
			<rect width="1080" height="1400" fill="#E3D2AE" />
			<rect y="1400" width="1080" height="520" fill="#B88A58" />
			<rect x="120" y="400" width="340" height="420" fill="#BFD7EA" stroke="#5A4630" strokeWidth="12" />
			<text x="290" y="350" textAnchor="middle" fontFamily="Arial" fontWeight="bold" fontSize="48" fill="#5A4630">PORTARIA</text>
			<rect x="560" y="520" width="400" height="320" fill="#7A5634" stroke="#3D2A18" strokeWidth="10" />
			{['301', '302', '303', '304', '305', '306'].map((n, i) => (
				<g key={n}>
					<text x={630 + (i % 3) * 130} y={580 + Math.floor(i / 3) * 140} textAnchor="middle" fontFamily="Arial" fontWeight="bold" fontSize="26" fill="#F2E3C4">{n}</text>
					<circle cx={630 + (i % 3) * 130} cy={630 + Math.floor(i / 3) * 140} r="16" fill="none" stroke={n === '305' ? '#8C8470' : '#D8B44A'} strokeWidth="8" />
				</g>
			))}
			<rect x="80" y="1080" width="920" height="320" fill="#8A5E36" stroke="#3D2A18" strokeWidth="10" />
			<rect x="60" y="1050" width="960" height="44" fill="#6E4826" stroke="#3D2A18" strokeWidth="8" />
		</svg>
	),
	porta: ({frame}) => (
		<svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}>
			<rect width="1080" height="1920" fill="#0C0F1A" />
			<rect x="270" y="380" width="540" height="1020" fill="#3A2716" stroke="#05070D" strokeWidth="16" />
			<rect x="320" y="440" width="440" height="380" fill="none" stroke="#2A1C10" strokeWidth="10" />
			<rect x="320" y="880" width="440" height="460" fill="none" stroke="#2A1C10" strokeWidth="10" />
			<circle cx="740" cy="900" r="18" fill="#9C8452" />
			<circle cx="540" cy="560" r="16" fill="#000" stroke="#9C8452" strokeWidth="5" />
			<rect x="270" y="1390" width="540" height="14" fill="#F2C35A" opacity={0.35 + 0.25 * Math.abs(noise2D('fr', frame / 20, 0))} />
			<rect y="1404" width="1080" height="516" fill="#160F0B" />
		</svg>
	),
};
