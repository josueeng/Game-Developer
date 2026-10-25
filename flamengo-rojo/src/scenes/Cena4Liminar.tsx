import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {CORES, FONTES} from '../config';
import {progresso, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Recorte} from '../components/Recorte';
import {Fonte} from '../components/Fonte';
import {MarcaTexto} from '../components/MarcaTexto';
import {Balanca} from '../components/Futebol';

// Liminar do CAS de 21/10/2026: decisão provisória; o mérito não foi julgado.
// "Responsabilidade do Estudiantes" é a leitura do Flamengo (nota de 24/10).
export const Cena4Liminar: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	return (
		<AbsoluteFill>
			<KenBurns zoom={[1.0, 1.05]} origem="30% 50%">
				<Recorte seed="doc-cas" inicio={4} cor="#F7F1E1" rotacao={-1.5} intensidade={1.4} style={{left: 130, top: 150, width: 760}} padding="30px 40px 36px">
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 24, letterSpacing: 2, color: CORES.cinza, borderBottom: `3px solid ${CORES.preto}`, paddingBottom: 10, marginBottom: 16}}>
						CAS · TRIBUNAL ARBITRAL DO ESPORTE
					</div>
					<div style={{fontFamily: FONTES.jornal, fontWeight: 900, fontSize: 50, color: CORES.preto, lineHeight: 1.1}}>Liminar de 21/10/2026</div>
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 30, color: CORES.preto, marginTop: 10}}>Rojo pode ser inscrito</div>
					<div style={{display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20}}>
						{[92, 84, 70].map((w) => (
							<div key={w} style={{height: 10, width: `${w}%`, background: '#B9AE98', borderRadius: 3}} />
						))}
					</div>
				</Recorte>
				<Carimbo inicio={m(1, 10)} />
				<div style={{position: 'absolute', left: 1060, top: 150, opacity: progresso(frame, m(2), m(2, 14))}}>
					<Balanca
						inclinacao={-0.5 * progresso(frame, m(2, 10), m(3, 10))}
						esquerda={
							<div>
								<div style={{fontFamily: FONTES.titulo, fontSize: 36, color: CORES.preto}}>LIMINAR</div>
								<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 26, color: CORES.cinza}}>vale agora</div>
							</div>
						}
						direita={
							<div style={{opacity: progresso(frame, m(3), m(3, 10))}}>
								<div style={{fontFamily: FONTES.titulo, fontSize: 36, color: CORES.preto}}>MÉRITO</div>
								<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 26, color: CORES.cinza}}>ainda não julgado</div>
							</div>
						}
					/>
				</div>
				<Recorte seed="fla-diz" inicio={m(4)} rotacao={1} style={{left: 130, top: 600, width: 860}} padding="18px 28px">
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 26, color: CORES.cinza}}>SEGUNDO O FLAMENGO:</div>
					<div style={{fontFamily: FONTES.titulo, fontSize: 38, color: CORES.preto, lineHeight: 1.2}}>
						usar o jogador era <MarcaTexto inicio={m(5)}>responsabilidade do Estudiantes</MarcaTexto>
					</div>
				</Recorte>
				<Fonte texto="NOTA OFICIAL DO FLAMENGO (24/10/2026)" inicio={m(4)} style={{left: 140, top: 795}} />
			</KenBurns>
		</AbsoluteFill>
	);
};

const Carimbo: React.FC<{inicio: number}> = ({inicio}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const s = spring({frame: frame - inicio, fps, config: {damping: 10, stiffness: 180}});
	return (
		<div
			style={{
				position: 'absolute',
				left: 420,
				top: 380,
				padding: '10px 34px',
				border: `10px solid ${CORES.azul}`,
				borderRadius: 14,
				color: CORES.azul,
				background: 'rgba(251,246,234,0.8)',
				fontFamily: FONTES.titulo,
				fontSize: 72,
				transform: `rotate(-10deg) scale(${interpolate(s, [0, 1], [2.2, 1])})`,
				opacity: frame < inicio ? 0 : interpolate(s, [0, 0.2], [0, 1], {extrapolateRight: 'clamp'}),
			}}
		>
			PROVISÓRIO
		</div>
	);
};
