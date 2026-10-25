import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {janela, progresso, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Fonte} from '../components/Fonte';
import {Recorte} from '../components/Recorte';
import {MarcaTexto} from '../components/MarcaTexto';
import {Ampulheta, Carimbo, Congresso} from '../components/Posse';

// CF, art. 78: posse em sessão do Congresso Nacional, com compromisso; se em
// 10 dias da data fixada o eleito não assumir, salvo força maior, o cargo é
// declarado vago.
export const Cena5Posse: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	const iniB = m(2, -6);
	return (
		<AbsoluteFill>
			<AbsoluteFill style={{opacity: janela(frame, -12, iniB + 12)}}>
				<KenBurns zoom={[1.0, 1.04]}>
					<div style={{position: 'absolute', left: 140, top: 100, opacity: progresso(frame, 0, 12)}}>
						<div style={{fontFamily: FONTES.titulo, fontSize: 84, color: CORES.preto}}>5 de janeiro</div>
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 38, color: CORES.cinza}}>sessão do Congresso Nacional</div>
					</div>
					<div style={{position: 'absolute', left: 1180, top: 60, opacity: progresso(frame, 4, 16)}}>
						<Congresso largura={560} />
					</div>
					<Recorte seed="compromisso" inicio={m(1)} cor={CORES.papel} rotacao={-1} style={{left: 160, top: 360, width: 1600}} padding="30px 44px">
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 28, color: CORES.cinza, letterSpacing: 2}}>O COMPROMISSO</div>
						<div style={{fontFamily: FONTES.jornal, fontSize: 60, color: CORES.preto, lineHeight: 1.25, fontStyle: 'italic'}}>
							“…<MarcaTexto inicio={m(1, 14)} duracao={30}>manter, defender e cumprir a Constituição</MarcaTexto>, observar as leis, promover o bem geral do povo brasileiro…”
						</div>
					</Recorte>
					<Fonte texto="CONSTITUIÇÃO FEDERAL, ART. 78" inicio={m(1)} style={{left: 165, top: 795}} />
				</KenBurns>
			</AbsoluteFill>

			<AbsoluteFill style={{opacity: janela(frame, iniB, 99999)}}>
				<KenBurns zoom={[1.0, 1.05]}>
					<div style={{position: 'absolute', left: 140, top: 100, fontFamily: FONTES.titulo, fontSize: 76, color: CORES.preto}}>
						Uma regra <span style={{background: CORES.amarelo, padding: '0 12px'}}>pouco conhecida</span>
					</div>
					<div style={{position: 'absolute', left: 240, top: 280, opacity: progresso(frame, m(3), m(3, 10))}}>
						<Ampulheta inicio={m(3, 6)} duracao={70} tamanho={360} />
					</div>
					<div style={{position: 'absolute', left: 560, top: 300, opacity: progresso(frame, m(3), m(3, 10))}}>
						<div style={{fontFamily: FONTES.titulo, fontSize: 130, color: CORES.preto, lineHeight: 1}}>10 dias</div>
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 38, color: CORES.preto, marginTop: 10}}>depois da data marcada, sem ter assumido</div>
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 32, color: CORES.cinza, marginTop: 6}}>(salvo motivo de força maior)</div>
					</div>
					<Carimbo inicio={m(4, 20)} texto="CARGO VAGO" tamanho={88} style={{left: 980, top: 580}} />
					<Fonte texto="CONSTITUIÇÃO FEDERAL, ART. 78, PARÁGRAFO ÚNICO" inicio={m(3)} style={{left: 145, top: 795}} />
				</KenBurns>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
