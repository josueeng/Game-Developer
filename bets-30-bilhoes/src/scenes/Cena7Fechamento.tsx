import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {CANAL, CORES, FONTES} from '../config';
import {janela, progresso, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Recorte} from '../components/Recorte';
import {MarcaTexto} from '../components/MarcaTexto';
import {Moeda} from '../components/Icones';

export const Cena7Fechamento: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	const fimA = m(2, 10);
	const iniB = m(2, -6);
	const fimB = m(4, 10);
	const iniC = m(4, -6);

	return (
		<AbsoluteFill>
			{/* A: a moeda cai sempre do mesmo lado */}
			<AbsoluteFill style={{opacity: janela(frame, -12, fimA)}}>
				<KenBurns zoom={[1.05, 1.0]}>
					<MoedaGirando inicio={4} pousa={m(1)} />
					<div style={{position: 'absolute', top: 600, width: '100%', textAlign: 'center', fontFamily: FONTES.titulo, fontSize: 60, color: CORES.preto, opacity: progresso(frame, m(1), m(1, 12))}}>
						no longo prazo, <MarcaTexto inicio={m(1, 14)}>quem aposta paga a conta</MarcaTexto>
					</div>
				</KenBurns>
			</AbsoluteFill>

			{/* B: ajuda */}
			<AbsoluteFill style={{opacity: janela(frame, iniB, fimB)}}>
				<KenBurns zoom={[1.0, 1.04]}>
					<Recorte seed="ajuda" inicio={iniB + 4} rotacao={-1.5} style={{left: 360, top: 200, width: 1200}} padding="44px 56px">
						<div style={{display: 'flex', alignItems: 'center', gap: 44}}>
							<svg width="180" height="170" viewBox="0 0 100 95">
								<path d="M50 88 C20 66 6 50 6 30 C6 16 17 6 30 6 C40 6 46 12 50 18 C54 12 60 6 70 6 C83 6 94 16 94 30 C94 50 80 66 50 88Z" fill={CORES.amarelo} stroke={CORES.preto} strokeWidth="6" strokeLinejoin="round" />
							</svg>
							<div>
								<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 36, color: CORES.cinza}}>A APOSTA VIROU PROBLEMA?</div>
								<div style={{fontFamily: FONTES.titulo, fontSize: 76, color: CORES.preto, lineHeight: 1.1}}>
									Procure o <MarcaTexto inicio={m(3, 6)}>CAPS</MarcaTexto>
								</div>
								<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 40, color: CORES.azul, marginTop: 6}}>da sua cidade, de graça pelo SUS</div>
							</div>
						</div>
					</Recorte>
				</KenBurns>
			</AbsoluteFill>

			{/* C: inscrição */}
			<AbsoluteFill style={{opacity: janela(frame, iniC, 99999)}}>
				<KenBurns zoom={[1.0, 1.04]}>
					<div style={{position: 'absolute', top: 150, width: '100%', textAlign: 'center', fontFamily: FONTES.titulo, fontSize: 84, color: CORES.preto}}>
						fatos {'>'} <MarcaTexto inicio={m(5)}>boatos</MarcaTexto>
					</div>
					<Inscricao inicio={iniC + 6} clique={m(5, 30)} />
				</KenBurns>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

// Moeda gira e pousa no lado "CASA".
const MoedaGirando: React.FC<{inicio: number; pousa: number}> = ({inicio, pousa}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const girando = frame < pousa;
	const ang = girando ? (frame - inicio) * 24 : 0;
	const queda = spring({frame: frame - pousa, fps, config: {damping: 9}});
	const sx = girando ? Math.max(0.06, Math.abs(Math.cos((ang * Math.PI) / 180))) : 1;
	const frente = !girando || Math.cos((ang * Math.PI) / 180) > 0;
	const y = girando ? -40 * Math.abs(Math.sin(((frame - inicio) * Math.PI) / 18)) : 0;
	return (
		<div style={{position: 'absolute', left: 960 - 190, top: 140 + y, transform: `scaleX(${sx}) scale(${girando ? 1 : interpolate(queda, [0, 1], [1.2, 1])})`, filter: 'drop-shadow(0 16px 18px rgba(40,30,15,0.35))'}}>
			<Moeda tamanho={380} cor={frente && !girando ? CORES.amarelo : CORES.azulClaro} texto={girando ? 'R$' : 'CASA'} />
		</div>
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
