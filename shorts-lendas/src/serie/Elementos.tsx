import React from 'react';
import {AbsoluteFill, interpolate, random, spring} from 'remotion';
import {noise2D} from '@remotion/noise';
import {Fantasma, Urna} from '../Desenhos';
import {Glitch} from '../Efeitos';
import {COR, Ficha, FONTE} from './Vertical';

// Elementos animados que entram por cima dos cenários. `t0` = quadro de entrada.
export type ElemProps = {frame: number; fps: number; t0: number; e: Record<string, any>; fimCena: number};
const cl = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const entra = (f: number, t0: number, d = 10) => interpolate(f, [t0, t0 + d], [0, 1], cl);
const T = {stroke: '#020306', strokeWidth: 5, strokeLinejoin: 'round' as const};

const Vulto: React.FC<{escala?: number; cor?: string}> = ({escala = 1, cor = '#010204'}) => (
	<svg width={260 * escala} height={700 * escala} viewBox="0 0 260 700">
		<ellipse cx="130" cy="80" rx="52" ry="62" fill={cor} />
		<path d="M60 150 Q130 125 200 150 L220 430 L190 700 L150 700 L130 470 L110 700 L70 700 L40 430Z" fill={cor} />
		<path d="M62 165 L20 440 M198 165 L240 440" stroke={cor} strokeWidth="34" strokeLinecap="round" />
	</svg>
);

