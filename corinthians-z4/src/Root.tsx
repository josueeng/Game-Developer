import React from 'react';
import {Composition, continueRender, delayRender, staticFile} from 'remotion';
import {carregarFontes} from './fontes';
import {Corinthians, type CorProps} from './Corinthians';
import epv from '../episodios/epv.json';
import epe from '../episodios/epe.json';
import epd from '../episodios/epd.json';

const espera = delayRender('Carregando fontes');
carregarFontes().then(() => continueRender(espera));

const EPS = {Vitoria: ['v', epv], Empate: ['e', epe], Derrota: ['d', epd]} as const;

export const RemotionRoot: React.FC = () => (
	<>
		{Object.entries(EPS).map(([nome, [k, ep]]) => (
			<Composition
				key={nome}
				id={nome}
				component={Corinthians}
				fps={30}
				width={1080}
				height={1920}
				durationInFrames={2100}
				defaultProps={{ep, tempos: [], fim: 70, pasta: `ep${k}`} as unknown as CorProps}
				calculateMetadata={async ({props}) => {
					const r = await (await fetch(staticFile(`ep${k}/tempos.json`))).json();
					return {durationInFrames: Math.round(r.fim * 30), props: {...props, tempos: r.falas, fim: r.fim}};
				}}
			/>
		))}
	</>
);
