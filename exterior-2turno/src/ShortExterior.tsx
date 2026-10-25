import React, {useMemo} from 'react';
import {AbsoluteFill, Audio, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {CANAL, CORES, FONTES} from './config';
import {janela, progresso, useEntrada} from './anim';
import {calcularLegendas, type TempoLegenda} from './timing';
import {Recorte} from './components/Recorte';
import {MarcaTexto} from './components/MarcaTexto';
import {PAISES, fmt, pctLula, type Pais} from './dados';

// Short vertical (1080x1920): 1º × 2º turno no exterior, país a país.
// Lula em azul, Flávio em amarelo, com o mesmo peso visual; sem fotos,
// números de urna ou logotipos.

export type ShortProps = {temNarracao: boolean; duracao: number; temposLegendas?: TempoLegenda[] | null};

const CARD = {top: 470, h: 820};

export const ShortExterior: React.FC<ShortProps> = ({temNarracao, duracao, temposLegendas}) => {
	const frame = useCurrentFrame();
	const legendas = useMemo(() => calcularLegendas([duracao], temposLegendas), [duracao, temposLegendas]);
	const m = (i: number, a = 0) => Math.round((legendas[Math.floor(i)]?.de ?? duracao - 30) + a);
	const atual = legendas.find((l) => frame >= l.de && frame <= l.ate);
	const iniPaises = m(4, -6);
	const fimPaises = m(12, -6);
	const iniFim = m(13, -6);
	const iniCanal = m(16, -6);

	return (
		<AbsoluteFill style={{backgroundColor: CORES.bege}}>
			<Img src={staticFile('textura-papel.jpg')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'}} />

			{/* Cabeçalho fixo */}
			<div style={{position: 'absolute', top: 130, left: 60, right: 60, textAlign: 'center'}}>
				<div style={{display: 'inline-block', background: CORES.preto, color: CORES.amarelo, fontFamily: FONTES.texto, fontWeight: 800, fontSize: 30, letterSpacing: 3, padding: '8px 22px'}}>{CANAL.nome}</div>
				<div style={{fontFamily: FONTES.titulo, fontSize: 76, lineHeight: 1.1, color: CORES.preto, marginTop: 20}}>
					Exterior: <MarcaTexto inicio={6}>1º × 2º turno</MarcaTexto>
				</div>
				<div style={{display: 'inline-block', marginTop: 16, border: `5px solid #B3261E`, color: '#B3261E', fontFamily: FONTES.titulo, fontSize: 30, padding: '4px 18px', transform: 'rotate(-2deg)'}}>PARCIAL · 25/10, INÍCIO DA TARDE</div>
			</div>

			{/* Abertura */}
			<AbsoluteFill style={{opacity: janela(frame, -12, iniPaises + 12)}}>
				<div style={{position: 'absolute', left: 0, right: 0, top: 540, textAlign: 'center', fontFamily: FONTES.titulo, fontSize: 64, color: CORES.preto, opacity: progresso(frame, 4, 14)}}>
					urnas <span style={{background: CORES.amarelo, padding: '0 12px'}}>fechadas</span>
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 34, color: CORES.cinza}}>em vários países do exterior</div>
				</div>
				<Recorte seed="pergunta" inicio={m(1)} cor={CORES.preto} rotacao={-2} style={{left: 110, top: 700, width: 860}} padding="26px 34px">
					<div style={{fontFamily: FONTES.titulo, fontSize: 70, color: CORES.amarelo, lineHeight: 1.1, textAlign: 'center'}}>O voto mudou desde o 1º turno?</div>
				</Recorte>
				<div style={{position: 'absolute', left: 0, right: 0, top: 960, display: 'flex', justifyContent: 'center', gap: 30, opacity: progresso(frame, m(2), m(2, 10))}}>
					<Chip cor={CORES.azul} texto="Lula" />
					<Chip cor={CORES.amarelo} texto="Flávio Bolsonaro" />
				</div>
				<div style={{position: 'absolute', left: 0, right: 0, top: 1040, textAlign: 'center', fontFamily: FONTES.texto, fontWeight: 800, fontSize: 34, color: CORES.cinza, opacity: progresso(frame, m(2), m(2, 10))}}>% só entre os dois candidatos</div>
				<div style={{position: 'absolute', left: 90, right: 90, top: 1110, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14}}>
					{PAISES.map((p, i) => (
						<span key={p.nome} style={{padding: '6px 16px', background: CORES.papel, border: `4px solid ${CORES.preto}`, fontFamily: FONTES.texto, fontWeight: 800, fontSize: 30, color: CORES.preto, opacity: progresso(frame, m(3) + i * 4, m(3) + i * 4 + 8)}}>{p.nome}</span>
					))}
				</div>
			</AbsoluteFill>

			{/* País a país */}
			{PAISES.map((p, i) => {
				const de = i === 0 ? iniPaises : m(4 + i, -6);
				const ate = i === PAISES.length - 1 ? fimPaises + 12 : m(5 + i, 6);
				return (
					<AbsoluteFill key={p.nome} style={{opacity: janela(frame, de, ate, 8)}}>
						<CartaoPais pais={p} inicio={de + 4} indice={i} />
					</AbsoluteFill>
				);
			})}

			{/* Resumo: os 8 países */}
			<AbsoluteFill style={{opacity: janela(frame, fimPaises, iniFim + 12)}}>
				<div style={{position: 'absolute', left: 70, right: 70, top: CARD.top, fontFamily: FONTES.titulo, fontSize: 50, color: CORES.preto, textAlign: 'center'}}>na maioria, poucos pontos</div>
				<div style={{position: 'absolute', left: 70, right: 70, top: CARD.top + 90}}>
					<div style={{display: 'flex', fontFamily: FONTES.texto, fontWeight: 800, fontSize: 24, color: CORES.cinza, marginBottom: 8}}>
						<span style={{width: 300}} />
						<span style={{flex: 1, textAlign: 'center'}}>1º turno</span>
						<span style={{flex: 1, textAlign: 'center'}}>2º turno</span>
					</div>
					{PAISES.map((p, i) => (
						<div key={p.nome} style={{display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14, opacity: progresso(frame, fimPaises + 4 + i * 3, fimPaises + 12 + i * 3)}}>
							<span style={{width: 286, fontFamily: FONTES.titulo, fontSize: 34, color: CORES.preto, whiteSpace: 'nowrap'}}>{p.nome}</span>
							<BarraMini t={p.t1} />
							<BarraMini t={p.t2} />
						</div>
					))}
				</div>
			</AbsoluteFill>

			{/* Atenção */}
			<AbsoluteFill style={{opacity: janela(frame, iniFim, iniCanal + 12)}}>
				<Carimbo inicio={m(13)} />
				<div style={{position: 'absolute', left: 0, right: 0, top: 830, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 34, opacity: progresso(frame, m(14), m(14, 12))}}>
					<Pizza />
					<div style={{fontFamily: FONTES.titulo, fontSize: 52, color: CORES.preto, lineHeight: 1.1}}>
						exterior: <span style={{whiteSpace: 'nowrap'}}>0,24%</span>
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 30, color: CORES.cinza}}>dos votos no 1º turno</div>
					</div>
				</div>
				<Recorte seed="17h" inicio={m(15)} cor={CORES.amarelo} rotacao={2} style={{left: 170, top: 1110, width: 740}} padding="14px 26px">
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 28, color: CORES.preto, textAlign: 'center'}}>RESULTADO OFICIAL (TSE)</div>
					<div style={{fontFamily: FONTES.titulo, fontSize: 72, color: CORES.preto, textAlign: 'center', lineHeight: 1, whiteSpace: 'nowrap'}}>a partir das 17h</div>
				</Recorte>
			</AbsoluteFill>

			{/* Canal */}
			<AbsoluteFill style={{opacity: janela(frame, iniCanal, 999999)}}>
				<Recorte seed="canal" inicio={iniCanal + 4} cor={CORES.preto} rotacao={-2} style={{left: 80, top: 700, width: 920}} padding="34px 30px">
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 36, color: CORES.azulClaro, textAlign: 'center'}}>SIGA</div>
					<div style={{fontFamily: FONTES.titulo, fontSize: 70, color: CORES.amarelo, textAlign: 'center', whiteSpace: 'nowrap'}}>{CANAL.nome}</div>
				</Recorte>
			</AbsoluteFill>

			{/* Fontes */}
			<div style={{position: 'absolute', left: 60, right: 60, top: 1300, textAlign: 'center', fontFamily: FONTES.texto, fontWeight: 700, fontSize: 24, color: CORES.cinza, opacity: frame >= iniPaises && frame < iniFim ? 1 : 0}}>
				FONTES: TSE VIA INFOMONEY (1º TURNO) · BOLETINS VIA EXAME, CNN BRASIL E METRÓPOLES (2º TURNO)
			</div>

			{/* Legendas grandes */}
			{atual ? (
				<div style={{position: 'absolute', top: 1400, left: 60, right: 60, display: 'flex', justifyContent: 'center'}}>
					<div style={{background: CORES.preto, color: CORES.papel, fontFamily: FONTES.texto, fontWeight: 800, fontSize: 56, lineHeight: 1.2, textAlign: 'center', padding: '16px 30px 20px', boxShadow: '0 10px 24px rgba(20,15,5,0.35)'}}>{atual.texto}</div>
				</div>
			) : null}

			{temNarracao ? <Audio src={staticFile('narracao.mp3')} /> : null}
			<Audio src={staticFile('trilha.mp3')} volume={(f) => (temNarracao ? 0.1 : 0.4) * interpolate(f, [duracao - 45, duracao], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})} />
		</AbsoluteFill>
	);
};

