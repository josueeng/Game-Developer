import React, {useMemo} from 'react';
import {AbsoluteFill, Audio, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {CANAL, CORES, FONTES} from './config';
import {janela, progresso, useEntrada} from './anim';
import {calcularLegendas, type TempoLegenda} from './timing';
import {Recorte} from './components/Recorte';
import {Numero} from './components/Numero';
import {PAISES, PAISES_ENCERRADOS, PARES, PLACARES, VOTOS_DOIS_1T, fmt, pctLula, type Pais} from './dados';

// Short vertical (1080x1920): "o exterior virou", com o horário de cada dado,
// quanto já foi apurado e 1º × 2º turno por país. Lula em azul, Flávio em
// amarelo, mesmo peso visual; sem fotos, números de urna ou logotipos.

export type ShortProps = {temNarracao: boolean; duracao: number; temposLegendas?: TempoLegenda[] | null};

const TOPO = 470;
const VERMELHO = '#B3261E';

export const ShortExterior: React.FC<ShortProps> = ({temNarracao, duracao, temposLegendas}) => {
	const frame = useCurrentFrame();
	const legendas = useMemo(() => calcularLegendas([duracao], temposLegendas), [duracao, temposLegendas]);
	const m = (i: number, a = 0) => Math.round((legendas[Math.floor(i)]?.de ?? duracao - 30) + a);
	const atual = legendas.find((l) => frame >= l.de && frame <= l.ate);
	const fases = [0, m(2, -6), m(4, -6), m(7, -6), m(11, -6), m(12, -6), m(14, -6), 999999];
	const fase = (i: number) => janela(frame, i === 0 ? -12 : fases[i], fases[i + 1] + 12);
	const contados = PLACARES[1].l + PLACARES[1].f;
	const fontes = [
		'',
		'SOMAS DE BOLETINS: G1 (11H41) E INFOMONEY (15H)',
		'INFOMONEY (15H) · TSE (1º TURNO E PAÍSES) · JORNAL RAZÃO (14H50)',
		'1º TURNO: TSE VIA INFOMONEY E DIÁRIO DO NORDESTE · 2º TURNO: METRÓPOLES, CNN BRASIL, EXAME',
		'1º TURNO: TSE VIA INFOMONEY · 2º TURNO: BOLETINS VIA IMPRENSA (ATÉ ~15H)',
	];
	const faseAtual = fases.findIndex((f, i) => frame >= f && frame < fases[i + 1]);

	return (
		<AbsoluteFill style={{backgroundColor: CORES.bege}}>
			<Img src={staticFile('textura-papel.jpg')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'}} />

			{/* Cabeçalho fixo */}
			<div style={{position: 'absolute', top: 130, left: 60, right: 60, textAlign: 'center'}}>
				<div style={{display: 'inline-block', background: CORES.preto, color: CORES.amarelo, fontFamily: FONTES.texto, fontWeight: 800, fontSize: 30, letterSpacing: 3, padding: '8px 22px'}}>{CANAL.nome}</div>
				<div style={{fontFamily: FONTES.titulo, fontSize: 76, lineHeight: 1.1, color: CORES.preto, marginTop: 20}}>
					Exterior: <span style={{background: CORES.amarelo, padding: '0 12px'}}>2º turno</span>
				</div>
				<div style={{display: 'inline-block', marginTop: 16, border: `5px solid ${VERMELHO}`, color: VERMELHO, fontFamily: FONTES.titulo, fontSize: 30, padding: '4px 18px', transform: 'rotate(-2deg)'}}>PARCIAL · 25/10 · DADOS ATÉ ~15H</div>
			</div>

			{/* 0. Abertura */}
			<AbsoluteFill style={{opacity: fase(0)}}>
				<div style={{position: 'absolute', left: 0, right: 0, top: 560, textAlign: 'center', opacity: progresso(frame, 2, 12)}}>
					<div style={{fontFamily: FONTES.titulo, fontSize: 64, color: CORES.preto}}>faltam <span style={{background: CORES.amarelo, padding: '0 12px'}}>1h30</span></div>
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 36, color: CORES.cinza}}>para a apuração no Brasil (17h)</div>
				</div>
				<Recorte seed="virou" inicio={m(1)} cor={CORES.preto} rotacao={-3} style={{left: 120, top: 800, width: 840}} padding="30px 34px">
					<div style={{fontFamily: FONTES.titulo, fontSize: 92, color: CORES.amarelo, textAlign: 'center', lineHeight: 1.05}}>O EXTERIOR VIROU</div>
				</Recorte>
			</AbsoluteFill>

			{/* 1. Placares do dia */}
			<AbsoluteFill style={{opacity: fase(1)}}>
				<Placar p={PLACARES[0]} inicio={m(2)} top={TOPO} />
				<Placar p={PLACARES[1]} inicio={m(3)} top={TOPO + 400} />
				<div style={{position: 'absolute', left: 0, right: 0, top: TOPO + 315, textAlign: 'center', fontFamily: FONTES.mao, fontSize: 54, color: CORES.azul, opacity: progresso(frame, m(3, 10), m(3, 20))}}>↓ virada com a Europa</div>
			</AbsoluteFill>

			{/* 2. Quanto já foi apurado */}
			<AbsoluteFill style={{opacity: fase(2)}}>
				<div style={{position: 'absolute', left: 70, right: 70, top: TOPO, textAlign: 'center', fontFamily: FONTES.titulo, fontSize: 60, color: CORES.preto}}>Quanto já foi apurado?</div>
				<div style={{position: 'absolute', left: 70, right: 70, top: TOPO + 110}}>
					<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontFamily: FONTES.titulo, color: CORES.preto}}>
						<span style={{fontSize: 64, whiteSpace: 'nowrap'}}>
							<Numero para={contados} inicio={m(4)} duracao={30} />
						</span>
						<span style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 30, color: CORES.cinza}}>votos dos dois (15h)</span>
					</div>
					<div style={{height: 70, border: `6px solid ${CORES.preto}`, background: CORES.papel, marginTop: 10}}>
						<div style={{height: '100%', width: `${(100 * contados * progresso(frame, m(5), m(5, 24))) / VOTOS_DOIS_1T}%`, background: CORES.cinza}} />
					</div>
					<div style={{display: 'flex', justifyContent: 'space-between', marginTop: 8, fontFamily: FONTES.texto, fontWeight: 800, fontSize: 30, color: CORES.preto, opacity: progresso(frame, m(5), m(5, 12))}}>
						<span>~metade</span>
						<span>301 mil no 1º turno</span>
					</div>
				</div>
				<div style={{position: 'absolute', left: 70, right: 70, top: TOPO + 380, opacity: progresso(frame, m(6), m(6, 10))}}>
					<div style={{fontFamily: FONTES.titulo, fontSize: 54, color: CORES.preto}}>
						{PAISES_ENCERRADOS.n} de {PAISES_ENCERRADOS.total} países
					</div>
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 30, color: CORES.cinza, marginBottom: 14}}>com votação encerrada às {PAISES_ENCERRADOS.hora}</div>
					<div style={{display: 'flex', flexWrap: 'wrap', gap: 8}}>
						{Array.from({length: PAISES_ENCERRADOS.total}).map((_, i) => (
							<div key={i} style={{width: 34, height: 34, borderRadius: 17, border: `3px solid ${CORES.preto}`, background: i < PAISES_ENCERRADOS.n && frame >= m(6) + i * 0.6 ? CORES.preto : CORES.papel}} />
						))}
					</div>
				</div>
			</AbsoluteFill>

			{/* 3. Países, em pares */}
			<AbsoluteFill style={{opacity: fase(3)}}>
				<div style={{position: 'absolute', left: 0, right: 0, top: TOPO - 10, display: 'flex', justifyContent: 'center', gap: 30, opacity: progresso(frame, fases[3], fases[3] + 10)}}>
					<Chip cor={CORES.azul} texto="Lula" />
					<Chip cor={CORES.amarelo} texto="Flávio" />
					<span style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 28, color: CORES.cinza, alignSelf: 'center'}}>% só entre os dois</span>
				</div>
				{PARES.map((par, j) => {
					const de = m(8 + j, -6);
					const ate = j === PARES.length - 1 ? fases[4] + 12 : m(9 + j, 6);
					return (
						<AbsoluteFill key={j} style={{opacity: janela(frame, de, ate, 8)}}>
							{par.map((nome, k) => (
								<CartaoPais key={nome} pais={PAISES.find((p) => p.nome === nome)!} inicio={de + 4 + k * 8} top={TOPO + 80 + k * 380} />
							))}
						</AbsoluteFill>
					);
				})}
			</AbsoluteFill>

			{/* 4. Resumo: 10 países */}
			<AbsoluteFill style={{opacity: fase(4)}}>
				<div style={{position: 'absolute', left: 70, right: 70, top: TOPO - 10, fontFamily: FONTES.titulo, fontSize: 46, color: CORES.preto, textAlign: 'center'}}>parecido com o 1º turno</div>
				<div style={{position: 'absolute', left: 70, right: 70, top: TOPO + 60}}>
					<div style={{display: 'flex', fontFamily: FONTES.texto, fontWeight: 800, fontSize: 24, color: CORES.cinza, marginBottom: 6}}>
						<span style={{width: 286}} />
						<span style={{flex: 1, textAlign: 'center'}}>1º turno</span>
						<span style={{flex: 1, textAlign: 'center'}}>2º turno</span>
					</div>
					{PAISES.map((p, i) => (
						<div key={p.nome} style={{display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10, opacity: progresso(frame, fases[4] + 4 + i * 3, fases[4] + 12 + i * 3)}}>
							<span style={{width: 272, fontFamily: FONTES.titulo, fontSize: 32, color: CORES.preto, whiteSpace: 'nowrap'}}>{p.nome}</span>
							<BarraMini t={p.t1} />
							<BarraMini t={p.t2} />
						</div>
					))}
				</div>
			</AbsoluteFill>

			{/* 5. Atenção */}
			<AbsoluteFill style={{opacity: fase(5)}}>
				<Carimbo inicio={m(12)} />
				<div style={{position: 'absolute', left: 0, right: 0, top: 800, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 34, opacity: progresso(frame, m(12, 20), m(12, 32))}}>
					<Pizza />
					<div style={{fontFamily: FONTES.titulo, fontSize: 52, color: CORES.preto, lineHeight: 1.1}}>
						exterior: <span style={{whiteSpace: 'nowrap'}}>0,24%</span>
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 30, color: CORES.cinza}}>dos votos no 1º turno</div>
					</div>
				</div>
				<Recorte seed="17h" inicio={m(13)} cor={CORES.amarelo} rotacao={2} style={{left: 170, top: 1110, width: 740}} padding="14px 26px">
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 28, color: CORES.preto, textAlign: 'center'}}>APURAÇÃO OFICIAL (TSE)</div>
					<div style={{fontFamily: FONTES.titulo, fontSize: 72, color: CORES.preto, textAlign: 'center', lineHeight: 1, whiteSpace: 'nowrap'}}>a partir das 17h</div>
				</Recorte>
			</AbsoluteFill>

			{/* 6. Canal */}
			<AbsoluteFill style={{opacity: fase(6)}}>
				<Recorte seed="canal" inicio={fases[6] + 4} cor={CORES.preto} rotacao={-2} style={{left: 80, top: 700, width: 920}} padding="34px 30px">
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 36, color: CORES.azulClaro, textAlign: 'center'}}>SIGA</div>
					<div style={{fontFamily: FONTES.titulo, fontSize: 70, color: CORES.amarelo, textAlign: 'center', whiteSpace: 'nowrap'}}>{CANAL.nome}</div>
				</Recorte>
			</AbsoluteFill>

			{/* Fontes da fase atual */}
			{fontes[faseAtual] ? (
				<div style={{position: 'absolute', left: 60, right: 60, top: 1300, textAlign: 'center', fontFamily: FONTES.texto, fontWeight: 700, fontSize: 24, color: CORES.cinza}}>FONTES: {fontes[faseAtual]}</div>
			) : null}

			{/* Legendas grandes */}
			{atual ? (
				<div style={{position: 'absolute', top: 1400, left: 60, right: 60, display: 'flex', justifyContent: 'center'}}>
					<div style={{background: CORES.preto, color: CORES.papel, fontFamily: FONTES.texto, fontWeight: 800, fontSize: 54, lineHeight: 1.2, textAlign: 'center', padding: '16px 30px 20px', boxShadow: '0 10px 24px rgba(20,15,5,0.35)'}}>{atual.texto}</div>
				</div>
			) : null}

			{temNarracao ? <Audio src={staticFile('narracao.mp3')} /> : null}
			<Audio src={staticFile('trilha.mp3')} volume={(f) => (temNarracao ? 0.1 : 0.4) * interpolate(f, [duracao - 45, duracao], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})} />
		</AbsoluteFill>
	);
};

