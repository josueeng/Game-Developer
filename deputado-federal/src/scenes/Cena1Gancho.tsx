import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {progresso, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Fonte} from '../components/Fonte';
import {Recorte} from '../components/Recorte';
import {Numero} from '../components/Numero';
import {MarcaTexto} from '../components/MarcaTexto';
import {COTA_MAX, AUXILIO_MORADIA, SUBSIDIO, VERBA_GABINETE} from '../components/Deputado';

// Teto mensal (RR): subsídio + verba de gabinete + cota + auxílio = R$ 274.899,96.
const TETO = SUBSIDIO + VERBA_GABINETE + COTA_MAX + AUXILIO_MORADIA;

export const Cena1Gancho: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	const cresce = progresso(frame, m(2), m(3, 20));
	const hMax = 500;
	return (
		<AbsoluteFill>
			<KenBurns zoom={[1.0, 1.07]} pan={[-10, -10]}>
				<Recorte seed="salario-gancho" inicio={2} cor="#FFFDF6" rotacao={-2} style={{left: 140, top: 170, width: 840}} padding="22px 30px">
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 28, color: CORES.cinza, letterSpacing: 2}}>SALÁRIO DE DEPUTADO FEDERAL</div>
					<div style={{fontFamily: FONTES.titulo, fontSize: 100, color: CORES.preto, lineHeight: 1.05, whiteSpace: 'nowrap'}}>
						R$ <Numero para={SUBSIDIO} inicio={4} duracao={36} casas={2} />
					</div>
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 30, color: CORES.preto}}>por mês</div>
				</Recorte>
				<div style={{position: 'absolute', left: 150, top: 470, fontFamily: FONTES.mao, fontWeight: 700, fontSize: 66, color: CORES.azul, transform: 'rotate(-3deg)', opacity: progresso(frame, m(1), m(1, 12))}}>
					…é a menor parte da conta
				</div>

				{/* Barras: salário × teto total (base no zero) */}
				<div style={{position: 'absolute', left: 1040, top: 110, height: 640, display: 'flex', alignItems: 'flex-end', gap: 60}}>
					{[
						{t: 'salário', v: SUBSIDIO, cor: CORES.amarelo, p: progresso(frame, 10, 30), rotulo: 'R$ 46 mil'},
						{t: 'tudo somado (teto)', v: TETO, cor: CORES.azul, p: cresce, rotulo: null},
					].map((b, i) => (
						<div key={b.t} style={{width: 260, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
							<div style={{fontFamily: FONTES.titulo, fontSize: 44, color: CORES.preto, whiteSpace: 'nowrap', marginBottom: 8, opacity: b.p}}>
								{b.rotulo ?? <Numero para={TETO / 1000} inicio={m(2)} duracao={Math.max(10, m(3, 20) - m(2))} prefixo="R$ " sufixo=" mil" />}
							</div>
							<div style={{width: 200, height: ((hMax * b.v) / TETO) * b.p, background: b.cor, border: `5px solid ${CORES.preto}`, boxShadow: '0 10px 16px rgba(40,30,15,0.25)'}} />
							<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 26, color: CORES.preto, marginTop: 10, whiteSpace: 'nowrap', opacity: i === 0 ? 1 : b.p}}>{b.t}</div>
						</div>
					))}
				</div>
				<Recorte seed="pergunta" inicio={m(4)} cor={CORES.preto} rotacao={-2.5} style={{left: 140, top: 600, width: 760}} padding="16px 28px">
					<div style={{fontFamily: FONTES.titulo, fontSize: 44, color: CORES.amarelo, lineHeight: 1.15}}>
						para onde vai, e o que ele <MarcaTexto inicio={m(4, 20)} cor={CORES.papel}>faz de verdade</MarcaTexto>?
					</div>
				</Recorte>
				<Fonte texto="CÂMARA DOS DEPUTADOS (OUT/2026) · CÁLCULO PRÓPRIO" inicio={20} style={{left: 150, top: 795}} />
			</KenBurns>
		</AbsoluteFill>
	);
};
