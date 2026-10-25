import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {CORES, FONTES} from '../config';
import {janela, progresso, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Fonte} from '../components/Fonte';
import {MapaBrasil} from '../components/MapaBrasil';
import {Envelope, VERBA_GABINETE, COTA_MIN, COTA_MAX, AUXILIO_MORADIA, brl} from '../components/Deputado';

// Verba de gabinete até R$ 165.806,07 (Ato da Mesa 243/2026); cota 2026 de
// R$ 41.612,55 (DF) a R$ 58.474,70 (RR); auxílio-moradia R$ 4.253.
// Parte A: três envelopes. Parte B (m(6)–m(8)): mapa da cota. Depois volta.
export const Cena4Verbas: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	const iniMapa = m(6, -6);
	const fimMapa = m(8, 6);
	const envelopes = (
		<>
			<div style={{position: 'absolute', left: 90, top: 330}}>
				<Envelope inicio={m(1)} titulo="1 · Verba de gabinete" valor={`até R$ ${brl(VERBA_GABINETE, 0)}`} detalhe="salários de 5 a 25 secretários parlamentares" cor={CORES.amarelo} />
			</div>
			<div style={{position: 'absolute', left: 690, top: 330}}>
				<Envelope inicio={m(4)} titulo="2 · Cota parlamentar" valor="R$ 41,6 a 58,5 mil" detalhe="passagens, escritório, combustível, divulgação" cor={CORES.azulClaro} />
			</div>
			<div style={{position: 'absolute', left: 1290, top: 330}}>
				<Envelope inicio={m(8)} titulo="3 · Auxílio-moradia" valor={`R$ ${brl(AUXILIO_MORADIA, 0)}`} detalhe="para quem não usa apartamento da Câmara" cor={CORES.papel} />
			</div>
		</>
	);
	return (
		<AbsoluteFill>
			<AbsoluteFill style={{opacity: janela(frame, -12, iniMapa + 12) + janela(frame, fimMapa - 12, 99999)}}>
				<KenBurns zoom={[1.0, 1.04]}>
					<div style={{position: 'absolute', left: 120, top: 110, fontFamily: FONTES.titulo, fontSize: 78, color: CORES.preto, opacity: progresso(frame, 0, 12)}}>
						Além do salário: <span style={{background: CORES.amarelo, padding: '0 14px'}}>3 verbas</span>
					</div>
					<div style={{position: 'absolute', left: 120, top: 200, fontFamily: FONTES.texto, fontWeight: 800, fontSize: 32, color: CORES.cinza, opacity: progresso(frame, 0, 12)}}>valores mensais, por gabinete</div>
					{envelopes}
					<Selo inicio={m(10)} />
					<Fonte texto="ATO DA MESA 243/2026 · CÂMARA · AGÊNCIA LUPA" inicio={m(1)} style={{left: 125, top: 795}} />
				</KenBurns>
			</AbsoluteFill>

			<AbsoluteFill style={{opacity: janela(frame, iniMapa, fimMapa)}}>
				<KenBurns zoom={[1.0, 1.05]} origem="35% 50%">
					<div style={{position: 'absolute', left: 160, top: 120}}>
						<MapaBrasil
							largura={640}
							altura={640}
							inicio={iniMapa}
							duracaoEntrada={20}
							destaques={[
								{uf: 'DF', cor: CORES.azulClaro, inicio: m(6, 10)},
								{uf: 'RR', cor: CORES.azul, inicio: m(6.5)},
							]}
						/>
					</div>
					<div style={{position: 'absolute', left: 900, top: 140}}>
						<div style={{fontFamily: FONTES.titulo, fontSize: 60, color: CORES.preto}}>Cota parlamentar</div>
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 30, color: CORES.cinza}}>por mês, conforme o estado</div>
						<Linha inicio={m(6, 10)} cor={CORES.azulClaro} rotulo="Distrito Federal" valor={`R$ ${brl(COTA_MIN)}`} />
						<Linha inicio={m(6.5)} cor={CORES.azul} rotulo="Roraima" valor={`R$ ${brl(COTA_MAX)}`} />
						<div style={{marginTop: 40, display: 'flex', alignItems: 'center', gap: 20, opacity: progresso(frame, m(7), m(7, 12))}}>
							<svg width="300" height="40" viewBox="0 0 300 40">
								<defs>
									<linearGradient id="grad-cota" x1="0" x2="1">
										<stop offset="0" stopColor={CORES.azulClaro} />
										<stop offset="1" stopColor={CORES.azul} />
									</linearGradient>
								</defs>
								<rect x="3" y="3" width="294" height="34" fill="url(#grad-cota)" stroke={CORES.preto} strokeWidth="5" />
							</svg>
							<div style={{fontFamily: FONTES.mao, fontSize: 48, color: CORES.preto, lineHeight: 1}}>quanto mais longe
								<br />de Brasília, maior</div>
						</div>
					</div>
					<Fonte texto="AGÊNCIA LUPA / CÂMARA (COTA 2026)" inicio={iniMapa} style={{left: 905, top: 795}} />
				</KenBurns>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

const Linha: React.FC<{inicio: number; cor: string; rotulo: string; valor: string}> = ({inicio, cor, rotulo, valor}) => {
	const frame = useCurrentFrame();
	const p = progresso(frame, inicio, inicio + 12);
	return (
		<div style={{display: 'flex', alignItems: 'center', gap: 20, marginTop: 30, opacity: p, transform: `translateX(${(1 - p) * 30}px)`}}>
			<div style={{width: 44, height: 44, background: cor, border: `4px solid ${CORES.preto}`}} />
			<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 36, color: CORES.preto, width: 300}}>{rotulo}</div>
			<div style={{fontFamily: FONTES.titulo, fontSize: 52, color: CORES.preto, whiteSpace: 'nowrap'}}>{valor}</div>
		</div>
	);
};

const Selo: React.FC<{inicio: number}> = ({inicio}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const s = spring({frame: frame - inicio, fps, config: {damping: 10, stiffness: 180}});
	return (
		<div
			style={{
				position: 'absolute',
				left: 800,
				top: 690,
				padding: '10px 34px',
				border: `9px solid ${CORES.azul}`,
				borderRadius: 14,
				background: 'rgba(251,246,234,0.92)',
				color: CORES.azul,
				fontFamily: FONTES.titulo,
				fontSize: 50,
				whiteSpace: 'nowrap',
				transform: `rotate(-4deg) scale(${interpolate(s, [0, 1], [2.2, 1])})`,
				opacity: frame < inicio ? 0 : interpolate(s, [0, 0.2], [0, 1], {extrapolateRight: 'clamp'}),
			}}
		>
			TETO DE GASTO, NÃO SALÁRIO
		</div>
	);
};
