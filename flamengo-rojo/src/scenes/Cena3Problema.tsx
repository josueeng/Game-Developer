import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {janela, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Titulo} from '../components/Titulo';
import {Recorte} from '../components/Recorte';
import {Fonte} from '../components/Fonte';
import {LinhaDoTempo} from '../components/LinhaDoTempo';

// Cronologia segundo a nota oficial do Flamengo e o comunicado do Estudiantes:
// 09/10 pedido de inscrição (no lugar de jogador lesionado); 14/10 Conmebol
// nega após consulta à FIFA (janela de transferências); 21/10 liminar do CAS;
// 22/10 Rojo titular na volta.
export const Cena3Problema: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	return (
		<AbsoluteFill>
			<KenBurns zoom={[1.0, 1.04]}>
				<Titulo texto="O problema do Rojo" inicio={2} />
				<div style={{position: 'absolute', left: 160, top: 150}}>
					<LinhaDoTempo
						inicio={m(1)}
						duracao={Math.max(90, m(7, 6) - m(1))}
						largura={1600}
						posicoes={[0.03, 0.26, 0.49, 0.72, 0.92]}
						marcos={[
							{ano: '09/10', texto: 'Estudiantes pede a inscrição'},
							{ano: '14/10', texto: 'Conmebol nega'},
							{ano: '15/10', texto: 'Ida, sem Rojo'},
							{ano: '21/10', texto: 'CAS libera (provisório)', destaque: true},
							{ano: '22/10', texto: 'Volta: Rojo titular'},
						]}
					/>
				</div>
				<div style={{opacity: janela(frame, m(2), m(5, 4))}}>
					<Recorte seed="nega" inicio={m(2)} cor={CORES.preto} rotacao={-1.5} style={{left: 460, top: 580, width: 1000}} padding="18px 30px">
						<div style={{fontFamily: FONTES.titulo, fontSize: 48, color: CORES.amarelo}}>CONMEBOL: NEGADO</div>
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 30, color: CORES.papel, opacity: frame >= m(3) ? 1 : 0}}>após consultar a FIFA: fora da janela de transferências</div>
					</Recorte>
				</div>
				<div style={{opacity: janela(frame, m(5), 99999)}}>
					<Recorte seed="libera" inicio={m(5)} cor={CORES.amarelo} rotacao={1.5} style={{left: 460, top: 580, width: 1000}} padding="18px 30px">
						<div style={{fontFamily: FONTES.titulo, fontSize: 48, color: CORES.preto}}>CAS: LIBERADO</div>
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 32, color: CORES.preto}}>CAS = Tribunal Arbitral do Esporte · decisão provisória</div>
					</Recorte>
				</div>
				<Fonte texto="NOTA OFICIAL DO FLAMENGO · COMUNICADO DO ESTUDIANTES (OUT/2026)" inicio={m(1)} style={{left: 170, top: 790}} />
			</KenBurns>
		</AbsoluteFill>
	);
};
