import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {janela, progresso, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Fonte} from '../components/Fonte';
import {RecorteJornal} from '../components/RecorteJornal';
import {IconeX} from '../components/Icones';
import {FolhaCalendario} from '../components/Posse';

// EC 111/2021: presidente e vice em 5/1, governadores e vices em 6/1, a partir
// dos eleitos em 2026. Motivo: governadores poderem ir à posse presidencial.
export const Cena2Data: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	const iniB = m(3, -6);
	return (
		<AbsoluteFill>
			<AbsoluteFill style={{opacity: janela(frame, -12, iniB + 12)}}>
				<KenBurns zoom={[1.0, 1.04]}>
					<RecorteJornal seed="ec111" inicio={4} x={140} y={110} largura={820} rotacao={-1.5} jornal="DIÁRIO OFICIAL" data="2021" manchete="Emenda Constitucional nº 111" linhaFina="altera as datas de posse do presidente e dos governadores" tamanhoManchete={56} linhas={4} />
					<div style={{position: 'absolute', left: 1080, top: 120}}>
						<FolhaCalendario inicio={m(1)} mes="JANEIRO" dia="5" largura={300} legenda="presidente e vice" rotacao={-3} />
					</div>
					<div style={{position: 'absolute', left: 1450, top: 160}}>
						<FolhaCalendario inicio={m(2)} mes="JANEIRO" dia="6" largura={300} legenda="governadores" rotacao={3} destaque={CORES.azul} />
					</div>
					<Fonte texto="EC 111/2021 · RÁDIO SENADO · TRE-PR" inicio={4} style={{left: 145, top: 795}} />
				</KenBurns>
			</AbsoluteFill>

			<AbsoluteFill style={{opacity: janela(frame, iniB, 99999)}}>
				<KenBurns zoom={[1.0, 1.04]}>
					<div style={{position: 'absolute', left: 140, top: 100, fontFamily: FONTES.titulo, fontSize: 70, color: CORES.preto}}>Antes: tudo em 1º de janeiro</div>
					<div style={{position: 'absolute', left: 160, top: 250, display: 'flex', alignItems: 'center', gap: 40, opacity: progresso(frame, iniB + 6, iniB + 16)}}>
						<Cerimonia titulo="posse do presidente" local="Brasília" cor={CORES.amarelo} />
						<div style={{fontFamily: FONTES.titulo, fontSize: 80, color: CORES.preto}}>+</div>
						<Cerimonia titulo="posse dos governadores" local="27 capitais" cor={CORES.azulClaro} />
					</div>
					<div style={{position: 'absolute', left: 160, top: 520, display: 'flex', alignItems: 'center', gap: 20, opacity: progresso(frame, m(4), m(4, 12))}}>
						<IconeX tamanho={64} cor="#C8261E" />
						<span style={{fontFamily: FONTES.titulo, fontSize: 50, color: CORES.preto}}>governadores não iam à posse do presidente</span>
					</div>
					<div style={{position: 'absolute', left: 160, top: 640, display: 'flex', gap: 30, opacity: progresso(frame, m(5), m(5, 12))}}>
						<Chip texto="presidente atual: +4 dias" cor={CORES.amarelo} />
						<Chip texto="governadores: +5 dias" cor={CORES.azulClaro} />
					</div>
					<Fonte texto="EC 111/2021 · RÁDIO SENADO · TRE-PR" inicio={iniB} style={{left: 145, top: 795}} />
				</KenBurns>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

const Cerimonia: React.FC<{titulo: string; local: string; cor: string}> = ({titulo, local, cor}) => (
	<div style={{width: 640, padding: '22px 30px', background: CORES.papel, border: `5px solid ${CORES.preto}`, boxShadow: '0 12px 18px rgba(40,30,15,0.25)'}}>
		<div style={{display: 'inline-block', background: cor, border: `4px solid ${CORES.preto}`, padding: '2px 14px', fontFamily: FONTES.titulo, fontSize: 34, color: CORES.preto}}>1º/JAN</div>
		<div style={{fontFamily: FONTES.titulo, fontSize: 52, color: CORES.preto, marginTop: 10, lineHeight: 1.1}}>{titulo}</div>
		<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 30, color: CORES.cinza}}>{local}</div>
	</div>
);

const Chip: React.FC<{texto: string; cor: string}> = ({texto, cor}) => (
	<span style={{padding: '10px 24px', background: cor, border: `5px solid ${CORES.preto}`, fontFamily: FONTES.titulo, fontSize: 42, color: CORES.preto, whiteSpace: 'nowrap'}}>{texto}</span>
);
