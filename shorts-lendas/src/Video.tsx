import React from 'react';
import {AbsoluteFill, Audio, interpolate, random, staticFile, useCurrentFrame} from 'remotion';
import {Cena1, Cena2, Cena3, Cena4, Cena5, Cena6, Cena7, Cena8, Cena9, FPS, type Ctx, type Eventos, type Fala} from './Cenas';
import {Flash, Grao, Legenda, VERMELHO} from './Efeitos';
import {LEGENDAS} from './falas';

export type VideoProps = {falas: Fala[]; ev: Eventos};
const CENAS = [Cena1, Cena2, Cena3, Cena4, Cena5, Cena6, Cena7, Cena8, Cena9];

export const Video: React.FC<VideoProps> = ({falas, ev}) => {
	const f = useCurrentFrame();
	const t = f / FPS;
	const c: Ctx = {f, falas, ev};
	const idx = ev.cenas.reduce((a, ini, i) => (t >= ini ? i : a), 0);
	const Cena = CENAS[idx];
	// punch-in: zoom rápido + tremor que decai
	const imp = ev.punch.reduce((a, tp) => {
		const d = f - Math.round(tp * FPS);
		return d >= 0 && d < 24 ? Math.max(a, Math.exp(-d / 7)) : a;
	}, 0);
	const sx = (random(`sx${f}`) - 0.5) * 22 * imp;
	const sy = (random(`sy${f}`) - 0.5) * 14 * imp;
	// leve Ken Burns dentro de cada cena
	const ini = ev.cenas[idx];
	const fimCena = ev.cenas[idx + 1] ?? ev.fim;
	const kb = interpolate(t, [ini, fimCena], [1, 1.04], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	// mergulho em preto de 4 quadros a cada troca de cena
	const corte = ev.cenas.slice(1).some((tc) => Math.abs(f - Math.round(tc * FPS)) < 3);
	const falaAtual = falas.findIndex((x, i) => t >= x.de - 0.05 && t <= (falas[i + 1] ? Math.min(x.ate + 0.5, falas[i + 1].de - 0.05) : x.ate + 0.8));
	const leg = falaAtual >= 0 ? LEGENDAS[falaAtual] : null;
	const noturna = idx === 0 || idx === 5 || idx === 8;

	return (
		<AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
			<AbsoluteFill style={{transform: `translate(${sx}px, ${sy}px) scale(${kb * (1 + 0.1 * imp)})`}}>
				<Cena c={c} />
			</AbsoluteFill>
			<Grao frame={f} forca={noturna ? 0.22 : 0.14} />
			<Flash frame={f} tempos={ev.drops} fps={FPS} />
			<Flash frame={f} tempos={ev.punch} fps={FPS} cor={VERMELHO} />
			<AbsoluteFill style={{background: 'linear-gradient(rgba(0,0,0,0) 72%, rgba(0,0,0,0.85) 100%)', pointerEvents: 'none'}} />
			{corte ? <AbsoluteFill style={{background: '#000'}} /> : null}
			{leg && t < ev.apagao ? <Legenda frame={f} de={falas[falaAtual].de} ate={falas[falaAtual].ate} texto={leg.texto} chave={leg.chave} fps={FPS} sussurro={falas[falaAtual].tipo === 'S'} /> : null}
			<Audio src={staticFile('sons.mp3')} volume={0.55} />
			<Audio src={staticFile('narracao.mp3')} />
			<Audio src={staticFile('sussurro.mp3')} volume={1} />
		</AbsoluteFill>
	);
};
