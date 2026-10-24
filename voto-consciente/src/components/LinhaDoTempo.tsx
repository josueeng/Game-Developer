import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {CORES, FONTES} from '../config';
import {progresso} from '../anim';

export type Marco = {ano: string; texto: string; destaque?: boolean};

// Linha do tempo horizontal: a linha é "desenhada" e cada marco surge quando
// a linha passa por ele. Rótulos alternam acima/abaixo para não colidir.
export const LinhaDoTempo: React.FC<{
	marcos: Marco[];
	posicoes: number[]; // 0–1 ao longo da linha
	inicio: number;
	duracao: number;
	largura: number;
}> = ({marcos, posicoes, inicio, duracao, largura}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const p = progresso(frame, inicio, inicio + duracao);
	return (
		<div style={{position: 'relative', width: largura, height: 360}}>
			<div style={{position: 'absolute', top: 178, left: 0, height: 8, width: largura * p, background: CORES.preto, borderRadius: 4}} />
			<div
				style={{
					position: 'absolute',
					top: 166,
					left: largura * p - 6,
					width: 0,
					height: 0,
					borderTop: '16px solid transparent',
					borderBottom: '16px solid transparent',
					borderLeft: `26px solid ${CORES.preto}`,
					opacity: p > 0.02 && p < 1 ? 1 : p >= 1 ? 1 : 0,
				}}
			/>
			{marcos.map((m, i) => {
				const chegada = inicio + posicoes[i] * duracao;
				const e = spring({frame: frame - chegada, fps, config: {damping: 12, mass: 0.6}});
				const acima = i % 2 === 0;
				const x = posicoes[i] * largura;
				return (
					<div key={m.ano} style={{position: 'absolute', left: x, top: 0, height: 360, width: 0}}>
						<div
							style={{
								position: 'absolute',
								top: 160,
								left: -22,
								width: 44,
								height: 44,
								borderRadius: 22,
								background: m.destaque ? CORES.amarelo : CORES.azul,
								border: `5px solid ${CORES.preto}`,
								boxSizing: 'border-box',
								transform: `scale(${e})`,
							}}
						/>
						<div
							style={{
								position: 'absolute',
								left: -170,
								width: 340,
								textAlign: 'center',
								top: acima ? 0 : 222,
								opacity: interpolate(e, [0, 0.4], [0, 1], {extrapolateRight: 'clamp'}),
								transform: `translateY(${interpolate(e, [0, 1], [acima ? 20 : -20, 0])}px)`,
							}}
						>
							{acima ? null : <div style={{fontFamily: FONTES.titulo, fontSize: 54, color: CORES.preto, lineHeight: 1}}>{m.ano}</div>}
							<div style={{fontFamily: FONTES.texto, fontWeight: 700, fontSize: 28, lineHeight: 1.2, color: CORES.preto, marginTop: acima ? 0 : 6, marginBottom: acima ? 6 : 0, minHeight: acima ? 76 : undefined, display: 'flex', alignItems: 'flex-end', justifyContent: 'center'}}>
								{m.texto}
							</div>
							{acima ? <div style={{fontFamily: FONTES.titulo, fontSize: 54, color: CORES.preto, lineHeight: 1}}>{m.ano}</div> : null}
						</div>
					</div>
				);
			})}
		</div>
	);
};
