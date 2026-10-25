import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {useEntrada, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Fonte} from '../components/Fonte';
import {Recorte} from '../components/Recorte';
import {RecorteJornal} from '../components/RecorteJornal';
import {MarcaTexto} from '../components/MarcaTexto';
import {Pessoa} from '../components/Icones';
import {Placar} from '../components/Futebol';

// Volta da semifinal (22/10/2026, Maracanã): 0 × 0, Estudiantes 3 × 2 nos
// pênaltis. Reclamação do Flamengo à Conmebol em 23/10.
export const Cena1Gancho: React.FC = () => {
	const m = useMarcas();
	return (
		<AbsoluteFill>
			<KenBurns zoom={[1.0, 1.07]} pan={[-10, -10]}>
				<div style={{position: 'absolute', left: 150, top: 170}}>
					<Entrada inicio={2}>
						<Placar largura={900} esquerda="FLAMENGO" direita="ESTUDIANTES" gols={[0, 0]} topo="SEMIFINAL · VOLTA · 22/10" rodape="pênaltis: Estudiantes 3 × 2" />
					</Entrada>
				</div>
				<Carimbo texto="ELIMINADO" inicio={m(0, 30)} x={330} y={440} />
				<RecorteJornal
					seed="jornal-fla"
					inicio={m(1)}
					x={1120}
					y={150}
					largura={660}
					rotacao={2}
					tamanhoManchete={56}
					data="OUTUBRO DE 2026"
					manchete={
						<>
							Flamengo pede a <MarcaTexto inicio={m(1, 20)}>vaga na final</MarcaTexto>
						</>
					}
					linhas={3}
					colunas={2}
				/>
				<Recorte seed="rojo" inicio={m(2)} cor={CORES.azul} rotacao={-2} style={{left: 1080, top: 580, width: 720}} padding="16px 26px">
					<div style={{display: 'flex', alignItems: 'center', gap: 22}}>
						<div style={{background: CORES.azulClaro, border: `4px solid ${CORES.preto}`, width: 110, height: 120, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden', flexShrink: 0}}>
							<Pessoa tamanho={100} cor={CORES.papel} />
						</div>
						<div>
							<div style={{fontFamily: FONTES.titulo, fontSize: 56, color: CORES.papel, lineHeight: 1, whiteSpace: 'nowrap'}}>MARCOS ROJO</div>
							<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 30, color: CORES.azulClaro}}>zagueiro do Estudiantes</div>
						</div>
					</div>
				</Recorte>
				<Fonte texto="CONMEBOL LIBERTADORES 2026 · IMPRENSA (OUT/2026)" inicio={20} style={{left: 160, top: 790}} />
			</KenBurns>
		</AbsoluteFill>
	);
};

const Entrada: React.FC<{inicio: number; children: React.ReactNode}> = ({inicio, children}) => {
	const e = useEntrada(inicio);
	return <div style={{opacity: interpolate(e, [0, 0.3], [0, 1], {extrapolateRight: 'clamp'}), transform: `translateY(${(1 - e) * 30}px) rotate(-1.5deg)`}}>{children}</div>;
};

const Carimbo: React.FC<{texto: string; inicio: number; x: number; y: number}> = ({texto, inicio, x, y}) => {
	const frame = useCurrentFrame();
	const e = useEntrada(inicio, {damping: 10, mass: 0.6});
	return (
		<div
			style={{
				position: 'absolute',
				left: x,
				top: y,
				padding: '12px 40px',
				border: `12px solid ${CORES.preto}`,
				borderRadius: 16,
				background: CORES.amarelo,
				fontFamily: FONTES.titulo,
				fontSize: 96,
				color: CORES.preto,
				transform: `rotate(-8deg) scale(${interpolate(e, [0, 1], [2, 1])})`,
				opacity: frame < inicio ? 0 : interpolate(e, [0, 0.2], [0, 1], {extrapolateRight: 'clamp'}),
				boxShadow: '0 12px 20px rgba(30,20,5,0.35)',
			}}
		>
			{texto}
		</div>
	);
};
