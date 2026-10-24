import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {janela, progresso, useEntrada, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Numero} from '../components/Numero';
import {Fonte} from '../components/Fonte';
import {Recorte} from '../components/Recorte';
import {RecorteJornal} from '../components/RecorteJornal';
import {MarcaTexto} from '../components/MarcaTexto';
import {IconeAlerta, IconeX} from '../components/Icones';

// Banco Central na CPI das Bets (08/04/2025): R$ 20 a 30 bi/mês em jan–mar/2025.
// MP nº 1.394/2026: proibição; sites fora do ar a partir de 06/10/2026.
export const Cena1Gancho: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	const fimA = m(2, 10);
	const iniB = m(2, -6);
	const fimB = m(3, 10);
	const iniC = m(3, -6);

	return (
		<AbsoluteFill>
			<KenBurns zoom={[1.0, 1.08]} pan={[-20, -10]}>
				{/* Parte A: o número */}
				<AbsoluteFill style={{opacity: janela(frame, -12, fimA)}}>
					<Recorte seed="faixa-apostas" inicio={0} cor={CORES.amarelo} rotacao={-2} style={{left: 610, top: 170}} padding="10px 26px">
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 36, color: CORES.preto, letterSpacing: 1}}>ENVIADOS PARA SITES DE APOSTAS</div>
					</Recorte>
					<div style={{position: 'absolute', top: 285, width: '100%', textAlign: 'center', fontFamily: FONTES.titulo, fontSize: 230, color: CORES.preto, letterSpacing: -6, lineHeight: 1}}>
						R$ <Numero para={30} inicio={4} duracao={40} />
						<span style={{fontSize: 130}}> BI</span>
					</div>
					<Carimbo texto="POR MÊS" inicio={m(1, 10)} x={1210} y={500} />
					<Fonte texto="BANCO CENTRAL, CPI DAS BETS (ABR/2025): R$ 20 A 30 BI POR MÊS" inicio={20} style={{left: 0, right: 0, top: 720, justifyContent: 'center'}} />
				</AbsoluteFill>

				{/* Parte B: tudo saiu do ar */}
				<AbsoluteFill style={{opacity: janela(frame, iniB, fimB)}}>
					<Celular inicio={iniB} />
					<RecorteJornal
						seed="jornal-bets"
						inicio={iniB + 10}
						x={800}
						y={200}
						largura={900}
						rotacao={2.5}
						tamanhoManchete={78}
						data="OUTUBRO DE 2026"
						manchete={
							<>
								Bets <MarcaTexto inicio={iniB + 30}>saem do ar</MarcaTexto> em todo o país
							</>
						}
						linhaFina="Medida provisória proíbe apostas online e cassinos na internet"
						linhas={4}
					/>
					<Fonte texto="MP Nº 1.394/2026 · AGÊNCIA BRASIL" inicio={iniB + 20} style={{left: 810, top: 700}} />
				</AbsoluteFill>

				{/* Parte C: a pergunta + curiosidade em aberto */}
				<AbsoluteFill style={{opacity: janela(frame, iniC, 99999)}}>
					<div
						style={{
							position: 'absolute',
							top: 200,
							width: '100%',
							textAlign: 'center',
							fontFamily: FONTES.titulo,
							fontSize: 130,
							lineHeight: 1.1,
							color: CORES.preto,
							transform: `scale(${interpolate(frame, [iniC, iniC + 20], [0.9, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})})`,
						}}
					>
						PARA ONDE IA
						<br />
						<MarcaTexto inicio={m(4)}>ESSE DINHEIRO?</MarcaTexto>
					</div>
					<Recorte seed="golpe-final" inicio={m(5)} cor={CORES.preto} rotacao={-3} style={{left: 560, top: 600}} padding="18px 34px">
						<div style={{display: 'flex', alignItems: 'center', gap: 22}}>
							<IconeAlerta tamanho={70} />
							<span style={{fontFamily: FONTES.titulo, fontSize: 46, color: CORES.amarelo, whiteSpace: 'nowrap'}}>NO FINAL: O GOLPE NOVO</span>
						</div>
					</Recorte>
				</AbsoluteFill>
			</KenBurns>
		</AbsoluteFill>
	);
};

const Carimbo: React.FC<{texto: string; inicio: number; x: number; y: number}> = ({texto, inicio, x, y}) => {
	const e = useEntrada(inicio, {damping: 10, mass: 0.6});
	return (
		<div
			style={{
				position: 'absolute',
				left: x,
				top: y,
				padding: '10px 34px',
				background: CORES.preto,
				color: CORES.amarelo,
				fontFamily: FONTES.titulo,
				fontSize: 84,
				transform: `rotate(-6deg) scale(${interpolate(e, [0, 1], [2, 1])})`,
				opacity: interpolate(e, [0, 0.2], [0, 1], {extrapolateRight: 'clamp'}),
				boxShadow: '0 12px 20px rgba(30,20,5,0.35)',
			}}
		>
			{texto}
		</div>
	);
};

// Celular genérico com tela de acesso bloqueado.
const Celular: React.FC<{inicio: number}> = ({inicio}) => {
	const frame = useCurrentFrame();
	const bloqueio = progresso(frame, inicio + 14, inicio + 24);
	return (
		<Recorte seed="cel-bloq" inicio={inicio} cor={CORES.preto} rotacao={-5} intensidade={0.4} style={{left: 220, top: 150, width: 420, height: 640}} padding={18}>
			<div style={{background: '#E9E3D3', width: '100%', height: '100%', borderRadius: 22, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 26, position: 'relative', overflow: 'hidden'}}>
				<div style={{opacity: 1 - bloqueio, position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', gap: 16, padding: 28}}>
					<div style={{fontFamily: FONTES.titulo, fontSize: 34, color: CORES.preto}}>APOSTE AGORA</div>
					{[CORES.azul, CORES.amarelo, CORES.azulClaro, CORES.amarelo].map((c, i) => (
						<div key={i} style={{height: 90, background: c, border: `4px solid ${CORES.preto}`, borderRadius: 12}} />
					))}
				</div>
				<div style={{opacity: bloqueio, transform: `scale(${0.6 + bloqueio * 0.4})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22}}>
					<div style={{width: 170, height: 170, borderRadius: 85, background: CORES.preto, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
						<IconeX tamanho={110} cor={CORES.amarelo} />
					</div>
					<div style={{fontFamily: FONTES.titulo, fontSize: 44, color: CORES.preto, textAlign: 'center', lineHeight: 1.1}}>
						ACESSO
						<br />
						BLOQUEADO
					</div>
				</div>
			</div>
		</Recorte>
	);
};
