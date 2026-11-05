import React from 'react';
import {OSSO} from './Efeitos';

// Ilustrações em recorte (representação artística, nenhuma pessoa real).
const T = {stroke: '#07080C', strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};

// Banheiro de escola: azulejos, espelho (com névoa), pia e porta de cabine.
export const Banheiro: React.FC<{nevoa: number; tremePorta: number; fantasma: number; luz: number}> = ({nevoa, tremePorta, fantasma, luz}) => (
	<svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0, filter: `brightness(${0.25 + 0.75 * luz})`}}>
		<defs>
			<pattern id="azulejo" width="80" height="80" patternUnits="userSpaceOnUse">
				<rect width="80" height="80" fill="#5E7F7A" />
				<rect width="80" height="80" fill="none" stroke="#3E5753" strokeWidth="4" />
			</pattern>
			<radialGradient id="luzTeto" cx="0.5" cy="0" r="0.9">
				<stop offset="0" stopColor="#F4F0D0" stopOpacity="0.5" />
				<stop offset="1" stopColor="#F4F0D0" stopOpacity="0" />
			</radialGradient>
		</defs>
		<rect width="1920" height="1080" fill="url(#azulejo)" />
		<rect y="860" width="1920" height="220" fill="#2C3533" />
		<rect width="1920" height="1080" fill="url(#luzTeto)" />
		{/* espelho */}
		<rect x="560" y="170" width="520" height="440" rx="16" fill="#1A2423" stroke="#9AA6A3" strokeWidth="14" />
		<g opacity={fantasma}>
			<path d="M820 300 Q760 300 755 420 L740 600 L900 600 L885 420 Q880 300 820 300Z" fill="#E7D27A" opacity="0.55" />
			<ellipse cx="820" cy="380" rx="48" ry="60" fill="#D9DCD6" opacity="0.6" />
			<ellipse cx="804" cy="372" rx="9" ry="12" fill="#000" />
			<ellipse cx="836" cy="372" rx="9" ry="12" fill="#000" />
		</g>
		<rect x="560" y="170" width="520" height="440" rx="16" fill="#DDE5E3" opacity={0.55 * nevoa} />
		{/* pia */}
		<path d="M600 660 L1040 660 L1000 740 L640 740Z" fill="#D8DCDA" {...T} />
		<rect x="800" y="610" width="40" height="50" fill="#A5ADAA" {...T} />
		<rect x="790" y="740" width="60" height="120" fill="#A5ADAA" {...T} />
		{/* cabines */}
		<g transform={`translate(${1250 + tremePorta} 0)`}>
			<rect x="0" y="180" width="300" height="680" fill="#8C3B2E" {...T} />
			<rect x="240" y="520" width="24" height="60" rx="6" fill="#C9C1A6" {...T} />
			<text x="150" y="260" textAnchor="middle" fontFamily="Arial" fontWeight="bold" fontSize="38" fill="#E9D9B5">MENINAS</text>
		</g>
		<rect x="1570" y="180" width="300" height="680" fill="#8C3B2E" {...T} />
		<rect x="1240" y="150" width="650" height="34" fill="#5A2A20" {...T} />
	</svg>
);

// Fantasma de vestido branco, cabelo loiro e algodão no nariz (de frente).
export const Fantasma: React.FC<{escala?: number}> = ({escala = 1}) => (
	<svg width={420 * escala} height={760 * escala} viewBox="0 0 420 760">
		<path d="M210 40 Q90 40 85 200 L60 560 L360 560 L335 200 Q330 40 210 40Z" fill="#E8D06A" {...T} />
		<path d="M110 300 L60 740 L360 740 L310 300 Q210 260 110 300Z" fill="#F4F2EC" {...T} />
		<ellipse cx="210" cy="170" rx="88" ry="104" fill="#D6DAD3" {...T} />
		<path d="M122 150 Q150 70 210 70 Q270 70 298 150 Q260 100 210 108 Q160 100 122 150Z" fill="#E8D06A" {...T} />
		<ellipse cx="178" cy="165" rx="16" ry="22" fill="#111" />
		<ellipse cx="242" cy="165" rx="16" ry="22" fill="#111" />
		<circle cx="200" cy="214" r="12" fill="#FFFFFF" {...T} strokeWidth={4} />
		<circle cx="222" cy="214" r="12" fill="#FFFFFF" {...T} strokeWidth={4} />
		<path d="M190 244 Q210 236 230 244" fill="none" {...T} strokeWidth={4} />
	</svg>
);

// Casarão colonial (fachada branca, janelas azuis, telhado).
export const Casarao: React.FC<{largura?: number; noite?: boolean; placa?: string}> = ({largura = 1100, noite, placa}) => (
	<svg width={largura} height={largura * 0.55} viewBox="0 0 1100 600">
		<path d="M30 170 L550 60 L1070 170Z" fill={noite ? '#4A2A1C' : '#A4532E'} {...T} />
		<rect x="60" y="170" width="980" height="420" fill={noite ? '#3A3F52' : '#F2EEE3'} {...T} />
		{Array.from({length: 6}).map((_, i) => (
			<g key={i}>
				<path d={`M${110 + i * 160} 330 L${110 + i * 160} 230 Q${150 + i * 160} 200 ${190 + i * 160} 230 L${190 + i * 160} 330Z`} fill={noite ? (i === 2 ? '#F2C35A' : '#1A2036') : '#2D5FA8'} {...T} />
				{i !== 2 && i !== 3 ? <path d={`M${110 + i * 160} 520 L${110 + i * 160} 420 Q${150 + i * 160} 390 ${190 + i * 160} 420 L${190 + i * 160} 520Z`} fill={noite ? '#1A2036' : '#2D5FA8'} {...T} /> : null}
			</g>
		))}
		<path d="M470 590 L470 420 Q550 360 630 420 L630 590Z" fill={noite ? '#20140C' : '#5C3A1E'} {...T} />
		<rect x="40" y="580" width="1020" height="20" fill="#7C7468" {...T} />
		{placa ? (
			<g>
				<rect x="300" y="350" width="500" height="58" fill="#1E5A36" stroke="#F2EEE3" strokeWidth="6" />
				<text x="550" y="390" textAnchor="middle" fontFamily="Arial" fontWeight="bold" fontSize="26" fill="#F2EEE3">{placa}</text>
			</g>
		) : null}
	</svg>
);

