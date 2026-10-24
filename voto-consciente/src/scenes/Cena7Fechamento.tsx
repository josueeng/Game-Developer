import React from 'react';
import {AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {CANAL, CORES, FONTES} from '../config';
import {janela, progresso, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Recorte} from '../components/Recorte';
import {Pessoa} from '../components/Icones';
import {MarcaTexto} from '../components/MarcaTexto';

const COLS = 15;
const LINHAS = 4;
const CORES_PESSOAS = [CORES.azul, CORES.preto, CORES.azulClaro, CORES.begeEscuro];

export const Cena7Fechamento: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const m = useMarcas();
	const fimA = m(3, 10);
	const iniB = m(3, -6);
	const centro = {c: 7, l: 2};

	return (
		<AbsoluteFill>
			{/* Parte A: um entre milhões */}
			<AbsoluteFill style={{opacity: janela(frame, -12, fimA)}}>
				<KenBurns zoom={[1.12, 1.0]} origem="50% 60%">
					<div style={{position: 'absolute', top: 90, width: '100%', textAlign: 'center', fontFamily: FONTES.titulo, fontSize: 84, color: CORES.preto}}>
						<span style={{opacity: janela(frame, 0, m(1))}}>
							Um voto entre <MarcaTexto inicio={m(0.6)}>milhões</MarcaTexto>
						</span>
					</div>
					<div style={{position: 'absolute', top: 90, width: '100%', textAlign: 'center', fontFamily: FONTES.titulo, fontSize: 76, color: CORES.preto, opacity: janela(frame, m(1), fimA + 30)}}>
						<MarcaTexto inicio={m(1.3)}>milhões de escolhas</MarcaTexto> conscientes
					</div>
					<div style={{position: 'absolute', left: 150, top: 250, width: 1620, height: 560}}>
						{Array.from({length: COLS * LINHAS}).map((_, i) => {
							const c = i % COLS;
							const l = Math.floor(i / COLS);
							const eu = c === centro.c && l === centro.l;
							const dist = Math.hypot(c - centro.c, (l - centro.l) * 1.6);
							const atraso = eu ? 4 : m(0.7) + dist * 3 + random(`p${i}`) * 6;
							const e = spring({frame: frame - atraso, fps, config: {damping: 12, mass: 0.6}});
							return (
								<div
									key={i}
									style={{
										position: 'absolute',
										left: c * 108,
										top: l * 136 + (c % 2) * 14,
										transform: `scale(${e * (eu ? 1.25 : 1)})`,
										transformOrigin: '50% 100%',
										zIndex: eu ? 2 : 1,
									}}
								>
									<Pessoa tamanho={96} cor={eu ? CORES.amarelo : CORES_PESSOAS[Math.floor(random(`c${i}`) * CORES_PESSOAS.length)]} />
								</div>
							);
						})}
					</div>
				</KenBurns>
			</AbsoluteFill>

			{/* Parte B: chamada final */}
			<AbsoluteFill style={{opacity: janela(frame, iniB, 99999)}}>
				<KenBurns zoom={[1.0, 1.04]}>
					<div style={{position: 'absolute', top: 130, width: '100%', display: 'flex', justifyContent: 'center', gap: 50}}>
						{['Informe-se.', 'Converse.', 'Vote.'].map((p, i) => (
							<div key={p} style={{position: 'relative', width: i === 2 ? 340 : 500, height: 140}}>
								<Recorte seed={`final-${p}`} inicio={iniB + 6 + i * 12} cor={i === 2 ? CORES.amarelo : CORES.papel} rotacao={[-3, 2, -1][i]} style={{left: 0, top: 0, width: '100%'}} padding="22px 0">
									<div style={{fontFamily: FONTES.titulo, fontSize: 76, color: CORES.preto, textAlign: 'center'}}>{p}</div>
								</Recorte>
							</div>
						))}
					</div>
					<Inscricao inicio={m(4)} clique={m(5.5)} />
				</KenBurns>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

const Inscricao: React.FC<{inicio: number; clique: number}> = ({inicio, clique}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const inscrito = frame >= clique;
	const aperto = spring({frame: frame - clique, fps, config: {damping: 9}});
	const cursor = progresso(frame, clique - 26, clique - 2);
	return (
		<>
			<Recorte seed="canal" inicio={inicio} cor={CORES.preto} rotacao={-1.5} style={{left: 500, top: 430, width: 920}} padding="30px 40px">
				<div style={{display: 'flex', alignItems: 'center', gap: 30}}>
					<div style={{width: 120, height: 120, borderRadius: 60, background: CORES.amarelo, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONTES.titulo, fontSize: 56, color: CORES.preto, flexShrink: 0}}>
						{CANAL.nome.split(' ').map((p) => p[0]).join('').slice(0, 2)}
					</div>
					<div style={{flex: 1, fontFamily: FONTES.titulo, fontSize: 60, color: CORES.papel, whiteSpace: 'nowrap'}}>{CANAL.nome}</div>
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
					left: interpolate(cursor, [0, 1], [1500, 1240]),
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
