import React from 'react';
import {Composition, continueRender, delayRender, staticFile} from 'remotion';
import {carregarFontes} from './fontes';
import {Video, type VideoProps} from './Video';
import {Thumb1, Thumb2, Thumb3} from './Thumbs';
import {Still} from 'remotion';
import {Vitrine} from './serie/Vitrine';
import {Episodio, type EpProps} from './serie/Episodio';
import ep01 from '../episodios/ep01.json';
import ep02 from '../episodios/ep02.json';
import ep03 from '../episodios/ep03.json';
import ep04 from '../episodios/ep04.json';
import ep05 from '../episodios/ep05.json';
import ep06 from '../episodios/ep06.json';
import ep07 from '../episodios/ep07.json';

const EPS = {'01': ep01, '02': ep02, '03': ep03, '04': ep04, '05': ep05, '06': ep06, '07': ep07};

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
		{Object.entries(EPS).map(([n, ep]) => (
			<Composition
				key={n}
				id={`Ep${n}`}
				component={Episodio}
				fps={30}
				width={1080}
				height={1920}
				durationInFrames={1800}
				defaultProps={{ep, tempos: [], fim: 60, pasta: `ep${n}`} as unknown as EpProps}
				calculateMetadata={async ({props}) => {
					const r = await (await fetch(staticFile(`ep${n}/tempos.json`))).json();
					return {durationInFrames: Math.round(r.fim * 30), props: {...props, tempos: r.falas, fim: r.fim}};
				}}
			/>
		))}
		<Composition id="Vitrine" component={Vitrine} fps={30} width={1080} height={1920} durationInFrames={360} />
		<Still id="Thumb1" component={Thumb1} width={1280} height={720} />
		<Still id="Thumb2" component={Thumb2} width={1280} height={720} />
		<Still id="Thumb3" component={Thumb3} width={1280} height={720} />
	</>
);