const Chip: React.FC<{cor: string; texto: string}> = ({cor, texto}) => (
	<span style={{display: 'flex', alignItems: 'center', gap: 12, fontFamily: FONTES.titulo, fontSize: 40, color: CORES.preto}}>
		<span style={{width: 44, height: 44, background: cor, border: `5px solid ${CORES.preto}`, display: 'inline-block'}} />
		{texto}
	</span>
);

// Barra 100% empilhada: Lula (azul) à esquerda, Flávio (amarelo) à direita.
const Barra: React.FC<{t: {l: number; f: number}; inicio: number; rotulo: string}> = ({t, inicio, rotulo}) => {
	const frame = useCurrentFrame();
	const pl = pctLula(t);
	const p = progresso(frame, inicio, inicio + 18);
	const wl = 50 + (pl - 50) * p;
	return (
		<div style={{marginTop: 34}}>
			<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 36, color: CORES.preto, marginBottom: 10}}>{rotulo}</div>
			<div style={{display: 'flex', height: 120, border: `6px solid ${CORES.preto}`, background: CORES.papel, boxShadow: '0 10px 16px rgba(40,30,15,0.25)'}}>
				<div style={{width: `${wl}%`, background: CORES.azul, borderRight: `5px solid ${CORES.preto}`, boxSizing: 'border-box'}} />
				<div style={{flex: 1, background: CORES.amarelo}} />
			</div>
			<div style={{display: 'flex', justifyContent: 'space-between', marginTop: 10, fontFamily: FONTES.titulo, fontSize: 46, whiteSpace: 'nowrap', opacity: p}}>
				<span style={{color: CORES.azul}}>Lula {fmt(pl)}%</span>
				<span style={{color: CORES.preto}}>Flávio {fmt(100 - pl)}%</span>
			</div>
		</div>
	);
};

