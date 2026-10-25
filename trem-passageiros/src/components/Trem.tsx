import React, {useMemo} from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {CORES, FONTES} from '../config';
import {progresso} from '../anim';
import {projecaoBrasil} from './MapaBrasil';
import ferrovias from '../data/ferrovias-brasil.json';

// Malha ferroviária atual (Natural Earth, domínio público), desenhada sobre o
// MapaBrasil com a mesma projeção. As linhas surgem de leste para oeste.
export const MalhaFerroviaria: React.FC<{largura: number; altura: number; inicio: number; duracao?: number; cor?: string; espessura?: number; opacidade?: number}> = ({
	largura,
	altura,
	inicio,
	duracao = 40,
	cor = CORES.preto,
	espessura = 3.4,
	opacidade = 1,
}) => {
	const frame = useCurrentFrame();
	const caminhos = useMemo(() => {
		const proj = projecaoBrasil(largura, altura);
		return (ferrovias as [number, number][][])
			.map((l) => {
				const pts = l.map((c) => proj(c) as [number, number]);
				return {d: 'M' + pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join('L'), x: pts[0][0]};
			})
			.sort((a, b) => b.x - a.x);
	}, [largura, altura]);
	return (
		<svg width={largura} height={altura} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible', opacity: opacidade}}>
			{caminhos.map((c, i) => {
				const t = inicio + (i / caminhos.length) * duracao;
				return <path key={i} d={c.d} fill="none" stroke={cor} strokeWidth={espessura} strokeLinecap="round" strokeLinejoin="round" opacity={progresso(frame, t, t + 8)} />;
			})}
		</svg>
	);
};

// Linhas de passageiros da Vale (traçado aproximado, pelas cidades principais).
export const LINHAS_VALE: Record<'efvm' | 'efc', [number, number][]> = {
	// Cariacica (ES) → Colatina → Gov. Valadares → Ipatinga → João Monlevade → Belo Horizonte
	efvm: [
		[-40.42, -20.26],
		[-40.63, -19.54],
		[-41.26, -19.48],
		[-41.95, -18.85],
		[-42.54, -19.47],
		[-43.17, -19.81],
		[-43.94, -19.92],
	],
	// São Luís (MA) → Santa Inês → Açailândia → Marabá → Parauapebas (PA)
	efc: [
		[-44.3, -2.53],
		[-45.38, -3.67],
		[-46.5, -4.3],
		[-47.5, -4.95],
		[-49.12, -5.37],
		[-49.9, -6.07],
	],
};

export const LinhaNoMapa: React.FC<{pontos: [number, number][]; largura: number; altura: number; inicio: number; duracao?: number; cor?: string; espessura?: number}> = ({
	pontos,
	largura,
	altura,
	inicio,
	duracao = 30,
	cor = CORES.amarelo,
	espessura = 12,
}) => {
	const frame = useCurrentFrame();
	const proj = projecaoBrasil(largura, altura);
	const pts = pontos.map((c) => proj(c) as [number, number]);
	let comp = 0;
	for (let i = 1; i < pts.length; i++) comp += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
	const d = 'M' + pts.map((p) => `${p[0]},${p[1]}`).join('L');
	const p = progresso(frame, inicio, inicio + duracao);
	const fim = pts[pts.length - 1];
	return (
		<svg width={largura} height={altura} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
			<path d={d} fill="none" stroke={CORES.preto} strokeWidth={espessura + 6} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={comp} strokeDashoffset={comp * (1 - p)} />
			<path d={d} fill="none" stroke={cor} strokeWidth={espessura} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={comp} strokeDashoffset={comp * (1 - p)} />
			{[pts[0], fim].map((q, i) => (
				<circle key={i} cx={q[0]} cy={q[1]} r={espessura * 0.8} fill={CORES.papel} stroke={CORES.preto} strokeWidth={4} opacity={p > 0.02 ? 1 : 0} />
			))}
		</svg>
	);
};

// Locomotiva genérica, estilo recorte (vapor ou moderna).
export const Locomotiva: React.FC<{largura?: number; tipo?: 'vapor' | 'moderna'; cor?: string}> = ({largura = 420, tipo = 'vapor', cor = CORES.azul}) => {
	const t = {stroke: CORES.preto, strokeWidth: 7, strokeLinejoin: 'round' as const};
	return (
		<svg width={largura} height={largura * 0.55} viewBox="0 0 400 220" style={{overflow: 'visible'}}>
			{tipo === 'vapor' ? (
				<>
					<rect x="40" y="40" width="70" height="40" fill={CORES.preto} {...t} />
					<path d="M60 40 L60 10 L90 10 L90 40" fill={CORES.preto} {...t} />
					<rect x="30" y="80" width="230" height="80" rx="14" fill={cor} {...t} />
					<rect x="250" y="40" width="110" height="120" fill={cor} {...t} />
					<rect x="275" y="60" width="60" height="40" fill={CORES.papel} {...t} />
					<path d="M10 160 L30 120 L30 160Z" fill={CORES.preto} {...t} />
				</>
			) : (
				<>
					<path d="M20 160 L20 70 Q20 40 60 40 L330 40 Q380 40 390 110 L390 160Z" fill={cor} {...t} />
					{[70, 140, 210, 280].map((x) => (
						<rect key={x} x={x} y="62" width="48" height="34" rx="6" fill={CORES.papel} {...t} />
					))}
					<rect x="20" y="118" width="370" height="12" fill={CORES.amarelo} stroke="none" />
				</>
			)}
			{[80, 160, 240, 320].map((x) => (
				<circle key={x} cx={x} cy="172" r="26" fill={CORES.preto} {...t} />
			))}
			{[80, 160, 240, 320].map((x) => (
				<circle key={`c${x}`} cx={x} cy="172" r="8" fill={CORES.papel} />
			))}
		</svg>
	);
};

