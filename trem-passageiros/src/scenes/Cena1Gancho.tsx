import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {progresso, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Fonte} from '../components/Fonte';
import {Recorte} from '../components/Recorte';
import {Numero} from '../components/Numero';
import {MapaBrasil} from '../components/MapaBrasil';
import {Bilhete, Carimbo, LINHAS_VALE, LinhaNoMapa, MalhaFerroviaria} from '../components/Trem';

// ~30 mil km de malha (ANTF/ANTT); só 2 linhas regulares de passageiros de
// longa distância (Vale: Vitória a Minas e Carajás).
const MAPA = {x: 120, y: 110, w: 680, h: 680};

export const Cena1Gancho: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	return (
		<AbsoluteFill>
			<KenBurns zoom={[1.0, 1.06]} origem="30% 50%">
				<div style={{position: 'absolute', left: MAPA.x, top: MAPA.y, width: MAPA.w, height: MAPA.h}}>
					<MapaBrasil largura={MAPA.w} altura={MAPA.h} inicio={0} duracaoEntrada={18} />
					<MalhaFerroviaria largura={MAPA.w} altura={MAPA.h} inicio={10} duracao={50} />
					<LinhaNoMapa pontos={LINHAS_VALE.efvm} largura={MAPA.w} altura={MAPA.h} inicio={m(3, 10)} />
					<LinhaNoMapa pontos={LINHAS_VALE.efc} largura={MAPA.w} altura={MAPA.h} inicio={m(3, 20)} />
				</div>
				<div style={{position: 'absolute', left: 900, top: 110, opacity: progresso(frame, 6, 18)}}>
					<div style={{fontFamily: FONTES.titulo, fontSize: 130, color: CORES.preto, lineHeight: 1, whiteSpace: 'nowrap'}}>
						<Numero para={30} inicio={8} duracao={40} /> mil km
					</div>
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 40, color: CORES.preto}}>de trilhos no Brasil</div>
				</div>
				<div style={{position: 'absolute', left: 900, top: 330, transform: 'rotate(-2deg)', opacity: progresso(frame, m(1), m(1, 10))}}>
					<Bilhete de="SÃO PAULO" para="RIO" detalhe="trem de passageiros" largura={760} />
				</div>
				<Carimbo inicio={m(1, 34)} texto="NÃO HÁ" style={{left: 1380, top: 450}} />
				<div style={{position: 'absolute', left: 905, top: 575, fontFamily: FONTES.texto, fontWeight: 800, fontSize: 30, color: CORES.cinza, opacity: progresso(frame, m(2), m(2, 10))}}>
					fora os trens urbanos e os turísticos:
				</div>
				<Recorte seed="duas" inicio={m(3)} cor={CORES.amarelo} rotacao={1.5} style={{left: 900, top: 625, width: 820}} padding="12px 26px">
					<div style={{display: 'flex', alignItems: 'center', gap: 22}}>
						<div style={{fontFamily: FONTES.titulo, fontSize: 110, color: CORES.preto, lineHeight: 1}}>2</div>
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 36, color: CORES.preto, lineHeight: 1.15}}>
							linhas de passageiros
							<br />
							de longa distância
						</div>
					</div>
				</Recorte>
				<Recorte seed="pergunta" inicio={m(4)} cor={CORES.preto} rotacao={-3} style={{left: 560, top: 380}} padding="16px 34px">
					<div style={{fontFamily: FONTES.titulo, fontSize: 72, color: CORES.amarelo, whiteSpace: 'nowrap'}}>Como isso aconteceu?</div>
				</Recorte>
				<Fonte texto="MALHA: NATURAL EARTH · ANTT/ANTF · VALE" inicio={10} style={{left: 125, top: 795}} />
			</KenBurns>
		</AbsoluteFill>
	);
};
