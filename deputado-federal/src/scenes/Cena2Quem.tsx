import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {progresso, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Fonte} from '../components/Fonte';
import {Recorte} from '../components/Recorte';
import {Numero} from '../components/Numero';
import {MapaBrasil} from '../components/MapaBrasil';

// 513 deputados (LC 78/1993); de 8 a 70 por estado (CF, art. 45).
// SP no teto (70); Roraima e Acre no piso (8). Posse em 01/02/2027.
const MAPA = {x: 140, y: 140, w: 680, h: 680};

export const Cena2Quem: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	return (
		<AbsoluteFill>
			<KenBurns zoom={[1.0, 1.05]} origem="30% 50%">
				<div style={{position: 'absolute', left: MAPA.x, top: MAPA.y}}>
					<MapaBrasil
						largura={MAPA.w}
						altura={MAPA.h}
						inicio={4}
						duracaoEntrada={26}
						destaques={[
							{uf: 'SP', cor: CORES.amarelo, inicio: m(3)},
							{uf: 'RR', cor: CORES.azulClaro, inicio: m(3, 30)},
							{uf: 'AC', cor: CORES.azulClaro, inicio: m(3, 30)},
						]}
					/>
				</div>
				<div style={{position: 'absolute', left: 960, top: 120}}>
					<div style={{fontFamily: FONTES.titulo, fontSize: 200, color: CORES.preto, lineHeight: 1}}>
						<Numero para={513} inicio={4} duracao={36} />
					</div>
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 44, color: CORES.preto}}>deputados federais</div>
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 34, color: CORES.cinza, opacity: progresso(frame, m(1), m(1, 10))}}>mandato de 4 anos</div>
				</div>
				<Recorte seed="faixa" inicio={m(2)} cor={CORES.papel} rotacao={-1.5} style={{left: 960, top: 450, width: 780}} padding="16px 26px">
					<div style={{display: 'flex', gap: 30, alignItems: 'center'}}>
						<div style={{textAlign: 'center'}}>
							<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 24, color: CORES.cinza}}>MÍNIMO</div>
							<div style={{fontFamily: FONTES.titulo, fontSize: 80, color: CORES.azul, lineHeight: 1}}>8</div>
						</div>
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 30, color: CORES.preto, flex: 1, textAlign: 'center'}}>por estado, conforme a população</div>
						<div style={{textAlign: 'center'}}>
							<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 24, color: CORES.cinza}}>MÁXIMO</div>
							<div style={{fontFamily: FONTES.titulo, fontSize: 80, color: CORES.preto, lineHeight: 1}}>70</div>
						</div>
					</div>
				</Recorte>
				<Recorte seed="posse" inicio={m(4)} cor={CORES.amarelo} rotacao={2} style={{left: 1080, top: 640}} padding="14px 28px">
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 26, color: CORES.preto}}>OS ELEITOS TOMAM POSSE EM</div>
					<div style={{fontFamily: FONTES.titulo, fontSize: 52, color: CORES.preto, whiteSpace: 'nowrap'}}>fevereiro de 2027</div>
				</Recorte>
				<div style={{position: 'absolute', left: 150, top: 790, display: 'flex', gap: 30, fontFamily: FONTES.texto, fontWeight: 800, fontSize: 24, color: CORES.preto, opacity: progresso(frame, m(3), m(3, 12))}}>
					<span><span style={{background: CORES.amarelo, padding: '0 8px', border: `3px solid ${CORES.preto}`}}>SP</span> 70</span>
					<span style={{opacity: progresso(frame, m(3, 30), m(3, 40))}}><span style={{background: CORES.azulClaro, padding: '0 8px', border: `3px solid ${CORES.preto}`}}>RR · AC</span> 8</span>
				</div>
				<Fonte texto="CONSTITUIÇÃO, ART. 45 · LEI COMPLEMENTAR 78/1993 · CÂMARA" inicio={m(2)} style={{left: 965, top: 795}} />
			</KenBurns>
		</AbsoluteFill>
	);
};
