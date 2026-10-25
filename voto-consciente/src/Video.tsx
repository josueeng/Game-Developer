import React, {useMemo} from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile, useVideoConfig} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {FundoPapel} from './components/FundoPapel';
import {Legendas} from './components/Legendas';
import {TRANSICAO, calcularLegendas, inicios, type TempoLegenda} from './timing';
import {MarcasCena} from './anim';
import {ROTEIRO} from './roteiro';
import {Cena1Gancho} from './scenes/Cena1Gancho';
import {Cena2Decide} from './scenes/Cena2Decide';
import {Cena3Numeros} from './scenes/Cena3Numeros';
import {Cena4Pesquisar} from './scenes/Cena4Pesquisar';
import {Cena5Desinformacao} from './scenes/Cena5Desinformacao';
import {Cena6Crime} from './scenes/Cena6Crime';
import {Cena7Fechamento} from './scenes/Cena7Fechamento';

export type VideoProps = {
	temNarracao: boolean;
	duracoes: number[]; // quadros por cena
	temposLegendas?: TempoLegenda[] | null; // segundos, medidos na narração
	semLegendas?: boolean; // os Shorts desenham as próprias legendas, maiores
	fimTrilha?: number; // quadro em que a trilha termina (padrão: fim da composição)
};

const CENAS = [Cena1Gancho, Cena2Decide, Cena3Numeros, Cena4Pesquisar, Cena5Desinformacao, Cena6Crime, Cena7Fechamento];

// Transição de cada corte (entre a cena i e a i+1).
const TRANSICOES = [
	fade(),
	slide({direction: 'from-right'}),
	fade(),
	slide({direction: 'from-bottom'}),
	fade(),
	slide({direction: 'from-right'}),
];

export const Video: React.FC<VideoProps> = ({temNarracao, duracoes, temposLegendas, semLegendas, fimTrilha}) => {
	const {durationInFrames: duracaoComposicao} = useVideoConfig();
	const durationInFrames = fimTrilha ?? duracaoComposicao;
	const legendas = useMemo(() => calcularLegendas(duracoes, temposLegendas), [duracoes, temposLegendas]);
	// Para cada cena, o quadro (relativo à cena) em que cada legenda começa.
	const marcas = useMemo(() => {
		const ini = inicios(duracoes);
		let k = 0;
		return ROTEIRO.map((cena, i) => cena.legendas.map(() => legendas[k++].de - ini[i]));
	}, [duracoes, legendas]);

	return (
		<AbsoluteFill>
			<FundoPapel />
			<TransitionSeries>
				{CENAS.map((Cena, i) => {
					// Cada cena (menos a última) ganha a duração da transição a mais,
					// para que a cena seguinte comece exatamente no seu tempo.
					const dur = duracoes[i] + (i < CENAS.length - 1 ? TRANSICAO : 0);
					return (
						<React.Fragment key={i}>
							<TransitionSeries.Sequence durationInFrames={dur}>
								<MarcasCena.Provider value={marcas[i]}>
									<Cena />
								</MarcasCena.Provider>
							</TransitionSeries.Sequence>
							{i < CENAS.length - 1 ? (
								<TransitionSeries.Transition presentation={TRANSICOES[i]} timing={linearTiming({durationInFrames: TRANSICAO})} />
							) : null}
						</React.Fragment>
					);
				})}
			</TransitionSeries>
			{semLegendas ? null : <Legendas legendas={legendas} />}
			{temNarracao ? <Audio src={staticFile('narracao.mp3')} /> : null}
			<Audio
				src={staticFile('trilha.mp3')}
				volume={(f) =>
					(temNarracao ? 0.12 : 0.45) *
					interpolate(f, [durationInFrames - 60, durationInFrames], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
				}
			/>
		</AbsoluteFill>
	);
};
