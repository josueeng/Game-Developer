import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {janela, progresso, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Fonte} from '../components/Fonte';
import {Recorte} from '../components/Recorte';
import {MarcaTexto} from '../components/MarcaTexto';
import {Inscricao} from '../components/Inscricao';

// Portal da Transparência da Câmara (camara.leg.br): cota, equipe, votações e emendas.
const ABAS = [
	{t: 'gastos da cota', em: 1},
	{t: 'quem trabalha no gabinete', em: 2},
	{t: 'como votou', em: 2.4},
	{t: 'para onde foram as emendas', em: 2.7},
];

export const Cena7Fiscalizar: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	const iniB = m(3, -6);
	return (
		<AbsoluteFill>
			<AbsoluteFill style={{opacity: janela(frame, -12, iniB + 12)}}>
				<KenBurns zoom={[1.0, 1.04]}>
					<div style={{position: 'absolute', left: 140, top: 90, fontFamily: FONTES.titulo, fontSize: 80, color: CORES.preto, opacity: progresso(frame, 0, 12)}}>
						Tudo isso é <MarcaTexto inicio={10}>público</MarcaTexto>
					</div>
					<Recorte seed="navegador" inicio={m(1, -8)} cor={CORES.papel} rotacao={-1} style={{left: 300, top: 220, width: 1320}} padding={0}>
						<div style={{borderBottom: `5px solid ${CORES.preto}`, padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 14, background: CORES.begeEscuro}}>
							{[0, 1, 2].map((i) => (
								<span key={i} style={{width: 22, height: 22, borderRadius: 11, border: `4px solid ${CORES.preto}`, background: CORES.papel}} />
							))}
							<span style={{marginLeft: 20, flex: 1, background: CORES.papel, border: `4px solid ${CORES.preto}`, borderRadius: 30, padding: '6px 24px', fontFamily: FONTES.texto, fontWeight: 800, fontSize: 32, color: CORES.preto}}>camara.leg.br</span>
						</div>
						<div style={{padding: '24px 40px 34px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22}}>
							{ABAS.map((a) => {
								const p = progresso(frame, m(a.em), m(a.em, 12));
								return (
									<div key={a.t} style={{display: 'flex', alignItems: 'center', gap: 16, padding: '16px 22px', border: `4px solid ${CORES.preto}`, background: p > 0.5 ? CORES.amarelo : CORES.papel, opacity: 0.25 + 0.75 * p, fontFamily: FONTES.texto, fontWeight: 800, fontSize: 34, color: CORES.preto}}>
										<svg width="36" height="36" viewBox="0 0 36 36">
											<circle cx="15" cy="15" r="10" fill="none" stroke={CORES.preto} strokeWidth="5" />
											<path d="M22 22 L32 32" stroke={CORES.preto} strokeWidth="6" strokeLinecap="round" />
										</svg>
										{a.t}
									</div>
								);
							})}
						</div>
					</Recorte>
					<Fonte texto="PORTAL DA TRANSPARÊNCIA DA CÂMARA DOS DEPUTADOS" inicio={m(1)} style={{left: 305, top: 795}} />
				</KenBurns>
			</AbsoluteFill>

			<AbsoluteFill style={{opacity: janela(frame, iniB, 99999)}}>
				<KenBurns zoom={[1.0, 1.04]}>
					<div style={{position: 'absolute', top: 160, width: '100%', textAlign: 'center', fontFamily: FONTES.titulo, fontSize: 80, color: CORES.preto}}>
						quanto custa {'+'} <MarcaTexto inicio={m(3, 30)}>o que cobrar</MarcaTexto>
					</div>
					<Inscricao inicio={m(4)} clique={m(4, 30)} />
				</KenBurns>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
