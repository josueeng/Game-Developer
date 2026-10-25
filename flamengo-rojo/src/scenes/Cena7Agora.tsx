import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {janela, progresso, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Recorte} from '../components/Recorte';
import {Fonte} from '../components/Fonte';
import {MarcaTexto} from '../components/MarcaTexto';
import {Inscricao} from '../components/Inscricao';
import {Escada} from '../components/Futebol';

// Situação em 25/10/2026: defesa do Estudiantes até 26/10; caminho
// Comissão Disciplinar → Câmara de Apelações → CAS; final em 28/11.
export const Cena7Agora: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	const fimA = m(4, 10);
	const iniB = m(4, -6);
	const fimB = m(5, 10);
	const iniC = m(5, -6);

	return (
		<AbsoluteFill>
			<AbsoluteFill style={{opacity: janela(frame, -12, fimA)}}>
				<KenBurns zoom={[1.0, 1.04]}>
					<div style={{position: 'absolute', left: 140, top: 90, fontFamily: FONTES.titulo, fontSize: 90, color: CORES.preto, opacity: progresso(frame, 0, 10)}}>E agora?</div>
					<Recorte seed="defesa" inicio={m(1)} cor={CORES.preto} rotacao={-2} style={{left: 1020, top: 100}} padding="14px 28px">
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 28, color: CORES.azulClaro}}>DEFESA DO ESTUDIANTES ATÉ</div>
						<div style={{fontFamily: FONTES.titulo, fontSize: 60, color: CORES.amarelo, whiteSpace: 'nowrap'}}>segunda, 26/10</div>
					</Recorte>
					<div style={{position: 'absolute', left: 420, top: 330}}>
						<Escada
							aqui={m(2, 20)}
							degraus={[
								{t: 'Comissão Disciplinar da Conmebol', em: m(2)},
								{t: 'Câmara de Apelações', em: m(3)},
								{t: 'CAS', em: m(3.5)},
							]}
						/>
					</div>
					<Fonte texto="CÓDIGO DISCIPLINAR DA CONMEBOL · IMPRENSA (OUT/2026)" inicio={m(2)} style={{left: 150, top: 795}} />
				</KenBurns>
			</AbsoluteFill>

			<AbsoluteFill style={{opacity: janela(frame, iniB, fimB)}}>
				<KenBurns zoom={[1.04, 1.0]}>
					<Recorte seed="finalista" inicio={iniB + 4} cor={CORES.amarelo} rotacao={-1.5} style={{left: 260, top: 250, width: 1400}} padding="30px 40px">
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 34, color: CORES.preto}}>NA FINAL, POR ENQUANTO:</div>
						<div style={{fontFamily: FONTES.titulo, fontSize: 80, color: CORES.preto, lineHeight: 1.1, whiteSpace: 'nowrap'}}>
							<MarcaTexto inicio={iniB + 24} cor={CORES.papel}>ESTUDIANTES</MarcaTexto> × PALMEIRAS
						</div>
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 34, color: CORES.preto}}>28 de novembro · Montevidéu</div>
					</Recorte>
				</KenBurns>
			</AbsoluteFill>

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
