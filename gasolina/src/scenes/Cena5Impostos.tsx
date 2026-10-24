import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {CORES, FONTES} from '../config';
import {janela, progresso, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Titulo} from '../components/Titulo';
import {Recorte} from '../components/Recorte';
import {Fonte} from '../components/Fonte';
import {Numero} from '../components/Numero';
import {MapaBrasil} from '../components/MapaBrasil';

// ICMS 2026: R$ 1,57/L, valor fixo nacional (Comsefaz/Confaz, Convênios
// 112 e 113/2025). Federais: PIS/Cofins R$ 0,79 + Cide R$ 0,10 = R$ 0,89/L de
// gasolina A, zerados de 10/10 a 09/11/2026 (Ministério da Fazenda).
export const Cena5Impostos: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	const fimA = m(3, 10);
	const iniB = m(3, -6);
	const risco = progresso(frame, m(6), m(6, 14));

	const linhas = [
		{t: 'PIS + Cofins', v: 'R$ 0,79'},
		{t: 'Cide', v: 'R$ 0,10'},
	];

	return (
		<AbsoluteFill>
			{/* A: ICMS igual em todo o país */}
			<AbsoluteFill style={{opacity: janela(frame, -12, fimA)}}>
				<KenBurns zoom={[1.0, 1.05]} origem="30% 50%">
					<Titulo texto="ICMS: o imposto dos estados" inicio={2} />
					<div style={{position: 'absolute', left: 150, top: 170}}>
						<MapaBrasil largura={620} altura={620} inicio={m(1)} duracaoEntrada={24} corBase={CORES.amarelo} />
					</div>
					<div style={{position: 'absolute', left: 900, top: 230, opacity: progresso(frame, m(1), m(1, 12))}}>
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 44, color: CORES.preto}}>valor fixo, igual em todo o país</div>
					</div>
					<Recorte seed="icms-157" inicio={m(2)} cor={CORES.amarelo} rotacao={-2} style={{left: 900, top: 340, width: 760}} padding="22px 34px">
						<div style={{fontFamily: FONTES.titulo, fontSize: 130, color: CORES.preto, lineHeight: 1, whiteSpace: 'nowrap'}}>
							R$ <Numero para={1.57} inicio={m(2)} duracao={30} casas={2} />
						</div>
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 38, color: CORES.preto}}>por litro, desde janeiro de 2026</div>
					</Recorte>
					<Fonte texto="COMSEFAZ / CONFAZ (CONVÊNIOS ICMS 112 E 113/2025)" inicio={m(1)} style={{left: 905, top: 790}} />
				</KenBurns>
			</AbsoluteFill>

			{/* B: impostos federais zerados */}
			<AbsoluteFill style={{opacity: janela(frame, iniB, 99999)}}>
				<KenBurns zoom={[1.0, 1.05]} origem="35% 50%">
					<Titulo texto="E os impostos federais?" inicio={iniB} />
					<Recorte seed="recibo" inicio={m(4, -6)} cor="#FFFDF6" rotacao={-1.5} intensidade={1.2} style={{left: 220, top: 180, width: 760}} padding="34px 44px 40px">
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 24, letterSpacing: 2, color: CORES.cinza, borderBottom: `3px dashed ${CORES.preto}`, paddingBottom: 12, marginBottom: 14}}>
							POR LITRO DE GASOLINA PURA (NORMALMENTE)
						</div>
						{linhas.map((l, i) => (
							<div key={l.t} style={{display: 'flex', justifyContent: 'space-between', fontFamily: FONTES.texto, fontWeight: 800, fontSize: 44, color: CORES.preto, padding: '10px 0', opacity: progresso(frame, m(4, i * 12), m(4, i * 12 + 10))}}>
								<span>{l.t}</span>
								<span style={{whiteSpace: 'nowrap'}}>{l.v}</span>
							</div>
						))}
						<div style={{position: 'relative', display: 'flex', justifyContent: 'space-between', fontFamily: FONTES.titulo, fontSize: 64, color: CORES.preto, borderTop: `3px dashed ${CORES.preto}`, marginTop: 10, paddingTop: 14, opacity: progresso(frame, m(5), m(5, 10))}}>
							<span>TOTAL</span>
							<span style={{whiteSpace: 'nowrap'}}>R$ 0,89</span>
							<div style={{position: 'absolute', left: -10, right: -10, top: '55%', height: 10, background: CORES.preto, transform: `scaleX(${risco})`, transformOrigin: 'left'}} />
						</div>
					</Recorte>
					<Carimbo inicio={m(6, 8)} />
					<div style={{position: 'absolute', left: 1120, top: 610, fontFamily: FONTES.mao, fontWeight: 700, fontSize: 80, color: CORES.azul, transform: 'rotate(-4deg)', opacity: progresso(frame, m(7), m(7, 10))}}>por enquanto…</div>
					<Fonte texto="MINISTÉRIO DA FAZENDA (OUT/2026)" inicio={m(4)} style={{left: 230, top: 790}} />
				</KenBurns>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

const Carimbo: React.FC<{inicio: number}> = ({inicio}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const s = spring({frame: frame - inicio, fps, config: {damping: 10, stiffness: 180}});
	return (
		<div
			style={{
				position: 'absolute',
				left: 1080,
				top: 300,
				padding: '14px 36px',
				border: `12px solid ${CORES.preto}`,
				borderRadius: 18,
				background: CORES.amarelo,
				color: CORES.preto,
				fontFamily: FONTES.titulo,
				lineHeight: 1,
				textAlign: 'center',
				transform: `rotate(-7deg) scale(${interpolate(s, [0, 1], [2.2, 1])})`,
				opacity: interpolate(s, [0, 0.2], [0, 1], {extrapolateRight: 'clamp'}),
				boxShadow: '0 14px 22px rgba(30,20,5,0.35)',
			}}
		>
			<div style={{fontSize: 110}}>ZERADO</div>
			<div style={{fontSize: 44, marginTop: 8}}>ATÉ 09/11/2026</div>
		</div>
	);
};
