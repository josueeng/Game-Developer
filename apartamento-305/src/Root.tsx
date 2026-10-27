import React from 'react';
import {Composition, continueRender, delayRender, staticFile} from 'remotion';
import {carregarFontes} from './fontes';
import {Historia, type HistoriaProps} from './Historia';

const espera = delayRender('Carregando fontes');
carregarFontes().then(() => continueRender(espera));

const vazio: HistoriaProps = {
	falas: Array.from({length: 14}, (_, i) => ({de: i * 4, ate: i * 4 + 3})),
	ev: {batidas1: [], batidas2: [], marina: [], resposta: [], rangidoDe: 50, rangidoAte: 52, apagao: 53, diaDe: 14, diaAte: 26, fim: 58},
};

export const RemotionRoot: React.FC = () => (
	<Composition
		id="Short"
		component={Historia}
		fps={30}
		width={1080}
		height={1920}
		durationInFrames={30 * 58}
		defaultProps={vazio}
		calculateMetadata={async () => {
			const tempos = await (await fetch(staticFile('narracao-tempos.json'))).json();
			const ev = await (await fetch(staticFile('eventos.json'))).json();
			return {durationInFrames: Math.round(ev.fim * 30), props: {falas: tempos.falas, ev}};
		}}
	/>
);
