import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {progresso, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Numero} from '../components/Numero';
import {Fonte} from '../components/Fonte';
import {Recorte} from '../components/Recorte';
import {IconeAlerta} from '../components/Icones';
import {Bomba} from '../components/Gasolina';

// Petrobras, composição do preço (coleta ANP de 11 a 17/10/2026):
// litro médio R$ 6,53; parcela Petrobras R$ 2,08 (31,9%). Resto: R$ 4,45.
const LITRO = {x: 760, y: 150, w: 250, h: 620};

export const Cena1Gancho: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	const enche = progresso(frame, 6, 40);
	const parte = progresso(frame, m(1), m(1, 18));
	const hPetro = LITRO.h * 0.319;

	return (
		<AbsoluteFill>
			<KenBurns zoom={[1.0, 1.07]} pan={[-10, -10]}>
				<div style={{position: 'absolute', left: 170, top: 150}}>
					<Bomba
						largura={400}
						visor={
							<div style={{fontFamily: FONTES.titulo, fontSize: 40, color: CORES.preto, whiteSpace: 'nowrap'}}>
								R$ <Numero para={6.53} inicio={4} duracao={40} casas={2} />
							</div>
						}
					/>
				</div>

				{/* O litro */}
				<div style={{position: 'absolute', left: LITRO.x, top: LITRO.y, width: LITRO.w, height: LITRO.h, border: `6px solid ${CORES.preto}`, borderRadius: 26, background: CORES.papel, overflow: 'hidden', boxShadow: '0 12px 18px rgba(40,30,15,0.28)'}}>
					<div style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: LITRO.h * enche, background: '#C9B78F'}} />
					<div style={{position: 'absolute', top: LITRO.h * (1 - enche), left: 0, right: 0, height: hPetro, background: CORES.azul, opacity: parte, borderBottom: `5px solid ${CORES.preto}`}} />
					<div style={{position: 'absolute', top: hPetro + 30, left: 0, right: 0, textAlign: 'center', fontFamily: FONTES.titulo, fontSize: 260, color: CORES.preto, opacity: progresso(frame, m(2), m(2, 10)), transform: `scale(${interpolate(progresso(frame, m(2), m(2, 12)), [0, 1], [1.6, 1])})`}}>?</div>
				</div>
				<div style={{position: 'absolute', left: LITRO.x, top: LITRO.y + LITRO.h + 6, width: LITRO.w, textAlign: 'center', fontFamily: FONTES.texto, fontWeight: 800, fontSize: 28, color: CORES.preto}}>1 litro</div>

				<Recorte seed="g-petro" inicio={m(1, 6)} cor={CORES.azul} rotacao={-2} style={{left: 1080, top: 150, width: 560}} padding="18px 28px">
					<div style={{fontFamily: FONTES.titulo, fontSize: 78, color: CORES.papel, lineHeight: 1, whiteSpace: 'nowrap'}}>R$ 2,08</div>
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 34, color: CORES.papel}}>ficam com a Petrobras</div>
				</Recorte>
				<Recorte seed="g-resto" inicio={m(2, 4)} rotacao={1.5} style={{left: 1080, top: 400, width: 560}} padding="18px 28px">
					<div style={{fontFamily: FONTES.titulo, fontSize: 78, color: CORES.preto, lineHeight: 1, whiteSpace: 'nowrap'}}>R$ 4,45</div>
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 34, color: CORES.preto}}>vão para onde?</div>
				</Recorte>
				<Recorte seed="g-final" inicio={m(4)} cor={CORES.preto} rotacao={-3} style={{left: 1080, top: 640}} padding="14px 28px">
					<div style={{display: 'flex', alignItems: 'center', gap: 18}}>
						<IconeAlerta tamanho={58} />
						<span style={{fontFamily: FONTES.titulo, fontSize: 36, color: CORES.amarelo, lineHeight: 1.1}}>
							NO FINAL:
							<br />A DATA DE NOVEMBRO
						</span>
					</div>
				</Recorte>
				<Fonte texto="PETROBRAS (COLETA ANP 11 A 17/10/2026)" inicio={20} style={{left: 1080, top: 795}} />
			</KenBurns>
		</AbsoluteFill>
	);
};
