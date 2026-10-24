import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {janela, progresso, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Titulo} from '../components/Titulo';
import {Recorte} from '../components/Recorte';
import {Fonte} from '../components/Fonte';
import {Numero} from '../components/Numero';
import {MarcaTexto} from '../components/MarcaTexto';
import {Barril} from '../components/Gasolina';

// Brent na faixa de US$ 100 (Governo Federal, set/2026). Preço médio da
// gasolina A da Petrobras às distribuidoras: R$ 3,05/L (Petrobras, set/2026).
export const Cena3Petrobras: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	const fimA = m(5, 10);
	const iniB = m(5, -6);

	return (
		<AbsoluteFill>
			<AbsoluteFill style={{opacity: janela(frame, -12, fimA)}}>
				<KenBurns zoom={[1.0, 1.05]} origem="30% 50%">
					<Titulo texto="A fatia da Petrobras: 32%" inicio={2} />
					<div style={{position: 'absolute', left: 190, top: 190, opacity: progresso(frame, m(1), m(1, 14))}}>
						<Barril tamanho={380} />
					</div>
					<div style={{position: 'absolute', left: 720, top: 200, width: 1100, opacity: progresso(frame, m(2), m(2, 12))}}>
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 46, color: CORES.preto}}>o petróleo é cotado em</div>
						<div style={{fontFamily: FONTES.titulo, fontSize: 150, color: CORES.preto, lineHeight: 1}}>
							<MarcaTexto inicio={m(2, 14)}>DÓLAR</MarcaTexto>
						</div>
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 34, color: CORES.cinza}}>no mundo inteiro</div>
					</div>
					<Recorte seed="guerra" inicio={m(3)} cor={CORES.preto} rotacao={-2.5} style={{left: 720, top: 520}} padding="12px 26px">
						<div style={{fontFamily: FONTES.titulo, fontSize: 40, color: CORES.amarelo, whiteSpace: 'nowrap'}}>GUERRA NO ORIENTE MÉDIO</div>
					</Recorte>
					<Recorte seed="barril-100" inicio={m(4)} cor={CORES.amarelo} rotacao={2} style={{left: 1260, top: 620}} padding="14px 30px">
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 28, color: CORES.preto}}>BARRIL PERTO DE</div>
						<div style={{fontFamily: FONTES.titulo, fontSize: 80, color: CORES.preto, lineHeight: 1, whiteSpace: 'nowrap'}}>
							US$ <Numero para={100} inicio={m(4)} duracao={30} />
						</div>
					</Recorte>
					<Fonte texto="GOVERNO FEDERAL / MINISTÉRIO DA FAZENDA (SET/2026)" inicio={m(4)} style={{left: 200, top: 790}} />
				</KenBurns>
			</AbsoluteFill>

			<AbsoluteFill style={{opacity: janela(frame, iniB, 99999)}}>
				<KenBurns zoom={[1.04, 1.0]}>
					<Recorte seed="nota-petro" inicio={iniB + 4} cor="#F7F1E1" rotacao={-1.5} intensidade={1.4} style={{left: 360, top: 170, width: 1200}} padding="36px 50px 44px">
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 26, letterSpacing: 3, color: CORES.cinza, borderBottom: `3px solid ${CORES.preto}`, paddingBottom: 10, marginBottom: 20}}>
							PETROBRAS · PREÇO MÉDIO ÀS DISTRIBUIDORAS · SET/2026
						</div>
						<div style={{fontFamily: FONTES.jornal, fontWeight: 900, fontSize: 52, color: CORES.preto}}>Litro da gasolina pura:</div>
						<div style={{fontFamily: FONTES.titulo, fontSize: 170, color: CORES.preto, lineHeight: 1.05, whiteSpace: 'nowrap'}}>
							<MarcaTexto inicio={m(6)}>R$ 3,05</MarcaTexto>
						</div>
						<div style={{fontFamily: FONTES.mao, fontWeight: 700, fontSize: 40, color: CORES.azul, marginTop: 10}}>gasolina pura = gasolina A, antes de misturar o etanol</div>
					</Recorte>
					<Fonte texto="PETROBRAS (SET/2026), VIA EXAME / PODER360" inicio={iniB + 20} style={{left: 370, top: 760}} />
				</KenBurns>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