const CartaoPais: React.FC<{pais: Pais; inicio: number; indice: number}> = ({pais, inicio, indice}) => {
	const frame = useCurrentFrame();
	const e = useEntrada(inicio);
	const lider = pctLula(pais.t2) >= 50 ? 'l' : 'f';
	const v1 = lider === 'l' ? pctLula(pais.t1) : 100 - pctLula(pais.t1);
	const v2 = lider === 'l' ? pctLula(pais.t2) : 100 - pctLula(pais.t2);
	const d = v2 - v1;
	const nomeLider = lider === 'l' ? 'Lula' : 'Flávio';
	return (
		<div style={{position: 'absolute', left: 70, right: 70, top: CARD.top, opacity: interpolate(e, [0, 0.3], [0, 1], {extrapolateRight: 'clamp'}), transform: `translateY(${(1 - e) * 40}px)`}}>
			<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
				<div style={{fontFamily: FONTES.titulo, fontSize: 92, color: CORES.preto, whiteSpace: 'nowrap'}}>{pais.nome}</div>
				<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 30, color: CORES.cinza}}>{indice + 1}/8</div>
			</div>
			<Barra t={pais.t1} inicio={inicio + 6} rotulo="1º turno" />
			<Barra t={pais.t2} inicio={inicio + 18} rotulo="2º turno (parcial)" />
			<div style={{marginTop: 50, display: 'flex', alignItems: 'center', gap: 22, opacity: progresso(frame, inicio + 30, inicio + 40)}}>
				<span style={{padding: '8px 22px', background: lider === 'l' ? CORES.azul : CORES.amarelo, color: lider === 'l' ? CORES.papel : CORES.preto, border: `5px solid ${CORES.preto}`, fontFamily: FONTES.titulo, fontSize: 44, whiteSpace: 'nowrap'}}>{nomeLider}</span>
				<span style={{fontFamily: FONTES.titulo, fontSize: 46, color: CORES.preto, whiteSpace: 'nowrap'}}>
					{fmt(v1)}% → {fmt(v2)}%
				</span>
				<span style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 34, color: CORES.cinza, whiteSpace: 'nowrap'}}>
					({d >= 0 ? '+' : '−'}
					{fmt(Math.abs(d))} pt)
				</span>
			</div>
		</div>
	);
};

