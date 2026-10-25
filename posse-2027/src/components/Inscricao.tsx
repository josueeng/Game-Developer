import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {CANAL, CORES, FONTES} from '../config';
import {progresso} from '../anim';
import {Recorte} from './Recorte';

// Card do canal com botão de inscrição e cursor clicando.
export const Inscricao: React.FC<{inicio: number; clique: number}> = ({inicio, clique}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const inscrito = frame >= clique;
	const aperto = spring({frame: frame - clique, fps, config: {damping: 9}});
	const cursor = progresso(frame, clique - 26, clique - 2);
	return (
		<>
			<Recorte seed="canal" inicio={inicio} cor={CORES.preto} rotacao={-1.5} style={{left: 360, top: 430, width: 1200}} padding="30px 40px">
				<div style={{display: 'flex', alignItems: 'center', gap: 30}}>
					<div style={{width: 120, height: 120, borderRadius: 60, background: CORES.amarelo, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONTES.titulo, fontSize: 56, color: CORES.preto, flexShrink: 0}}>
						{CANAL.nome.split(' ').map((p) => p[0]).join('').slice(0, 2)}
					</div>
					<div style={{flex: 1, fontFamily: FONTES.titulo, fontSize: 54, color: CORES.papel, whiteSpace: 'nowrap'}}>{CANAL.nome}</div>
					<div
						style={{
							padding: '18px 30px',
							background: inscrito ? CORES.azulClaro : CORES.amarelo,
							border: `4px solid ${CORES.papel}`,
							fontFamily: FONTES.texto,
							fontWeight: 800,
							fontSize: 36,
							color: CORES.preto,
							transform: `scale(${inscrito ? interpolate(aperto, [0, 1], [0.85, 1]) : 1})`,
							whiteSpace: 'nowrap',
						}}
					>
						{inscrito ? 'Inscrito!' : CANAL.chamada}
					</div>
				</div>
			</Recorte>
			<svg
				width="70"
				height="80"
				viewBox="0 0 70 80"
				style={{
					position: 'absolute',
					left: interpolate(cursor, [0, 1], [1640, 1390]),
					top: interpolate(cursor, [0, 1], [760, 540]),
					opacity: frame > clique - 30 ? 1 : 0,
					filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.3))',
				}}
			>
				<path d="M6 4 L6 64 L22 50 L34 76 L46 70 L34 45 L56 45 Z" fill={CORES.papel} stroke={CORES.preto} strokeWidth={5} strokeLinejoin="round" />
			</svg>
		</>
	);
};
