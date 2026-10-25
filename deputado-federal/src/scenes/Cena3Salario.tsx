import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {CORES, FONTES} from '../config';
import {progresso, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Fonte} from '../components/Fonte';
import {Recorte} from '../components/Recorte';
import {Numero} from '../components/Numero';
import {Contracheque, SUBSIDIO, brl} from '../components/Deputado';

// Subsídio de R$ 46.366,19 desde 01/02/2025 (Decreto Legislativo 172/2022),
// igual ao de senadores e ministros do STF. Anual bruto: R$ 556.394,28.
export const Cena3Salario: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	return (
		<AbsoluteFill>
			<KenBurns zoom={[1.0, 1.05]} origem="30% 50%">
				<div style={{position: 'absolute', left: 150, top: 150, transform: 'rotate(-1.5deg) scale(1.25)', transformOrigin: 'top left', opacity: progresso(frame, 2, 14)}}>
					<Contracheque
						largura={700}
						linhas={[
							{t: 'Subsídio mensal', v: `R$ ${brl(SUBSIDIO)}`},
							...(frame >= m(4) ? [{t: '− Imposto de Renda', v: 'desconto'}, {t: '− Previdência', v: 'desconto'}] : []),
							...(frame >= m(5) ? [{t: '− Faltas sem justificativa', v: 'desconto'}] : []),
						]}
						total={
							<span>
								R$ <Numero para={SUBSIDIO} inicio={m(1)} duracao={30} casas={2} />
								<span style={{fontSize: 28, fontFamily: FONTES.texto}}> /mês bruto</span>
							</span>
						}
					/>
				</div>
				<Carimbo inicio={m(2, 10)} />
				<Recorte seed="ano" inicio={m(3)} cor={CORES.amarelo} rotacao={1.5} style={{left: 1080, top: 520, width: 680}} padding="18px 28px">
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 28, color: CORES.preto}}>EM UM ANO (BRUTO)</div>
					<div style={{fontFamily: FONTES.titulo, fontSize: 80, color: CORES.preto, lineHeight: 1.05, whiteSpace: 'nowrap'}}>
						R$ <Numero para={556394.28} inicio={m(3)} duracao={30} casas={2} />
					</div>
				</Recorte>
				<Fonte texto="DECRETO LEGISLATIVO 172/2022 (DESDE 01/02/2025) · CÂMARA" inicio={m(1)} style={{left: 160, top: 795}} />
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
				left: 1100,
				top: 170,
				padding: '14px 34px',
				border: `10px solid ${CORES.azul}`,
				borderRadius: 16,
				background: 'rgba(251,246,234,0.85)',
				color: CORES.azul,
				fontFamily: FONTES.titulo,
				fontSize: 50,
				lineHeight: 1.1,
				textAlign: 'center',
				transform: `rotate(-6deg) scale(${interpolate(s, [0, 1], [2.2, 1])})`,
				opacity: frame < inicio ? 0 : interpolate(s, [0, 0.2], [0, 1], {extrapolateRight: 'clamp'}),
			}}
		>
			MESMO VALOR DE
			<br />
			SENADORES E
			<br />
			MINISTROS DO STF
		</div>
	);
};