export const Navio: React.FC = () => (
	<svg width="220" height="150" viewBox="0 0 220 150">
		<path d="M10 90 L210 90 L180 140 L40 140Z" fill="#2A1C14" {...T} />
		<rect x="60" y="40" width="30" height="50" fill="#5A4636" {...T} />
		<rect x="120" y="20" width="30" height="70" fill="#5A4636" {...T} />
		<path d="M75 40 q-10 -20 10 -30 M135 20 q-10 -20 10 -30" fill="none" stroke="#BBB" strokeWidth="8" opacity="0.6" />
	</svg>
);

export const Torre: React.FC<{altura?: number}> = ({altura = 520}) => (
	<svg width={altura * 0.5} height={altura} viewBox="0 0 250 500">
		<path d="M125 0 L135 120 L170 300 L240 500 L190 500 Q125 380 60 500 L10 500 L80 300 L115 120Z" fill="#0B0D12" />
		<rect x="75" y="290" width="100" height="16" fill="#0B0D12" />
		<rect x="105" y="115" width="40" height="12" fill="#0B0D12" />
	</svg>
);

export const Trem: React.FC = () => (
	<svg width="1400" height="220" viewBox="0 0 1400 220">
		{[0, 1, 2, 3].map((i) => (
			<g key={i} transform={`translate(${i * 340} 0)`}>
				<rect x="20" y="40" width="310" height="130" rx="10" fill="#14161E" {...T} />
				{[0, 1, 2, 3].map((j) => (
					<rect key={j} x={45 + j * 70} y="70" width="45" height="40" fill={(i + j) % 3 ? '#F2C35A' : '#22263A'} opacity="0.85" />
				))}
				<circle cx="80" cy="180" r="24" fill="#090A0E" {...T} />
				<circle cx="270" cy="180" r="24" fill="#090A0E" {...T} />
			</g>
		))}
	</svg>
);

// Urna de vidro com véu (sem detalhes mórbidos) e velas.
export const Urna: React.FC<{chama: number}> = ({chama}) => (
	<svg width="1000" height="520" viewBox="0 0 1000 520">
		<rect x="140" y="380" width="720" height="40" fill="#2A1A10" {...T} />
		<rect x="180" y="420" width="30" height="100" fill="#2A1A10" {...T} />
		<rect x="790" y="420" width="30" height="100" fill="#2A1A10" {...T} />
		<path d="M240 370 Q500 250 760 370Z" fill="#ECE8DE" opacity="0.85" {...T} />
		<rect x="200" y="200" width="600" height="180" fill="#BFD8E8" opacity="0.18" stroke="#DCEBF3" strokeWidth="6" />
		<path d="M200 200 L800 200 M200 200 L240 160 L760 160 L800 200" fill="none" stroke="#DCEBF3" strokeWidth="5" opacity="0.7" />
		{[90, 910].map((x) => (
			<g key={x}>
				<rect x={x - 16} y="300" width="32" height="120" fill={OSSO} {...T} />
				<ellipse cx={x} cy={290 - 6 * chama} rx={10 + 3 * chama} ry={22 + 6 * chama} fill="#FFC24A" />
				<ellipse cx={x} cy={290} rx="80" ry="80" fill="#FFC24A" opacity="0.12" />
			</g>
		))}
	</svg>
);

// Porta do banheiro abrindo para o escuro.
export const PortaBanheiro: React.FC<{abre: number}> = ({abre}) => (
	<svg width="520" height="820" viewBox="0 0 520 820">
		<rect x="40" y="40" width="440" height="780" fill="#000" stroke="#3A2A1E" strokeWidth="20" />
		<g transform={`translate(480 0) scale(${1 - 0.75 * abre} 1) translate(-480 0)`}>
			<rect x="40" y="40" width="440" height="780" fill="#6E3326" {...T} />
			<text x="260" y="200" textAnchor="middle" fontFamily="Arial" fontWeight="bold" fontSize="48" fill="#E9D9B5">MENINAS</text>
			<circle cx="90" cy="440" r="16" fill="#C9C1A6" {...T} />
		</g>
	</svg>
);

export const Alianca: React.FC<{racha: number}> = ({racha}) => (
	<svg width="360" height="360" viewBox="0 0 360 360">
		<g transform={`translate(${-30 * racha} ${10 * racha}) rotate(${-12 * racha} 180 180)`}>
			<path d="M180 40 A140 140 0 0 0 180 320" fill="none" stroke="#E2B843" strokeWidth="40" />
		</g>
		<g transform={`translate(${30 * racha} ${-10 * racha}) rotate(${12 * racha} 180 180)`}>
			<path d="M180 40 A140 140 0 0 1 180 320" fill="none" stroke="#E2B843" strokeWidth="40" />
		</g>
	</svg>
);

export const Joia: React.FC<{cor: string}> = ({cor}) => (
	<svg width="90" height="90" viewBox="0 0 90 90">
		<path d="M20 30 L70 30 L85 45 L45 85 L5 45Z" fill={cor} {...T} strokeWidth={4} />
		<path d="M5 45 L85 45 M30 30 L45 85 L60 30" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" />
	</svg>
);
