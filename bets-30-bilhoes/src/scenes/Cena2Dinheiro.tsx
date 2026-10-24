import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {progresso, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Titulo} from '../components/Titulo';
import {Recorte} from '../components/Recorte';
import {Fonte} from '../components/Fonte';
import {Moeda} from '../components/Icones';
import {MarcaTexto} from '../components/MarcaTexto';

// Retorno de 93% a 94% em prêmios: dado da SPA/Ministério da Fazenda citado
// pelo presidente do Banco Central na CPI das Bets (08/04/2025). Usamos 93%.
const LADO = 10;
const TAM = 48;
const PASSO = 56;
const GRADE = {x: (1920 - LADO * PASSO) / 2, y: 175};

export const Cena2Dinheiro: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	const recolor = m(4, 10);
	const separa = m(5);

	return (
		<AbsoluteFill>
			<KenBurns zoom={[1.0, 1.05]}>
				<Titulo texto="R$ 100 apostados" inicio={4} />
				<Fonte texto="SPA/FAZENDA VIA BANCO CENTRAL, CPI DAS BETS (08/04/2025)" inicio={m(3)} style={{left: 1010, top: 92}} />

				<Cofre inicio={separa - 10} />

				{/* Grade de 100 moedas */}
				{Array.from({length: LADO * LADO}).map((_, i) => {
					const c = i % LADO;
					const l = Math.floor(i / LADO);
					const entra = progresso(frame, 4 + i * 0.35, 14 + i * 0.35);
					const premio = i < 93;
					const pc = progresso(frame, recolor + (premio ? i * 0.25 : 30), recolor + (premio ? i * 0.25 : 30) + 10);
					const ps = premio ? 0 : progresso(frame, separa + (i - 93) * 3, separa + (i - 93) * 3 + 22);
					// as 7 moedas da casa saem da grade e caem no cofre à direita
					const destinoX = 1560 + ((i - 93) % 4) * 52 - (GRADE.x + c * PASSO);
					const destinoY = 520 + Math.floor((i - 93) / 4) * 52 - (GRADE.y + l * PASSO);
					return (
						<div
							key={i}
							style={{
								position: 'absolute',
								left: GRADE.x + c * PASSO,
								top: GRADE.y + l * PASSO,
								opacity: entra,
								transform: `translate(${destinoX * ps}px, ${destinoY * ps}px) scale(${0.5 + entra * 0.5})`,
							}}
						>
							<Moeda tamanho={TAM} cor={pc > 0.5 ? (premio ? CORES.azulClaro : CORES.amarelo) : CORES.papel} />
						</div>
					);
				})}

				{/* "Não era perda" */}
				<Recorte seed="nao-perda" inicio={m(1)} cor={CORES.preto} rotacao={-4} style={{left: 120, top: 300}} padding="16px 30px">
					<div style={{fontFamily: FONTES.titulo, fontSize: 50, color: CORES.amarelo, lineHeight: 1.05}}>
						NÃO ERA
						<br />
						PERDA
					</div>
				</Recorte>

				{/* Rótulos */}
				<Recorte seed="lbl-premios" inicio={recolor + 20} rotacao={-2} style={{left: 110, top: 500, width: 420}} padding="20px 26px">
					<div style={{fontFamily: FONTES.titulo, fontSize: 92, color: CORES.azul, lineHeight: 1}}>R$ 93</div>
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 36, color: CORES.preto}}>voltam em prêmios</div>
				</Recorte>
				<Recorte seed="lbl-casa" inicio={separa + 30} cor={CORES.amarelo} rotacao={2} style={{left: 1470, top: 220, width: 380}} padding="18px 24px">
					<div style={{fontFamily: FONTES.titulo, fontSize: 92, color: CORES.preto, lineHeight: 1}}>R$ 7</div>
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 30, color: CORES.preto, whiteSpace: 'nowrap'}}>
						ficam com a <MarcaTexto inicio={separa + 50} cor={CORES.papel}>casa</MarcaTexto>
					</div>
				</Recorte>

				{/* Barra 93/7 */}
				<Barra inicio={separa + 40} />
			</KenBurns>
		</AbsoluteFill>
	);
};

const Cofre: React.FC<{inicio: number}> = ({inicio}) => {
	const frame = useCurrentFrame();
	const p = progresso(frame, inicio, inicio + 16);
	return (
		<div style={{position: 'absolute', left: 1520, top: 470, opacity: p, transform: `translateY(${(1 - p) * 30}px)`}}>
			<svg width="280" height="260" viewBox="0 0 280 260">
				<rect x="10" y="40" width="260" height="210" rx="18" fill={CORES.preto} />
				<rect x="28" y="58" width="224" height="174" rx="10" fill="#2b2824" stroke={CORES.amarelo} strokeWidth="4" strokeDasharray="10 8" />
				<text x="140" y="32" textAnchor="middle" fontFamily="Archivo Black" fontSize="34" fill={CORES.preto}>CASA</text>
			</svg>
		</div>
	);
};

const Barra: React.FC<{inicio: number}> = ({inicio}) => {
	const frame = useCurrentFrame();
	const p = progresso(frame, inicio, inicio + 30);
	const w = 1400;
	return (
		<div style={{position: 'absolute', left: 260, top: 760, width: w, height: 56, opacity: p > 0 ? 1 : 0}}>
			<div style={{display: 'flex', width: w * p, height: '100%', border: `4px solid ${CORES.preto}`, boxSizing: 'border-box', overflow: 'hidden', boxShadow: '0 8px 14px rgba(40,30,15,0.25)'}}>
				<div style={{flex: 93, background: CORES.azul, display: 'flex', alignItems: 'center', paddingLeft: 18, fontFamily: FONTES.texto, fontWeight: 800, fontSize: 28, color: CORES.papel, whiteSpace: 'nowrap'}}>93% prêmios</div>
				<div style={{flex: 7, background: CORES.amarelo, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONTES.titulo, fontSize: 24, color: CORES.preto}}>7%</div>
			</div>
			<div style={{position: 'absolute', right: -6, top: -50, fontFamily: FONTES.mao, fontWeight: 700, fontSize: 40, color: CORES.preto, opacity: interpolate(p, [0.9, 1], [0, 1])}}>sempre</div>
		</div>
	);
};
