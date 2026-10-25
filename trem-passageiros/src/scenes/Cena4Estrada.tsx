import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {janela, progresso, useEntrada, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Fonte} from '../components/Fonte';
import {Recorte} from '../components/Recorte';
import {RecorteJornal} from '../components/RecorteJornal';

// Plano de Metas (1956–1961): indústria automobilística e rodovias.
// Decreto nº 58.341/1966: erradicação de ramais antieconômicos, primeiro os já
// servidos por rodovia. Ralph Giesbrecht (via BBC News Brasil).
export const Cena4Estrada: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	const iniB = m(3, -6);
	const iniC = m(5, -6);
	const caminhao = useEntrada(m(2));
	return (
		<AbsoluteFill>
			<AbsoluteFill style={{opacity: janela(frame, -12, iniB + 12)}}>
				<KenBurns zoom={[1.0, 1.05]}>
					<div style={{position: 'absolute', left: 140, top: 100, fontFamily: FONTES.titulo, fontSize: 84, color: CORES.preto, opacity: progresso(frame, 0, 12)}}>
						Anos 1950: <span style={{background: CORES.amarelo, padding: '0 14px'}}>a estrada</span>
					</div>
					<Estrada inicio={8} />
					<Recorte seed="metas" inicio={m(1)} cor={CORES.papel} rotacao={-2} style={{left: 160, top: 250, width: 760}} padding="18px 28px">
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 26, letterSpacing: 2, color: CORES.cinza}}>PLANO DE METAS · JUSCELINO KUBITSCHEK</div>
						<div style={{fontFamily: FONTES.titulo, fontSize: 52, color: CORES.preto, lineHeight: 1.1}}>indústria automobilística</div>
					</Recorte>
					<div style={{position: 'absolute', left: 1040, top: 240, transform: `translateX(${(1 - caminhao) * 700}px)`, opacity: frame < m(2) ? 0 : 1}}>
						<Caminhao />
					</div>
					<div style={{position: 'absolute', left: 1050, top: 540, fontFamily: FONTES.mao, fontSize: 60, color: CORES.azul, opacity: progresso(frame, m(2, 10), m(2, 20))}}>
						prioridade: estradas e caminhões
					</div>
				</KenBurns>
			</AbsoluteFill>

			<AbsoluteFill style={{opacity: janela(frame, iniB, iniC + 12)}}>
				<KenBurns zoom={[1.0, 1.04]}>
					<RecorteJornal
						seed="decreto"
						inicio={iniB + 4}
						x={140}
						y={110}
						largura={900}
						rotacao={-1.5}
						jornal="DIÁRIO OFICIAL"
						data="3 DE MAIO DE 1966"
						manchete="Decreto nº 58.341"
						linhaFina="disciplina a erradicação de ferrovias e ramais antieconômicos"
						tamanhoManchete={70}
						linhas={4}
					/>
					<Ramal inicio={m(4)} />
					<Fonte texto="DECRETO Nº 58.341/1966 · CÂMARA DOS DEPUTADOS (LEGISLAÇÃO)" inicio={iniB + 4} style={{left: 145, top: 795}} />
				</KenBurns>
			</AbsoluteFill>

			<AbsoluteFill style={{opacity: janela(frame, iniC, 99999)}}>
				<KenBurns zoom={[1.0, 1.04]}>
					<Recorte seed="citacao" inicio={iniC + 4} cor={CORES.preto} rotacao={-1} style={{left: 260, top: 200, width: 1400}} padding="40px 56px">
						<div style={{fontFamily: FONTES.jornal, fontSize: 120, color: CORES.amarelo, lineHeight: 0.6}}>“</div>
						<div style={{fontFamily: FONTES.titulo, fontSize: 66, color: CORES.papel, lineHeight: 1.15, opacity: progresso(frame, iniC + 12, iniC + 24)}}>
							Nos anos 60 e 70 sumiram praticamente todas as ferrovias menores.
						</div>
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 32, color: CORES.azulClaro, marginTop: 24}}>Ralph Giesbrecht, pesquisador</div>
					</Recorte>
					<Fonte texto="RALPH GIESBRECHT, VIA BBC NEWS BRASIL" inicio={iniC + 4} style={{left: 265, top: 795}} />
				</KenBurns>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

