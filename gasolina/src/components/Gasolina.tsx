import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {CORES, FONTES} from '../config';
import {progresso} from '../anim';

// Composição do preço médio da gasolina C (Petrobras, coleta ANP de
// 11 a 17/10/2026): R$ 6,53 por litro.
export const PRECO_LITRO = 6.53;
export const FATIAS = [
	{id: 'petrobras', nome: 'Petrobras', centavos: 32, reais: '2,08', cor: CORES.azul},
	{id: 'distribuicao', nome: 'Distribuição e postos', centavos: 28, reais: '1,83', cor: CORES.azulClaro},
	{id: 'icms', nome: 'ICMS (estados)', centavos: 24, reais: '1,57', cor: CORES.amarelo},
	{id: 'etanol', nome: 'Etanol anidro', centavos: 15, reais: '0,99', cor: CORES.begeEscuro},
	{id: 'federal', nome: 'Impostos federais', centavos: 1, reais: '0,06', cor: CORES.preto},
];

const traco = {stroke: CORES.preto, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};

// Rosca (pizza) com as fatias entrando uma a uma nos quadros de `inicios`.
export const Pizza: React.FC<{raio: number; inicios: number[]; centro?: React.ReactNode}> = ({raio, inicios, centro}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const R = raio;
	const c = R + 10;
	let acumulado = 0;
	const arco = (a0: number, a1: number) => {
		const p = (a: number) => [c + R * Math.sin(a * 2 * Math.PI), c - R * Math.cos(a * 2 * Math.PI)];
		const [x0, y0] = p(a0);
		const [x1, y1] = p(a1);
		return `M${c},${c} L${x0},${y0} A${R},${R} 0 ${a1 - a0 > 0.5 ? 1 : 0} 1 ${x1},${y1} Z`;
	};
	return (
		<div style={{position: 'relative', width: c * 2, height: c * 2}}>
			<svg width={c * 2} height={c * 2} style={{overflow: 'visible', filter: 'drop-shadow(0 12px 14px rgba(40,30,15,0.3))'}}>
				<circle cx={c} cy={c} r={R} fill={CORES.papel} {...traco} />
				{FATIAS.map((f, i) => {
					const a0 = acumulado / 100;
					acumulado += f.centavos;
					const a1 = acumulado / 100;
					const e = spring({frame: frame - (inicios[i] ?? 0), fps, config: {damping: 12, mass: 0.6}});
					const meio = ((a0 + a1) / 2) * 2 * Math.PI;
					const desloc = 14 * e;
					return (
						<path
							key={f.id}
							d={arco(a0, a1)}
							fill={f.cor}
							{...traco}
							opacity={interpolate(e, [0, 0.3], [0, 1], {extrapolateRight: 'clamp'})}
							transform={`translate(${Math.sin(meio) * desloc} ${-Math.cos(meio) * desloc})`}
						/>
					);
				})}
				<circle cx={c} cy={c} r={R * 0.42} fill={CORES.papel} {...traco} />
			</svg>
			<div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{centro}</div>
		</div>
	);
};

