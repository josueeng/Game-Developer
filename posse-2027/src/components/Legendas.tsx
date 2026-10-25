import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import type {Legenda} from '../timing';

// Legendas grandes queimadas no vídeo, numa tira de papel na parte de baixo.
export const Legendas: React.FC<{legendas: Legenda[]}> = ({legendas}) => {
	const frame = useCurrentFrame();
	const atual = legendas.find((l) => frame >= l.de && frame <= l.ate);
	if (!atual) return null;
	const op = interpolate(frame, [atual.de, atual.de + 4, atual.ate - 3, atual.ate], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const sobe = interpolate(frame, [atual.de, atual.de + 6], [10, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	return (
		<AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 64}}>
			<div
				style={{
					maxWidth: 1560,
					background: CORES.preto,
					color: CORES.papel,
					fontFamily: FONTES.texto,
					fontWeight: 800,
					fontSize: 52,
					lineHeight: 1.22,
					textAlign: 'center',
					padding: '14px 34px 16px',
					boxShadow: '0 10px 24px rgba(20,15,5,0.35)',
					opacity: op,
					transform: `translateY(${sobe}px)`,
				}}
			>
				{atual.texto}
			</div>
		</AbsoluteFill>
	);
};
