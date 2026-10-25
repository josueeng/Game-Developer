import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {janela, progresso, useEntrada, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Fonte} from '../components/Fonte';
import {Recorte} from '../components/Recorte';
import {MapaBrasil, centroideUF, pontosNoMapa} from '../components/MapaBrasil';

// Atribuições: CF arts. 48 a 51. Emendas individuais na LOA 2026: R$ 26,6 bi,
// cerca de R$ 40 mi por deputado, em média (SpaceMoney / Agência Lupa).
const MAPA = {x: 1000, y: 110, w: 680, h: 680};

export const Cena6Faz: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	const iniB = m(7, -6);
	return (
		<AbsoluteFill>
			<AbsoluteFill style={{opacity: janela(frame, -12, iniB + 12)}}>
				<KenBurns zoom={[1.0, 1.04]}>
					<div style={{position: 'absolute', left: 140, top: 100, fontFamily: FONTES.titulo, fontSize: 84, color: CORES.preto, opacity: progresso(frame, 0, 12)}}>
						E o que ele <span style={{background: CORES.amarelo, padding: '0 14px'}}>faz?</span>
					</div>
					<Cartao inicio={m(1)} x={140} n="1" titulo="LEGISLA" itens={['propõe, discute e vota leis', 'medidas provisórias', 'o orçamento do país']} cor={CORES.amarelo} />
					<Cartao inicio={m(3)} x={980} n="2" titulo="FISCALIZA" itens={['convoca ministros', 'pede informações', 'pode abrir CPIs']} cor={CORES.azulClaro} />
					<Recorte seed="dois-tercos" inicio={m(5)} cor={CORES.preto} rotacao={-1.5} style={{left: 560, top: 640, width: 800}} padding="14px 28px">
						<div style={{display: 'flex', alignItems: 'center', gap: 24}}>
							<div style={{fontFamily: FONTES.titulo, fontSize: 92, color: CORES.amarelo, lineHeight: 1}}>2/3</div>
							<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 32, color: CORES.papel, lineHeight: 1.2}}>
								dos votos da Câmara para autorizar
								<br />
								processo contra o presidente
							</div>
						</div>
					</Recorte>
					<Fonte texto="CONSTITUIÇÃO FEDERAL, ARTS. 48 A 51" inicio={m(1)} style={{left: 145, top: 795}} />
				</KenBurns>
			</AbsoluteFill>

			<AbsoluteFill style={{opacity: janela(frame, iniB, 99999)}}>
				<KenBurns zoom={[1.0, 1.05]} origem="70% 50%">
					<div style={{position: 'absolute', left: 140, top: 130, width: 780}}>
						<div style={{fontFamily: FONTES.titulo, fontSize: 60, color: CORES.preto, opacity: progresso(frame, iniB, iniB + 12)}}>3 · INDICA EMENDAS</div>
						<Recorte seed="emendas" inicio={m(8)} cor={CORES.amarelo} rotacao={-1.5} style={{position: 'relative', marginTop: 30, width: 800}} padding="18px 28px">
							<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 28, color: CORES.preto}}>POR DEPUTADO, POR ANO, EM MÉDIA</div>
							<div style={{fontFamily: FONTES.titulo, fontSize: 76, color: CORES.preto, whiteSpace: 'nowrap', lineHeight: 1.1}}>~R$ 40 milhões</div>
							<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 26, color: CORES.cinza}}>em emendas individuais (total 2026: R$ 26,6 bi)</div>
						</Recorte>
						<div style={{marginTop: 40, fontFamily: FONTES.mao, fontSize: 54, color: CORES.preto, lineHeight: 1.1, opacity: progresso(frame, m(9), m(9, 12))}}>
							ele escolhe para onde vai o dinheiro
						</div>
						<div style={{marginTop: 18, display: 'flex', gap: 18, opacity: progresso(frame, m(10), m(10, 12))}}>
							{['obras', 'saúde', 'municípios'].map((t) => (
								<span key={t} style={{padding: '6px 18px', background: CORES.papel, border: `4px solid ${CORES.preto}`, fontFamily: FONTES.texto, fontWeight: 800, fontSize: 32, color: CORES.preto}}>{t}</span>
							))}
						</div>
					</div>
					<div style={{position: 'absolute', left: MAPA.x, top: MAPA.y}}>
						<MapaBrasil largura={MAPA.w} altura={MAPA.h} inicio={iniB} duracaoEntrada={20} destaques={[{uf: 'DF', cor: CORES.amarelo, inicio: m(8)}]} />
						<Setas inicio={m(9)} />
					</div>
					<Fonte texto="LOA 2026 · SPACEMONEY / AGÊNCIA LUPA" inicio={m(8)} style={{left: 1010, top: 795}} />
				</KenBurns>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

const Cartao: React.FC<{inicio: number; x: number; n: string; titulo: string; itens: string[]; cor: string}> = ({inicio, x, n, titulo, itens, cor}) => {
	const frame = useCurrentFrame();
	const e = useEntrada(inicio);
	return (
		<div style={{position: 'absolute', left: x, top: 240, width: 800, opacity: frame < inicio ? 0 : interpolate(e, [0, 0.3], [0, 1], {extrapolateRight: 'clamp'}), transform: `translateY(${(1 - e) * 40}px) rotate(${x < 500 ? -1 : 1}deg)`}}>
			<div style={{background: CORES.papel, border: `5px solid ${CORES.preto}`, boxShadow: '0 12px 18px rgba(40,30,15,0.28)', padding: '20px 30px'}}>
				<div style={{display: 'flex', alignItems: 'center', gap: 20}}>
					<div style={{width: 76, height: 76, borderRadius: 38, background: cor, border: `4px solid ${CORES.preto}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONTES.titulo, fontSize: 44, color: CORES.preto}}>{n}</div>
					<div style={{fontFamily: FONTES.titulo, fontSize: 66, color: CORES.preto}}>{titulo}</div>
				</div>
				{itens.map((t, i) => (
					<div key={t} style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 36, color: CORES.preto, marginTop: 12, opacity: progresso(frame, inicio + 10 + i * 10, inicio + 20 + i * 10)}}>· {t}</div>
				))}
			</div>
		</div>
	);
};

const Setas: React.FC<{inicio: number}> = ({inicio}) => {
	const frame = useCurrentFrame();
	const [bx, by] = centroideUF('DF', MAPA.w, MAPA.h);
	const alvos = pontosNoMapa(12, MAPA.w, MAPA.h, 'emendas').filter(([x, y]) => Math.hypot(x - bx, y - by) > 90);
	return (
		<svg width={MAPA.w} height={MAPA.h} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
			{alvos.map(([x, y], i) => {
				const p = progresso(frame, inicio + i * 4, inicio + i * 4 + 18);
				const ex = bx + (x - bx) * p;
				const ey = by + (y - by) * p;
				return (
					<g key={i} opacity={p > 0 ? 1 : 0}>
						<line x1={bx} y1={by} x2={ex} y2={ey} stroke={CORES.preto} strokeWidth={4} strokeDasharray="10 8" />
						<circle cx={ex} cy={ey} r={14} fill={CORES.amarelo} stroke={CORES.preto} strokeWidth={4} />
						<text x={ex} y={ey + 6} textAnchor="middle" fontFamily={FONTES.titulo} fontSize={16} fill={CORES.preto}>R$</text>
					</g>
				);
			})}
			<circle cx={bx} cy={by} r={12} fill={CORES.preto} opacity={progresso(frame, inicio - 20, inicio)} />
		</svg>
	);
};
