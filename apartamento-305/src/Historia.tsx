import React from 'react';
import {AbsoluteFill, Audio, Easing, interpolate, random, staticFile, useCurrentFrame} from 'remotion';
import {CANAL, FONTES} from './config';
import {Corpo} from './Pessoa';

// "O apartamento 305": Short de suspense (ficção). Tempos vêm da narração
// (public/narracao-tempos.json) e dos eventos de som (public/eventos.json).

export type Fala = {de: number; ate: number};
export type Eventos = {
	batidas1: number[];
	batidas2: number[];
	marina: number[];
	resposta: number[];
	rangidoDe: number;
	rangidoAte: number;
	apagao: number;
	diaDe: number;
	diaAte: number;
	fim: number;
};
export type HistoriaProps = {falas: Fala[]; ev: Eventos};

const FPS = 30;
const q = (seg: number) => Math.round(seg * FPS);
const PISO = 1350;
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const lerp = (f: number, de: number, ate: number, a: number, b: number, easing = Easing.inOut(Easing.cubic)) => interpolate(f, [q(de), q(ate)], [a, b], {...clamp, easing});

export const LEGENDAS = [
	'Toda noite, às 3h17, a Marina acordava com o mesmo som.',
	'Três batidas na parede.',
	'Vinham do apartamento 305, do outro lado.',
	'De manhã, ela desceu para reclamar com o porteiro.',
	'Ele ficou em silêncio por um tempo, e disse:',
	'"Ninguém mora no 305… faz dois anos."',
	'Naquela noite, às 3h17, as batidas voltaram.',
	'Ela encostou o ouvido na parede…',
	'e bateu de volta. Três vezes.',
	'Silêncio.',
	'Então, as batidas responderam.',
	'Mas não vinham mais da parede.',
	'Vinham do armário. Atrás dela.',
	'Quer a parte dois? Comenta aí.',
];

export const Historia: React.FC<HistoriaProps> = ({falas, ev}) => {
	const frame = useCurrentFrame();
	const t = frame / FPS;
	const dia = t >= ev.diaDe && t < ev.diaAte;
	const apagao = t >= ev.apagao;
	const fala = falas.findIndex((f, i) => t >= f.de - 0.05 && t <= (falas[i + 1] ? Math.min(f.ate + 0.6, falas[i + 1].de - 0.05) : f.ate + 0.8));
	// transição suave (escuro) entre as cenas
	const fade = Math.max(
		1 - Math.min(1, Math.abs(t - ev.diaDe) / 0.3),
		1 - Math.min(1, Math.abs(t - ev.diaAte) / 0.3),
		1 - Math.min(1, Math.abs(t - (falas[7].de - 0.15)) / 0.15),
	);

	return (
		<AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
			{apagao ? <Final frame={frame} ev={ev} /> : dia ? <Portaria frame={frame} falas={falas} ev={ev} /> : <Quarto frame={frame} falas={falas} ev={ev} />}
			<AbsoluteFill style={{background: '#000', opacity: apagao ? 0 : fade}} />

			{fala >= 0 && !(apagao && fala < 13) ? (
				<div style={{position: 'absolute', top: 1530, left: 70, right: 70, display: 'flex', justifyContent: 'center'}}>
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 60, lineHeight: 1.2, color: '#F2EDE2', textAlign: 'center', textShadow: '0 4px 16px #000, 0 0 5px #000'}}>{LEGENDAS[fala]}</div>
				</div>
			) : null}

			<Audio src={staticFile('sons.mp3')} volume={0.75} />
			<Audio src={staticFile('narracao.mp3')} />
		</AbsoluteFill>
	);
};

