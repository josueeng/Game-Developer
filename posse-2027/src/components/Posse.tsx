import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {CORES, FONTES} from '../config';
import {progresso, useEntrada} from '../anim';

export const VERMELHO = '#C8261E';

// Folha de calendário recortada: mês em cima, dia gigante.
export const FolhaCalendario: React.FC<{
	inicio: number;
	mes: string;
	dia: string;
	legenda?: string;
	largura?: number;
	risco?: number; // quadro em que o dia é riscado
	circulo?: number; // quadro em que o dia é circulado
	rotacao?: number;
	destaque?: string;
}> = ({inicio, mes, dia, legenda, largura = 320, risco, circulo, rotacao = 0, destaque = VERMELHO}) => {
	const frame = useCurrentFrame();
	const e = useEntrada(inicio);
	const pr = risco !== undefined ? progresso(frame, risco, risco + 12) : 0;
	const pc = circulo !== undefined ? progresso(frame, circulo, circulo + 18) : 0;
	return (
		<div style={{width: largura, opacity: frame < inicio ? 0 : interpolate(e, [0, 0.3], [0, 1], {extrapolateRight: 'clamp'}), transform: `translateY(${(1 - e) * 40}px) rotate(${rotacao}deg)`}}>
			<div style={{background: CORES.papel, border: `6px solid ${CORES.preto}`, boxShadow: '0 14px 22px rgba(40,30,15,0.3)'}}>
				<div style={{background: destaque, color: CORES.papel, fontFamily: FONTES.titulo, fontSize: largura * 0.15, textAlign: 'center', padding: '6px 0', borderBottom: `6px solid ${CORES.preto}`}}>{mes}</div>
				<div style={{position: 'relative', fontFamily: FONTES.titulo, fontSize: largura * 0.55, color: CORES.preto, textAlign: 'center', lineHeight: 1.15}}>
					{dia}
					<svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible'}}>
						{pr > 0 ? <line x1="12" y1="20" x2={12 + 76 * pr} y2={20 + 64 * pr} stroke={VERMELHO} strokeWidth="7" strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{strokeWidth: 14}} /> : null}
					</svg>
					{pc > 0 ? <div style={{position: 'absolute', left: '8%', right: '8%', top: '6%', bottom: '4%', border: `${Math.round(largura * 0.035)}px solid ${VERMELHO}`, borderRadius: '50%', opacity: pc, transform: `scale(${1.3 - 0.3 * pc}) rotate(-4deg)`}} /> : null}
				</div>
			</div>
			{legenda ? <div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 32, color: CORES.preto, textAlign: 'center', marginTop: 14, lineHeight: 1.2}}>{legenda}</div> : null}
		</div>
	);
};

