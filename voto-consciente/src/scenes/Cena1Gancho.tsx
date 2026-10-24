import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {janela, progresso, useTempoCena} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Numero} from '../components/Numero';
import {Fonte} from '../components/Fonte';
import {Recorte} from '../components/Recorte';
import {RecorteJornal} from '../components/RecorteJornal';
import {MarcaTexto} from '../components/MarcaTexto';

// Dados: TSE — Eleições 2026, 1º turno.
// 158.745.463 aptos − 125.275.835 comparecimentos = 33.469.628 abstenções.
// Eleitorado de São Paulo: 34.104.226.
const ABSTENCAO = 33_469_628;
const ELEITORADO_SP = 34_104_226;

export const Cena1Gancho: React.FC = () => {
	const frame = useCurrentFrame();
	const t = useTempoCena();
	const fimA = t(0.42);
	const iniB = t(0.4);
	const fimB = t(0.76);
	const iniC = t(0.74);

	return (
		<AbsoluteFill>
			<KenBurns zoom={[1.0, 1.07]} pan={[-20, -10]}>
				{/* Parte A: o número */}
				<AbsoluteFill style={{opacity: janela(frame, -12, fimA)}}>
					<Recorte seed="data-gancho" inicio={2} cor={CORES.amarelo} rotacao={-2} style={{left: 560, top: 200}} padding="10px 26px">
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 34, color: CORES.preto, letterSpacing: 1}}>
							4 DE OUTUBRO DE 2026 · 1º TURNO
						</div>
					</Recorte>
					<div style={{position: 'absolute', top: 320, width: '100%', textAlign: 'center', fontFamily: FONTES.titulo, fontSize: 210, color: CORES.preto, letterSpacing: -4}}>
						<Numero para={ABSTENCAO} inicio={6} duracao={48} />
					</div>
					<div style={{position: 'absolute', top: 575, width: '100%', textAlign: 'center', fontFamily: FONTES.texto, fontWeight: 800, fontSize: 60, color: CORES.preto, opacity: progresso(frame, 20, 34)}}>
						eleitores <MarcaTexto inicio={44}>não foram votar</MarcaTexto>
					</div>
					<Fonte texto="TSE — ELEIÇÕES 2026, 1º TURNO (ABSTENÇÕES)" inicio={30} style={{left: 0, right: 0, top: 690, justifyContent: 'center'}} />
				</AbsoluteFill>

				{/* Parte B: comparação com o eleitorado de São Paulo */}
				<AbsoluteFill style={{opacity: janela(frame, iniB, fimB)}}>
					<RecorteJornal
						seed="jornal-gancho"
						inicio={iniB}
						x={130}
						y={130}
						largura={760}
						rotacao={-3}
						tamanhoManchete={66}
						manchete={
							<>
								<MarcaTexto inicio={iniB + 22}>33 milhões</MarcaTexto> ficaram longe das urnas
							</>
						}
						linhaFina="Abstenção no 1º turno foi a maior em eleições gerais desde 1998"
						linhas={5}
					/>
					<Comparacao inicio={iniB + 30} />
				</AbsoluteFill>

				{/* Parte C: a pergunta */}
				<AbsoluteFill style={{opacity: janela(frame, iniC, t(1) + 40), justifyContent: 'center', alignItems: 'center'}}>
					<div
						style={{
							fontFamily: FONTES.titulo,
							fontSize: 104,
							lineHeight: 1.12,
							textAlign: 'center',
							color: CORES.preto,
							marginTop: -140,
							transform: `scale(${interpolate(frame, [iniC, iniC + 20], [0.92, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})})`,
						}}
					>
						E se o <MarcaTexto inicio={iniC + 24}>seu voto</MarcaTexto>
						<br />
						pesasse mais do
						<br />
						que parece?
					</div>
				</AbsoluteFill>
			</KenBurns>
		</AbsoluteFill>
	);
};

const Comparacao: React.FC<{inicio: number}> = ({inicio}) => {
	const frame = useCurrentFrame();
	const larguraMax = 760;
	const barras = [
		{rotulo: 'Não foram votar (Brasil)', valor: ABSTENCAO, cor: CORES.amarelo},
		{rotulo: 'Eleitorado de São Paulo', valor: ELEITORADO_SP, cor: CORES.azul},
	];
	return (
		<div style={{position: 'absolute', left: 1000, top: 200, width: larguraMax}}>
			{barras.map((b, i) => {
				const p = progresso(frame, inicio + i * 16, inicio + i * 16 + 34);
				return (
					<div key={b.rotulo} style={{marginBottom: 46}}>
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 34, color: CORES.preto, marginBottom: 10, opacity: Math.min(1, p * 3)}}>{b.rotulo}</div>
						<div style={{display: 'flex', alignItems: 'center', gap: 18}}>
							<div
								style={{
									height: 78,
									width: ((larguraMax - 230) * b.valor * p) / ELEITORADO_SP,
									background: b.cor,
									border: `4px solid ${CORES.preto}`,
									boxSizing: 'border-box',
									boxShadow: '0 8px 14px rgba(40,30,15,0.25)',
								}}
							/>
							<div style={{fontFamily: FONTES.titulo, fontSize: 46, color: CORES.preto, opacity: p}}>
								<Numero para={b.valor / 1e6} inicio={inicio + i * 16} duracao={34} casas={1} sufixo=" mi" />
							</div>
						</div>
					</div>
				);
			})}
			<Fonte texto="TSE — ELEITORADO E COMPARECIMENTO 2026" inicio={inicio + 20} style={{left: 0, top: 330}} />
		</div>
	);
};
