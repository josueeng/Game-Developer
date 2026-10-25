import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {janela, progresso, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {LinhaDoTempo} from '../components/LinhaDoTempo';
import {Inscricao} from '../components/Inscricao';

// Calendário-resumo, de 25/10/2026 a 1º/02/2027.
export const Cena7Calendario: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	const iniB = m(3, -6);
	return (
		<AbsoluteFill>
			<AbsoluteFill style={{opacity: janela(frame, -12, iniB + 12)}}>
				<KenBurns zoom={[1.0, 1.03]}>
					<div style={{position: 'absolute', left: 140, top: 90, fontFamily: FONTES.titulo, fontSize: 80, color: CORES.preto, opacity: progresso(frame, 0, 12)}}>O calendário</div>
					<div style={{position: 'absolute', left: 230, top: 280}}>
						<LinhaDoTempo
							largura={1460}
							inicio={6}
							duracao={Math.max(30, m(2, 50) - 6)}
							posicoes={[0, 0.2, 0.4, 0.6, 0.8, 1]}
							marcos={[
								{ano: '25/10', texto: 'eleição', destaque: true},
								{ano: '27/10', texto: 'começa a transição'},
								{ano: '18/12', texto: 'prazo da diplomação'},
								{ano: '5/1', texto: 'posse do presidente', destaque: true},
								{ano: '6/1', texto: 'posse dos governadores'},
								{ano: '1º/2', texto: 'posse do Congresso'},
							]}
						/>
					</div>
				</KenBurns>
			</AbsoluteFill>
			<AbsoluteFill style={{opacity: janela(frame, iniB, 99999)}}>
				<KenBurns zoom={[1.0, 1.04]}>
					<div style={{position: 'absolute', top: 170, width: '100%', textAlign: 'center', fontFamily: FONTES.titulo, fontSize: 80, color: CORES.preto}}>
						salve para <span style={{background: CORES.amarelo, padding: '0 14px'}}>consultar depois</span>
					</div>
					<Inscricao inicio={iniB + 6} clique={m(3, 40)} />
				</KenBurns>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
