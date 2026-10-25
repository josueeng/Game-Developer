import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {progresso, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Recorte} from '../components/Recorte';
import {Numero} from '../components/Numero';
import {FolhaCalendario} from '../components/Posse';

// Posse em 5/1/2027 (EC 111/2021). De 25/10/2026 a 5/1/2027: 72 dias.
export const Cena1Gancho: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	return (
		<AbsoluteFill>
			<KenBurns zoom={[1.0, 1.06]}>
				<div style={{position: 'absolute', left: 140, top: 110, opacity: progresso(frame, 2, 12)}}>
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 36, letterSpacing: 3, color: CORES.cinza}}>HOJE À NOITE · 25 DE OUTUBRO</div>
					<div style={{fontFamily: FONTES.titulo, fontSize: 96, color: CORES.preto, lineHeight: 1.05}}>
						o próximo
						<br />
						presidente
					</div>
				</div>
				<div style={{position: 'absolute', left: 1020, top: 130}}>
					<FolhaCalendario inicio={m(2) - 4} mes="JANEIRO" dia="1" largura={300} risco={m(2, 14)} rotacao={-6} destaque={CORES.cinza} />
				</div>
				<div style={{position: 'absolute', left: 1380, top: 100}}>
					<FolhaCalendario inicio={m(1)} mes="JANEIRO" dia="5" largura={360} circulo={m(1, 16)} rotacao={4} legenda="posse do eleito" />
				</div>
				<Recorte seed="atual" inicio={m(3)} cor={CORES.papel} rotacao={-1.5} style={{left: 150, top: 430, width: 760}} padding="18px 28px">
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 28, color: CORES.cinza}}>ATÉ LÁ</div>
					<div style={{fontFamily: FONTES.titulo, fontSize: 48, color: CORES.preto, lineHeight: 1.1}}>o atual presidente segue no cargo, com todos os poderes</div>
				</Recorte>
				<Recorte seed="dias" inicio={m(4)} cor={CORES.preto} rotacao={2} style={{left: 1050, top: 560, width: 640}} padding="16px 30px">
					<div style={{display: 'flex', alignItems: 'baseline', gap: 20}}>
						<div style={{fontFamily: FONTES.titulo, fontSize: 130, color: CORES.amarelo, lineHeight: 1}}>
							<Numero para={72} inicio={m(4)} duracao={24} />
						</div>
						<div style={{fontFamily: FONTES.titulo, fontSize: 50, color: CORES.papel, lineHeight: 1.1}}>
							dias.
							<br />O que acontece?
						</div>
					</div>
				</Recorte>
			</KenBurns>
		</AbsoluteFill>
	);
};