const BarraMini: React.FC<{t: {l: number; f: number}}> = ({t}) => {
	const pl = pctLula(t);
	return (
		<div style={{flex: 1, display: 'flex', height: 54, border: `4px solid ${CORES.preto}`}}>
			<div style={{width: `${pl}%`, background: CORES.azul, display: 'flex', alignItems: 'center', paddingLeft: 8, boxSizing: 'border-box', overflow: 'hidden'}}>
				{pl >= 24 ? <span style={{fontFamily: FONTES.titulo, fontSize: 24, color: CORES.papel, whiteSpace: 'nowrap'}}>{Math.round(pl)}%</span> : null}
			</div>
			<div style={{flex: 1, background: CORES.amarelo, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 8, overflow: 'hidden'}}>
				{100 - pl >= 24 ? <span style={{fontFamily: FONTES.titulo, fontSize: 24, color: CORES.preto, whiteSpace: 'nowrap'}}>{Math.round(100 - pl)}%</span> : null}
			</div>
		</div>
	);
};

const Carimbo: React.FC<{inicio: number}> = ({inicio}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const s = spring({frame: frame - inicio, fps, config: {damping: 10, stiffness: 180}});
	return (
		<div style={{position: 'absolute', left: 0, right: 0, top: 560, display: 'flex', justifyContent: 'center'}}>
			<div style={{padding: '12px 40px', border: '10px solid #B3261E', borderRadius: 16, background: 'rgba(251,246,234,0.9)', color: '#B3261E', fontFamily: FONTES.titulo, fontSize: 90, transform: `rotate(-6deg) scale(${interpolate(s, [0, 1], [2.2, 1])})`, opacity: frame < inicio ? 0 : interpolate(s, [0, 0.2], [0, 1], {extrapolateRight: 'clamp'})}}>PARCIAL</div>
		</div>
	);
};

// Pizza com a fatia do exterior (0,24%) quase invisível.
const Pizza: React.FC = () => {
	const ang = (0.0024 * 360 * Math.PI) / 180;
	const r = 120;
	const x = 130 + r * Math.sin(ang);
	const y = 130 - r * Math.cos(ang);
	return (
		<svg width="260" height="260" viewBox="0 0 260 260" style={{overflow: 'visible'}}>
			<circle cx="130" cy="130" r={r} fill={CORES.papel} stroke={CORES.preto} strokeWidth="6" />
			<path d={`M130 130 L130 ${130 - r} A${r} ${r} 0 0 1 ${x} ${y}Z`} fill="#B3261E" stroke="#B3261E" strokeWidth="4" />
			<line x1="130" y1="130" x2="130" y2={130 - r} stroke={CORES.preto} strokeWidth="4" />
		</svg>
	);
};