// Ondas de batida na parede.
const Ondas: React.FC<{frame: number; tempos: number[]; x: number; y: number; cor?: string; escala?: number}> = ({frame, tempos, x, y, cor = '#E9E2C8', escala = 1}) => (
	<svg width="1080" height="1920" style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
		{tempos.map((tt, i) => {
			const p = (frame - q(tt)) / 18;
			if (p < 0 || p > 1) return null;
			return (
				<g key={i} opacity={1 - p}>
					<circle cx={x} cy={y} r={(30 + 140 * p) * escala} fill="none" stroke={cor} strokeWidth={10 * (1 - p) + 2} />
					<circle cx={x} cy={y} r={(10 + 70 * p) * escala} fill="none" stroke={cor} strokeWidth={6 * (1 - p) + 1} />
					<text x={x} y={y - (180 + 40 * p) * escala} textAnchor="middle" fontFamily={FONTES.titulo} fontSize={64 * escala} fill={cor}>TOC</text>
				</g>
			);
		})}
	</svg>
);

const Quarto: React.FC<{frame: number; falas: Fala[]; ev: Eventos}> = ({frame, falas, ev}) => {
	const t = frame / FPS;
	const segunda = t >= ev.diaAte; // segunda noite
	const empe = segunda && t >= falas[7].de - 0.15;

	// cama (cena 1 e começo da segunda noite)
	const sentaEm = segunda ? ev.batidas2[0] : ev.batidas1[0];
	const angulo = lerp(frame, sentaEm, sentaEm + 0.6, 90, 0);
	const acordou = segunda || t > falas[0].de + 1.2;
	const sustoCama = lerp(frame, sentaEm, sentaEm + 0.3, 1, 1.35);

	// Marina em pé (segunda noite)
	const recua = lerp(frame, falas[11].de, falas[11].de + 0.8, 0, -110);
	const viraTras = lerp(frame, falas[11].de + 0.6, falas[11].de + 1.0, 1, -1);
	const susto = Math.max(lerp(frame, ev.resposta[0], ev.resposta[0] + 0.2, 1, 1.5), 1);
	const bateu = ev.marina.reduce((acc, tt) => acc + Math.max(0, 1 - Math.abs(t - tt) / 0.12), 0);
	const braco = empe ? lerp(frame, falas[8].de, falas[8].de + 0.4, 0, -95) + 12 * bateu : 0;
	const encosta = empe && t < falas[11].de ? 16 : lerp(frame, falas[11].de, falas[11].de + 0.4, 16, 0);

	// armário
	const abre = lerp(frame, ev.rangidoDe, ev.rangidoAte, 0, 1, Easing.in(Easing.quad));

	// câmera
	const cam1 = segunda ? 0 : lerp(frame, falas[2].de, falas[2].de + 1.4, 0, -170);
	const zoomSilencio = segunda ? lerp(frame, falas[9].de - 0.3, ev.resposta[0], 1, 1.7) * (t < ev.resposta[0] ? 1 : 0) + (t >= ev.resposta[0] ? lerp(frame, ev.resposta[0], ev.resposta[0] + 0.25, 1.7, 1) : 0) : 1;
	const panArmario = segunda ? lerp(frame, ev.rangidoDe, ev.rangidoAte, 0, 1) : 0;
	const zoom = (segunda && t < ev.resposta[0] ? zoomSilencio : segunda ? lerp(frame, ev.resposta[0], ev.resposta[0] + 0.25, 1.7, 1) : 1) * (1 + 0.45 * panArmario);
	const origemX = segunda && t < ev.resposta[0] ? 820 : 540 - 330 * panArmario;
	const tremor = t > ev.rangidoAte - 0.4 ? (random(`q${frame}`) - 0.5) * 8 : 0;
	const relogio = Math.floor(frame / 15) % 2 === 0;

	return (
		<AbsoluteFill style={{transform: `scale(${segunda ? 1.3 : 1.45})`, transformOrigin: segunda ? '520px 1080px' : '450px 1080px'}}>
		<AbsoluteFill style={{transform: `translate(${cam1 + tremor}px, ${tremor * 0.5}px) scale(${empe || segunda ? zoom : 1})`, transformOrigin: `${origemX}px 1000px`}}>
			<svg width="1080" height="1920" style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
				<defs>
					<linearGradient id="parede" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0" stopColor="#0C1122" />
						<stop offset="1" stopColor="#1B2440" />
					</linearGradient>
					<radialGradient id="lua" cx="0.5" cy="0.5" r="0.5">
						<stop offset="0" stopColor="#DDE6FF" stopOpacity="0.9" />
						<stop offset="1" stopColor="#DDE6FF" stopOpacity="0" />
					</radialGradient>
					<radialGradient id="vin" cx="0.5" cy="0.5" r="0.75">
						<stop offset="0.45" stopColor="#000" stopOpacity="0" />
						<stop offset="1" stopColor="#000" stopOpacity="0.9" />
					</radialGradient>
				</defs>
				<rect x="-400" y="0" width="1900" height={PISO} fill="url(#parede)" />
				{/* janela com lua */}
				<rect x="440" y="420" width="280" height="360" fill="#121A33" stroke="#05070D" strokeWidth="14" />
				<circle cx="640" cy="500" r="90" fill="url(#lua)" />
				<circle cx="640" cy="500" r="34" fill="#E6ECFF" />
				<line x1="580" y1="420" x2="580" y2="780" stroke="#05070D" strokeWidth="10" />
				<line x1="440" y1="600" x2="720" y2="600" stroke="#05070D" strokeWidth="10" />
				<path d="M440 780 L720 780 L900 1350 L380 1350Z" fill="#B9C8F0" opacity="0.06" />
				{/* parede da direita (o 305 fica do outro lado) */}
				<path d="M860 360 L1500 160 L1500 1600 L860 1350Z" fill="#0A0F1E" stroke="#05070D" strokeWidth="6" />
				{!segunda ? (
					<g opacity={lerp(frame, falas[2].de + 0.6, falas[2].de + 1.2, 0, 1)}>
						<rect x="878" y="700" width="124" height="80" rx="10" fill="none" stroke="#C9B98E" strokeWidth="6" strokeDasharray="14 10" />
						<text x="940" y="758" textAnchor="middle" fontFamily={FONTES.titulo} fontSize="48" fill="#C9B98E">305</text>
						<text x="940" y="815" textAnchor="middle" fontFamily={FONTES.texto} fontWeight={800} fontSize="22" fill="#8E8466">do outro lado</text>
					</g>
				) : null}
				{/* piso */}
				<rect x="-400" y={PISO} width="1900" height={1920 - PISO} fill="#160F0B" />
				{Array.from({length: 12}).map((_, i) => (
					<line key={i} x1={-300 + i * 160} y1={PISO} x2={-500 + i * 200} y2="1920" stroke="#24180F" strokeWidth="6" />
				))}
				{/* armário */}
				<rect x="40" y="700" width="330" height={PISO - 700} fill="#3A2716" stroke="#05070D" strokeWidth="10" />
				<rect x="205" y="715" width="150" height={PISO - 730} fill="#000" />
				<rect x="55" y="715" width="150" height={PISO - 730} fill="#4A3220" stroke="#05070D" strokeWidth="6" />
				<g transform={`translate(355 0) scale(${1 - 0.8 * abre} 1) translate(-355 0)`}>
					<rect x="205" y="715" width="150" height={PISO - 730} fill="#4A3220" stroke="#05070D" strokeWidth="6" />
					<circle cx="222" cy="1030" r="9" fill="#9C8452" />
				</g>
				<circle cx="190" cy="1030" r="9" fill="#9C8452" />
				{/* relógio */}
				<rect x="470" y="850" width="170" height="80" rx="10" fill="#090909" stroke="#222" strokeWidth="4" />
				<text x="555" y="908" textAnchor="middle" fontFamily={FONTES.titulo} fontSize="52" fill="#FF3B30" opacity={relogio ? 1 : 0.85} style={{filter: 'drop-shadow(0 0 8px #FF3B30)'}}>
					03:17
				</text>
				{/* cama */}
				{!empe ? (
					<g>
						<rect x="820" y="990" width="40" height="260" fill="#2B1D12" stroke="#05070D" strokeWidth="6" />
						<rect x="400" y="1150" width="440" height="80" fill="#3B2A1C" stroke="#05070D" strokeWidth="6" />
						<rect x="410" y="1230" width="20" height="120" fill="#2B1D12" />
						<rect x="800" y="1230" width="20" height="120" fill="#2B1D12" />
						<rect x="720" y="1110" width="100" height="44" rx="20" fill="#C9C3B5" stroke="#05070D" strokeWidth="5" />
						<g transform={`translate(600 1180) rotate(${angulo}) scale(0.75) translate(0 240)`}>
							<Corpo semPernas olhosFechados={!acordou} susto={sustoCama} />
						</g>
						<path d={`M405 1140 Q 520 ${1100 + 30 * (angulo / 90)} 640 ${1150 - 60 * (1 - angulo / 90)} L700 1180 L700 1240 L405 1240Z`} fill="#4E5E86" stroke="#05070D" strokeWidth="6" />
					</g>
				) : null}
				{/* Marina em pé (segunda noite) */}
				{empe ? (
					<g transform={`translate(${770 + recua} ${PISO}) scale(0.85)`}>
						<Corpo inclina={encosta} bracoFrente={braco} vira={viraTras} susto={susto} />
					</g>
				) : null}
				<rect x="-400" y="0" width="1900" height="1920" fill="url(#vin)" />
				<rect x="-400" y="0" width="1900" height="1920" fill="#0A1840" opacity="0.18" />
			</svg>
			<Ondas frame={frame} tempos={segunda ? ev.batidas2 : ev.batidas1} x={segunda ? 880 : 790} y={1060} />
			<Ondas frame={frame} tempos={ev.marina} x={875} y={860} escala={0.6} />
			<Ondas frame={frame} tempos={ev.resposta} x={210} y={1000} cor="#E9A0A0" escala={0.9} />
		</AbsoluteFill>
		</AbsoluteFill>
	);
};

