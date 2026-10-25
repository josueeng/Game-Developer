import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {CORES, FONTES} from '../config';
import {janela, progresso, useEntrada, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Recorte} from '../components/Recorte';
import {RecorteJornal} from '../components/RecorteJornal';
import {Fonte} from '../components/Fonte';
import {MarcaTexto} from '../components/MarcaTexto';
import {Placar} from '../components/Futebol';

// Precedente: Libertadores 2018, Independiente × Santos (oitavas, ida 0 × 0).
// Sánchez tinha suspensão pendente; a Conmebol deu 3 × 0 ao Independiente
// (decisão de 28/08/2018).
export const Cena6Antes: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	const risco = progresso(frame, m(4), m(4, 14));
	return (
		<AbsoluteFill>
			<KenBurns zoom={[1.0, 1.05]}>
				<div style={{position: 'absolute', left: 0, right: 0, top: 260, textAlign: 'center', fontFamily: FONTES.titulo, fontSize: 260, color: CORES.preto, opacity: janela(frame, 0, m(1, 4))}}>
					<MarcaTexto inicio={10}>2018</MarcaTexto>
				</div>
				<RecorteJornal
					seed="jornal-2018"
					inicio={m(1, -6)}
					x={140}
					y={130}
					largura={860}
					rotacao={-2}
					tamanhoManchete={60}
					data="AGOSTO DE 2018"
					manchete={
						<>
							Santos escala jogador <MarcaTexto inicio={m(2)}>com suspensão pendente</MarcaTexto>
						</>
					}
					linhas={3}
				/>
				<div style={{position: 'absolute', left: 1070, top: 160}}>
					<Entrada inicio={m(3)}>
						<Placar largura={720} fonteTime={26} esquerda="INDEPENDIENTE" direita="SANTOS" corEsq={CORES.cinza} corDir={CORES.cinza} gols={[0, 0]} topo="LIBERTADORES 2018 · OITAVAS" riscado={risco} />
					</Entrada>
				</div>
				<CarimboPlacar inicio={m(4, 12)} />
				<Recorte seed="dif-2018" inicio={m(5)} rotacao={-1} style={{left: 200, top: 570, width: 700}} padding="16px 26px">
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 26, color: CORES.cinza}}>2018 · SANTOS</div>
					<div style={{fontFamily: FONTES.titulo, fontSize: 40, color: CORES.preto}}>sem decisão do CAS</div>
				</Recorte>
				<Recorte seed="dif-2026" inicio={m(5, 14)} cor={CORES.amarelo} rotacao={1} style={{left: 1020, top: 570, width: 700}} padding="16px 26px">
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 26, color: CORES.preto}}>2026 · ESTUDIANTES</div>
					<div style={{fontFamily: FONTES.titulo, fontSize: 40, color: CORES.preto}}>com liminar do CAS</div>
				</Recorte>
				<Fonte texto="CONMEBOL (DECISÃO DE 28/08/2018), VIA GAZETA ESPORTIVA" inicio={m(3)} style={{left: 150, top: 795}} />
			</KenBurns>
		</AbsoluteFill>
	);
};

const Entrada: React.FC<{inicio: number; children: React.ReactNode}> = ({inicio, children}) => {
	const e = useEntrada(inicio);
	return <div style={{opacity: interpolate(e, [0, 0.3], [0, 1], {extrapolateRight: 'clamp'}), transform: `translateY(${(1 - e) * 30}px) rotate(1.5deg)`}}>{children}</div>;
};

const CarimboPlacar: React.FC<{inicio: number}> = ({inicio}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const s = spring({frame: frame - inicio, fps, config: {damping: 10, stiffness: 180}});
	return (
		<div
			style={{
				position: 'absolute',
				left: 1250,
				top: 360,
				padding: '10px 34px',
				border: `12px solid ${CORES.preto}`,
				borderRadius: 16,
				background: CORES.amarelo,
				textAlign: 'center',
				fontFamily: FONTES.titulo,
				color: CORES.preto,
				lineHeight: 1,
				transform: `rotate(-7deg) scale(${interpolate(s, [0, 1], [2.2, 1])})`,
				opacity: frame < inicio ? 0 : interpolate(s, [0, 0.2], [0, 1], {extrapolateRight: 'clamp'}),
				boxShadow: '0 12px 20px rgba(30,20,5,0.35)',
			}}
		>
			<div style={{fontSize: 30}}>DECISÃO DA CONMEBOL</div>
			<div style={{fontSize: 96, whiteSpace: 'nowrap'}}>3 × 0</div>
			<div style={{fontSize: 26}}>PARA O INDEPENDIENTE</div>
		</div>
	);
};
