import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {janela, progresso, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Titulo} from '../components/Titulo';
import {Recorte} from '../components/Recorte';
import {Fonte} from '../components/Fonte';
import {Numero} from '../components/Numero';
import {LinhaDoTempo} from '../components/LinhaDoTempo';
import {IconeX} from '../components/Icones';

// MP nº 1.394, de 25/09/2026. Cronograma e devolução: Agência Brasil /
// Agência Gov / Ministério da Fazenda (out/2026). "9 em cada 10 contas com
// menos de R$ 1" é dado informado pelas empresas (Agência Brasil).
export const Cena5Proibicao: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	const fimA = m(4, 10);
	const iniB = m(4, -6);
	const fimB = m(7, 10);
	const iniC = m(7, -6);

	const itens = [
		{t: 'Apostas online', em: m(2, 6)},
		{t: 'Cassino na internet', em: m(2.55)},
		{t: 'Propaganda e patrocínio', em: m(3, 4)},
	];

	return (
		<AbsoluteFill>
			{/* A: a medida provisória */}
			<AbsoluteFill style={{opacity: janela(frame, -12, fimA)}}>
				<KenBurns zoom={[1.0, 1.05]}>
					<Recorte seed="data-mp" inicio={2} cor={CORES.amarelo} rotacao={-3} style={{left: 130, top: 90}} padding="12px 28px">
						<div style={{fontFamily: FONTES.titulo, fontSize: 44, color: CORES.preto}}>25 DE SETEMBRO DE 2026</div>
					</Recorte>
					<Recorte seed="doc-mp" inicio={m(1, -6)} cor="#F7F1E1" rotacao={-1.5} intensidade={1.4} style={{left: 360, top: 230, width: 1200}} padding="34px 50px 40px">
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 26, letterSpacing: 3, color: CORES.cinza, borderBottom: `3px solid ${CORES.preto}`, paddingBottom: 10, marginBottom: 20}}>
							MEDIDA PROVISÓRIA Nº 1.394 · RESUMO
						</div>
						<div style={{fontFamily: FONTES.jornal, fontWeight: 900, fontSize: 54, color: CORES.preto, marginBottom: 16}}>Fica proibido no Brasil:</div>
						{itens.map((it) => (
							<div key={it.t} style={{display: 'flex', alignItems: 'center', gap: 22, height: 84, opacity: progresso(frame, it.em - 4, it.em + 6), transform: `translateX(${(1 - progresso(frame, it.em - 4, it.em + 6)) * 30}px)`}}>
								<div style={{width: 62, height: 62, background: CORES.preto, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
									<IconeX tamanho={46} cor={CORES.amarelo} />
								</div>
								<span style={{fontFamily: FONTES.titulo, fontSize: 52, color: CORES.preto}}>{it.t}</span>
							</div>
						))}
					</Recorte>
					<Fonte texto="MP Nº 1.394/2026 · CONGRESSO NACIONAL / AGÊNCIA SENADO" inicio={m(1)} style={{left: 370, top: 760}} />
				</KenBurns>
			</AbsoluteFill>

			{/* B: cronograma e devolução */}
			<AbsoluteFill style={{opacity: janela(frame, iniB, fimB)}}>
				<KenBurns zoom={[1.04, 1.0]}>
					<Titulo texto="O fim, dia a dia" inicio={iniB} />
					<div style={{position: 'absolute', left: 170, top: 170}}>
						<LinhaDoTempo
							inicio={iniB + 6}
							duracao={Math.max(60, m(6) - iniB)}
							largura={1580}
							posicoes={[0.03, 0.34, 0.62, 0.9]}
							marcos={[
								{ano: '25/09', texto: 'MP publicada'},
								{ano: '05/10', texto: 'Último dia para sacar'},
								{ano: '06/10', texto: 'Sites saem do ar', destaque: true},
								{ano: '9–14/10', texto: 'Bancos devolvem saldos'},
							]}
						/>
					</div>
					<Recorte seed="devolve" inicio={m(5, 10)} cor={CORES.amarelo} rotacao={-1.5} style={{left: 410, top: 570, width: 1100}} padding="18px 30px">
						<div style={{display: 'flex', alignItems: 'baseline', gap: 24, justifyContent: 'center'}}>
							<span style={{fontFamily: FONTES.titulo, fontSize: 76, color: CORES.preto, whiteSpace: 'nowrap'}}>
								R$ <Numero para={1.3} inicio={m(5, 10)} duracao={30} casas={1} /> bi
							</span>
							<span style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 36, color: CORES.preto, whiteSpace: 'nowrap', opacity: progresso(frame, m(6, -4), m(6, 6))}}>
								para <Numero para={26.5} inicio={m(6)} duracao={30} casas={1} /> milhões de contas
							</span>
						</div>
					</Recorte>
					<Fonte texto="AGÊNCIA BRASIL / MINISTÉRIO DA FAZENDA (OUT/2026)" inicio={iniB + 20} style={{left: 180, top: 780}} />
				</KenBurns>
			</AbsoluteFill>

			{/* C: 9 em cada 10 contas tinham menos de R$ 1 */}
			<AbsoluteFill style={{opacity: janela(frame, iniC, 99999)}}>
				<KenBurns zoom={[1.0, 1.05]}>
					<div style={{position: 'absolute', top: 110, width: '100%', textAlign: 'center', fontFamily: FONTES.titulo, fontSize: 72, color: CORES.preto}}>9 em cada 10 contas</div>
					<div style={{position: 'absolute', left: 210, top: 260, display: 'flex', gap: 30}}>
						{Array.from({length: 10}).map((_, i) => {
							const p = progresso(frame, iniC + 6 + i * 4, iniC + 16 + i * 4);
							const ultimo = i === 9;
							return (
								<div key={i} style={{width: 120, height: 330, background: ultimo ? CORES.papel : CORES.azulClaro, border: `5px solid ${CORES.preto}`, borderRadius: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: p, transform: `translateY(${(1 - p) * 40}px)`, boxShadow: '0 8px 14px rgba(40,30,15,0.25)'}}>
									<div style={{width: 64, height: 46, background: CORES.preto, borderRadius: 8}} />
									<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 20, color: CORES.preto}}>{ultimo ? 'mais de' : 'menos de'}</div>
									<div style={{fontFamily: FONTES.titulo, fontSize: 34, color: CORES.preto}}>R$ 1</div>
								</div>
							);
						})}
					</div>
					<Recorte seed="menos-1" inicio={iniC + 50} cor={CORES.amarelo} rotacao={-2} style={{left: 520, top: 630}} padding="14px 34px">
						<div style={{fontFamily: FONTES.titulo, fontSize: 56, color: CORES.preto}}>tinham menos de R$ 1</div>
					</Recorte>
					<Fonte texto="DADO DAS EMPRESAS, VIA AGÊNCIA BRASIL (OUT/2026)" inicio={iniC + 20} style={{left: 0, right: 0, top: 780, justifyContent: 'center'}} />
				</KenBurns>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