const Chip: React.FC<{cor: string; texto: string}> = ({cor, texto}) => (
	<span style={{display: 'flex', alignItems: 'center', gap: 12, fontFamily: FONTES.titulo, fontSize: 38, color: CORES.preto}}>
		<span style={{width: 40, height: 40, background: cor, border: `5px solid ${CORES.preto}`, display: 'inline-block'}} />
		{texto}
	</span>
);

// Placar geral: barra 100% com os votos de cada um, hora e fonte.
const Placar: React.FC<{p: (typeof PLACARES)[number]; inicio: number; top: number}> = ({p, inicio, top}) => {
	const frame = useCurrentFrame();
	const e = useEntrada(inicio);
	const pl = (100 * p.l) / (p.l + p.f);
	const pr = progresso(frame, inicio + 6, inicio + 24);
	const wl = 50 + (pl - 50) * pr;
	return (
		<div style={{position: 'absolute', left: 70, right: 70, top, opacity: frame < inicio ? 0 : interpolate(e, [0, 0.3], [0, 1], {extrapolateRight: 'clamp'}), transform: `translateY(${(1 - e) * 30}px)`}}>
			<div style={{display: 'flex', alignItems: 'baseline', gap: 18}}>
				<span style={{background: CORES.preto, color: CORES.papel, fontFamily: FONTES.titulo, fontSize: 52, padding: '2px 18px'}}>{p.hora}</span>
				<span style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 30, color: CORES.cinza}}>soma de boletins · {p.fonte}</span>
			</div>
			<div style={{display: 'flex', height: 100, border: `6px solid ${CORES.preto}`, marginTop: 14, boxShadow: '0 10px 16px rgba(40,30,15,0.25)'}}>
				<div style={{width: `${wl}%`, background: CORES.azul, borderRight: `5px solid ${CORES.preto}`, boxSizing: 'border-box'}} />
				<div style={{flex: 1, background: CORES.amarelo}} />
			</div>
			<div style={{display: 'flex', justifyContent: 'space-between', marginTop: 10, fontFamily: FONTES.titulo, fontSize: 44, whiteSpace: 'nowrap', opacity: pr}}>
				<span style={{color: CORES.azul}}>Lula {p.l.toLocaleString('pt-BR')}</span>
				<span style={{color: CORES.preto}}>Flávio {p.f.toLocaleString('pt-BR')}</span>
			</div>
		</div>
	);
};

