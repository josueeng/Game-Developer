import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {janela, progresso, useEntrada, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Fonte} from '../components/Fonte';
import {Recorte} from '../components/Recorte';
import {Numero} from '../components/Numero';
import {MarcaTexto} from '../components/MarcaTexto';
import {Bilhete, Locomotiva} from '../components/Trem';

// 1854: primeira ferrovia. Pico em 1960: mais de 38.300 km em 24 estados
// (Infrasa/ONTL, Boletim de Logística, maio/2025).
export const Cena2Auge: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	const iniB = m(2, -6);
	const loco = useEntrada(4);
	return (
		<AbsoluteFill>
			<AbsoluteFill style={{opacity: janela(frame, -12, iniB + 12)}}>
				<KenBurns zoom={[1.0, 1.05]}>
					<div style={{position: 'absolute', left: 140, top: 100, fontFamily: FONTES.titulo, fontSize: 220, color: CORES.preto, lineHeight: 1, opacity: progresso(frame, 0, 10)}}>1854</div>
					<div style={{position: 'absolute', left: 150, top: 330, fontFamily: FONTES.texto, fontWeight: 800, fontSize: 40, color: CORES.cinza, opacity: progresso(frame, 6, 16)}}>a primeira ferrovia do Brasil</div>
					<div style={{position: 'absolute', left: 1060, top: 130, transform: `translateX(${(1 - loco) * 500}px)`}}>
						<Locomotiva largura={640} tipo="vapor" />
					</div>
					{/* esquema: interior → porto */}
					<div style={{position: 'absolute', left: 150, top: 500, display: 'flex', alignItems: 'center', gap: 26, opacity: progresso(frame, m(1), m(1, 10))}}>
						<Recorte seed="cafe" cor={CORES.amarelo} rotacao={-2} padding="12px 26px" style={{position: 'relative'}}>
							<div style={{fontFamily: FONTES.titulo, fontSize: 50, color: CORES.preto}}>café do interior</div>
						</Recorte>
						<svg width="520" height="60" viewBox="0 0 520 60">
							<line x1="0" y1="30" x2={480 * progresso(frame, m(1, 6), m(1, 30))} y2="30" stroke={CORES.preto} strokeWidth="10" strokeDasharray="34 14" />
							<path d="M470 8 L515 30 L470 52Z" fill={CORES.preto} opacity={progresso(frame, m(1, 26), m(1, 32))} />
						</svg>
						<Recorte seed="porto" cor={CORES.azulClaro} rotacao={2} padding="12px 26px" style={{position: 'relative'}}>
							<div style={{fontFamily: FONTES.titulo, fontSize: 50, color: CORES.preto}}>porto</div>
						</Recorte>
					</div>
				</KenBurns>
			</AbsoluteFill>

			<AbsoluteFill style={{opacity: janela(frame, iniB, 99999)}}>
				<KenBurns zoom={[1.0, 1.05]}>
					<div style={{position: 'absolute', left: 140, top: 100, fontFamily: FONTES.titulo, fontSize: 90, color: CORES.preto}}>
						<MarcaTexto inicio={iniB + 6}>1960</MarcaTexto>: o auge
					</div>
					<div style={{position: 'absolute', left: 140, top: 250, fontFamily: FONTES.titulo, fontSize: 210, color: CORES.preto, lineHeight: 1, whiteSpace: 'nowrap', opacity: progresso(frame, m(3), m(3, 8))}}>
						<Numero para={38300} inicio={m(3)} duracao={36} /> km
					</div>
					<div style={{position: 'absolute', left: 150, top: 480, fontFamily: FONTES.texto, fontWeight: 800, fontSize: 46, color: CORES.preto, opacity: progresso(frame, m(3, 20), m(3, 30))}}>
						de ferrovias, em 24 estados
					</div>
					<div style={{position: 'absolute', left: 1180, top: 110, opacity: progresso(frame, iniB, iniB + 12)}}>
						<Locomotiva largura={520} tipo="vapor" cor={CORES.amarelo} />
					</div>
					<div style={{position: 'absolute', left: 1040, top: 520, transform: 'rotate(3deg)', opacity: progresso(frame, m(4), m(4, 10))}}>
						<Bilhete de="INTERIOR" para="CAPITAL" detalhe="passageiros · 2ª classe" largura={720} cor="#F3E6C4" />
					</div>
					<div style={{position: 'absolute', left: 1060, top: 420, fontFamily: FONTES.mao, fontSize: 60, color: CORES.azul, opacity: progresso(frame, m(4, 10), m(4, 20))}}>
						viajar de trem era comum
					</div>
					<Fonte texto="INFRASA/ONTL · BOLETIM DE LOGÍSTICA (MAIO/2025)" inicio={m(3)} style={{left: 145, top: 795}} />
				</KenBurns>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
