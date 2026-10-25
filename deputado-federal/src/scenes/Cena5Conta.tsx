import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {progresso, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Fonte} from '../components/Fonte';
import {Recorte} from '../components/Recorte';
import {Numero} from '../components/Numero';
import {MarcaTexto} from '../components/MarcaTexto';
import {SUBSIDIO, VERBA_GABINETE, COTA_MAX, AUXILIO_MORADIA} from '../components/Deputado';

// Teto mensal: R$ 258.037,81 (DF) a R$ 274.899,96 (RR); anual ~R$ 3,3 mi (RR).
// O subsídio é 16,9% a 18% do teto: "só 17%".
const PARTES = [
	{t: 'Salário', v: SUBSIDIO, cor: CORES.amarelo},
	{t: 'Verba de gabinete', v: VERBA_GABINETE, cor: CORES.azul},
	{t: 'Cota parlamentar', v: COTA_MAX, cor: CORES.azulClaro},
	{t: 'Moradia', v: AUXILIO_MORADIA, cor: CORES.cinza},
];
const TOTAL = PARTES.reduce((s, p) => s + p.v, 0);
const LARG = 1600;

export const Cena5Conta: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	let x = 0;
	return (
		<AbsoluteFill>
			<KenBurns zoom={[1.0, 1.04]}>
				<div style={{position: 'absolute', left: 160, top: 100, fontFamily: FONTES.titulo, fontSize: 70, color: CORES.preto, opacity: progresso(frame, 0, 12)}}>A conta completa, por mês</div>
				<div style={{position: 'absolute', left: 160, top: 220, width: LARG, height: 150, border: `6px solid ${CORES.preto}`, boxSizing: 'border-box', background: CORES.papel, overflow: 'hidden'}}>
					{PARTES.map((p, i) => {
						const w = (p.v / TOTAL) * (LARG - 12);
						const left = x;
						x += w;
						const pr = progresso(frame, 6 + i * 8, 20 + i * 8);
						return (
							<div key={p.t} style={{position: 'absolute', left, top: 0, height: '100%', width: w * pr, background: p.cor, borderRight: i < PARTES.length - 1 ? `5px solid ${CORES.preto}` : undefined, boxSizing: 'border-box'}} />
						);
					})}
					<div style={{position: 'absolute', left: 20, top: 38, fontFamily: FONTES.titulo, fontSize: 60, color: CORES.preto, opacity: progresso(frame, m(3), m(3, 10))}}>17%</div>
				</div>
				<div style={{position: 'absolute', left: 160, top: 385, width: LARG, display: 'flex', gap: 36, fontFamily: FONTES.texto, fontWeight: 800, fontSize: 28, color: CORES.preto, opacity: progresso(frame, 20, 34)}}>
					{PARTES.map((p) => (
						<span key={p.t} style={{display: 'flex', alignItems: 'center', gap: 10}}>
							<span style={{width: 28, height: 28, background: p.cor, border: `3px solid ${CORES.preto}`, display: 'inline-block'}} />
							{p.t}
						</span>
					))}
				</div>
				<Recorte seed="mes" inicio={m(1)} cor={CORES.papel} rotacao={-1.5} style={{left: 160, top: 480, width: 780}} padding="18px 28px">
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 28, color: CORES.cinza}}>TETO POR MANDATO, POR MÊS</div>
					<div style={{fontFamily: FONTES.titulo, fontSize: 70, color: CORES.preto, whiteSpace: 'nowrap', lineHeight: 1.1}}>
						R$ 258 a <Numero para={275} inicio={m(1)} duracao={30} /> mil
					</div>
				</Recorte>
				<Recorte seed="ano" inicio={m(2)} cor={CORES.preto} rotacao={1.5} style={{left: 1000, top: 480, width: 780}} padding="18px 28px">
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 28, color: CORES.azulClaro}}>POR ANO (TETO)</div>
					<div style={{fontFamily: FONTES.titulo, fontSize: 66, color: CORES.amarelo, whiteSpace: 'nowrap', lineHeight: 1.1}}>
						cerca de R$ <Numero para={3.3} inicio={m(2)} duracao={24} casas={1} /> mi
					</div>
				</Recorte>
				<div style={{position: 'absolute', left: 170, top: 690, fontFamily: FONTES.titulo, fontSize: 58, color: CORES.preto, opacity: progresso(frame, m(4), m(4, 12))}}>
					+ um poder fora do contracheque: <MarcaTexto inicio={m(5)}>as emendas</MarcaTexto>
				</div>
				<Fonte texto="CÁLCULO PRÓPRIO COM VALORES DA CÂMARA · TETOS, NÃO GASTOS" inicio={m(1)} style={{left: 165, top: 795}} />
			</KenBurns>
		</AbsoluteFill>
	);
};
