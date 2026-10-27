import React from 'react';
import {AbsoluteFill, Audio, Easing, interpolate, random, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {CANAL, FONTES} from './config';

// Cena-teste de suspense (vertical, 16 s): personagem andando num corredor
// escuro, luz piscando, uma silhueta passando atrás dele, zoom no rosto e
// apagão. Tudo desenhado em SVG; sons e trilha sintetizados.

const FPS = 30;
const s = (seg: number) => Math.round(seg * FPS);
const PISO = 1290;
const PASSO_PX = 110; // avanço por passo (um passo a cada 15 quadros)
const FIM_ANDAR = s(8);

const PELE = '#C99A78';
const MOLETOM = '#3C5A8A';
const CALCA = '#26324A';

// Trechos da narração: [início no áudio, fim no áudio, início no vídeo] (segundos).
const FALAS: {de: number; ate: number; em: number; texto: string}[] = [
	{de: 0.4, ate: 4.45, em: 0.5, texto: 'Era a terceira noite que o Lucas ouvia passos no corredor.'},
	{de: 4.55, ate: 7.1, em: 5.0, texto: 'Ele decidiu ver de onde vinham.'},
	{de: 7.15, ate: 8.66, em: 8.0, texto: 'Então a luz piscou…'},
	{de: 8.66, ate: 10.9, em: 11.0, texto: 'e os passos pararam. Atrás dele.'},
];

// Fator de "andando" (1 andando, 0 parado), com parada suave.
const andando = (f: number) => interpolate(f, [FIM_ANDAR - 12, FIM_ANDAR], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
// Deslocamento do mundo (a câmera acompanha o Lucas).
const deslocamento = (f: number) => {
	const v = (PASSO_PX * 2) / FPS; // px por quadro
	if (f <= FIM_ANDAR - 12) return f * v;
	const base = (FIM_ANDAR - 12) * v;
	const t = Math.min(f, FIM_ANDAR) - (FIM_ANDAR - 12);
	return base + v * (t - (t * t) / 24);
};

// Brilho das lâmpadas: piscadas raras no começo, forte entre 8,6 s e 10,2 s.
const brilho = (f: number) => {
	if (f >= s(13.6)) return 0;
	if (f >= s(8.6) && f < s(10.2)) return random(`p${Math.floor(f / 2)}`) > 0.5 ? 1 : 0.08;
	if ((f > 70 && f < 74) || (f > 160 && f < 163)) return 0.35;
	return 1;
};

export const Corredor: React.FC = () => {
	const frame = useCurrentFrame();
	const x0 = deslocamento(frame);
	const luz = brilho(frame);
	const zoom = interpolate(frame, [s(11), s(13.2)], [1.45, 3.1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)});
	const tremor = frame >= s(12.6) && frame < s(13.6) ? (random(`t${frame}`) - 0.5) * 10 : 0;
	const apagao = frame >= s(13.6);
	const fala = FALAS.find((l) => frame >= s(l.em) && frame <= s(l.em + (l.ate - l.de)) + 8);

	return (
		<AbsoluteFill style={{background: '#05070C', overflow: 'hidden'}}>
			<AbsoluteFill style={{transform: `translate(${tremor}px, ${tremor * 0.6}px) scale(${zoom})`, transformOrigin: '420px 980px'}}>
				{/* Parede e teto */}
				<AbsoluteFill style={{background: 'linear-gradient(#0B0F18 0%, #1A2233 30%, #222C40 70%, #141A26 100%)', filter: `brightness(${0.35 + 0.65 * luz})`}} />
				{/* Portas e lâmpadas (camada do fundo) */}
				<svg width="1080" height="1920" style={{position: 'absolute', inset: 0}}>
					{Array.from({length: 8}).map((_, i) => {
						const x = i * 620 - (x0 % 620) - 200 + Math.floor(x0 / 620) * 0;
						return (
							<g key={i} transform={`translate(${x} 0)`}>
								{/* porta */}
								<rect x="120" y={PISO - 600} width="300" height="600" fill="#2A2018" stroke="#0A0806" strokeWidth="10" />
								<rect x="150" y={PISO - 570} width="240" height="250" fill="none" stroke="#0A0806" strokeWidth="6" opacity="0.6" />
								<rect x="150" y={PISO - 290} width="240" height="250" fill="none" stroke="#0A0806" strokeWidth="6" opacity="0.6" />
								<circle cx="380" cy={PISO - 300} r="10" fill="#8C7A50" />
								<text x="270" y={PISO - 630} textAnchor="middle" fontFamily={FONTES.titulo} fontSize="36" fill="#5C6680">{30 + i + Math.floor(x0 / 620)}</text>
								{/* lâmpada de teto e cone de luz */}
								<rect x="545" y="300" width="70" height="20" fill="#3A4256" />
								<ellipse cx="580" cy="330" rx="40" ry="14" fill="#FFE7A8" opacity={0.2 + 0.8 * luz} />
								<path d={`M545 330 L615 330 L840 ${PISO} L320 ${PISO}Z`} fill="url(#cone)" opacity={0.55 * luz} />
							</g>
						);
					})}
					<defs>
						<linearGradient id="cone" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0" stopColor="#FFE7A8" stopOpacity="0.55" />
							<stop offset="1" stopColor="#FFE7A8" stopOpacity="0.02" />
						</linearGradient>
						<radialGradient id="vinheta" cx="0.45" cy="0.45" r="0.75">
							<stop offset="0.45" stopColor="#000" stopOpacity="0" />
							<stop offset="1" stopColor="#000" stopOpacity="0.85" />
						</radialGradient>
					</defs>
					{/* piso */}
					<rect x="0" y={PISO} width="1080" height={1920 - PISO} fill="#10141D" />
					{Array.from({length: 14}).map((_, i) => {
						const x = i * 160 - (x0 % 160);
						return <line key={i} x1={x} y1={PISO} x2={x - 260} y2="1920" stroke="#1C2230" strokeWidth="6" />;
					})}
					<rect x="0" y={PISO - 8} width="1080" height="16" fill="#0A0D14" />
				</svg>

				{/* Silhueta que passa atrás (9,4 s a 10,4 s), só aparece nos clarões */}
				<Silhueta frame={frame} luz={luz} />

				{/* Lucas */}
				<div style={{position: 'absolute', left: 420, top: PISO, filter: `brightness(${0.3 + 0.7 * luz})`}}>
					<Lucas frame={frame} />
				</div>

				<svg width="1080" height="1920" style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
					<rect width="1080" height="1920" fill="url(#vinheta2)" />
					<defs>
						<radialGradient id="vinheta2" cx="0.42" cy="0.45" r="0.7">
							<stop offset="0.4" stopColor="#000" stopOpacity="0" />
							<stop offset="1" stopColor="#000" stopOpacity="0.9" />
						</radialGradient>
					</defs>
				</svg>
			</AbsoluteFill>

			{/* Apagão + flash vermelho + "continua" */}
			{apagao ? (
				<AbsoluteFill style={{background: frame < s(13.6) + 3 ? '#5A0000' : '#000', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 30}}>
					<div style={{fontFamily: FONTES.titulo, fontSize: 110, color: '#E8E2D4', letterSpacing: 6, opacity: interpolate(frame, [s(14), s(14.5)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>CONTINUA…</div>
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 34, color: '#8A8478', letterSpacing: 4, opacity: interpolate(frame, [s(14.6), s(15)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>{CANAL.nome}</div>
				</AbsoluteFill>
			) : null}

			{/* Legenda */}
			{fala && !apagao ? (
				<div style={{position: 'absolute', top: 1500, left: 70, right: 70, display: 'flex', justifyContent: 'center'}}>
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 58, lineHeight: 1.2, color: '#F2EDE2', textAlign: 'center', textShadow: '0 4px 14px #000, 0 0 4px #000'}}>{fala.texto}</div>
				</div>
			) : null}

			{/* Áudio */}
			<Audio src={staticFile('sons.mp3')} volume={0.8} />
			{FALAS.map((l, i) => (
				<Sequence key={i} from={s(l.em)} durationInFrames={s(l.ate - l.de) + 4}>
					<Audio src={staticFile('narracao.mp3')} startFrom={s(l.de)} endAt={s(l.ate)} />
				</Sequence>
			))}
		</AbsoluteFill>
	);
};

const Lucas: React.FC<{frame: number}> = ({frame}) => {
	const w = andando(frame);
	const fase = (frame / FPS) * 2 * Math.PI;
	const perna = 28 * Math.sin(fase) * w;
	const braco = -24 * Math.sin(fase) * w;
	const bob = -8 * Math.abs(Math.sin(fase)) * w;
	// Cabeça vira para trás (12,6 s) e os olhos arregalam.
	const vira = interpolate(frame, [s(12.6), s(12.9)], [1, -1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const susto = interpolate(frame, [s(12.6), s(12.9)], [1, 1.6], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const respira = frame > FIM_ANDAR ? 3 * Math.sin(frame / 6) : 0;
	const t = {stroke: '#0A0C12', strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
	return (
		<svg width="400" height="640" viewBox="-200 -620 400 640" style={{position: 'absolute', left: -200, top: -620, overflow: 'visible'}}>
			<g transform={`translate(0 ${bob + respira})`}>
				{/* perna e braço de trás */}
				<g transform={`rotate(${-perna} 0 -250)`}>
					<rect x="-24" y="-260" width="48" height="250" rx="20" fill="#1C2538" {...t} />
					<path d="M-26 -14 L46 -14 L46 6 L-26 6Z" fill="#111" {...t} />
				</g>
				<g transform={`rotate(${-braco} 0 -420)`}>
					<rect x="-20" y="-430" width="40" height="190" rx="18" fill="#2C4468" {...t} />
				</g>
				{/* tronco (moletom com capuz) */}
				<path d="M-60 -440 Q0 -470 60 -440 L58 -240 L-58 -240Z" fill={MOLETOM} {...t} />
				<ellipse cx="-14" cy="-500" rx="66" ry="70" fill="#2C4468" {...t} />
				{/* cabeça */}
				<g transform={`translate(4 -500) scale(${vira} 1)`}>
					<circle cx="0" cy="0" r="58" fill={PELE} {...t} />
					<path d="M-58 -6 Q-60 -64 0 -66 Q50 -66 58 -20 Q30 -40 0 -36 Q-30 -30 -58 -6Z" fill="#1A1410" {...t} />
					<ellipse cx="-14" cy="6" rx="12" ry="16" fill={PELE} {...t} />
					<ellipse cx="30" cy="0" rx={9 * susto} ry={12 * susto} fill="#FFFFFF" {...t} strokeWidth={4} />
					<circle cx="33" cy="1" r={5 / susto + 1} fill="#0A0C12" />
					<path d={`M18 ${-22 - 6 * (susto - 1)} L44 ${-26 - 6 * (susto - 1)}`} {...t} strokeWidth={6} />
					<path d={`M28 ${30} q8 ${4 * susto} 16 0`} fill="none" {...t} strokeWidth={4} />
				</g>
				{/* perna e braço da frente */}
				<g transform={`rotate(${perna} 0 -250)`}>
					<rect x="-24" y="-260" width="48" height="250" rx="20" fill={CALCA} {...t} />
					<path d="M-26 -14 L46 -14 L46 6 L-26 6Z" fill="#1A1A1A" {...t} />
				</g>
				<g transform={`rotate(${braco} 0 -420)`}>
					<rect x="-20" y="-430" width="40" height="190" rx="18" fill={MOLETOM} {...t} />
					<circle cx="0" cy="-236" r="18" fill={PELE} {...t} />
				</g>
			</g>
		</svg>
	);
};

const Silhueta: React.FC<{frame: number; luz: number}> = ({frame, luz}) => {
	const p = interpolate(frame, [s(9.4), s(10.4)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	if (p <= 0 || p >= 1) return null;
	const x = 1150 - 1500 * p;
	return (
		<svg width="300" height="760" viewBox="0 0 300 760" style={{position: 'absolute', left: x, top: PISO - 760, opacity: 0.2 + 0.7 * luz, transform: 'scale(0.9)', transformOrigin: 'bottom center'}}>
			<ellipse cx="150" cy="90" rx="62" ry="72" fill="#020305" />
			<path d="M70 170 Q150 140 230 170 L250 470 L210 740 L170 740 L150 520 L130 740 L90 740 L50 470Z" fill="#020305" />
			<path d="M70 180 L20 460 M230 180 L280 460" stroke="#020305" strokeWidth="40" strokeLinecap="round" />
		</svg>
	);
};
