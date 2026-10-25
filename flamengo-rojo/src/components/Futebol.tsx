import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {CORES, FONTES} from '../config';

// Cores neutras para os times (sem escudos, camisas ou marcas):
// Flamengo em preto, Estudiantes em azul.
export const COR_FLA = CORES.preto;
export const COR_EST = CORES.azul;

const traco = {stroke: CORES.preto, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};

// Placar recortado: "FLAMENGO 0 × 0 ESTUDIANTES" com rodapé opcional.
export const Placar: React.FC<{
	esquerda: string;
	direita: string;
	gols: [number | string, number | string];
	topo?: string;
	rodape?: React.ReactNode;
	corEsq?: string;
	corDir?: string;
	largura?: number;
	riscado?: number; // 0–1: risco desenhado sobre o placar
	fonteTime?: number;
}> = ({esquerda, direita, gols, topo, rodape, corEsq = COR_FLA, corDir = COR_EST, largura = 760, riscado = 0, fonteTime = 32}) => (
	<div style={{width: largura, background: CORES.papel, border: `5px solid ${CORES.preto}`, boxShadow: '0 12px 18px rgba(40,30,15,0.28)'}}>
		{topo ? <div style={{background: CORES.preto, color: CORES.amarelo, fontFamily: FONTES.texto, fontWeight: 800, fontSize: 26, letterSpacing: 2, padding: '8px 18px'}}>{topo}</div> : null}
		<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 22px', gap: 14}}>
			<div style={{flex: 1, textAlign: 'center', fontFamily: FONTES.titulo, fontSize: fonteTime, color: CORES.papel, background: corEsq, padding: '10px 8px', whiteSpace: 'nowrap'}}>{esquerda}</div>
			<div style={{position: 'relative', fontFamily: FONTES.titulo, fontSize: 72, color: CORES.preto, whiteSpace: 'nowrap', lineHeight: 1}}>
				{gols[0]} × {gols[1]}
				{riscado > 0 ? <div style={{position: 'absolute', left: -10, right: -10, top: '48%', height: 10, background: CORES.preto, transform: `scaleX(${riscado})`, transformOrigin: 'left'}} /> : null}
			</div>
			<div style={{flex: 1, textAlign: 'center', fontFamily: FONTES.titulo, fontSize: fonteTime, color: CORES.papel, background: corDir, padding: '10px 8px', whiteSpace: 'nowrap'}}>{direita}</div>
		</div>
		{rodape ? <div style={{borderTop: `3px dashed ${CORES.preto}`, padding: '10px 18px', textAlign: 'center', fontFamily: FONTES.texto, fontWeight: 800, fontSize: 28, color: CORES.preto}}>{rodape}</div> : null}
	</div>
);

// Balança: `inclinacao` de -1 a 1 (positivo pesa para a direita).
export const Balanca: React.FC<{esquerda: React.ReactNode; direita: React.ReactNode; inclinacao: number}> = ({esquerda, direita, inclinacao}) => {
	const ang = inclinacao * 10;
	return (
		<div style={{position: 'relative', width: 760, height: 560}}>
			<svg width="760" height="520" viewBox="0 0 760 520" style={{position: 'absolute', overflow: 'visible'}}>
				<path d="M380 120 L380 470 M300 480 L460 480" fill="none" {...traco} strokeWidth={10} />
				<g transform={`rotate(${ang} 380 120)`}>
					<path d="M110 120 L650 120" {...traco} strokeWidth={10} />
					<path d="M110 120 L60 260 M110 120 L160 260 M650 120 L600 260 M650 120 L700 260" fill="none" {...traco} strokeWidth={4} />
					<path d="M40 260 Q110 310 180 260Z" fill={CORES.amarelo} {...traco} strokeWidth={5} />
					<path d="M580 260 Q650 310 720 260Z" fill={CORES.azulClaro} {...traco} strokeWidth={5} />
				</g>
				<circle cx="380" cy="120" r="16" fill={CORES.preto} />
			</svg>
			<div style={{position: 'absolute', left: -30, width: 280, top: 320 - ang * 4.7, textAlign: 'center'}}>{esquerda}</div>
			<div style={{position: 'absolute', left: 510, width: 280, top: 320 + ang * 4.7, textAlign: 'center'}}>{direita}</div>
		</div>
	);
};

// Degraus do processo (escada) que aparecem um a um.
export const Escada: React.FC<{degraus: {t: string; em: number}[]; aqui: number}> = ({degraus, aqui}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	return (
		<div style={{position: 'relative', width: 1080, height: 400}}>
			{degraus.map((d, i) => {
				const e = spring({frame: frame - d.em, fps, config: {damping: 12, mass: 0.6}});
				return (
					<div
						key={d.t}
						style={{
							position: 'absolute',
							left: i * 360,
							bottom: i * 110,
							width: 350,
							height: 130,
							background: i === 0 ? CORES.amarelo : CORES.papel,
							border: `5px solid ${CORES.preto}`,
							boxShadow: '0 10px 16px rgba(40,30,15,0.25)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							textAlign: 'center',
							padding: 12,
							boxSizing: 'border-box',
							fontFamily: FONTES.titulo,
							fontSize: 30,
							lineHeight: 1.1,
							color: CORES.preto,
							opacity: interpolate(e, [0, 0.3], [0, 1], {extrapolateRight: 'clamp'}),
							transform: `translateY(${(1 - e) * 40}px)`,
						}}
					>
						{d.t}
					</div>
				);
			})}
			<div style={{position: 'absolute', left: 30, bottom: 150, fontFamily: FONTES.mao, fontWeight: 700, fontSize: 48, color: CORES.azul, transform: 'rotate(-4deg)', opacity: interpolate(frame, [aqui, aqui + 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), whiteSpace: 'nowrap'}}>
				↓ estamos aqui
			</div>
		</div>
	);
};