const BarraPar: React.FC<{t: {l: number; f: number}; inicio: number; rotulo: string}> = ({t, inicio, rotulo}) => {
	const frame = useCurrentFrame();
	const pl = pctLula(t);
	const p = progresso(frame, inicio, inicio + 16);
	const wl = 50 + (pl - 50) * p;
	return (
		<div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 12}}>
			<span style={{width: 130, fontFamily: FONTES.texto, fontWeight: 800, fontSize: 28, color: CORES.preto}}>{rotulo}</span>
			<div style={{flex: 1, display: 'flex', height: 64, border: `5px solid ${CORES.preto}`}}>
				<div style={{width: `${wl}%`, background: CORES.azul, borderRight: `4px solid ${CORES.preto}`, boxSizing: 'border-box', display: 'flex', alignItems: 'center', paddingLeft: 10, overflow: 'hidden'}}>
					{pl >= 26 ? <span style={{fontFamily: FONTES.titulo, fontSize: 32, color: CORES.papel, whiteSpace: 'nowrap', opacity: p}}>{fmt(pl)}%</span> : null}
				</div>
				<div style={{flex: 1, background: CORES.amarelo, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 10, overflow: 'hidden'}}>
					{100 - pl >= 26 ? <span style={{fontFamily: FONTES.titulo, fontSize: 32, color: CORES.preto, whiteSpace: 'nowrap', opacity: p}}>{fmt(100 - pl)}%</span> : null}
				</div>
			</div>
		</div>
	);
};

