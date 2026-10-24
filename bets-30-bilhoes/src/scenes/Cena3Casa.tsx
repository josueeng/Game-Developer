import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {CORES, FONTES} from '../config';
import {janela, progresso, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Titulo} from '../components/Titulo';
import {Recorte} from '../components/Recorte';
import {Fonte} from '../components/Fonte';
import {MarcaTexto} from '../components/MarcaTexto';
import {Moeda, Pessoa} from '../components/Icones';

// Matemática: retorno médio de 93% por rodada (SPA/MF). Valor esperado de
// R$ 100 reapostados n vezes = 100 × 0,93^n → 10 rodadas ≈ 48; 20 ≈ 23.
const valor = (n: number) => 100 * Math.pow(0.93, n);

export const Cena3Casa: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	const fimA1 = m(1, 10);
	const iniA2 = m(1, -6);
	const fimA2 = m(3, 10);
	const iniB = m(3, -6);
	const fimB = m(6, 10);
	const iniC = m(6, -6);

	return (
		<AbsoluteFill>
			{/* A1: 7% parece pouco + cara ou coroa */}
			<AbsoluteFill style={{opacity: janela(frame, -12, fimA1)}}>
				<KenBurns zoom={[1.0, 1.05]}>
					<Titulo texto="A casa sempre ganha?" inicio={2} />
					<div style={{position: 'absolute', left: 150, top: 230, fontFamily: FONTES.titulo, fontSize: 300, color: CORES.preto, lineHeight: 1}}>7%</div>
					<div style={{position: 'absolute', left: 190, top: 560, fontFamily: FONTES.mao, fontWeight: 700, fontSize: 72, color: CORES.azul, transform: 'rotate(-4deg)', opacity: progresso(frame, 14, 26)}}>parece pouco…</div>
					<Recorte seed="justo" inicio={20} rotacao={-1.5} style={{left: 900, top: 210, width: 860}} padding="26px 34px">
						<CaraCoroa titulo="CARA OU COROA JUSTO" texto="aposta R$ 1, ganha" valor="R$ 2,00" cor={CORES.azulClaro} />
					</Recorte>
					<Recorte seed="casa-paga" inicio={44} cor={CORES.amarelo} rotacao={1.5} style={{left: 900, top: 470, width: 860}} padding="26px 34px">
						<CaraCoroa titulo="NA CASA DE APOSTAS (93%)" texto="aposta R$ 1, ganha" valor={<MarcaTexto inicio={62} cor={CORES.papel}>R$ 1,86</MarcaTexto>} cor={CORES.papel} />
					</Recorte>
				</KenBurns>
			</AbsoluteFill>

			{/* A2: o prêmio volta para o jogo */}
			<AbsoluteFill style={{opacity: janela(frame, iniA2, fimA2)}}>
				<KenBurns zoom={[1.05, 1.0]}>
					<Ciclo inicio={iniA2} destaque={m(2)} />
				</KenBurns>
			</AbsoluteFill>

			{/* B: R$ 100 reapostados */}
			<AbsoluteFill style={{opacity: janela(frame, iniB, fimB)}}>
				<KenBurns zoom={[1.0, 1.04]} origem="60% 50%">
					<Titulo texto="R$ 100 reapostados" inicio={iniB} />
					<Grafico inicio={m(3, 10)} em10={m(4, 20)} em20={m(5, 10)} />
					<Fonte texto="CÁLCULO: 100 × 0,93 ELEVADO AO Nº DE RODADAS (MÉDIA ESPERADA)" inicio={iniB + 20} style={{left: 250, top: 790}} />
				</KenBurns>
			</AbsoluteFill>

			{/* C: poucos ganham, todos pagam */}
			<AbsoluteFill style={{opacity: janela(frame, iniC, 99999)}}>
				<KenBurns zoom={[1.0, 1.06]}>
					<Multidao inicio={iniC} escurece={m(7)} />
					<Carimbo inicio={m(8)} />
				</KenBurns>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

const CaraCoroa: React.FC<{titulo: string; texto: string; valor: React.ReactNode; cor: string}> = ({titulo, texto, valor, cor}) => (
	<div style={{display: 'flex', alignItems: 'center', gap: 30}}>
		<Moeda tamanho={130} cor={cor} />
		<div>
			<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 30, color: CORES.cinza, letterSpacing: 1}}>{titulo}</div>
			<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 44, color: CORES.preto}}>
				{texto} <span style={{fontFamily: FONTES.titulo, fontSize: 64, whiteSpace: 'nowrap'}}>{valor}</span>
			</div>
		</div>
	</div>
);

