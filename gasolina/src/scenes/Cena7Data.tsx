import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {janela, progresso, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Recorte} from '../components/Recorte';
import {Fonte} from '../components/Fonte';
import {MarcaTexto} from '../components/MarcaTexto';
import {Inscricao} from '../components/Inscricao';
import {Calendario, FATIAS, Pizza} from '../components/Gasolina';

// Desoneração de PIS/Cofins e Cide sobre a gasolina: de 10/10 a 09/11/2026,
// podendo ser prorrogada (Ministério da Fazenda, out/2026).
export const Cena7Data: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	const fimA = m(4, 10);
	const iniB = m(4, -6);
	const fimB = m(5, 10);
	const iniC = m(5, -6);

	return (
		<AbsoluteFill>
			{/* A: 9 de novembro */}
			<AbsoluteFill style={{opacity: janela(frame, -12, fimA)}}>
				<KenBurns zoom={[1.0, 1.05]} origem="30% 50%">
					<div style={{position: 'absolute', left: 150, top: 130, opacity: progresso(frame, 2, 14)}}>
						<Calendario circulo={m(1, 10)} largura={680} />
					</div>
					<Recorte seed="isencao" inicio={m(1, 20)} cor={CORES.preto} rotacao={-2} style={{left: 960, top: 160, width: 820}} padding="18px 30px">
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 30, color: CORES.azulClaro}}>A ISENÇÃO FEDERAL VALE ATÉ</div>
						<div style={{fontFamily: FONTES.titulo, fontSize: 72, color: CORES.amarelo, lineHeight: 1.05}}>9 de novembro</div>
					</Recorte>
					<Recorte seed="se-nao" inicio={m(2)} rotacao={1.5} style={{left: 960, top: 380, width: 820}} padding="20px 30px">
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 32, color: CORES.cinza}}>SE NÃO FOR PRORROGADA:</div>
						<div style={{fontFamily: FONTES.titulo, fontSize: 52, color: CORES.preto, lineHeight: 1.15}}>
							os tributos voltam a ser cobrados
						</div>
					</Recorte>
					<div style={{position: 'absolute', left: 980, top: 620, fontFamily: FONTES.mao, fontWeight: 700, fontSize: 62, color: CORES.azul, transform: 'rotate(-3deg)', opacity: progresso(frame, m(3), m(3, 12))}}>
						…e parte pode chegar à bomba
					</div>
					<Fonte texto="MINISTÉRIO DA FAZENDA (OUT/2026)" inicio={m(1)} style={{left: 160, top: 790}} />
				</KenBurns>
			</AbsoluteFill>

			{/* B: resumo */}
			<AbsoluteFill style={{opacity: janela(frame, iniB, fimB)}}>
				<KenBurns zoom={[1.04, 1.0]}>
					<div style={{position: 'absolute', left: 230, top: 150}}>
						<Pizza raio={270} inicios={FATIAS.map((_, i) => iniB + 4 + i * 5)} centro={<div style={{fontFamily: FONTES.titulo, fontSize: 38, whiteSpace: 'nowrap'}}>R$ 6,53</div>} />
					</div>
					<div style={{position: 'absolute', left: 1000, top: 250, fontFamily: FONTES.titulo, fontSize: 76, color: CORES.preto, lineHeight: 1.15, opacity: progresso(frame, iniB + 10, iniB + 22)}}>
						agora você sabe
						<br />
						para onde vai
						<br />
						<MarcaTexto inicio={iniB + 26}>cada real</MarcaTexto>
					</div>
				</KenBurns>
			</AbsoluteFill>

			{/* C: inscrição */}
			<AbsoluteFill style={{opacity: janela(frame, iniC, 99999)}}>
				<KenBurns zoom={[1.0, 1.04]}>
					<div style={{position: 'absolute', top: 150, width: '100%', textAlign: 'center', fontFamily: FONTES.titulo, fontSize: 84, color: CORES.preto}}>
						fatos {'>'} <MarcaTexto inicio={m(6)}>boatos</MarcaTexto>
					</div>
					<Inscricao inicio={iniC + 6} clique={m(6, 20)} />
				</KenBurns>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
