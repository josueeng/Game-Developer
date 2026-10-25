import React, {useMemo} from 'react';
import {AbsoluteFill, Audio, Img, interpolate, Sequence, Series, staticFile, useCurrentFrame} from 'remotion';
import {CANAL, CORES, FONTES, FPS} from './config';
import {Video, type VideoProps} from './Video';
import {calcularLegendas} from './timing';

// Short vertical (1080x1920) feito só com trechos contínuos do vídeo
// principal: mesmas cenas, mesma narração, mesmas fontes. Nada novo é dito;
// o Short apenas reenquadra o vídeo e aumenta as legendas.

export type Trecho = {de: number; ate: number}; // segundos do vídeo principal
export type ShortConfig = {
	id: string;
	titulo: string[]; // linhas do título no topo (resumo do que o trecho mostra)
	destaque: number; // linha do título com marca-texto
	trechos: Trecho[];
	fontes: string;
};

export const FIM_CARD = 75; // quadros do card final "vídeo completo no canal"
const ESCALA = 1080 / 1920;
const TOPO_VIDEO = 610;

export const quadrosDoShort = (s: ShortConfig) =>
	s.trechos.reduce((acc, t) => acc + Math.round(t.ate * FPS) - Math.round(t.de * FPS), 0) + FIM_CARD;

export const Short: React.FC<VideoProps & {short: ShortConfig}> = ({short, ...video}) => {
	const frame = useCurrentFrame();
	const totalOriginal = video.duracoes.reduce((a, b) => a + b, 0);
	const trechos = short.trechos.map((t) => ({ini: Math.round(t.de * FPS), fim: Math.round(t.ate * FPS)}));
	const offsets: number[] = [];
	let acc = 0;
	for (const t of trechos) {
		offsets.push(acc);
		acc += t.fim - t.ini;
	}
	const totalTrechos = acc;

	// Legendas do vídeo principal, remapeadas para o tempo do Short.
	const legendas = useMemo(() => {
		const originais = calcularLegendas(video.duracoes, video.temposLegendas);
		const out: {texto: string; de: number; ate: number}[] = [];
		trechos.forEach((t, j) => {
			for (const l of originais) {
				const de = Math.max(l.de, t.ini);
				const ate = Math.min(l.ate, t.fim);
				if (ate - de > 6) out.push({texto: l.texto, de: de - t.ini + offsets[j], ate: ate - t.ini + offsets[j]});
			}
		});
		return out;
	}, [video.duracoes, video.temposLegendas, short.id]);
	const atual = legendas.find((l) => frame >= l.de && frame <= l.ate);
	const fimCard = interpolate(frame, [totalTrechos, totalTrechos + 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill style={{backgroundColor: CORES.bege}}>
			<Img src={staticFile('textura-papel.jpg')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'}} />

			{/* Título */}
			<div style={{position: 'absolute', top: 170, left: 60, right: 60, textAlign: 'center'}}>
				<div style={{display: 'inline-block', background: CORES.preto, color: CORES.amarelo, fontFamily: FONTES.texto, fontWeight: 800, fontSize: 30, letterSpacing: 3, padding: '8px 22px', marginBottom: 24}}>
					{CANAL.nome}
				</div>
				{short.titulo.map((linha, i) => (
					<div key={i} style={{fontFamily: FONTES.titulo, fontSize: 82, lineHeight: 1.1, color: CORES.preto}}>
						<span style={i === short.destaque ? {background: CORES.amarelo, padding: '0 14px', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone'} : undefined}>{linha}</span>
					</div>
				))}
			</div>

			{/* Vídeo principal reenquadrado */}
			<div style={{position: 'absolute', top: TOPO_VIDEO, left: 0, width: 1080, height: 1080 * (1080 / 1920), overflow: 'hidden', borderTop: `6px solid ${CORES.preto}`, borderBottom: `6px solid ${CORES.preto}`, boxShadow: '0 16px 26px rgba(40,30,15,0.3)'}}>
				<div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transform: `scale(${ESCALA})`, transformOrigin: '0 0'}}>
					<Series>
						{trechos.map((t, j) => (
							<Series.Sequence key={j} durationInFrames={t.fim - t.ini}>
								<Sequence from={-t.ini}>
									<Video {...video} semLegendas fimTrilha={totalOriginal} />
								</Sequence>
							</Series.Sequence>
						))}
					</Series>
				</div>
				{/* Nos cortes entre trechos, uma cortina de papel esconde a transição
				    original (que mostraria o fim da cena anterior). */}
				{offsets.slice(1).map((o, j) => (
					<Sequence key={j} from={o} durationInFrames={22}>
						<Cortina />
					</Sequence>
				))}
				{/* Card final */}
				<AbsoluteFill style={{background: CORES.preto, opacity: fimCard, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 14}}>
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 40, color: CORES.azulClaro}}>VÍDEO COMPLETO NO CANAL</div>
					<div style={{fontFamily: FONTES.titulo, fontSize: 84, color: CORES.amarelo}}>{CANAL.nome}</div>
				</AbsoluteFill>
			</div>

			{/* Fontes do trecho (as originais aparecem pequenas dentro do vídeo) */}
			<div style={{position: 'absolute', top: TOPO_VIDEO + 1080 * (1080 / 1920) + 22, left: 60, right: 60, textAlign: 'center', fontFamily: FONTES.texto, fontWeight: 700, fontSize: 26, color: CORES.cinza}}>
				{short.fontes}
			</div>

			{/* Legendas grandes */}
			{atual ? (
				<div style={{position: 'absolute', top: 1330, left: 60, right: 60, display: 'flex', justifyContent: 'center'}}>
					<div style={{background: CORES.preto, color: CORES.papel, fontFamily: FONTES.texto, fontWeight: 800, fontSize: 58, lineHeight: 1.2, textAlign: 'center', padding: '16px 30px 20px', boxShadow: '0 10px 24px rgba(20,15,5,0.35)'}}>
						{atual.texto}
					</div>
				</div>
			) : null}

			{/* Trilha durante o card final */}
			<Sequence from={totalTrechos}>
				<Audio src={staticFile('trilha.mp3')} volume={(f) => 0.35 * interpolate(f, [FIM_CARD - 20, FIM_CARD], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})} />
			</Sequence>
		</AbsoluteFill>
	);
};

const Cortina: React.FC = () => {
	const f = useCurrentFrame();
	return <AbsoluteFill style={{background: CORES.bege, opacity: interpolate(f, [0, 12, 22], [1, 1, 0], {extrapolateRight: 'clamp'})}} />;
};
