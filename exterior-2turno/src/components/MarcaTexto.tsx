import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CORES} from '../config';
import {progresso} from '../anim';

// Trecho marcado com marca-texto amarelo, que "passa" da esquerda para a direita.
export const MarcaTexto: React.FC<{
	children: React.ReactNode;
	inicio: number;
	duracao?: number;
	cor?: string;
}> = ({children, inicio, duracao = 18, cor = CORES.amarelo}) => {
	const frame = useCurrentFrame();
	const p = progresso(frame, inicio, inicio + duracao);
	return (
		<span
			style={{
				backgroundImage: `linear-gradient(100deg, transparent 0.04em, ${cor} 0.12em, ${cor} calc(100% - 0.12em), transparent calc(100% - 0.04em))`,
				backgroundRepeat: 'no-repeat',
				backgroundSize: `${p * 100}% 72%`,
				backgroundPosition: '0 70%',
				boxDecorationBreak: 'clone',
				WebkitBoxDecorationBreak: 'clone',
				padding: '0 0.18em',
				margin: '0 -0.18em',
			}}
		>
			{children}
		</span>
	);
};