// Trilho visto de frente: dois trilhos separados pela bitola.
export const Bitola: React.FC<{metros: number; inicio: number; rotulo: string; cor?: string}> = ({metros, inicio, rotulo, cor = CORES.amarelo}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const e = spring({frame: frame - inicio, fps, config: {damping: 13}});
	const px = metros * 300; // escala: 1 m = 300 px
	const p = progresso(frame, inicio + 10, inicio + 30);
	return (
		<div style={{position: 'relative', width: 560, height: 330, opacity: interpolate(e, [0, 0.3], [0, 1], {extrapolateRight: 'clamp'}), transform: `translateY(${(1 - e) * 30}px)`}}>
			<svg width="560" height="250" viewBox="0 0 560 250">
				{/* dormente */}
				<rect x="20" y="150" width="520" height="40" fill="#8A6A45" stroke={CORES.preto} strokeWidth="6" />
				{[280 - px / 2, 280 + px / 2].map((x, i) => (
					<path key={i} d={`M${x - 18} 150 L${x + 18} 150 L${x + 10} 130 L${x + 6} 100 L${x + 16} 90 L${x - 16} 90 L${x - 6} 100 L${x - 10} 130Z`} fill="#B9B4AA" stroke={CORES.preto} strokeWidth="5" strokeLinejoin="round" />
				))}
				{/* régua */}
				<g opacity={p}>
					<line x1={280 - px / 2} y1="60" x2={280 - px / 2 + px * p} y2="60" stroke={CORES.preto} strokeWidth="6" />
					<line x1={280 - px / 2} y1="44" x2={280 - px / 2} y2="76" stroke={CORES.preto} strokeWidth="6" />
					<line x1={280 + px / 2} y1="44" x2={280 + px / 2} y2="76" stroke={CORES.preto} strokeWidth="6" opacity={p > 0.95 ? 1 : 0} />
				</g>
			</svg>
			<div style={{position: 'absolute', top: 0, width: '100%', textAlign: 'center', fontFamily: FONTES.titulo, fontSize: 44, color: CORES.preto, opacity: p}}>
				<span style={{background: cor, padding: '0 12px'}}>{metros.toFixed(2).replace('.', ',')} m</span>
			</div>
			<div style={{position: 'absolute', top: 220, width: '100%', textAlign: 'center', fontFamily: FONTES.texto, fontWeight: 800, fontSize: 32, color: CORES.preto}}>{rotulo}</div>
		</div>
	);
};

// Bilhete de trem recortado.
export const Bilhete: React.FC<{de: string; para: string; detalhe?: string; largura?: number; cor?: string}> = ({de, para, detalhe, largura = 720, cor = CORES.papel}) => (
	<div style={{width: largura, background: cor, border: `5px solid ${CORES.preto}`, boxShadow: '0 12px 18px rgba(40,30,15,0.28)', display: 'flex', boxSizing: 'border-box'}}>
		<div style={{flex: 1, padding: '20px 28px'}}>
			<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 22, letterSpacing: 3, color: CORES.cinza}}>BILHETE DE TREM</div>
			<div style={{fontFamily: FONTES.titulo, fontSize: 48, color: CORES.preto, whiteSpace: 'nowrap', lineHeight: 1.15}}>
				{de} <span style={{color: CORES.azul}}>→</span> {para}
			</div>
			{detalhe ? <div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 26, color: CORES.cinza}}>{detalhe}</div> : null}
		</div>
		<div style={{width: 90, borderLeft: `5px dashed ${CORES.preto}`, background: `repeating-linear-gradient(0deg, ${CORES.preto} 0 6px, transparent 6px 14px)`, opacity: 0.85}} />
	</div>
);

// Carimbo que cai com mola.
export const Carimbo: React.FC<{inicio: number; texto: React.ReactNode; cor?: string; rotacao?: number; tamanho?: number; style?: React.CSSProperties}> = ({inicio, texto, cor = '#B3261E', rotacao = -8, tamanho = 64, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const s = spring({frame: frame - inicio, fps, config: {damping: 10, stiffness: 180}});
	return (
		<div
			style={{
				position: 'absolute',
				padding: '8px 30px',
				border: `9px solid ${cor}`,
				borderRadius: 14,
				background: 'rgba(251,246,234,0.88)',
				color: cor,
				fontFamily: FONTES.titulo,
				fontSize: tamanho,
				lineHeight: 1.1,
				textAlign: 'center',
				whiteSpace: 'nowrap',
				transform: `rotate(${rotacao}deg) scale(${interpolate(s, [0, 1], [2.2, 1])})`,
				opacity: frame < inicio ? 0 : interpolate(s, [0, 0.2], [0, 1], {extrapolateRight: 'clamp'}),
				...style,
			}}
		>
			{texto}
		</div>
	);
};
