import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';

// Número que cresce de `de` até `para`, formatado em pt-BR.
export const Numero: React.FC<{
	para: number;
	de?: number;
	inicio: number;
	duracao?: number;
	casas?: number;
	prefixo?: string;
	sufixo?: string;
	style?: React.CSSProperties;
}> = ({para, de = 0, inicio, duracao = 45, casas = 0, prefixo = '', sufixo = '', style}) => {
	const frame = useCurrentFrame();
	const v = interpolate(frame, [inicio, inicio + duracao], [de, para], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});
	const texto = v.toLocaleString('pt-BR', {minimumFractionDigits: casas, maximumFractionDigits: casas});
	return (
		<span style={{fontVariantNumeric: 'tabular-nums', ...style}}>
			{prefixo}
			{texto}
			{sufixo}
		</span>
	);
};
