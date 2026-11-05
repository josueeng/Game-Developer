import React from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Glitch, Grao} from '../Efeitos';
import {Floresta} from './Cenarios';
import {Borrado, camera, COR, Ficha, FONTE, Gancho, LegendaPop, Neblina, Particulas, SeloSerie, VazamentoLuz, agrupar} from './Vertical';

// Vitrine do kit (12 s, sem narração): mostra cada efeito em sequência.
const FPS = 30;
export const Vitrine: React.FC = () => {
	const f = useCurrentFrame();
	const punch = f >= 150 && f < 168;
	const z = punch ? interpolate(f, [150, 156, 168], [1, 1.35, 1.15]) : f >= 168 ? 1.15 - 0.15 * interpolate(f, [168, 200], [0, 1], {extrapolateRight: 'clamp'}) : 1;
	const grupos = agrupar('Isto é a legenda nova: duas ou três palavras por vez, e a palavra-chave em amarelo.', 2.6, 4.9, 'palavra-chave');
	return (
		<AbsoluteFill style={{background: COR.noite, overflow: 'hidden'}}>
			<Borrado ativo={punch}>
				<AbsoluteFill style={{transform: `${camera(f, punch ? 1 : 0)} scale(${z})`}}>
					<Floresta frame={f} avanco={f * 4} />
					<Neblina frame={f} />
					<Particulas frame={f} />
				</AbsoluteFill>
			</Borrado>
			<VazamentoLuz de={150} dur={34} hue={340} />
			{f >= 150 && f < 154 ? <AbsoluteFill style={{background: COR.sangue, opacity: 0.6}} /> : null}
			<Gancho frame={f} linhas={['ELE NÃO FOI', 'ACEITO NEM', 'PELA TERRA']} destaque={2} ate={72} />
			<LegendaPop frame={f} fps={FPS} grupos={grupos} />
			{f >= 170 && f < 205 ? <Glitch frame={f} inicio={170} style={{fontFamily: FONTE.terror, fontSize: 150, textAlign: 'center'}}><div>CORPO</div><div>SECO</div></Glitch> : null}
			<Ficha frame={f} de={210} linhas={['ARQUIVO Nº 01', 'LOCAL: ??????', 'STATUS: SEM EXPLICAÇÃO']} carimbo="ARQUIVADO" />
			<SeloSerie numero={1} />
			<Grao frame={f} forca={0.2} />
			<Audio src={staticFile('vitrine.mp3')} />
			{f >= 345 ? <AbsoluteFill style={{background: '#000', opacity: interpolate(f, [345, 359], [0, 1])}} /> : null}
		</AbsoluteFill>
	);
};
