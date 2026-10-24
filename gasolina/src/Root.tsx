import React from 'react';
import {Composition, Still, staticFile, continueRender, delayRender} from 'remotion';
import {getAudioDurationInSeconds} from '@remotion/media-utils';
import {ALTURA, FPS, LARGURA} from './config';
import {carregarFontes} from './fontes';
import {Video, type VideoProps} from './Video';
import {ThumbnailViral} from './ThumbnailViral';
import {DURACOES_PADRAO, duracoesDeTempos, duracoesProporcionais, type TemposNarracao} from './timing';

const esperaFontes = delayRender('Carregando fontes');
carregarFontes().then(() => continueRender(esperaFontes));

const existe = async (arquivo: string) => {
	try {
		const r = await fetch(staticFile(arquivo), {method: 'HEAD'});
		return r.ok;
	} catch {
		return false;
	}
};

// Decide a duração de cada cena:
// 1. sem public/narracao.mp3 → durações do roteiro (versão sem voz);
// 2. com narração e public/narracao-tempos.json → início exato de cada cena;
// 3. só com a narração → cenas esticadas proporcionalmente ao áudio.
const calcularMetadados = async (): Promise<{durationInFrames: number; props: VideoProps}> => {
	let duracoes = DURACOES_PADRAO;
	let temposLegendas: VideoProps['temposLegendas'] = null;
	const temNarracao = await existe('narracao.mp3');
	if (temNarracao) {
		if (await existe('narracao-tempos.json')) {
			const tempos = (await (await fetch(staticFile('narracao-tempos.json'))).json()) as TemposNarracao;
			duracoes = duracoesDeTempos(tempos);
			temposLegendas = tempos.legendas ?? null;
		} else {
			const segundos = await getAudioDurationInSeconds(staticFile('narracao.mp3'));
			duracoes = duracoesProporcionais(Math.ceil((segundos + 1.5) * FPS));
		}
	}
	return {durationInFrames: duracoes.reduce((a, b) => a + b, 0), props: {temNarracao, duracoes, temposLegendas}};
};

export const RemotionRoot: React.FC = () => (
	<>
		<Composition
			id="Video"
			component={Video}
			fps={FPS}
			width={LARGURA}
			height={ALTURA}
			durationInFrames={DURACOES_PADRAO.reduce((a, b) => a + b, 0)}
			defaultProps={{temNarracao: false, duracoes: DURACOES_PADRAO} satisfies VideoProps}
			calculateMetadata={calcularMetadados}
		/>
		<Still id="Thumbnail" component={ThumbnailViral} width={1280} height={720} />
	</>
);
