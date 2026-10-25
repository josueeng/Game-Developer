import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {janela, progresso, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Fonte} from '../components/Fonte';
import {MapaBrasil} from '../components/MapaBrasil';
import {IconeX} from '../components/Icones';
import {Bitola, LinhaNoMapa} from '../components/Trem';

// Esquema ILUSTRATIVO: linhas do interior até portos (não é o traçado real).
// Bitolas (c. 2010): 23.068 km métrica, 5.016 km larga, 523 km mista.
const MAPA = {x: 150, y: 120, w: 660, h: 660};
const ESQUEMA: [number, number][][] = [
	[[-51.4, -22.1], [-49.06, -22.31], [-47.06, -22.9], [-46.33, -23.96]], // → Santos
	[[-44.6, -17.6], [-43.94, -19.92], [-43.35, -21.76], [-43.2, -22.9]], // → Rio
	[[-52.6, -24.9], [-50.16, -25.09], [-49.27, -25.43], [-48.51, -25.52]], // → Paranaguá
	[[-43.0, -17.4], [-41.95, -18.85], [-40.63, -19.54], [-40.3, -20.3]], // → Vitória
	[[-42.0, -8.0], [-40.5, -9.4], [-39.3, -11.3], [-38.5, -12.97]], // → Salvador
	[[-38.6, -7.6], [-36.5, -8.3], [-35.97, -8.28], [-34.9, -8.05]], // → Recife
	[[-55.6, -29.5], [-53.8, -29.68], [-52.6, -31.0], [-52.1, -32.03]], // → Rio Grande
];
const CORES_ESQ = [CORES.amarelo, CORES.azul, CORES.azulClaro, CORES.amarelo, CORES.azul, CORES.azulClaro, CORES.amarelo];

export const Cena3Pedacos: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	const iniB = m(3, -6);
	return (
		<AbsoluteFill>
			<AbsoluteFill style={{opacity: janela(frame, -12, iniB + 12)}}>
				<KenBurns zoom={[1.0, 1.05]} origem="30% 50%">
					<div style={{position: 'absolute', left: MAPA.x, top: MAPA.y, width: MAPA.w, height: MAPA.h}}>
						<MapaBrasil largura={MAPA.w} altura={MAPA.h} inicio={0} duracaoEntrada={14} />
						{ESQUEMA.map((l, i) => (
							<LinhaNoMapa key={i} pontos={l} largura={MAPA.w} altura={MAPA.h} inicio={m(1) + i * 6} duracao={20} cor={CORES_ESQ[i]} espessura={12} />
						))}
					</div>
					<div style={{position: 'absolute', left: 940, top: 140, fontFamily: FONTES.titulo, fontSize: 84, color: CORES.preto, lineHeight: 1.05, opacity: progresso(frame, 0, 12)}}>
						Uma malha
						<br />
						em pedaços
					</div>
					<div style={{position: 'absolute', left: 945, top: 380, fontFamily: FONTES.texto, fontWeight: 800, fontSize: 40, color: CORES.preto, lineHeight: 1.3, opacity: progresso(frame, m(1), m(1, 12))}}>
						cada linha: da região produtora
						<br />
						<span style={{background: CORES.amarelo, padding: '0 10px'}}>até o porto</span>
					</div>
					<div style={{position: 'absolute', left: 945, top: 540, display: 'flex', alignItems: 'center', gap: 18, opacity: progresso(frame, m(2), m(2, 12))}}>
						<IconeX tamanho={60} />
						<span style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 40, color: CORES.preto}}>não entre as cidades</span>
					</div>
					<div style={{position: 'absolute', left: 945, top: 680, fontFamily: FONTES.texto, fontWeight: 800, fontSize: 24, letterSpacing: 2, color: CORES.cinza, opacity: progresso(frame, m(1), m(1, 12))}}>
						ESQUEMA ILUSTRATIVO · NÃO É O TRAÇADO REAL
					</div>
				</KenBurns>
			</AbsoluteFill>

			<AbsoluteFill style={{opacity: janela(frame, iniB, 99999)}}>
				<KenBurns zoom={[1.0, 1.04]}>
					<div style={{position: 'absolute', left: 140, top: 90, fontFamily: FONTES.titulo, fontSize: 84, color: CORES.preto}}>E com bitolas diferentes</div>
					<div style={{position: 'absolute', left: 170, top: 240, transform: 'scale(1.25)', transformOrigin: 'top left'}}>
						<Bitola metros={1} inicio={m(4)} rotulo="métrica · ~23 mil km" cor={CORES.amarelo} />
					</div>
					<div style={{position: 'absolute', left: 1050, top: 240, transform: 'scale(1.25)', transformOrigin: 'top left'}}>
						<Bitola metros={1.6} inicio={m(5)} rotulo="larga · ~5 mil km" cor={CORES.azulClaro} />
					</div>
					<div style={{position: 'absolute', left: 0, width: 1920, top: 690, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, opacity: progresso(frame, m(6), m(6, 12))}}>
						<IconeX tamanho={64} />
						<span style={{fontFamily: FONTES.titulo, fontSize: 54, color: CORES.preto}}>o trem de uma não roda na outra</span>
					</div>
					<Fonte texto="MINISTÉRIO DOS TRANSPORTES (INVENTÁRIO C. 2010)" inicio={m(4)} style={{left: 145, top: 795}} />
				</KenBurns>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