// Estrada que "cobre" um trilho, da esquerda para a direita.
const Estrada: React.FC<{inicio: number}> = ({inicio}) => {
	const frame = useCurrentFrame();
	const p = progresso(frame, inicio, inicio + 60);
	return (
		<svg width="1920" height="200" style={{position: 'absolute', left: 0, top: 600}}>
			{/* trilho */}
			<line x1="0" y1="70" x2="1920" y2="70" stroke={CORES.preto} strokeWidth="8" />
			<line x1="0" y1="130" x2="1920" y2="130" stroke={CORES.preto} strokeWidth="8" />
			{Array.from({length: 48}).map((_, i) => (
				<rect key={i} x={i * 40 + 8} y="58" width="16" height="84" fill="#8A6A45" stroke={CORES.preto} strokeWidth="3" />
			))}
			{/* asfalto */}
			<rect x="0" y="40" width={1920 * p} height="120" fill="#3A3733" stroke={CORES.preto} strokeWidth="6" />
			{Array.from({length: 24}).map((_, i) => (
				<rect key={`f${i}`} x={i * 80 + 20} y="94" width="44" height="12" fill={CORES.amarelo} opacity={i * 80 + 64 < 1920 * p ? 1 : 0} />
			))}
		</svg>
	);
};

const Caminhao: React.FC = () => {
	const t = {stroke: CORES.preto, strokeWidth: 7, strokeLinejoin: 'round' as const};
	return (
		<svg width="560" height="300" viewBox="0 0 560 300">
			<rect x="20" y="40" width="340" height="180" fill={CORES.amarelo} {...t} />
			<path d="M360 100 L470 100 L530 170 L530 220 L360 220Z" fill={CORES.azul} {...t} />
			<path d="M385 118 L460 118 L500 165 L385 165Z" fill={CORES.papel} {...t} />
			{[100, 270, 450].map((x) => (
				<circle key={x} cx={x} cy="235" r="36" fill={CORES.preto} {...t} />
			))}
			{[100, 270, 450].map((x) => (
				<circle key={`c${x}`} cx={x} cy="235" r="12" fill={CORES.papel} />
			))}
		</svg>
	);
};

// Esquema: ramal ao lado de uma estrada sendo apagado.
const Ramal: React.FC<{inicio: number}> = ({inicio}) => {
	const frame = useCurrentFrame();
	const some = progresso(frame, inicio + 20, inicio + 60);
	return (
		<div style={{position: 'absolute', left: 1100, top: 130, opacity: progresso(frame, inicio, inicio + 12)}}>
			<svg width="680" height="560" viewBox="0 0 680 560">
				<path d="M40 520 C200 400 300 300 640 60" fill="none" stroke="#3A3733" strokeWidth="44" strokeLinecap="round" />
				<path d="M40 520 C200 400 300 300 640 60" fill="none" stroke={CORES.amarelo} strokeWidth="5" strokeDasharray="26 22" />
				<path d="M110 540 C260 430 360 340 660 130" fill="none" stroke={CORES.preto} strokeWidth="10" strokeDasharray="6 12" opacity={1 - some} />
				<path d="M110 540 C260 430 360 340 660 130" fill="none" stroke={CORES.preto} strokeWidth="6" opacity={1 - some} />
			</svg>
			<div style={{position: 'absolute', left: 60, top: 0, fontFamily: FONTES.texto, fontWeight: 800, fontSize: 32, color: CORES.preto, lineHeight: 1.3}}>
				<span style={{background: CORES.amarelo, padding: '0 8px'}}>primeiro:</span>
				<br />
				ramais com estrada ao lado
			</div>
			<div style={{position: 'absolute', left: 60, top: 520, fontFamily: FONTES.texto, fontWeight: 800, fontSize: 20, letterSpacing: 2, color: CORES.cinza}}>ESQUEMA ILUSTRATIVO</div>
		</div>
	);
};