export const elementos: Record<string, React.FC<ElemProps>> = {
	vulto: ({frame, t0, e}) => {
		const p = entra(frame, t0, 30);
		const balanca = 10 * noise2D('vu', frame / 50, e.x ?? 0);
		return <div style={{position: 'absolute', left: (e.x ?? 540) - 130 + balanca, top: 640, opacity: 0.85 * p, filter: 'blur(1.5px)'}}><Vulto /></div>;
	},
	corpoSeco: ({frame, t0, e}) => {
		const p = entra(frame, t0, 20);
		const passo = Math.sin(frame / 9) * 4;
		return (
			<div style={{position: 'absolute', left: (e.x ?? 540) - 150, top: 520 + passo, opacity: p}}>
				<svg width="300" height="760" viewBox="0 0 300 760">
					<ellipse cx="150" cy="90" rx="50" ry="66" fill="#6B5A44" {...T} />
					<ellipse cx="130" cy="86" rx="12" ry="16" fill="#000" />
					<ellipse cx="172" cy="86" rx="12" ry="16" fill="#000" />
					<path d="M135 125 L165 125" stroke="#000" strokeWidth="6" />
					<path d="M118 160 L182 160 L176 420 L124 420Z" fill="#5A4A38" {...T} />
					{[190, 230, 270].map((y) => (
						<path key={y} d={`M124 ${y} Q150 ${y + 10} 176 ${y}`} fill="none" stroke="#2A2014" strokeWidth="5" />
					))}
					<path d="M122 170 L60 430 M178 170 L240 430" stroke="#5A4A38" strokeWidth="18" strokeLinecap="round" />
					<path d="M135 420 L120 740 M165 420 L180 740" stroke="#5A4A38" strokeWidth="22" strokeLinecap="round" />
				</svg>
			</div>
		);
	},
	caixao: ({frame, t0}) => {
		const sobe = [0, 27, 54].reduce((a, d) => a + interpolate(frame, [t0 + 9 + d, t0 + 14 + d, t0 + 24 + d], [0, 1, 0.6], cl), 0);
		return (
			<div style={{position: 'absolute', left: 300, top: 1080 - 60 * sobe, opacity: entra(frame, t0), transform: `rotate(${-4 + 3 * Math.sin(sobe * 3)}deg)`}}>
				<svg width="480" height="260" viewBox="0 0 480 260">
					<path d="M20 120 L90 40 L390 40 L460 120 L390 220 L90 220Z" fill="#4A2E1C" {...T} />
					<path d="M200 80 L280 80 M240 60 L240 180" stroke="#C9A86A" strokeWidth="12" />
				</svg>
				{sobe > 0.1 ? Array.from({length: 10}).map((_, i) => <div key={i} style={{position: 'absolute', left: 60 + random(`tx${i}`) * 360, top: 200 - 120 * sobe * random(`ty${i}`), width: 18, height: 18, borderRadius: 9, background: '#3A2A1C'}} />) : null}
			</div>
		);
	},
	titulo: ({frame, t0, e}) => (frame >= t0 ? (
		<AbsoluteFill style={{top: -420}}>
			<Glitch frame={frame} inicio={t0} style={{fontFamily: FONTE.terror, fontSize: 150, textAlign: 'center', lineHeight: 1.05}}>
				{(e.texto as string[]).map((l) => <div key={l}>{l}</div>)}
			</Glitch>
		</AbsoluteFill>
	) : null),
	ficha: ({frame, t0, e}) => <div style={{position: 'absolute', inset: 0, transform: e.curta ? 'translateY(-180px)' : undefined}}><Ficha frame={frame} de={t0 + 12} linhas={e.linhas} carimbo={e.carimbo} /></div>,
	placa: ({frame, fps, t0, e}) => {
		const s = spring({frame: frame - t0, fps, config: {damping: 12}});
		return frame < t0 ? null : (
			<div style={{position: 'absolute', left: 80, right: 80, top: 560, textAlign: 'center', transform: `scale(${s}) rotate(-2deg)`, background: COR.osso, color: '#111', fontFamily: FONTE.impacto, fontSize: 76, lineHeight: 1.1, padding: '30px 36px', border: '8px solid #000', boxShadow: '0 20px 40px rgba(0,0,0,0.7)'}}>{e.texto}</div>
		);
	},
	placas: ({frame, fps, t0, e}) => (
		<>
			{(e.textos as string[]).map((tx, i) => {
				const s = spring({frame: frame - t0 - i * 18, fps, config: {damping: 12}});
				return frame < t0 + i * 18 ? null : (
					<div key={tx} style={{position: 'absolute', left: 120, right: 120, top: 380 + i * 220, textAlign: 'center', transform: `scale(${s}) rotate(${(i - 1) * 3}deg)`, background: i === 0 ? COR.amarelo : COR.osso, color: '#111', fontFamily: FONTE.impacto, fontSize: 84, padding: '20px 0', border: '8px solid #000'}}>{tx}</div>
				);
			})}
		</>
	),
	pergunta: ({frame, fps, fimCena}) => {
		const t = fimCena - 40;
		const s = spring({frame: frame - t, fps, config: {damping: 9}});
		return frame < t ? null : <div style={{position: 'absolute', left: 0, right: 0, top: 380, textAlign: 'center', fontFamily: FONTE.impacto, fontSize: 380, color: COR.sangue, WebkitTextStroke: '10px #000', transform: `scale(${s})`, textShadow: '0 16px 0 #000'}}>?</div>;
	},
	olhos: ({frame, t0}) => {
		const p = entra(frame, t0 + 6, 6);
		const pisca = Math.floor(frame / 40) % 6 === 5 && frame % 40 < 4 ? 0.1 : 1;
		return (
			<div style={{position: 'absolute', left: 340, top: 820, opacity: p}}>
				{[0, 300].map((dx) => <div key={dx} style={{position: 'absolute', left: dx, top: 0, width: 90, height: 56 * pisca, borderRadius: '50%', background: '#FF2A1A', boxShadow: '0 0 60px 20px rgba(255,40,20,0.55)'}} />)}
			</div>
		);
	},
	faróis: ({frame, t0}) => {
		const p = entra(frame, t0, 30);
		return (
			<AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 72%, rgba(255,240,200,${0.45 * p}) 0%, rgba(255,240,200,0) 45%)`, mixBlendMode: 'screen'}} />
		);
	},
	balanca: ({frame, t0}) => {
		const p = entra(frame, t0, 14);
		const inc = 10 * Math.sin(frame / 18);
		return (
			<div style={{position: 'absolute', left: 140, right: 140, top: 900, opacity: p, display: 'flex', justifyContent: 'space-between', transform: `rotate(${inc * 0.2}deg)`}}>
				{['VERSÃO OFICIAL', 'TESTEMUNHAS'].map((tx, i) => (
					<div key={tx} style={{background: i ? COR.sangue : COR.osso, color: i ? '#fff' : '#111', fontFamily: FONTE.impacto, fontSize: 48, padding: '14px 22px', border: '6px solid #000', transform: `translateY(${(i ? -inc : inc) * 1.5}px)`}}>{tx}</div>
				))}
			</div>
		);
	},
	mulher: ({frame, t0, e}) => {
		const p = entra(frame, t0, 24);
		const some = random(`ms${Math.floor(frame / 3)}`) > 0.93 ? 0.2 : 1;
		return <div style={{position: 'absolute', left: (e.x ?? 540) - 210 * (e.escala ?? 0.5), top: 1260 - 760 * (e.escala ?? 0.5), opacity: 0.8 * p * some, filter: 'drop-shadow(0 0 30px rgba(230,235,255,0.5)) blur(0.5px)'}}><Fantasma escala={e.escala ?? 0.5} /></div>;
	},
	retrovisor: ({frame, t0, e}) => {
		const p = entra(frame, t0, 10);
		return (
			<div style={{position: 'absolute', left: 290, top: 560, width: 500, height: 190, borderRadius: 30, border: '14px solid #1A1C22', background: '#0C111C', overflow: 'hidden', opacity: p, boxShadow: '0 20px 40px rgba(0,0,0,0.8)'}}>
				<div style={{position: 'absolute', inset: 0, background: 'linear-gradient(#1A2236, #070A12)'}} />
				{e.ocupado ? <div style={{position: 'absolute', left: 190, top: 20, opacity: 0.9}}><Fantasma escala={0.32} /></div> : null}
				<div style={{position: 'absolute', left: 30, right: 30, top: 120, height: 8, background: '#2A2E3A'}} />
			</div>
		);
	},
	ondas: ({frame, t0}) => (
		<svg width="1080" height="1920" style={{position: 'absolute', inset: 0}}>
			{[0, 1, 2, 3].map((i) => {
				const p = ((frame - t0) / 40 - i * 0.25) % 1;
				if (frame < t0 || p < 0) return null;
				return <path key={i} d={`M${395 + 60 + 500 * p} ${925 - 200 * p} q30 ${40 + 60 * p} 0 ${80 + 120 * p}`} fill="none" stroke={COR.osso} strokeWidth={8 * (1 - p)} opacity={1 - p} />;
			})}
		</svg>
	),
	velho: ({frame, t0, e}) => {
		const p = entra(frame, t0, 24);
		const x = (e.x ?? 700) - (e.anda ? (frame - t0) * 0.8 : 0);
		const passo = e.anda ? Math.sin(frame / 7) * 6 : 0;
		return (
			<div style={{position: 'absolute', left: x - 160, top: 640 + passo, opacity: p}}>
				<svg width="340" height="700" viewBox="0 0 340 700">
					<path d="M190 140 Q300 120 320 260 Q330 380 220 400 Q160 300 190 140Z" fill="#3A2C1E" {...T} />
					<path d="M170 90 Q120 90 110 150 L90 420 L70 690 L120 690 L140 470 L160 690 L210 690 L200 420 L200 150 Q200 92 170 90Z" fill="#050608" />
					<ellipse cx="160" cy="70" rx="44" ry="50" fill="#050608" />
					<path d="M110 40 L210 40 L190 10 L130 10Z" fill="#050608" />
					<path d="M200 170 L260 160" stroke="#050608" strokeWidth="26" strokeLinecap="round" />
				</svg>
			</div>
		);
	},
	saco: ({frame, t0}) => {
		const mexe = frame >= t0 ? 10 * Math.sin((frame - t0) / 3) * Math.exp(-(frame - t0) / 60) : 0;
		return frame < t0 ? null : <div style={{position: 'absolute', left: 0, right: 0, top: 380, textAlign: 'center', fontFamily: FONTE.impacto, fontSize: 70, color: COR.osso, transform: `translateX(${mexe}px)`, WebkitTextStroke: '5px #000', paintOrder: 'stroke fill'}}>O SACO SE MEXEU</div>;
	},
	espelho: () => null, // controla o fundo "banheiro" (fantasma no espelho)
	urna: ({frame, t0}) => {
		const chama = 0.5 + 0.5 * Math.sin(frame / 3) * random(`uc${Math.floor(frame / 4)}`);
		return <div style={{position: 'absolute', left: 40, top: 620, opacity: entra(frame, t0, 16)}}><Urna chama={chama} /></div>;
	},
	fatoLenda: ({frame, t0}) => (
		<div style={{position: 'absolute', left: 80, right: 80, top: 360}}>
			{[
				{t: 'MARIA AUGUSTA EXISTIU', ok: true},
				{t: 'MORREU EM PARIS, 1891', ok: true},
				{t: 'A CASA VIROU ESCOLA', ok: true},
				{t: 'LIGAÇÃO COM O BANHEIRO', ok: false},
			].map((it, i) => (
				<div key={it.t} style={{display: 'flex', alignItems: 'center', gap: 24, marginBottom: 34, opacity: entra(frame, t0 + i * 9, 8), fontFamily: FONTE.impacto, fontSize: 60, color: COR.osso}}>
					<span style={{fontSize: 80, color: it.ok ? COR.verde : COR.sangue, width: 70}}>{it.ok ? '+' : 'x'}</span>
					{it.t}
				</div>
			))}
		</div>
	),
	armario: ({frame, t0, e}) => {
		const abre = e.aberto ? 0.7 + 0.05 * Math.sin(frame / 25) : 0;
		return (
			<svg width="1080" height="1920" style={{position: 'absolute', inset: 0, opacity: entra(frame, t0 - 1, 1)}}>
				<rect x="60" y="640" width="400" height="760" fill="#3A2716" stroke="#05070D" strokeWidth="10" />
				<rect x="260" y="655" width="185" height="730" fill="#000" />
				<rect x="75" y="655" width="185" height="730" fill="#4A3220" stroke="#05070D" strokeWidth="6" />
				<g transform={`translate(445 0) scale(${1 - 0.8 * abre} 1) translate(-445 0)`}>
					<rect x="260" y="655" width="185" height="730" fill="#4A3220" stroke="#05070D" strokeWidth="6" />
				</g>
			</svg>
		);
	},
	bilhete: ({frame, t0, e}) => {
		const p = entra(frame, t0, 14);
		const n = Math.max(0, Math.floor((frame - t0 - 10) / 2));
		const txt = (e.texto as string[]).join('\n');
		return (
			<div style={{position: 'absolute', left: 120, right: 120, top: 520, background: '#E8DEC6', padding: '60px 50px', transform: `rotate(${-6 + 4 * p}deg) scale(${0.8 + 0.2 * p})`, opacity: p, boxShadow: '0 30px 60px rgba(0,0,0,0.8)', fontFamily: '"Caveat", cursive', fontSize: 92, color: '#2A1A10', lineHeight: 1.15, whiteSpace: 'pre-line', minHeight: 300}}>
				{txt.slice(0, n)}
			</div>
		);
	},
	relogio: ({frame, t0, e}) => (
		<div style={{position: 'absolute', left: 0, right: 0, top: 560, textAlign: 'center', opacity: entra(frame, t0, 6)}}>
			<span style={{display: 'inline-block', background: '#090909', border: '6px solid #222', borderRadius: 18, padding: '20px 50px', fontFamily: FONTE.impacto, fontSize: 200, color: '#FF3B30', textShadow: '0 0 30px #FF3B30', opacity: Math.floor(frame / 15) % 2 ? 1 : 0.85}}>{e.texto}</span>
		</div>
	),
	batidas: ({frame, fps, t0}) => (
		<>
			{[0, 16, 33].map((d, i) => {
				const f = frame - t0 - Math.round(0.2 * fps) - d;
				if (f < 0 || f > 18) return null;
				const p = f / 18;
				return <div key={i} style={{position: 'absolute', left: 0, right: 0, top: 820 - 40 * p, textAlign: 'center', fontFamily: FONTE.impacto, fontSize: 150 + 60 * p, color: COR.osso, opacity: 1 - p, WebkitTextStroke: '6px #000', paintOrder: 'stroke fill'}}>TOC</div>;
			})}
		</>
	),
};
