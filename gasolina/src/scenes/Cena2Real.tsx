import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {progresso, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Titulo} from '../components/Titulo';
import {Fonte} from '../components/Fonte';
import {FATIAS, Pizza} from '../components/Gasolina';

// "De cada real": porcentagens da Petrobras arredondadas
// (31,9 / 28,0 / 24,0 / 15,2 / 0,9 → 32 / 28 / 24 / 15 / 1).
export const Cena2Real: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	const inicios = [m(1, 10), m(2, 6), m(3, 6), m(4, 6), m(5, 20)];

	return (
		<AbsoluteFill>
			<KenBurns zoom={[1.0, 1.05]} origem="35% 50%">
				<div style={{position: 'absolute', left: 170, top: 130, opacity: progresso(frame, 2, 14)}}>
					<Pizza
						raio={300}
						inicios={inicios}
						centro={<div style={{fontFamily: FONTES.titulo, fontSize: 84, color: CORES.preto, whiteSpace: 'nowrap'}}>R$ 1</div>}
					/>
				</div>
				<div style={{position: 'absolute', left: 140, top: 120, fontFamily: FONTES.mao, fontWeight: 700, fontSize: 52, color: CORES.preto, transform: 'rotate(-8deg)', opacity: progresso(frame, inicios[4] + 6, inicios[4] + 16)}}>
					só 1 centavo! →
				</div>

				<Titulo texto="De cada R$ 1" inicio={4} x={1000} y={60} />
				<div style={{position: 'absolute', left: 1000, top: 190, width: 840}}>
					{FATIAS.map((f, i) => {
						const p = progresso(frame, inicios[i] - 4, inicios[i] + 8);
						return (
							<div key={f.id} style={{display: 'flex', alignItems: 'center', gap: 24, height: 112, opacity: p, transform: `translateX(${(1 - p) * 30}px)`}}>
								<span style={{width: 50, height: 50, background: f.cor, border: `5px solid ${CORES.preto}`, flexShrink: 0}} />
								<span style={{fontFamily: FONTES.titulo, fontSize: 64, color: CORES.preto, width: 150, whiteSpace: 'nowrap'}}>{f.centavos}¢</span>
								<div>
									<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 36, color: CORES.preto}}>{f.nome}</div>
									<div style={{fontFamily: FONTES.texto, fontWeight: 700, fontSize: 26, color: CORES.cinza, whiteSpace: 'nowrap'}}>R$ {f.reais} por litro</div>
								</div>
							</div>
						);
					})}
				</div>
				<Fonte texto="PETROBRAS (ANP, 11 A 17/10/2026) · ARREDONDADO" inicio={m(1)} style={{left: 1005, top: 790}} />
			</KenBurns>
		</AbsoluteFill>
	);
};
