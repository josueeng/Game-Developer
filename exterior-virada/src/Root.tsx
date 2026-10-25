import React from 'react';
import {Composition, Still, staticFile, continueRender, delayRender} from 'remotion';
import {FPS} from './config';
import {carregarFontes} from './fontes';
import {ShortExterior, type ShortProps} from './ShortExterior';
import {Capa} from './Capa';
import {DURACOES_PADRAO, type TemposNarracao} from './timing';

const esperaFontes = delayRender('Carregando fontes');
carregarFontes().then(() => continueRender(esperaFontes));

const PADRAO = DURACOES_PADRAO[0];

export const RemotionRoot: React.FC = () => (
	<>
		<Composition
			id="Short"
			component={ShortExterior}
			fps={FPS}
			width={1080}
			height={1920}
			durationInFrames={PADRAO}
			defaultProps={{temNarracao: false, duracao: PADRAO} satisfies ShortProps}
			calculateMetadata={async () => {
				try {
					const r = await fetch(staticFile('narracao-tempos.json'));
					if (!r.ok) throw new Error();
					const t = (await r.json()) as TemposNarracao;
					const duracao = Math.round(t.fim * FPS);
					return {durationInFrames: duracao, props: {temNarracao: true, duracao, temposLegendas: t.legendas ?? null}};
				} catch {
					return {durationInFrames: PADRAO, props: {temNarracao: false, duracao: PADRAO}};
				}
			}}
		/>
		<Still id="Capa" component={Capa} width={1080} height={1920} />
	</>
);
