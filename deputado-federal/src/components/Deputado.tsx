import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {CORES, FONTES} from '../config';

// Valores oficiais (out/2026). Tetos mensais; a cota varia por estado.
export const SUBSIDIO = 46366.19;
export const VERBA_GABINETE = 165806.07;
export const COTA_MIN = 41612.55; // DF
export const COTA_MAX = 58474.7; // RR
export const AUXILIO_MORADIA = 4253;

export const brl = (v: number, casas = 2) => v.toLocaleString('pt-BR', {minimumFractionDigits: casas, maximumFractionDigits: casas});

// Contracheque recortado.
export const Contracheque: React.FC<{linhas: {t: string; v: string; riscado?: boolean}[]; total: React.ReactNode; largura?: number}> = ({linhas, total, largura = 640}) => (
	<div style={{width: largura, background: '#FFFDF6', border: `5px solid ${CORES.preto}`, boxShadow: '0 12px 18px rgba(40,30,15,0.28)', padding: '22px 30px 26px', boxSizing: 'border-box'}}>
		<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 24, letterSpacing: 3, color: CORES.cinza, borderBottom: `3px dashed ${CORES.preto}`, paddingBottom: 10, marginBottom: 10}}>CONTRACHEQUE · DEPUTADO FEDERAL</div>
		{linhas.map((l) => (
			<div key={l.t} style={{display: 'flex', justifyContent: 'space-between', fontFamily: FONTES.texto, fontWeight: 800, fontSize: 30, color: l.riscado ? CORES.cinza : CORES.preto, padding: '6px 0', textDecoration: l.riscado ? 'line-through' : undefined}}>
				<span>{l.t}</span>
				<span style={{whiteSpace: 'nowrap'}}>{l.v}</span>
			</div>
		))}
		<div style={{borderTop: `3px dashed ${CORES.preto}`, marginTop: 8, paddingTop: 12, fontFamily: FONTES.titulo, fontSize: 56, color: CORES.preto, whiteSpace: 'nowrap'}}>{total}</div>
	</div>
);

// Envelope que abre e mostra o conteúdo.
export const Envelope: React.FC<{inicio: number; titulo: string; valor: React.ReactNode; detalhe: string; cor: string}> = ({inicio, titulo, valor, detalhe, cor}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const e = spring({frame: frame - inicio, fps, config: {damping: 13, mass: 0.6}});
	const abre = interpolate(frame, [inicio + 8, inicio + 22], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	return (
		<div style={{width: 540, opacity: interpolate(e, [0, 0.3], [0, 1], {extrapolateRight: 'clamp'}), transform: `translateY(${(1 - e) * 40}px)`}}>
			<div style={{position: 'relative', height: 300}}>
				{/* cartão que sai do envelope */}
				<div style={{position: 'absolute', left: 16, right: 16, top: 70 - abre * 130, height: 200, background: CORES.papel, border: `4px solid ${CORES.preto}`, padding: '16px 18px', boxSizing: 'border-box', textAlign: 'center'}}>
					<div style={{fontFamily: FONTES.titulo, fontSize: 40, color: CORES.preto, whiteSpace: 'nowrap', lineHeight: 1.1}}>{valor}</div>
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 24, color: CORES.cinza, marginTop: 8, lineHeight: 1.2}}>{detalhe}</div>
				</div>
				<svg width="540" height="300" viewBox="0 0 540 300" style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
					<path d="M10 120 L530 120 L530 290 L10 290Z" fill={cor} stroke={CORES.preto} strokeWidth="6" strokeLinejoin="round" />
					<path d="M10 120 L270 230 L530 120" fill="none" stroke={CORES.preto} strokeWidth="6" strokeLinejoin="round" />
				</svg>
			</div>
			<div style={{fontFamily: FONTES.titulo, fontSize: 36, color: CORES.preto, textAlign: 'center', marginTop: 10}}>{titulo}</div>
		</div>
	);
};
