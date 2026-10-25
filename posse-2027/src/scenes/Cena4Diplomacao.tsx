import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {progresso, useEntrada, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Fonte} from '../components/Fonte';
import {Carimbo, Diploma, FolhaCalendario} from '../components/Posse';

// Diplomação até 18/12/2026 (calendário do TSE). TSE: presidente e vice;
// TREs: governadores, senadores e deputados.
export const Cena4Diplomacao: React.FC = () => {
	const m = useMarcas();
	const d = useEntrada(4);
	return (
		<AbsoluteFill>
			<KenBurns zoom={[1.0, 1.05]}>
				<div style={{position: 'absolute', left: 140, top: 130, transform: `rotate(-2deg) translateY(${(1 - d) * 40}px)`, opacity: d}}>
					<Diploma largura={740} />
				</div>
				<div style={{position: 'absolute', left: 150, top: 560, width: 760}}>
					<Linha inicio={m(1)} quem="TSE" oque="presidente e vice" cor={CORES.amarelo} />
					<Linha inicio={m(2)} quem="TREs" oque="governadores, senadores e deputados" cor={CORES.azulClaro} />
				</div>
				<div style={{position: 'absolute', left: 1180, top: 120}}>
					<FolhaCalendario inicio={m(3)} mes="DEZEMBRO" dia="18" largura={380} legenda="prazo da diplomação" rotacao={3} destaque={CORES.azul} />
				</div>
				<Carimbo inicio={m(4)} texto={<>SEM DIPLOMA,<br />SEM POSSE</>} tamanho={56} style={{left: 1130, top: 600}} />
				<Fonte texto="CALENDÁRIO ELEITORAL DO TSE (VIA NSC TOTAL E JORNAL OPÇÃO)" inicio={m(1)} style={{left: 145, top: 795}} />
			</KenBurns>
		</AbsoluteFill>
	);
};

const Linha: React.FC<{inicio: number; quem: string; oque: string; cor: string}> = ({inicio, quem, oque, cor}) => {
	const frame = useCurrentFrame();
	const p = progresso(frame, inicio, inicio + 12);
	return (
		<div style={{display: 'flex', alignItems: 'center', gap: 20, marginBottom: 18, opacity: p, transform: `translateX(${(1 - p) * 30}px)`}}>
			<span style={{width: 130, textAlign: 'center', padding: '6px 0', background: cor, border: `5px solid ${CORES.preto}`, fontFamily: FONTES.titulo, fontSize: 40, color: CORES.preto}}>{quem}</span>
			<span style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 36, color: CORES.preto}}>→ {oque}</span>
		</div>
	);
};