const CartaoPais: React.FC<{pais: Pais; inicio: number; top: number}> = ({pais, inicio, top}) => {
	const frame = useCurrentFrame();
	const e = useEntrada(inicio);
	const lider = pctLula(pais.t2) >= 50 ? 'l' : 'f';
	const v1 = lider === 'l' ? pctLula(pais.t1) : 100 - pctLula(pais.t1);
	const v2 = lider === 'l' ? pctLula(pais.t2) : 100 - pctLula(pais.t2);
	return (
		<div style={{position: 'absolute', left: 70, right: 70, top, padding: '18px 26px 24px', background: CORES.papel, border: `5px solid ${CORES.preto}`, boxShadow: '0 12px 18px rgba(40,30,15,0.25)', opacity: frame < inicio ? 0 : interpolate(e, [0, 0.3], [0, 1], {extrapolateRight: 'clamp'}), transform: `translateY(${(1 - e) * 30}px)`}}>
			<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
				<span style={{fontFamily: FONTES.titulo, fontSize: 64, color: CORES.preto}}>{pais.nome}</span>
				<span style={{fontFamily: FONTES.titulo, fontSize: 36, color: CORES.preto, whiteSpace: 'nowrap', opacity: progresso(frame, inicio + 24, inicio + 34)}}>
					<span style={{padding: '2px 12px', background: lider === 'l' ? CORES.azul : CORES.amarelo, color: lider === 'l' ? CORES.papel : CORES.preto, border: `4px solid ${CORES.preto}`, marginRight: 12}}>{lider === 'l' ? 'Lula' : 'Flávio'}</span>
					{fmt(v1)} → {fmt(v2)}%
				</span>
			</div>
			<BarraPar t={pais.t1} inicio={inicio + 6} rotulo="1º turno" />
			<BarraPar t={pais.t2} inicio={inicio + 14} rotulo="2º turno" />
		</div>
	);
};

