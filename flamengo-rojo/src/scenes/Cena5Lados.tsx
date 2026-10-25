import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {progresso, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Fonte} from '../components/Fonte';
import {COR_EST, COR_FLA} from '../components/Futebol';

// Argumentos atribuídos a cada clube (nota do Flamengo de 24/10; posição do
// Estudiantes na imprensa argentina). O vídeo não diz quem tem razão.
export const Cena5Lados: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	const item = (em: number) => ({opacity: progresso(frame, em - 4, em + 8), transform: `translateY(${(1 - progresso(frame, em - 4, em + 8)) * 20}px)`});

	return (
		<AbsoluteFill>
			<KenBurns zoom={[1.0, 1.04]}>
				{/* Flamengo */}
				<div style={{position: 'absolute', left: 120, top: 110, width: 780}}>
					<div style={{...item(m(0)), background: COR_FLA, color: CORES.amarelo, fontFamily: FONTES.titulo, fontSize: 52, padding: '12px 26px', display: 'inline-block'}}>O FLAMENGO PEDE</div>
					<div style={{...item(m(0, 30)), fontFamily: FONTES.texto, fontWeight: 800, fontSize: 38, color: CORES.preto, marginTop: 26}}>• reclamou em até 24 horas</div>
					<div style={{...item(m(1)), fontFamily: FONTES.texto, fontWeight: 800, fontSize: 38, color: CORES.preto, marginTop: 14}}>• Código Disciplinar da Conmebol:</div>
					<div style={{...item(m(2)), marginTop: 14, background: CORES.amarelo, border: `5px solid ${CORES.preto}`, padding: '14px 24px', boxShadow: '0 10px 16px rgba(40,30,15,0.25)'}}>
						<div style={{fontFamily: FONTES.titulo, fontSize: 96, color: CORES.preto, lineHeight: 1, whiteSpace: 'nowrap'}}>3 × 0</div>
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 30, color: CORES.preto}}>para quem escala jogador irregular</div>
					</div>
					<div style={{...item(m(3)), fontFamily: FONTES.mao, fontWeight: 700, fontSize: 54, color: CORES.azul, marginTop: 18, transform: 'rotate(-2deg)'}}>→ aí o Flamengo iria à final</div>
				</div>

				{/* divisória */}
				<div style={{position: 'absolute', left: 955, top: 120, width: 6, height: 640, background: CORES.preto, opacity: progresso(frame, m(0), m(0, 10))}} />

				{/* Estudiantes */}
				<div style={{position: 'absolute', left: 1020, top: 110, width: 800}}>
					<div style={{...item(m(4)), background: COR_EST, color: CORES.papel, fontFamily: FONTES.titulo, fontSize: 52, padding: '12px 26px', display: 'inline-block'}}>O ESTUDIANTES DIZ</div>
					<div style={{...item(m(4, 30)), fontFamily: FONTES.texto, fontWeight: 800, fontSize: 38, color: CORES.preto, marginTop: 26, lineHeight: 1.25}}>• agiu amparado por uma decisão do CAS</div>
					<div style={{...item(m(5)), fontFamily: FONTES.texto, fontWeight: 800, fontSize: 38, color: CORES.preto, marginTop: 14, lineHeight: 1.25}}>• por isso, o jogador estava liberado</div>
				</div>
				<Fonte texto="NOTA OFICIAL DO FLAMENGO (24/10) · POSIÇÃO DO ESTUDIANTES NA IMPRENSA" inicio={m(1)} style={{left: 130, top: 795}} />
			</KenBurns>
		</AbsoluteFill>
	);
};
