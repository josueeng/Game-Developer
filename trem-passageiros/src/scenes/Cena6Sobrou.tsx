import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {progresso, useEntrada, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Fonte} from '../components/Fonte';
import {Numero} from '../components/Numero';
import {MapaBrasil} from '../components/MapaBrasil';
import {LINHAS_VALE, LinhaNoMapa, MalhaFerroviaria} from '../components/Trem';

// Malha atual ~30 mil km (ANTF/ANTT). Vitória a Minas: 664 km, diário,
// ~860 mil passageiros em 2025. Carajás: 861 km, São Luís–Parauapebas.
const MAPA = {x: 1080, y: 110, w: 680, h: 680};

export const Cena6Sobrou: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	const encolhe = progresso(frame, 14, 50);
	const km = Math.round(interpolate(encolhe, [0, 1], [38300, 30000]));
	return (
		<AbsoluteFill>
			<KenBurns zoom={[1.0, 1.05]} origem="70% 50%">
				<div style={{position: 'absolute', left: MAPA.x, top: MAPA.y, width: MAPA.w, height: MAPA.h}}>
					<MapaBrasil largura={MAPA.w} altura={MAPA.h} inicio={0} duracaoEntrada={14} />
					<MalhaFerroviaria largura={MAPA.w} altura={MAPA.h} inicio={6} duracao={30} opacidade={frame >= m(2) ? interpolate(frame, [m(2), m(2, 12)], [1, 0.45], {extrapolateRight: 'clamp'}) : 1} />
					<LinhaNoMapa pontos={LINHAS_VALE.efvm} largura={MAPA.w} altura={MAPA.h} inicio={m(3)} />
					<LinhaNoMapa pontos={LINHAS_VALE.efc} largura={MAPA.w} altura={MAPA.h} inicio={m(4)} />
				</div>
				<div style={{position: 'absolute', left: 140, top: 100}}>
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 30, color: CORES.cinza}}>MALHA FERROVIÁRIA</div>
					<div style={{fontFamily: FONTES.titulo, fontSize: 96, color: CORES.preto, lineHeight: 1.05, whiteSpace: 'nowrap'}}>
						{encolhe < 1 ? `${km.toLocaleString('pt-BR')} km` : '~30 mil km'}
					</div>
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 28, color: CORES.cinza, whiteSpace: 'nowrap'}}>1960: 38.300 km · hoje: cerca de 30 mil</div>
				</div>
				<div style={{position: 'absolute', left: 140, top: 300, display: 'flex', gap: 16, opacity: progresso(frame, m(1), m(1, 12))}}>
					{['minério', 'grãos', 'carga'].map((t) => (
						<span key={t} style={{padding: '6px 18px', background: CORES.papel, border: `4px solid ${CORES.preto}`, fontFamily: FONTES.texto, fontWeight: 800, fontSize: 32, color: CORES.preto}}>{t}</span>
					))}
				</div>
				<div style={{position: 'absolute', left: 140, top: 390, fontFamily: FONTES.titulo, fontSize: 40, color: CORES.preto, opacity: progresso(frame, m(2), m(2, 12))}}>
					Passageiros, longa distância (Vale):
				</div>
				<Cartao inicio={m(3)} y={460} titulo="Vitória a Minas" texto="664 km · todos os dias" />
				<Cartao inicio={m(4)} y={590} titulo="Carajás" texto="861 km · MA – PA" />
				<div style={{position: 'absolute', left: 1100, top: 700, padding: '8px 22px', background: CORES.preto, color: CORES.amarelo, fontFamily: FONTES.titulo, fontSize: 40, whiteSpace: 'nowrap', transform: 'rotate(-2deg)', opacity: progresso(frame, m(5), m(5, 10))}}>
					<Numero para={860} inicio={m(5)} duracao={30} /> mil passageiros em 2025
				</div>
				<Fonte texto="ANTF/ANTT · VALE · MAPA: NATURAL EARTH (LINHAS DA VALE APROX.)" inicio={6} style={{left: 145, top: 795}} />
			</KenBurns>
		</AbsoluteFill>
	);
};

const Cartao: React.FC<{inicio: number; y: number; titulo: string; texto: string}> = ({inicio, y, titulo, texto}) => {
	const frame = useCurrentFrame();
	const e = useEntrada(inicio);
	return (
		<div style={{position: 'absolute', left: 140, top: y, width: 860, display: 'flex', alignItems: 'center', gap: 22, padding: '14px 24px', background: CORES.papel, border: `5px solid ${CORES.preto}`, boxShadow: '0 10px 16px rgba(40,30,15,0.25)', opacity: frame < inicio ? 0 : interpolate(e, [0, 0.3], [0, 1], {extrapolateRight: 'clamp'}), transform: `translateX(${(1 - e) * -40}px)`}}>
			<div style={{width: 60, height: 18, background: CORES.amarelo, border: `4px solid ${CORES.preto}`, borderRadius: 9}} />
			<div style={{fontFamily: FONTES.titulo, fontSize: 46, color: CORES.preto, whiteSpace: 'nowrap'}}>{titulo}</div>
			<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 30, color: CORES.cinza, whiteSpace: 'nowrap', marginLeft: 'auto'}}>{texto}</div>
		</div>
	);
};