const BarraMini: React.FC<{t: {l: number; f: number}}> = ({t}) => {
	const pl = pctLula(t);
	return (
		<div style={{flex: 1, display: 'flex', height: 48, border: `4px solid ${CORES.preto}`}}>
			<div style={{width: `${pl}%`, background: CORES.azul, display: 'flex', alignItems: 'center', paddingLeft: 8, boxSizing: 'border-box', overflow: 'hidden'}}>
				{pl >= 24 ? <span style={{fontFamily: FONTES.titulo, fontSize: 22, color: CORES.papel, whiteSpace: 'nowrap'}}>{Math.round(pl)}%</span> : null}
			</div>
			<div style={{flex: 1, background: CORES.amarelo, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 8, overflow: 'hidden'}}>
				{100 - pl >= 24 ? <span style={{fontFamily: FONTES.titulo, fontSize: 22, color: CORES.preto, whiteSpace: 'nowrap'}}>{Math.round(100 - pl)}%</span> : null}
			</div>
		</div>
	);
};

const Carimbo: React.FC<{inicio: number}> = ({inicio}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const s = spring({frame: frame - inicio, fps, config: {damping: 10, stiffness: 180}});
	return (
		<div style={{position: 'absolute', left: 0, right: 0, top: 540, display: 'flex', justifyContent: 'center'}}>
			<div style={{padding: '12px 40px', border: `10px solid ${VERMELHO}`, borderRadius: 16, background: 'rgba(251,246,234,0.9)', color: VERMELHO, fontFamily: FONTES.titulo, fontSize: 90, transform: `rotate(-6deg) scale(${interpolate(s, [0, 1], [2.2, 1])})`, opacity: frame < inicio ? 0 : interpolate(s, [0, 0.2], [0, 1], {extrapolateRight: 'clamp'})}}>PARCIAL</div>
		</div>
	);
};

const Pizza: React.FC = () => {
	const ang = (0.0024 * 360 * Math.PI) / 180;
	const r = 120;
	const x = 130 + r * Math.sin(ang);
	const y = 130 - r * Math.cos(ang);
	return (
		<svg width="260" height="260" viewBox="0 0 260 260" style={{overflow: 'visible'}}>
			<circle cx="130" cy="130" r={r} fill={CORES.papel} stroke={CORES.preto} strokeWidth="6" />
			<path d={`M130 130 L130 ${130 - r} A${r} ${r} 0 0 1 ${x} ${y}Z`} fill={VERMELHO} stroke={VERMELHO} strokeWidth="4" />
			<line x1="130" y1="130" x2="130" y2={130 - r} stroke={CORES.preto} strokeWidth="4" />
		</svg>
	);
};
