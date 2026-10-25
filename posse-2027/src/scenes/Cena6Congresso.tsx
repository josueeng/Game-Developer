import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {progresso, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Fonte} from '../components/Fonte';
import {Recorte} from '../components/Recorte';
import {Numero} from '../components/Numero';
import {FolhaCalendario} from '../components/Posse';

// Deputados federais e senadores: posse em 1º/02/2027; senadores eleitos em
// 2026 até 31/01/2035.
export const Cena6Congresso: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	return (
		<AbsoluteFill>
			<KenBurns zoom={[1.0, 1.05]}>
				<div style={{position: 'absolute', left: 140, top: 100, fontFamily: FONTES.titulo, fontSize: 84, color: CORES.preto, opacity: progresso(frame, 0, 12)}}>E o Congresso?</div>
				<div style={{position: 'absolute', left: 150, top: 240, fontFamily: FONTES.texto, fontWeight: 800, fontSize: 40, color: CORES.cinza, opacity: progresso(frame, 6, 16)}}>a data não mudou</div>
				<div style={{position: 'absolute', left: 1240, top: 120}}>
					<FolhaCalendario inicio={m(1)} mes="FEVEREIRO" dia="1º" largura={420} legenda="2027" rotacao={3} destaque={CORES.azul} />
				</div>
				<Recorte seed="deputados" inicio={m(1, 10)} cor={CORES.papel} rotacao={-2} style={{left: 150, top: 360, width: 460}} padding="18px 26px">
					<div style={{fontFamily: FONTES.titulo, fontSize: 110, color: CORES.preto, lineHeight: 1}}>
						<Numero para={513} inicio={m(1, 10)} duracao={24} />
					</div>
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 34, color: CORES.preto}}>deputados federais</div>
				</Recorte>
				<Recorte seed="senadores" inicio={m(2)} cor={CORES.amarelo} rotacao={2} style={{left: 680, top: 380, width: 480}} padding="18px 26px">
					<div style={{fontFamily: FONTES.titulo, fontSize: 110, color: CORES.preto, lineHeight: 1}}>
						<Numero para={54} inicio={m(2)} duracao={20} />
					</div>
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 34, color: CORES.preto}}>senadores eleitos</div>
					<div style={{fontFamily: FONTES.titulo, fontSize: 48, color: CORES.preto, whiteSpace: 'nowrap'}}>até 2035</div>
				</Recorte>
				<Fonte texto="CONSTITUIÇÃO FEDERAL · AGÊNCIA SENADO / IMPRENSA" inicio={m(1)} style={{left: 145, top: 795}} />
			</KenBurns>
		</AbsoluteFill>
	);
};
