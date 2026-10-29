import React from 'react';
import {AbsoluteFill, interpolate, random, spring, useVideoConfig} from 'remotion';
import {FONTES} from './config';

export const AMARELO = '#FFD23F';
export const VERMELHO = '#D7261E';
export const OSSO = '#EDE6D6';

// Grão de filme (ruído que muda a cada quadro) + vinheta.
export const Grao: React.FC<{frame: number; forca?: number}> = ({frame, forca = 0.16}) => (
	<AbsoluteFill style={{pointerEvents: 'none'}}>
		<svg width="1920" height="1080" style={{position: 'absolute', inset: 0, opacity: forca, mixBlendMode: 'overlay'}}>
			<filter id={`g${frame % 7}`}>
				<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={frame % 97} />
				<feColorMatrix type="saturate" values="0" />
			</filter>
			<rect width="1920" height="1080" filter={`url(#g${frame % 7})`} />
		</svg>
		<AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.75) 100%)'}} />
	</AbsoluteFill>
);

// Texto com glitch RGB (cópias deslocadas em vermelho/ciano + fatias).
export const Glitch: React.FC<{frame: number; inicio: number; children: React.ReactNode; style?: React.CSSProperties}> = ({frame, inicio, children, style}) => {
	const f = frame - inicio;
	if (f < 0) return null;
	const forte = f < 10 || random(`gl${Math.floor(frame / 3)}`) > 0.85;
	const dx = forte ? (random(`dx${frame}`) - 0.5) * 30 : 2;
	const fatia = forte ? random(`fy${frame}`) * 100 : -100;
	const base: React.CSSProperties = {position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', ...style};
	return (
		<AbsoluteFill style={{opacity: interpolate(f, [0, 2], [0, 1], {extrapolateRight: 'clamp'})}}>
			<div style={{...base, color: '#FF2A2A', transform: `translate(${dx}px,0)`, mixBlendMode: 'screen'}}>{children}</div>
			<div style={{...base, color: '#22E6FF', transform: `translate(${-dx}px,0)`, mixBlendMode: 'screen'}}>{children}</div>
			<div style={{...base, color: OSSO, clipPath: forte ? `inset(${fatia}% 0 ${Math.max(0, 92 - fatia)}% 0)` : undefined, transform: forte ? `translate(${dx * 1.5}px,0)` : undefined}}>{children}</div>
			<div style={{...base, color: OSSO, clipPath: forte ? `inset(0 0 ${100 - fatia}% 0)` : undefined}}>{children}</div>
			<div style={{...base, color: OSSO, clipPath: forte ? `inset(${Math.min(100, fatia + 8)}% 0 0 0)` : undefined}}>{children}</div>
		</AbsoluteFill>
	);
};

// Flash (branco ou vermelho) que some em ~8 quadros.
export const Flash: React.FC<{frame: number; tempos: number[]; fps: number; cor?: string}> = ({frame, tempos, fps, cor = '#FFFFFF'}) => {
	const op = tempos.reduce((acc, t) => {
		const d = frame - Math.round(t * fps);
		return d >= 0 && d < 9 ? Math.max(acc, 1 - d / 9) : acc;
	}, 0);
	return op > 0 ? <AbsoluteFill style={{background: cor, opacity: op * 0.85, pointerEvents: 'none'}} /> : null;
};

// Legenda karaokê: palavras acendem conforme a fala; a palavra-chave em amarelo.
export const Legenda: React.FC<{frame: number; de: number; ate: number; texto: string; chave?: string; fps: number; sussurro?: boolean}> = ({frame, de, ate, texto, chave, fps, sussurro}) => {
	const palavras = texto.split(' ');
	const ini = chave ? texto.indexOf(chave) : -1;
	const fimChave = ini >= 0 ? ini + chave!.length : -1;
	const p = interpolate(frame, [de * fps, ate * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	let pos = 0;
	const total = texto.length;
	return (
		<div style={{position: 'absolute', left: 160, right: 160, bottom: 60, wordSpacing: 6, textAlign: 'center', fontFamily: FONTES.titulo, fontSize: sussurro ? 64 : 56, lineHeight: 1.18, letterSpacing: sussurro ? 4 : 0, fontStyle: sussurro ? 'italic' : undefined, textTransform: 'uppercase'}}>
			{palavras.map((w, i) => {
				const a = pos;
				pos += w.length + 1;
				const lida = a / total <= p + 0.02;
				const naChave = ini >= 0 && a >= ini && a < fimChave;
				return (
					<React.Fragment key={i}>
						<span style={{color: naChave ? AMARELO : OSSO, opacity: lida ? 1 : 0.35, textShadow: '0 4px 0 #000, 0 0 18px rgba(0,0,0,0.9)', WebkitTextStroke: '2px #000'}}>{w}</span>{' '}
					</React.Fragment>
				);
			})}
		</div>
	);
};

// Texto datilografado (2 quadros por letra) com cursor.
export const Datilografado: React.FC<{frame: number; inicio: number; texto: string; style?: React.CSSProperties}> = ({frame, inicio, texto, style}) => {
	const n = Math.max(0, Math.floor((frame - inicio) / 2));
	if (frame < inicio) return null;
	return (
		<div style={{fontFamily: '"Courier New", monospace', fontWeight: 700, color: OSSO, whiteSpace: 'nowrap', ...style}}>
			{texto.slice(0, n)}
			<span style={{opacity: Math.floor(frame / 8) % 2 ? 1 : 0}}>_</span>
		</div>
	);
};

// Carimbo que cai com mola.
export const Carimbo: React.FC<{frame: number; inicio: number; texto: React.ReactNode; cor?: string; rot?: number; tam?: number; style?: React.CSSProperties}> = ({frame, inicio, texto, cor = VERMELHO, rot = -8, tam = 70, style}) => {
	const {fps} = useVideoConfig();
	const s = spring({frame: frame - inicio, fps, config: {damping: 10, stiffness: 180}});
	if (frame < inicio) return null;
	return (
		<div style={{position: 'absolute', padding: '10px 34px', border: `10px solid ${cor}`, borderRadius: 14, color: cor, fontFamily: FONTES.titulo, fontSize: tam, whiteSpace: 'nowrap', background: 'rgba(10,8,6,0.55)', transform: `rotate(${rot}deg) scale(${interpolate(s, [0, 1], [2.4, 1])})`, opacity: interpolate(s, [0, 0.2], [0, 1], {extrapolateRight: 'clamp'}), ...style}}>
			{texto}
		</div>
	);
};