const Portaria: React.FC<{frame: number; falas: Fala[]; ev: Eventos}> = ({frame, falas}) => {
	const t = frame / FPS;
	const entra = lerp(frame, falas[3].de - 0.2, falas[3].de + 2.2, -150, 330, Easing.linear);
	const andando = t < falas[3].de + 2.2;
	const fase = (frame / FPS) * 2 * Math.PI;
	const pernas = andando ? 26 * Math.sin(fase) : 0;
	const bracos = andando ? -22 * Math.sin(fase) : 0;
	const pausa = lerp(frame, falas[4].de, falas[4].de + 0.6, 0, -8);
	const zoom = lerp(frame, falas[5].de - 0.2, falas[5].de + 1.6, 1, 2.6);
	const poeira = Array.from({length: 18});
	return (
		<AbsoluteFill style={{transform: 'scale(1.25)', transformOrigin: '700px 1100px'}}>
		<AbsoluteFill style={{transform: `scale(${zoom})`, transformOrigin: '858px 760px'}}>
			<svg width="1080" height="1920" style={{position: 'absolute', inset: 0}}>
				<rect width="1080" height={PISO} fill="#E3D2AE" />
				<rect y={PISO} width="1080" height={1920 - PISO} fill="#B88A58" />
				{Array.from({length: 8}).map((_, i) => (
					<line key={i} x1={i * 160} y1={PISO} x2={i * 160 - 120} y2="1920" stroke="#A07848" strokeWidth="5" />
				))}
				<rect x="60" y="380" width="300" height="360" fill="#BFD7EA" stroke="#5A4630" strokeWidth="12" />
				<line x1="210" y1="380" x2="210" y2="740" stroke="#5A4630" strokeWidth="8" />
				<text x="210" y="320" textAnchor="middle" fontFamily={FONTES.titulo} fontSize="44" fill="#5A4630">PORTARIA</text>
				{/* quadro de chaves */}
				<rect x="640" y="560" width="360" height="300" fill="#7A5634" stroke="#3D2A18" strokeWidth="10" />
				{['301', '302', '303', '304', '305', '306'].map((n, i) => {
					const x = 700 + (i % 3) * 110;
					const y = 620 + Math.floor(i / 3) * 130;
					const e305 = n === '305';
					return (
						<g key={n}>
							<text x={x} y={y} textAnchor="middle" fontFamily={FONTES.texto} fontWeight={800} fontSize="22" fill="#F2E3C4">{n}</text>
							<circle cx={x} cy={y + 14} r="6" fill="#2A1C10" />
							<path d={`M${x} ${y + 18} L${x} ${y + 60}`} stroke={e305 ? '#8C8470' : '#D8B44A'} strokeWidth="8" />
							<circle cx={x} cy={y + 72} r="14" fill="none" stroke={e305 ? '#8C8470' : '#D8B44A'} strokeWidth="7" />
							{e305 ? <path d={`M${x - 40} ${y - 10} L${x + 40} ${y + 90} M${x + 40} ${y - 10} L${x - 40} ${y + 90} M${x - 40} ${y + 40} L${x + 40} ${y + 40}`} stroke="#F4F0E6" strokeWidth="2" opacity="0.7" /> : null}
						</g>
					);
				})}
				{poeira.map((_, i) => (
					<circle key={i} cx={810 + random(`x${i}`) * 100 + Math.sin(frame / 20 + i) * 8} cy={760 + random(`y${i}`) * 120 - ((frame / 3 + i * 10) % 60)} r={2 + random(`r${i}`) * 2} fill="#FFF8E0" opacity={0.6 * lerp(frame, falas[5].de, falas[5].de + 0.6, 0, 1)} />
				))}
				{/* porteiro atrás do balcão */}
				<g transform={`translate(800 ${PISO + 40}) scale(0.9)`}>
					<Corpo lado={-1} cabelo="bone" bigode roupa="#3E5F8A" roupa2="#2E4A6E" calca="#2E2A3A" pele="#C08A66" inclina={pausa} />
				</g>
				<rect x="560" y="1060" width="480" height={PISO - 1060} fill="#8A5E36" stroke="#3D2A18" strokeWidth="10" />
				<rect x="540" y="1040" width="520" height="40" fill="#6E4826" stroke="#3D2A18" strokeWidth="8" />
				{/* Marina */}
				<g transform={`translate(${entra} ${PISO}) scale(0.9)`}>
					<Corpo pernas={pernas} bracoFrente={bracos} bracoTras={-bracos} />
				</g>
			</svg>
		</AbsoluteFill>
		</AbsoluteFill>
	);
};

const Final: React.FC<{frame: number; ev: Eventos}> = ({frame, ev}) => {
	const t0 = q(ev.apagao);
	return (
		<AbsoluteFill style={{background: frame < t0 + 3 ? '#5A0000' : '#000', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 30}}>
			<div style={{fontFamily: FONTES.titulo, fontSize: 150, color: '#E8E2D4', letterSpacing: 4, opacity: interpolate(frame, [t0 + 10, t0 + 22], [0, 1], clamp)}}>PARTE 2?</div>
			<div style={{fontFamily: FONTES.titulo, fontSize: 64, color: '#C9A227', opacity: interpolate(frame, [t0 + 20, t0 + 32], [0, 1], clamp)}}>comenta aí 👇</div>
			<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 34, color: '#8A8478', letterSpacing: 4, marginTop: 40, opacity: interpolate(frame, [t0 + 30, t0 + 42], [0, 1], clamp)}}>{CANAL.nome}</div>
		</AbsoluteFill>
	);
};