// Carimbo que cai com mola.
export const Carimbo: React.FC<{inicio: number; texto: React.ReactNode; cor?: string; rotacao?: number; tamanho?: number; style?: React.CSSProperties}> = ({inicio, texto, cor = VERMELHO, rotacao = -6, tamanho = 60, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const s = spring({frame: frame - inicio, fps, config: {damping: 10, stiffness: 180}});
	return (
		<div
			style={{
				position: 'absolute',
				padding: '10px 32px',
				border: `9px solid ${cor}`,
				borderRadius: 14,
				background: 'rgba(251,246,234,0.9)',
				color: cor,
				fontFamily: FONTES.titulo,
				fontSize: tamanho,
				lineHeight: 1.1,
				textAlign: 'center',
				whiteSpace: 'nowrap',
				transform: `rotate(${rotacao}deg) scale(${interpolate(s, [0, 1], [2.2, 1])})`,
				opacity: frame < inicio ? 0 : interpolate(s, [0, 0.2], [0, 1], {extrapolateRight: 'clamp'}),
				...style,
			}}
		>
			{texto}
		</div>
	);
};

// Diploma recortado com selo.
export const Diploma: React.FC<{largura?: number}> = ({largura = 720}) => (
	<div style={{width: largura, background: '#FFFDF4', border: `6px solid ${CORES.preto}`, outline: `3px solid ${CORES.preto}`, outlineOffset: -20, padding: '40px 50px 44px', boxSizing: 'border-box', boxShadow: '0 16px 26px rgba(40,30,15,0.3)', position: 'relative', textAlign: 'center'}}>
		<div style={{fontFamily: FONTES.jornal, fontWeight: 900, fontSize: 64, color: CORES.preto, letterSpacing: 4}}>DIPLOMA</div>
		<div style={{fontFamily: FONTES.jornal, fontStyle: 'italic', fontSize: 30, color: CORES.cinza, marginTop: 8}}>certifica que foi eleito(a) para o cargo de</div>
		<div style={{height: 6, background: CORES.cinza, opacity: 0.4, margin: '30px 60px 0'}} />
		<div style={{height: 6, background: CORES.cinza, opacity: 0.4, margin: '26px 120px 0'}} />
		<svg width="130" height="150" viewBox="0 0 130 150" style={{position: 'absolute', right: 40, bottom: -40}}>
			<path d="M40 90 L25 148 L50 132 L65 150 L70 95Z" fill={VERMELHO} stroke={CORES.preto} strokeWidth="5" />
			<path d="M90 90 L105 148 L80 132 L65 150 L60 95Z" fill={VERMELHO} stroke={CORES.preto} strokeWidth="5" />
			<circle cx="65" cy="62" r="54" fill={CORES.amarelo} stroke={CORES.preto} strokeWidth="6" />
			<circle cx="65" cy="62" r="38" fill="none" stroke={CORES.preto} strokeWidth="4" strokeDasharray="6 6" />
		</svg>
	</div>
);

// Congresso estilizado (duas torres e duas cúpulas), genérico.
export const Congresso: React.FC<{largura?: number}> = ({largura = 700}) => {
	const t = {stroke: CORES.preto, strokeWidth: 7, strokeLinejoin: 'round' as const};
	return (
		<svg width={largura} height={largura * 0.5} viewBox="0 0 700 350">
			<rect x="300" y="20" width="40" height="250" fill={CORES.papel} {...t} />
			<rect x="360" y="20" width="40" height="250" fill={CORES.papel} {...t} />
			<rect x="300" y="120" width="100" height="14" fill={CORES.papel} {...t} />
			<rect x="40" y="250" width="620" height="40" fill={CORES.papel} {...t} />
			<path d="M120 250 Q190 170 260 250Z" fill={CORES.azulClaro} {...t} />
			<path d="M440 250 Q510 320 580 250Z" fill={CORES.azulClaro} {...t} transform="translate(0,-40)" />
			<rect x="20" y="290" width="660" height="30" fill={CORES.begeEscuro} {...t} />
		</svg>
	);
};

// Ampulheta simples que esvazia.
export const Ampulheta: React.FC<{inicio: number; duracao?: number; tamanho?: number}> = ({inicio, duracao = 60, tamanho = 240}) => {
	const frame = useCurrentFrame();
	const p = progresso(frame, inicio, inicio + duracao);
	return (
		<svg width={tamanho * 0.7} height={tamanho} viewBox="0 0 140 200">
			<defs>
				<clipPath id="amp-cima"><path d="M25 25 L115 25 L70 98Z" /></clipPath>
				<clipPath id="amp-baixo"><path d="M70 102 L115 175 L25 175Z" /></clipPath>
			</defs>
			<rect x="25" y={25 + 73 * p} width="90" height="80" fill={CORES.amarelo} clipPath="url(#amp-cima)" />
			<rect x="25" y={175 - 73 * p} width="90" height="80" fill={CORES.amarelo} clipPath="url(#amp-baixo)" />
			<path d="M25 25 L115 25 L70 100 L115 175 L25 175 L70 100Z" fill="none" stroke={CORES.preto} strokeWidth="7" strokeLinejoin="round" />
			<rect x="15" y="12" width="110" height="14" fill="#8A6A45" stroke={CORES.preto} strokeWidth="5" />
			<rect x="15" y="174" width="110" height="14" fill="#8A6A45" stroke={CORES.preto} strokeWidth="5" />
		</svg>
	);
};
