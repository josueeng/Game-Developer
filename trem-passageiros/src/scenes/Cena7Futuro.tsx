import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {janela, progresso, useEntrada, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Fonte} from '../components/Fonte';
import {Recorte} from '../components/Recorte';
import {Inscricao} from '../components/Inscricao';
import {Carimbo, Locomotiva} from '../components/Trem';

// TIC Eixo Norte SP–Campinas: obras desde 2026, previsão 2031, 101 km em ~64 min.
// TAV Rio–SP: leilão adiado várias vezes; sem propostas em julho de 2013.
const CAUSAS = ['malha feita para exportar', 'bitolas diferentes', 'aposta nas rodovias', 'concessões voltadas para carga'];

export const Cena7Futuro: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	const iniB = m(6, -6);
	const iniC = m(8, -6);
	const trem = useEntrada(m(1));
	return (
		<AbsoluteFill>
			<AbsoluteFill style={{opacity: janela(frame, -12, iniB + 12)}}>
				<KenBurns zoom={[1.0, 1.04]}>
					<div style={{position: 'absolute', left: 140, top: 90, fontFamily: FONTES.titulo, fontSize: 90, color: CORES.preto, opacity: progresso(frame, 0, 12)}}>Vai voltar?</div>
					{/* SP → Campinas */}
					<div style={{position: 'absolute', left: 140, top: 240, width: 860, opacity: progresso(frame, m(1), m(1, 10))}}>
						<svg width="860" height="120" viewBox="0 0 860 120">
							<line x1="40" y1="60" x2="820" y2="60" stroke={CORES.preto} strokeWidth="14" />
							<line x1="40" y1="60" x2={40 + 780 * progresso(frame, m(1, 4), m(1, 40))} y2="60" stroke={CORES.amarelo} strokeWidth="8" />
							<circle cx="40" cy="60" r="22" fill={CORES.papel} stroke={CORES.preto} strokeWidth="6" />
							<circle cx="820" cy="60" r="22" fill={CORES.papel} stroke={CORES.preto} strokeWidth="6" />
						</svg>
						<div style={{display: 'flex', justifyContent: 'space-between', fontFamily: FONTES.titulo, fontSize: 40, color: CORES.preto}}>
							<span>São Paulo</span>
							<span>Campinas</span>
						</div>
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 30, color: CORES.cinza, marginTop: 6}}>Trem Intercidades · obras desde 2026</div>
					</div>
					<div style={{position: 'absolute', left: 160, top: 500, transform: `translateX(${(1 - trem) * -400}px)`, opacity: frame < m(1) ? 0 : 1}}>
						<Locomotiva largura={420} tipo="moderna" />
					</div>
					<Recorte seed="2031" inicio={m(2)} cor={CORES.amarelo} rotacao={-2} style={{left: 660, top: 520}} padding="10px 26px">
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 24, color: CORES.preto}}>PREVISÃO</div>
						<div style={{fontFamily: FONTES.titulo, fontSize: 80, color: CORES.preto, lineHeight: 1}}>2031</div>
					</Recorte>
					<div style={{position: 'absolute', left: 660, top: 680, fontFamily: FONTES.titulo, fontSize: 44, color: CORES.preto, whiteSpace: 'nowrap', opacity: progresso(frame, m(3), m(3, 10))}}>101 km em ~64 min</div>
					<Recorte seed="tav" inicio={m(4)} cor={CORES.papel} rotacao={2} style={{left: 1140, top: 230, width: 640}} padding="20px 28px">
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 26, color: CORES.cinza}}>TREM-BALA RIO – SÃO PAULO</div>
						<div style={{fontFamily: FONTES.titulo, fontSize: 52, color: CORES.preto, lineHeight: 1.1}}>leilão adiado várias vezes</div>
					</Recorte>
					<Carimbo inicio={m(5)} texto={<>SEM PROPOSTAS<br />2013</>} tamanho={54} style={{left: 1240, top: 470}} />
					<Fonte texto="PREF. DE JUNDIAÍ · IMPRENSA (2026) · ENR (2013)" inicio={m(1)} style={{left: 145, top: 795}} />
				</KenBurns>
			</AbsoluteFill>

			<AbsoluteFill style={{opacity: janela(frame, iniB, iniC + 12)}}>
				<KenBurns zoom={[1.0, 1.04]}>
					<div style={{position: 'absolute', left: 300, top: 100, fontFamily: FONTES.titulo, fontSize: 84, color: CORES.preto}}>Por que o trem sumiu:</div>
					{CAUSAS.map((c, i) => {
						const em = m(6 + i * 0.5);
						const p = progresso(frame, em, em + 12);
						return (
							<div key={c} style={{position: 'absolute', left: 320, top: 250 + i * 125, display: 'flex', alignItems: 'center', gap: 26, opacity: p, transform: `translateX(${(1 - p) * 40}px)`}}>
								<div style={{width: 80, height: 80, borderRadius: 40, background: i % 2 ? CORES.azulClaro : CORES.amarelo, border: `5px solid ${CORES.preto}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONTES.titulo, fontSize: 46, color: CORES.preto}}>{i + 1}</div>
								<span style={{fontFamily: FONTES.titulo, fontSize: 62, color: CORES.preto}}>{c}</span>
							</div>
						);
					})}
				</KenBurns>
			</AbsoluteFill>

			<AbsoluteFill style={{opacity: janela(frame, iniC, 99999)}}>
				<KenBurns zoom={[1.0, 1.04]}>
					<div style={{position: 'absolute', top: 160, width: '100%', textAlign: 'center', fontFamily: FONTES.titulo, fontSize: 80, color: CORES.preto}}>
						agora você sabe <span style={{background: CORES.amarelo, padding: '0 14px'}}>por quê</span>
					</div>
					<Inscricao inicio={iniC + 6} clique={m(8, 30)} />
				</KenBurns>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
