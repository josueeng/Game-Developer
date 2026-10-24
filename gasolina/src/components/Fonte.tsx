import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';

// Crédito da fonte do dado, pequeno, sempre visível junto ao dado.
export const Fonte: React.FC<{texto: string; inicio?: number; style?: React.CSSProperties}> = ({
	texto,
	inicio = 0,
	style,
}) => {
	const frame = useCurrentFrame();
	return (
		<div
			style={{
				position: 'absolute',
				fontFamily: FONTES.texto,
				fontWeight: 700,
				fontSize: 21,
				letterSpacing: 0.4,
				color: CORES.cinza,
				display: 'flex',
				alignItems: 'center',
				gap: 10,
				opacity: interpolate(frame, [inicio, inicio + 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
				...style,
			}}
		>
			<span style={{width: 12, height: 12, background: CORES.azul, display: 'inline-block', flexShrink: 0}} />
			<span>FONTE: {texto}</span>
		</div>
	);
};
