import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {progresso, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Titulo} from '../components/Titulo';
import {Recorte} from '../components/Recorte';
import {Fonte} from '../components/Fonte';
import {Bequer} from '../components/Gasolina';

// Mistura obrigatória de 30% de etanol anidro desde 01/08/2025; custo do
// etanol anidro: R$ 0,99 por litro de gasolina C (Petrobras, out/2026).
export const Cena4Etanol: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	const g = progresso(frame, 8, 40);
	const e = progresso(frame, m(1, 10), m(1, 40));

	return (
		<AbsoluteFill>
			<KenBurns zoom={[1.0, 1.05]} origem="30% 50%">
				<Titulo texto="Não é só gasolina" inicio={2} />
				<div style={{position: 'absolute', left: 230, top: 170}}>
					<Bequer gasolina={g} etanol={e} />
					<div style={{position: 'absolute', left: 470, top: 380, fontFamily: FONTES.titulo, fontSize: 44, color: CORES.azul, whiteSpace: 'nowrap', opacity: g}}>70% gasolina</div>
					<div style={{position: 'absolute', left: 470, top: 140, fontFamily: FONTES.titulo, fontSize: 44, color: CORES.preto, whiteSpace: 'nowrap', opacity: e}}>30% etanol anidro</div>
				</div>
				<Recorte seed="obrigatorio" inicio={m(1, 30)} cor={CORES.preto} rotacao={-4} style={{left: 1290, top: 250}} padding="16px 30px">
					<div style={{fontFamily: FONTES.titulo, fontSize: 40, color: CORES.amarelo, lineHeight: 1.1}}>
						OBRIGATÓRIO
						<br />
						DESDE 01/08/2025
					</div>
				</Recorte>
				<Recorte seed="custo-etanol" inicio={m(2)} cor={CORES.amarelo} rotacao={2} style={{left: 1250, top: 480, width: 560}} padding="20px 30px">
					<div style={{fontFamily: FONTES.titulo, fontSize: 92, color: CORES.preto, lineHeight: 1, whiteSpace: 'nowrap'}}>R$ 0,99</div>
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 32, color: CORES.preto}}>de etanol em cada litro</div>
				</Recorte>
				<Fonte texto="PETROBRAS (MISTURA DE 30% DESDE 01/08/2025)" inicio={m(1)} style={{left: 1000, top: 790}} />
			</KenBurns>
		</AbsoluteFill>
	);
};