// Bomba de combustível recortada, com visor.
export const Bomba: React.FC<{visor: React.ReactNode; largura?: number}> = ({visor, largura = 420}) => (
	<div style={{position: 'relative', width: largura, height: largura * 1.55}}>
		<svg width={largura} height={largura * 1.55} viewBox="0 0 420 650" style={{position: 'absolute', filter: 'drop-shadow(0 14px 16px rgba(40,30,15,0.3))'}}>
			<rect x="40" y="20" width="280" height="600" rx="26" fill={CORES.azul} {...traco} />
			<rect x="70" y="60" width="220" height="150" rx="12" fill={CORES.papel} {...traco} />
			<rect x="90" y="250" width="180" height="70" rx="10" fill={CORES.amarelo} {...traco} />
			<text x="180" y="297" textAnchor="middle" fontFamily="Archivo Black" fontSize="30" fill={CORES.preto}>GASOLINA</text>
			<rect x="20" y="600" width="320" height="34" rx="8" fill={CORES.preto} />
			<path d="M320 180 C390 180 390 260 390 330 L390 470" fill="none" {...traco} strokeWidth={14} />
			<rect x="370" y="460" width="40" height="90" rx="10" fill={CORES.preto} />
		</svg>
		<div style={{position: 'absolute', left: 70 * (largura / 420), top: 60 * (largura / 420), width: 220 * (largura / 420), height: 150 * (largura / 420), display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{visor}</div>
	</div>
);

export const Barril: React.FC<{tamanho?: number}> = ({tamanho = 360}) => (
	<svg width={tamanho} height={tamanho * 1.25} viewBox="0 0 200 250" style={{filter: 'drop-shadow(0 14px 16px rgba(40,30,15,0.3))'}}>
		<path d="M30 20 Q100 0 170 20 Q190 125 170 230 Q100 250 30 230 Q10 125 30 20Z" fill={CORES.preto} {...traco} />
		<path d="M22 75 Q100 92 178 75 M18 125 Q100 142 182 125 M22 175 Q100 192 178 175" fill="none" stroke={CORES.begeEscuro} strokeWidth="6" />
		<circle cx="100" cy="125" r="34" fill={CORES.amarelo} {...traco} />
		<text x="100" y="140" textAnchor="middle" fontFamily="Archivo Black" fontSize="44" fill={CORES.preto}>$</text>
	</svg>
);

// Béquer que enche: `gasolina` e `etanol` são progressos de 0 a 1.
export const Bequer: React.FC<{gasolina: number; etanol: number}> = ({gasolina, etanol}) => {
	const topo = 90;
	const fundo = 560;
	const H = fundo - topo;
	const hG = H * 0.7 * gasolina;
	const hE = H * 0.3 * etanol;
	return (
		<svg width="440" height="620" viewBox="0 0 440 620" style={{filter: 'drop-shadow(0 14px 16px rgba(40,30,15,0.25))'}}>
			<defs>
				<clipPath id="corpo-bequer">
					<path d="M90 60 L90 540 Q90 580 130 580 L310 580 Q350 580 350 540 L350 60Z" />
				</clipPath>
			</defs>
			<path d="M90 60 L90 540 Q90 580 130 580 L310 580 Q350 580 350 540 L350 60Z" fill={CORES.papel} />
			<g clipPath="url(#corpo-bequer)">
				<rect x="80" y={fundo + 20 - hG} width="280" height={hG + 20} fill={CORES.azul} />
				<rect x="80" y={fundo + 20 - hG - hE} width="280" height={hE} fill={CORES.amarelo} />
			</g>
			<path d="M70 60 L370 60 M90 60 L90 540 Q90 580 130 580 L310 580 Q350 580 350 540 L350 60" fill="none" {...traco} strokeWidth={8} />
			{[0.25, 0.5, 0.75].map((f) => (
				<line key={f} x1="90" x2="130" y1={fundo - H * f} y2={fundo - H * f} stroke={CORES.preto} strokeWidth="4" />
			))}
		</svg>
	);
};

export const Calendario: React.FC<{circulo: number; largura?: number}> = ({circulo, largura = 700}) => {
	const frame = useCurrentFrame();
	const p = progresso(frame, circulo, circulo + 20);
	const cel = largura / 7;
	const dias = Array.from({length: 30}, (_, i) => i + 1);
	// 1º de novembro de 2026 é domingo (coluna 0).
	return (
		<div style={{width: largura, background: CORES.papel, border: `5px solid ${CORES.preto}`, boxShadow: '0 12px 18px rgba(40,30,15,0.28)'}}>
			<div style={{background: CORES.preto, color: CORES.amarelo, fontFamily: FONTES.titulo, fontSize: 48, padding: '14px 24px'}}>NOVEMBRO 2026</div>
			<div style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)'}}>
				{['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
					<div key={i} style={{textAlign: 'center', fontFamily: FONTES.texto, fontWeight: 800, fontSize: 24, color: CORES.cinza, padding: '8px 0'}}>{d}</div>
				))}
				{dias.map((d) => (
					<div key={d} style={{height: cel * 0.72, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', fontFamily: FONTES.titulo, fontSize: 34, color: CORES.preto}}>
						{d === 9 ? (
							<svg width={cel * 0.9} height={cel * 0.7} style={{position: 'absolute'}} viewBox="0 0 100 80">
								<ellipse cx="50" cy="40" rx="44" ry="34" fill={CORES.amarelo} opacity={p} />
								<ellipse cx="50" cy="40" rx="44" ry="34" fill="none" stroke={CORES.preto} strokeWidth="6" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
							</svg>
						) : null}
						<span style={{position: 'relative'}}>{d}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export const Caminhao: React.FC<{largura?: number}> = ({largura = 200}) => (
	<svg width={largura} height={largura * 0.55} viewBox="0 0 200 110">
		<rect x="4" y="20" width="120" height="60" rx="30" fill={CORES.amarelo} {...traco} strokeWidth={5} />
		<path d="M124 40 L160 40 L190 62 L190 84 L124 84Z" fill={CORES.azul} {...traco} strokeWidth={5} />
		<rect x="140" y="46" width="22" height="16" fill={CORES.papel} stroke={CORES.preto} strokeWidth="3" />
		{[36, 100, 164].map((x) => (
			<circle key={x} cx={x} cy="92" r="14" fill={CORES.preto} stroke={CORES.papel} strokeWidth="4" />
		))}
	</svg>
);

// Ícones das etapas do caminho do combustível.
export const IconeRefinaria: React.FC = () => (
	<svg width="150" height="150" viewBox="0 0 100 100">
		<rect x="10" y="50" width="80" height="42" fill={CORES.begeEscuro} {...traco} strokeWidth={4} />
		<rect x="22" y="14" width="12" height="36" fill={CORES.preto} />
		<rect x="58" y="24" width="12" height="26" fill={CORES.preto} />
		<path d="M28 12 Q34 2 44 6" fill="none" stroke={CORES.cinza} strokeWidth="5" strokeLinecap="round" />
	</svg>
);
export const IconeDistribuidora: React.FC = () => (
	<svg width="150" height="150" viewBox="0 0 100 100">
		{[18, 52].map((x) => (
			<g key={x}>
				<rect x={x} y="34" width="30" height="56" rx="6" fill={CORES.azulClaro} {...traco} strokeWidth={4} />
				<ellipse cx={x + 15} cy="34" rx="15" ry="6" fill={CORES.papel} {...traco} strokeWidth={4} />
			</g>
		))}
	</svg>
);
export const IconePosto: React.FC = () => (
	<svg width="150" height="150" viewBox="0 0 100 100">
		<rect x="8" y="12" width="84" height="16" fill={CORES.amarelo} {...traco} strokeWidth={4} />
		<rect x="20" y="28" width="6" height="64" fill={CORES.preto} />
		<rect x="74" y="28" width="6" height="64" fill={CORES.preto} />
		<rect x="38" y="46" width="24" height="44" rx="4" fill={CORES.azul} {...traco} strokeWidth={4} />
	</svg>
);
export const IconeCarro: React.FC = () => (
	<svg width="150" height="150" viewBox="0 0 100 100">
		<path d="M10 66 L16 46 Q20 38 30 38 L68 38 Q78 38 82 46 L90 66 Z" fill={CORES.amarelo} {...traco} strokeWidth={4} />
		<rect x="6" y="62" width="88" height="18" rx="6" fill={CORES.amarelo} {...traco} strokeWidth={4} />
		<circle cx="28" cy="82" r="9" fill={CORES.preto} />
		<circle cx="72" cy="82" r="9" fill={CORES.preto} />
	</svg>
);

// Etiqueta de preço com "?" (sem números: os preços por cidade não têm fonte oficial aqui).
export const EtiquetaCidade: React.FC<{nome: string; altura: number; cor: string}> = ({nome, altura, cor}) => (
	<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
		<div style={{fontFamily: FONTES.titulo, fontSize: 40, color: CORES.preto}}>R$ ?,??</div>
		<div style={{width: 120, height: altura, background: cor, border: `5px solid ${CORES.preto}`, boxShadow: '0 8px 12px rgba(40,30,15,0.25)'}} />
		<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 28, color: CORES.preto}}>{nome}</div>
	</div>
);