// Ciclo: aposta → prêmio → aposta de novo (setas girando).
const Ciclo: React.FC<{inicio: number; destaque: number}> = ({inicio, destaque}) => {
	const frame = useCurrentFrame();
	const giro = (frame - inicio) * 1.6;
	const p = progresso(frame, inicio, inicio + 20);
	const etapas = [
		{t: 'APOSTA', a: -90},
		{t: 'PRÊMIO', a: 30},
		{t: 'APOSTA DE NOVO', a: 150},
	];
	return (
		<>
			<div style={{position: 'absolute', left: 960 - 260, top: 420 - 260, width: 520, height: 520, opacity: p}}>
				<svg width="520" height="520" viewBox="0 0 520 520" style={{transform: `rotate(${giro}deg)`}}>
					{[0, 120, 240].map((a) => (
						<g key={a} transform={`rotate(${a} 260 260)`}>
							<path d="M260 60 A200 200 0 0 1 433 160" fill="none" stroke={CORES.preto} strokeWidth="16" strokeLinecap="round" />
							<path d="M433 160 L400 150 M433 160 L436 126" stroke={CORES.preto} strokeWidth="16" strokeLinecap="round" />
						</g>
					))}
				</svg>
				<div style={{position: 'absolute', left: 160, top: 160, width: 200, height: 200, borderRadius: 100, background: CORES.amarelo, border: `6px solid ${CORES.preto}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONTES.titulo, fontSize: 64}}>
					-7%
				</div>
			</div>
			{etapas.map((e, i) => {
				const r = 330;
				const x = 960 + Math.cos((e.a * Math.PI) / 180) * r;
				const y = 420 + Math.sin((e.a * Math.PI) / 180) * r * 0.85;
				const ativo = i === 2 && frame >= destaque;
				return (
					<Recorte key={e.t} seed={`ciclo-${i}`} inicio={inicio + 8 + i * 10} cor={ativo ? CORES.amarelo : CORES.papel} rotacao={i % 2 ? 2 : -2} style={{left: x - 200, top: y - 40, width: 400}} padding="14px 10px">
						<div style={{fontFamily: FONTES.titulo, fontSize: 36, color: CORES.preto, textAlign: 'center'}}>{e.t}</div>
					</Recorte>
				);
			})}
		</>
	);
};

const Grafico: React.FC<{inicio: number; em10: number; em20: number}> = ({inicio, em10, em20}) => {
	const frame = useCurrentFrame();
	const W = 1100;
	const H = 500;
	const ox = 250;
	const oy = 210;
	const n = interpolate(frame, [inicio, em10, em20], [0, 10, 20], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const px = (r: number) => (r / 20) * W;
	const py = (v: number) => H - (v / 100) * H;
	const pts: string[] = [];
	for (let r = 0; r <= n + 1e-6; r += 0.25) pts.push(`${px(r)},${py(valor(r))}`);
	pts.push(`${px(n)},${py(valor(n))}`);
	const marcos = [
		{r: 10, em: em10},
		{r: 20, em: em20},
	];
	return (
		<>
			<svg width={W + 40} height={H + 60} style={{position: 'absolute', left: ox, top: oy, overflow: 'visible'}}>
				{[0, 25, 50, 75, 100].map((v) => (
					<g key={v}>
						<line x1={0} x2={W} y1={py(v)} y2={py(v)} stroke={CORES.begeEscuro} strokeWidth={2} />
						<text x={-14} y={py(v) + 8} textAnchor="end" fontFamily="Archivo" fontWeight={700} fontSize={24} fill={CORES.cinza}>R$ {v}</text>
					</g>
				))}
				<line x1={0} x2={W} y1={H} y2={H} stroke={CORES.preto} strokeWidth={4} />
				{[0, 5, 10, 15, 20].map((r) => (
					<text key={r} x={px(r)} y={H + 36} textAnchor="middle" fontFamily="Archivo" fontWeight={800} fontSize={26} fill={CORES.preto}>{r}</text>
				))}
				<text x={W} y={H + 70} textAnchor="end" fontFamily="Archivo" fontWeight={800} fontSize={24} fill={CORES.cinza}>rodadas</text>
				<polyline points={pts.join(' ')} fill="none" stroke={CORES.azul} strokeWidth={9} strokeLinejoin="round" strokeLinecap="round" />
				<circle cx={px(n)} cy={py(valor(n))} r={14} fill={CORES.amarelo} stroke={CORES.preto} strokeWidth={4} />
				{marcos.map((mk) => (
					<g key={mk.r} opacity={progresso(frame, mk.em - 4, mk.em + 6)}>
						<line x1={px(mk.r)} x2={px(mk.r)} y1={py(valor(mk.r))} y2={H} stroke={CORES.preto} strokeWidth={3} strokeDasharray="8 8" />
					</g>
				))}
			</svg>
			{marcos.map((mk) => (
				<Recorte key={mk.r} seed={`mk-${mk.r}`} inicio={mk.em} cor={CORES.amarelo} rotacao={-2} style={{left: ox + px(mk.r) - (mk.r === 20 ? 300 : 120), top: oy + py(valor(mk.r)) - 150}} padding="10px 22px">
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 26, color: CORES.preto}}>{mk.r} rodadas</div>
					<div style={{fontFamily: FONTES.titulo, fontSize: 56, color: CORES.preto, lineHeight: 1}}>R$ {Math.round(valor(mk.r))}</div>
				</Recorte>
			))}
			<div style={{position: 'absolute', left: 1400, top: 220, textAlign: 'right', width: 420}}>
				<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 30, color: CORES.cinza}}>sobram, em média</div>
				<div style={{fontFamily: FONTES.titulo, fontSize: 110, color: CORES.preto, lineHeight: 1, fontVariantNumeric: 'tabular-nums'}}>R$ {Math.round(valor(n))}</div>
			</div>
		</>
	);
};

const Multidao: React.FC<{inicio: number; escurece: number}> = ({inicio, escurece}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const COLS = 11;
	const LIN = 3;
	const vencedores = [3, 8];
	const esc = progresso(frame, escurece, escurece + 20);
	return (
		<div style={{position: 'absolute', left: 190, top: 250}}>
			{Array.from({length: COLS * LIN}).map((_, i) => {
				const c = i % COLS;
				const l = Math.floor(i / COLS);
				const venc = vencedores.includes(i);
				const e = spring({frame: frame - inicio - (c + l) * 2, fps, config: {damping: 12, mass: 0.6}});
				const cor = venc ? CORES.amarelo : esc > 0.5 ? '#6E6A64' : CORES.azulClaro;
				return (
					<div key={i} style={{position: 'absolute', left: c * 140, top: l * 170 + (c % 2) * 12, transform: `scale(${e * (venc ? 1.15 : 1)})`, transformOrigin: '50% 100%'}}>
						<Pessoa tamanho={110} cor={cor} />
						{venc ? (
							<div style={{position: 'absolute', left: -20, top: -64, background: CORES.papel, border: `4px solid ${CORES.preto}`, borderRadius: 14, padding: '4px 14px', fontFamily: FONTES.titulo, fontSize: 28, whiteSpace: 'nowrap', opacity: progresso(frame, inicio + 20, inicio + 30)}}>
								GANHEI!
							</div>
						) : null}
					</div>
				);
			})}
		</div>
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
				left: 330,
				top: 340,
				padding: '14px 40px',
				border: `12px solid ${CORES.azul}`,
				borderRadius: 18,
				background: 'rgba(251,246,234,0.85)',
				color: CORES.azul,
				fontFamily: FONTES.titulo,
				fontSize: 84,
				lineHeight: 1,
				letterSpacing: 3,
				whiteSpace: 'nowrap',
				transform: `rotate(-7deg) scale(${interpolate(s, [0, 1], [2.2, 1])})`,
				opacity: interpolate(s, [0, 0.2], [0, 1], {extrapolateRight: 'clamp'}),
			}}
		>
			A CASA SEMPRE GANHA
		</div>
	);
};
