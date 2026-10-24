import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {CORES, FONTES} from '../config';
import {progresso, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Fonte} from '../components/Fonte';
import {Numero} from '../components/Numero';
import {Caminhao, EtiquetaCidade, IconeCarro, IconeDistribuidora, IconePosto, IconeRefinaria} from '../components/Gasolina';

// Distribuição e revenda: R$ 1,83 por litro (Petrobras, coleta ANP de
// 11 a 17/10/2026). As etiquetas das cidades não têm números de propósito.
const PARADAS = [
	{t: 'Refinaria', x: 250, Icone: IconeRefinaria},
	{t: 'Distribuidora', x: 710, Icone: IconeDistribuidora},
	{t: 'Posto', x: 1170, Icone: IconePosto},
	{t: 'Seu tanque', x: 1630, Icone: IconeCarro},
];
const LINHA_Y = 470;

export const Cena6Caminho: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const m = useMarcas();
	const andar = interpolate(frame, [m(1), m(3)], [PARADAS[0].x, PARADAS[3].x], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const cidades = progresso(frame, m(4), m(4, 14));
	const sobe = progresso(frame, m(4), m(4, 20));

	return (
		<AbsoluteFill>
			<KenBurns zoom={[1.0, 1.04]}>
				<div style={{position: 'absolute', top: 80, width: '100%', textAlign: 'center'}}>
					<div style={{fontFamily: FONTES.titulo, fontSize: 120, color: CORES.preto, lineHeight: 1, whiteSpace: 'nowrap', opacity: progresso(frame, 2, 12)}}>
						R$ <Numero para={1.83} inicio={4} duracao={30} casas={2} />
					</div>
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 38, color: CORES.preto, opacity: progresso(frame, 10, 22)}}>da refinaria até o seu tanque</div>
				</div>

				<div style={{opacity: 1 - cidades}}>
					<div style={{position: 'absolute', left: PARADAS[0].x, top: LINHA_Y - 4, width: (andar - PARADAS[0].x), height: 8, background: CORES.preto, borderRadius: 4}} />
					<div style={{position: 'absolute', left: PARADAS[0].x, top: LINHA_Y - 2, width: PARADAS[3].x - PARADAS[0].x, height: 4, borderTop: `4px dashed ${CORES.cinza}`}} />
					{PARADAS.map((p, i) => {
						const e = spring({frame: frame - m(1) - i * 8, fps, config: {damping: 12, mass: 0.6}});
						return (
							<div key={p.t} style={{position: 'absolute', left: p.x - 75, top: LINHA_Y - 200, width: 150, textAlign: 'center', transform: `scale(${e})`}}>
								<p.Icone />
								<div style={{fontFamily: FONTES.titulo, fontSize: 32, color: CORES.preto, marginTop: 150, whiteSpace: 'nowrap', marginLeft: -40, marginRight: -40}}>{p.t}</div>
							</div>
						);
					})}
					<div style={{position: 'absolute', left: andar - 90, top: LINHA_Y - 10, opacity: progresso(frame, m(1), m(1, 8))}}>
						<Caminhao largura={180} />
					</div>
					<div style={{position: 'absolute', left: 0, right: 0, top: 645, textAlign: 'center', fontFamily: FONTES.texto, fontWeight: 800, fontSize: 36, color: CORES.cinza, opacity: progresso(frame, m(2), m(2, 12))}}>
						transporte · distribuidoras · postos · custos e lucros
					</div>
					<div style={{position: 'absolute', left: 0, right: 0, top: 700, textAlign: 'center', fontFamily: FONTES.mao, fontWeight: 700, fontSize: 56, color: CORES.azul, opacity: progresso(frame, m(3), m(3, 12))}}>
						…e a distância pesa
					</div>
				</div>

				<div style={{position: 'absolute', left: 0, right: 0, top: 300, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 160, opacity: cidades}}>
					<EtiquetaCidade nome="Cidade A" altura={200 + 0 * sobe} cor={CORES.azulClaro} />
					{/* sinal de diferente desenhado (a fonte não tem o caractere) */}
					<svg width="120" height="120" viewBox="0 0 100 100" style={{marginBottom: 220}}>
						<path d="M15 38 H85 M15 62 H85 M70 12 L30 88" stroke={CORES.preto} strokeWidth="11" strokeLinecap="round" />
					</svg>
					<EtiquetaCidade nome="Cidade B" altura={200 + 140 * sobe} cor={CORES.amarelo} />
				</div>
				<Fonte texto="PETROBRAS (COLETA ANP 11 A 17/10/2026)" inicio={10} style={{left: 0, right: 0, top: 800, justifyContent: 'center'}} />
			</KenBurns>
		</AbsoluteFill>
	);
};
