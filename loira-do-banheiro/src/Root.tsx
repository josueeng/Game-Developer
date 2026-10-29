import React from 'react';
import {Composition, continueRender, delayRender, staticFile} from 'remotion';
import {carregarFontes} from './fontes';
import {Video, type VideoProps} from './Video';
import {Thumb1, Thumb2, Thumb3} from './Thumbs';
import {Still} from 'remotion';

const espera = delayRender('Carregando fontes');
carregarFontes().then(() => continueRender(espera));

const vazio: VideoProps = {
	falas: Array.from({length: 42}, (_, i) => ({de: i * 4, ate: i * 4 + 3, tipo: 'N'})),
	ev: {cenas: [0, 20, 40, 60, 80, 100, 120, 135, 155], titulo: 16, drops: [], risers: [], punch: [], batidas: [1, 2, 3], digita: [{de: 42, texto: ''}, {de: 85, texto: ''}], coracao: [0, 0], caixinha: [], apagao: 169, fim: 171},
};

export const RemotionRoot: React.FC = () => (
	<>
		<Composition
			id="Video"
			component={Video}
			fps={30}
			width={1920}
			height={1080}
			durationInFrames={30 * 171}
			defaultProps={vazio}
			calculateMetadata={async () => {
				const tempos = await (await fetch(staticFile('narracao-tempos.json'))).json();
				const ev = await (await fetch(staticFile('eventos.json'))).json();
				return {durationInFrames: Math.round(ev.fim * 30), props: {falas: tempos.falas, ev}};
			}}
		/>
		<Still id="Thumb1" component={Thumb1} width={1280} height={720} />
		<Still id="Thumb2" component={Thumb2} width={1280} height={720} />
		<Still id="Thumb3" component={Thumb3} width={1280} height={720} />
	</>
);
