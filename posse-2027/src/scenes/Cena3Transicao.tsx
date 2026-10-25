import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {progresso, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Fonte} from '../components/Fonte';
import {Recorte} from '../components/Recorte';
import {Pessoa} from '../components/Icones';

// Lei 10.609/2002: equipe de transição com até 50 Cargos Especiais de Transição
// Governamental, a partir do 2º dia útil após o turno decisivo; acesso a dados
// de contas públicas, programas e projetos.
export const Cena3Transicao: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	return (
		<AbsoluteFill>
			<KenBurns zoom={[1.0, 1.05]}>
				<div style={{position: 'absolute', left: 140, top: 100, fontFamily: FONTES.titulo, fontSize: 84, color: CORES.preto, opacity: progresso(frame, 0, 12)}}>
					A <span style={{background: CORES.amarelo, padding: '0 14px'}}>transição</span>
				</div>
				<div style={{position: 'absolute', left: 140, top: 230, width: 820}}>
					<div style={{display: 'flex', alignItems: 'baseline', gap: 18, opacity: progresso(frame, m(1), m(1, 10))}}>
						<span style={{fontFamily: FONTES.titulo, fontSize: 110, color: CORES.preto, lineHeight: 1}}>50</span>
						<span style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 36, color: CORES.preto}}>cargos especiais, no máximo</span>
					</div>
					<div style={{display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 20, width: 760}}>
						{Array.from({length: 50}).map((_, i) => (
							<div key={i} style={{opacity: progresso(frame, m(1, 8) + i * 0.8, m(1, 14) + i * 0.8)}}>
								<Pessoa tamanho={58} cor={i % 5 === 0 ? CORES.amarelo : CORES.azul} />
							</div>
						))}
					</div>
				</div>
				<Recorte seed="dia-util" inicio={m(2)} cor={CORES.amarelo} rotacao={2} style={{left: 1080, top: 200, width: 680}} padding="16px 28px">
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 28, color: CORES.preto}}>A PARTIR DO 2º DIA ÚTIL APÓS A ELEIÇÃO</div>
					<div style={{fontFamily: FONTES.titulo, fontSize: 72, color: CORES.preto, lineHeight: 1.05}}>terça, 27/10</div>
				</Recorte>
				<div style={{position: 'absolute', left: 1090, top: 430, opacity: progresso(frame, m(3), m(3, 12))}}>
					<div style={{display: 'flex', alignItems: 'center', gap: 22}}>
						<Cadeado aberto={progresso(frame, m(3, 8), m(3, 20))} />
						<div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
							{['contas públicas', 'programas', 'projetos em andamento'].map((t, i) => (
								<span key={t} style={{padding: '6px 18px', background: CORES.papel, border: `4px solid ${CORES.preto}`, fontFamily: FONTES.texto, fontWeight: 800, fontSize: 32, color: CORES.preto, opacity: progresso(frame, m(3, 10 + i * 6), m(3, 18 + i * 6))}}>{t}</span>
							))}
						</div>
					</div>
				</div>
				<div style={{position: 'absolute', left: 1090, top: 700, fontFamily: FONTES.mao, fontSize: 56, color: CORES.azul, opacity: progresso(frame, m(4), m(4, 12))}}>para não começar no escuro</div>
				<Fonte texto="LEI Nº 10.609/2002" inicio={m(1)} style={{left: 145, top: 795}} />
			</KenBurns>
		</AbsoluteFill>
	);
};

const Cadeado: React.FC<{aberto: number}> = ({aberto}) => (
	<svg width="150" height="190" viewBox="0 0 150 190">
		<g transform={`translate(${-30 * aberto} ${-20 * aberto})`}>
			<path d="M35 85 V55 a40 40 0 0 1 80 0 V85" fill="none" stroke={CORES.preto} strokeWidth="16" />
		</g>
		<rect x="10" y="82" width="130" height="100" rx="14" fill={CORES.amarelo} stroke={CORES.preto} strokeWidth="7" />
		<circle cx="75" cy="125" r="13" fill={CORES.preto} />
		<rect x="69" y="130" width="12" height="28" rx="4" fill={CORES.preto} />
	</svg>
);
