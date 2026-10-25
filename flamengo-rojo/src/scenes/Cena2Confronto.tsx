import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {progresso, useEntrada, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Fonte} from '../components/Fonte';
import {Placar} from '../components/Futebol';

// Ida: 15/10/2026, La Plata, 0 × 0. Volta: 22/10/2026, Maracanã, 0 × 0,
// Estudiantes 3 × 2 nos pênaltis. Final: 28/11, Estádio Centenário (Montevidéu).
export const Cena2Confronto: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	return (
		<AbsoluteFill>
			<KenBurns zoom={[1.0, 1.05]}>
				<div style={{position: 'absolute', left: 140, top: 130}}>
					<Entrada inicio={m(1)} rot={-1.5}>
						<Placar largura={780} esquerda="ESTUDIANTES" direita="FLAMENGO" corEsq={CORES.azul} corDir={CORES.preto} gols={[0, 0]} topo="IDA · 15/10 · LA PLATA" />
					</Entrada>
				</div>
				<div style={{position: 'absolute', left: 1000, top: 130}}>
					<Entrada inicio={m(2)} rot={1.5}>
						<Placar
							largura={780}
							esquerda="FLAMENGO"
							direita="ESTUDIANTES"
							gols={[0, 0]}
							topo="VOLTA · 22/10 · MARACANÃ"
							rodape={<span style={{opacity: progresso(frame, m(3), m(3, 10))}}>pênaltis: Estudiantes 3 × 2</span>}
						/>
					</Entrada>
				</div>

				{/* Chaveamento da final */}
				<div style={{position: 'absolute', left: 0, right: 0, top: 500, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 30, opacity: progresso(frame, m(4), m(4, 12))}}>
					<Caixa texto="ESTUDIANTES" cor={CORES.azul} />
					<Seta />
					<div style={{background: CORES.amarelo, border: `6px solid ${CORES.preto}`, padding: '18px 34px', textAlign: 'center', boxShadow: '0 12px 18px rgba(40,30,15,0.3)'}}>
						<div style={{fontFamily: FONTES.titulo, fontSize: 56, color: CORES.preto}}>FINAL</div>
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 30, color: CORES.preto, whiteSpace: 'nowrap', opacity: progresso(frame, m(5), m(5, 10))}}>28/11 · Montevidéu</div>
					</div>
					<Seta inverter />
					<Caixa texto="PALMEIRAS" cor={CORES.cinza} />
				</div>
				<Fonte texto="CONMEBOL LIBERTADORES 2026 · ESPN / INFOBAE / LIBERO" inicio={m(1)} style={{left: 150, top: 790}} />
			</KenBurns>
		</AbsoluteFill>
	);
};

const Entrada: React.FC<{inicio: number; rot: number; children: React.ReactNode}> = ({inicio, rot, children}) => {
	const e = useEntrada(inicio);
	return <div style={{opacity: interpolate(e, [0, 0.3], [0, 1], {extrapolateRight: 'clamp'}), transform: `translateY(${(1 - e) * 30}px) rotate(${rot}deg)`}}>{children}</div>;
};

const Caixa: React.FC<{texto: string; cor: string}> = ({texto, cor}) => (
	<div style={{background: cor, border: `5px solid ${CORES.preto}`, padding: '20px 30px', fontFamily: FONTES.titulo, fontSize: 40, color: CORES.papel, boxShadow: '0 10px 16px rgba(40,30,15,0.25)'}}>{texto}</div>
);

const Seta: React.FC<{inverter?: boolean}> = ({inverter}) => (
	<svg width="90" height="40" viewBox="0 0 90 40" style={{transform: inverter ? 'scaleX(-1)' : undefined}}>
		<path d="M4 20 H76 M60 6 L80 20 L60 34" fill="none" stroke={CORES.preto} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);
