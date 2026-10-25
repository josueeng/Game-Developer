import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {janela, progresso, useEntrada, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Fonte} from '../components/Fonte';
import {Recorte} from '../components/Recorte';
import {IconeX} from '../components/Icones';
import {Bilhete, Carimbo} from '../components/Trem';

// RFFSA: criada em 1957, malha concedida em 1996–1998, extinta em 2007.
// Trem de Prata (Rio–SP): última viagem em 29/11/1998.
export const Cena5Fim: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	const iniB = m(5, -6);
	const vagao = useEntrada(m(3));
	return (
		<AbsoluteFill>
			<AbsoluteFill style={{opacity: janela(frame, -12, iniB + 12)}}>
				<KenBurns zoom={[1.0, 1.04]}>
					<Recorte seed="rffsa" inicio={2} cor="#E9D9B4" rotacao={-2} style={{left: 140, top: 110, width: 700}} padding="24px 32px">
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 26, letterSpacing: 3, color: CORES.cinza}}>ESTATAL</div>
						<div style={{fontFamily: FONTES.titulo, fontSize: 58, color: CORES.preto, lineHeight: 1.1}}>Rede Ferroviária Federal</div>
						<div style={{fontFamily: FONTES.titulo, fontSize: 44, color: CORES.azul, marginTop: 6}}>criada em 1957</div>
					</Recorte>
					<div style={{position: 'absolute', left: 160, top: 420, opacity: progresso(frame, m(1, 10), m(1, 20))}}>
						<GraficoQueda inicio={m(1, 10)} />
					</div>
					<Recorte seed="concessao" inicio={m(2)} cor={CORES.amarelo} rotacao={1.5} style={{left: 1000, top: 130, width: 780}} padding="20px 30px">
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 28, color: CORES.preto}}>CONCESSÃO A EMPRESAS PRIVADAS</div>
						<div style={{fontFamily: FONTES.titulo, fontSize: 92, color: CORES.preto, lineHeight: 1.05, whiteSpace: 'nowrap'}}>1996 – 1998</div>
					</Recorte>
					<div style={{position: 'absolute', left: 1020, top: 400, display: 'flex', alignItems: 'center', gap: 24, transform: `translateX(${(1 - vagao) * 600}px)`, opacity: frame < m(3) ? 0 : 1}}>
						<Vagao />
						<span style={{fontFamily: FONTES.titulo, fontSize: 52, color: CORES.preto}}>trens de carga</span>
					</div>
					<div style={{position: 'absolute', left: 1020, top: 620, display: 'flex', alignItems: 'center', gap: 20, opacity: progresso(frame, m(4), m(4, 12))}}>
						<IconeX tamanho={60} cor="#B3261E" />
						<span style={{fontFamily: FONTES.titulo, fontSize: 52, color: CORES.preto}}>fim dos últimos trens de passageiros</span>
					</div>
				</KenBurns>
			</AbsoluteFill>

			<AbsoluteFill style={{opacity: janela(frame, iniB, 99999)}}>
				<KenBurns zoom={[1.0, 1.05]}>
					<div style={{position: 'absolute', left: 0, width: 1920, top: 110, textAlign: 'center', fontFamily: FONTES.titulo, fontSize: 90, color: CORES.preto, opacity: progresso(frame, iniB, iniB + 12)}}>
						O Trem de Prata
					</div>
					<div style={{position: 'absolute', left: 460, top: 290, transform: 'rotate(-2deg)', opacity: progresso(frame, iniB + 6, iniB + 16)}}>
						<Bilhete de="RIO" para="SÃO PAULO" detalhe="Trem de Prata · leito noturno" largura={1000} cor="#E6E6E6" />
					</div>
					<Carimbo inicio={m(6)} texto={<>ÚLTIMA VIAGEM<br />29/11/1998</>} tamanho={58} style={{left: 980, top: 470}} />
					<Fonte texto="HISTÓRICO DA RFFSA E DO TREM DE PRATA" inicio={iniB + 6} style={{left: 465, top: 795}} />
				</KenBurns>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

// Linha descendo: "décadas em crise financeira" (sem escala numérica).
const GraficoQueda: React.FC<{inicio: number}> = ({inicio}) => {
	const frame = useCurrentFrame();
	const p = progresso(frame, inicio, inicio + 40);
	const d = 'M0 40 L120 70 L200 60 L300 140 L380 130 L470 220 L560 260';
	return (
		<div>
			<svg width="620" height="290" viewBox="0 0 620 290" style={{overflow: 'visible'}}>
				<line x1="0" y1="280" x2="600" y2="280" stroke={CORES.preto} strokeWidth="5" />
				<path d={d} fill="none" stroke="#B3261E" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="800" strokeDashoffset={800 * (1 - p)} />
			</svg>
			<div style={{fontFamily: FONTES.mao, fontSize: 52, color: CORES.preto, marginTop: -10}}>décadas em crise financeira</div>
		</div>
	);
};

const Vagao: React.FC = () => {
	const t = {stroke: CORES.preto, strokeWidth: 7, strokeLinejoin: 'round' as const};
	return (
		<svg width="300" height="170" viewBox="0 0 300 170">
			<path d="M10 30 L290 30 L270 120 L30 120Z" fill="#8A6A45" {...t} />
			<path d="M40 30 Q150 -10 260 30" fill="#5A4632" {...t} />
			{[70, 230].map((x) => (
				<circle key={x} cx={x} cy="135" r="24" fill={CORES.preto} {...t} />
			))}
		</svg>
	);
};
