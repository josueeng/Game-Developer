import React, {useMemo} from 'react';
import {AbsoluteFill, Audio, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {CANAL, CORES, FONTES} from './config';
import {janela, progresso, useEntrada} from './anim';
import {calcularLegendas, type TempoLegenda} from './timing';
import {Recorte} from './components/Recorte';

// Short vertical (1080x1920): "perdeu o 1º turno e ganhou o 2º: de onde vieram
// os votos?". Pergunta, não responde. Lula em azul, Flávio em amarelo, mesmo
// peso visual; sem fotos, números de urna ou logotipos.
// 1º turno: TSE 100%. 2º turno: TSE 99,96% (21h52 de 25/10).

export type ShortProps = {temNarracao: boolean; duracao: number; temposLegendas?: TempoLegenda[] | null};

const TOPO = 470;
const VERMELHO = '#B3261E';
const T1 = {l: 53879538, f: 56104503};
const T2 = {l: 64225485, f: 59810812};

const mi = (v: number) => (v / 1e6).toLocaleString('pt-BR', {minimumFractionDigits: 1, maximumFractionDigits: 1});

export const ShortExterior: React.FC<ShortProps> = ({temNarracao, duracao, temposLegendas}) => {
	const frame = useCurrentFrame();
	const legendas = useMemo(() => calcularLegendas([duracao], temposLegendas), [duracao, temposLegendas]);
	const m = (i: number, a = 0) => Math.round((legendas[Math.floor(i)]?.de ?? duracao - 30) + a);
	const atual = legendas.find((l) => frame >= l.de && frame <= l.ate);
	const fases = [0, m(2, -6), m(5, -6), m(7, -6), m(9, -6), m(11, -6), 999999];
	const fase = (i: number) => janela(frame, i === 0 ? -12 : fases[i], fases[i + 1] + 12);
	const fontes = [
		'TSE: 1º TURNO 100% · 2º TURNO 99,96% (21H52 DE 25/10), VIA FOLHA PE E ND MAIS',
		'CÁLCULO A PARTIR DOS VOTOS DO TSE',
		'TSE, VIA IMPRENSA · CÁLCULO PRÓPRIO',
		'ABSTENÇÃO PARCIAL: EXAME, CORREIO, BAHIA NOTÍCIAS · CÁLCULO PRÓPRIO',
		'',
		'',
	];
	const faseAtual = fases.findIndex((f, i) => frame >= f && frame < fases[i + 1]);

	return (
		<AbsoluteFill style={{backgroundColor: CORES.bege}}>
			<Img src={staticFile('textura-papel.jpg')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'}} />

			{/* Cabeçalho fixo */}
			<div style={{position: 'absolute', top: 130, left: 60, right: 60, textAlign: 'center'}}>
				<div style={{display: 'inline-block', background: CORES.preto, color: CORES.amarelo, fontFamily: FONTES.texto, fontWeight: 800, fontSize: 30, letterSpacing: 3, padding: '8px 22px'}}>{CANAL.nome}</div>
				<div style={{fontFamily: FONTES.titulo, fontSize: 60, lineHeight: 1.1, color: CORES.preto, marginTop: 20, whiteSpace: 'nowrap'}}>
					De onde vieram <span style={{background: CORES.amarelo, padding: '0 12px'}}>os votos?</span>
				</div>
				<div style={{display: 'inline-block', marginTop: 16, border: `5px solid ${VERMELHO}`, color: VERMELHO, fontFamily: FONTES.titulo, fontSize: 28, padding: '4px 18px', transform: 'rotate(-2deg)'}}>2º TURNO: 99,96% DAS SEÇÕES (TSE)</div>
			</div>

			{/* 0. Placares */}
			<AbsoluteFill style={{opacity: fase(0)}}>
				<Placar titulo="1º turno" t={T1} inicio={4} top={TOPO} />
				<Placar titulo="2º turno" t={T2} inicio={m(1)} top={TOPO + 400} />
				<div style={{position: 'absolute', left: 0, right: 0, top: TOPO + 315, textAlign: 'center', fontFamily: FONTES.titulo, fontSize: 60, color: VERMELHO, opacity: progresso(frame, m(1, 24), m(1, 34))}}>↓ virou ↓</div>
			</AbsoluteFill>

			{/* 1. Crescimento */}
			<AbsoluteFill style={{opacity: fase(1)}}>
				<div style={{position: 'absolute', left: 70, right: 70, top: TOPO, textAlign: 'center', fontFamily: FONTES.titulo, fontSize: 52, color: CORES.preto}}>do 1º para o 2º turno</div>
				<Crescimento nome="Lula" ganho={T2.l - T1.l} cor={CORES.azul} texto={CORES.papel} inicio={m(2)} top={TOPO + 110} />
				<Crescimento nome="Flávio" ganho={T2.f - T1.f} cor={CORES.amarelo} texto={CORES.preto} inicio={m(3)} top={TOPO + 330} />
				<Interrogacao inicio={m(4)} top={TOPO + 520} />
			</AbsoluteFill>

			{/* 2. Outros candidatos */}
			<AbsoluteFill style={{opacity: fase(2)}}>
				<div style={{position: 'absolute', left: 70, right: 70, top: TOPO, textAlign: 'center', opacity: progresso(frame, m(5), m(5, 10))}}>
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 32, color: CORES.cinza}}>OUTROS CANDIDATOS NO 1º TURNO</div>
					<div style={{display: 'inline-block', marginTop: 12, padding: '10px 34px', background: CORES.papel, border: `6px solid ${CORES.preto}`, fontFamily: FONTES.titulo, fontSize: 96, color: CORES.preto}}>9,3 mi</div>
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 28, color: CORES.cinza, marginTop: 12}}>Cury · Renan Santos · Caiado · Zema e outros</div>
				</div>
				<svg width="1080" height="320" viewBox="0 0 1080 320" style={{position: 'absolute', left: 0, top: TOPO + 270}}>
					{[
						{x: 230, cor: CORES.azul},
						{x: 850, cor: CORES.amarelo},
					].map((s, i) => {
						const p = progresso(frame, m(6) + i * 6, m(6, 24) + i * 6);
						return (
							<g key={i}>
								<path d={`M540 10 Q ${(540 + s.x) / 2} 40, ${540 + (s.x - 540) * p} ${10 + 230 * p}`} fill="none" stroke={CORES.preto} strokeWidth="10" strokeDasharray="22 16" />
								<circle cx={s.x} cy={260} r={50} fill={s.cor} stroke={CORES.preto} strokeWidth="6" opacity={p > 0.95 ? 1 : 0} />
								<text x={s.x} y={282} textAnchor="middle" fontFamily={FONTES.titulo} fontSize="64" fill={i === 0 ? CORES.papel : CORES.preto} opacity={p > 0.95 ? 1 : 0}>?</text>
							</g>
						);
					})}
				</svg>
				<Carimbo inicio={m(6, 36)} texto="VOTO SECRETO" top={TOPO + 620} />
			</AbsoluteFill>

			{/* 3. Mais votos válidos */}
			<AbsoluteFill style={{opacity: fase(3)}}>
				<div style={{position: 'absolute', left: 70, right: 70, top: TOPO, textAlign: 'center', fontFamily: FONTES.texto, fontWeight: 800, fontSize: 32, color: CORES.cinza}}>MAIS UMA PISTA</div>
				<div style={{position: 'absolute', left: 70, right: 70, top: TOPO + 50, textAlign: 'center', fontFamily: FONTES.titulo, fontSize: 110, color: CORES.preto, opacity: progresso(frame, m(7), m(7, 10))}}>+4,7 mi</div>
				<div style={{position: 'absolute', left: 70, right: 70, top: TOPO + 180, textAlign: 'center', fontFamily: FONTES.texto, fontWeight: 800, fontSize: 36, color: CORES.preto, opacity: progresso(frame, m(7), m(7, 10))}}>votos válidos no 2º turno</div>
				<div style={{position: 'absolute', left: 90, right: 90, top: TOPO + 290, opacity: progresso(frame, m(8), m(8, 10))}}>
					<Linha rotulo="abstenção, 1º turno" valor={21.08} texto="21,08%" inicio={m(8)} />
					<Linha rotulo="abstenção, 2º turno (parcial)" valor={19.1} texto="~19%" inicio={m(8, 10)} />
					<div style={{marginTop: 26, fontFamily: FONTES.titulo, fontSize: 44, color: CORES.preto, textAlign: 'center'}}>brancos e nulos também ↓</div>
				</div>
			</AbsoluteFill>

			{/* 4. A pergunta */}
			<AbsoluteFill style={{opacity: fase(4)}}>
				<div style={{position: 'absolute', left: 70, right: 70, top: TOPO, textAlign: 'center', fontFamily: FONTES.titulo, fontSize: 64, color: CORES.preto, opacity: progresso(frame, m(9), m(9, 10))}}>Quem decidiu a eleição?</div>
				<CartaoPergunta inicio={m(10)} top={TOPO + 140} cor={CORES.papel} texto="quem votou em outro candidato no 1º turno?" />
				<div style={{position: 'absolute', left: 0, right: 0, top: TOPO + 445, textAlign: 'center', fontFamily: FONTES.titulo, fontSize: 56, color: CORES.preto, opacity: progresso(frame, m(10, 30), m(10, 40))}}>ou</div>
				<CartaoPergunta inicio={m(10, 40)} top={TOPO + 520} cor={CORES.amarelo} texto="quem nem tinha ido votar?" />
			</AbsoluteFill>

			{/* 5. Comenta + canal */}
			<AbsoluteFill style={{opacity: fase(5)}}>
				<div style={{position: 'absolute', left: 0, right: 0, top: 560, textAlign: 'center', fontFamily: FONTES.titulo, fontSize: 96, color: CORES.preto}}>
					comenta <span style={{background: CORES.amarelo, padding: '0 14px'}}>aí</span> 👇
				</div>
				<Recorte seed="canal" inicio={fases[5] + 10} cor={CORES.preto} rotacao={-2} style={{left: 80, top: 800, width: 920}} padding="30px 30px">
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 34, color: CORES.azulClaro, textAlign: 'center'}}>SIGA</div>
					<div style={{fontFamily: FONTES.titulo, fontSize: 70, color: CORES.amarelo, textAlign: 'center', whiteSpace: 'nowrap'}}>{CANAL.nome}</div>
				</Recorte>
			</AbsoluteFill>

			{fontes[faseAtual] ? (
				<div style={{position: 'absolute', left: 60, right: 60, top: 1300, textAlign: 'center', fontFamily: FONTES.texto, fontWeight: 700, fontSize: 24, color: CORES.cinza}}>FONTES: {fontes[faseAtual]}</div>
			) : null}

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

const Placar: React.FC<{titulo: string; t: {l: number; f: number}; inicio: number; top: number}> = ({titulo, t, inicio, top}) => {
	const frame = useCurrentFrame();
	const e = useEntrada(inicio);
	const pl = (100 * t.l) / (t.l + t.f);
	const pr = progresso(frame, inicio + 6, inicio + 24);
	const wl = 50 + (pl - 50) * pr;
	const lider = t.l > t.f ? 'Lula' : 'Flávio';
	const dif = Math.abs(t.l - t.f);
	return (
		<div style={{position: 'absolute', left: 70, right: 70, top, opacity: frame < inicio ? 0 : interpolate(e, [0, 0.3], [0, 1], {extrapolateRight: 'clamp'}), transform: `translateY(${(1 - e) * 30}px)`}}>
			<div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
				<span style={{background: CORES.preto, color: CORES.papel, fontFamily: FONTES.titulo, fontSize: 50, padding: '2px 18px'}}>{titulo}</span>
				<span style={{fontFamily: FONTES.titulo, fontSize: 40, color: CORES.preto, opacity: pr, whiteSpace: 'nowrap'}}>+{mi(dif)} mi {lider}</span>
			</div>
			<div style={{display: 'flex', height: 100, border: `6px solid ${CORES.preto}`, marginTop: 14, boxShadow: '0 10px 16px rgba(40,30,15,0.25)'}}>
				<div style={{width: `${wl}%`, background: CORES.azul, borderRight: `5px solid ${CORES.preto}`, boxSizing: 'border-box'}} />
				<div style={{flex: 1, background: CORES.amarelo}} />
			</div>
			<div style={{display: 'flex', justifyContent: 'space-between', marginTop: 10, fontFamily: FONTES.titulo, fontSize: 44, whiteSpace: 'nowrap', opacity: pr}}>
				<span style={{color: CORES.azul}}>Lula {mi(t.l)} mi</span>
				<span style={{color: CORES.preto}}>Flávio {mi(t.f)} mi</span>
			</div>
		</div>
	);
};

const Crescimento: React.FC<{nome: string; ganho: number; cor: string; texto: string; inicio: number; top: number}> = ({nome, ganho, cor, texto, inicio, top}) => {
	const frame = useCurrentFrame();
	const p = progresso(frame, inicio, inicio + 24);
	const w = (ganho / 10.5e6) * 100;
	return (
		<div style={{position: 'absolute', left: 70, right: 70, top, opacity: frame < inicio ? 0 : 1}}>
			<div style={{fontFamily: FONTES.titulo, fontSize: 48, color: CORES.preto}}>{nome}</div>
			<div style={{height: 110, marginTop: 10, width: `${w * p}%`, background: cor, border: `6px solid ${CORES.preto}`, boxSizing: 'border-box', display: 'flex', alignItems: 'center', paddingLeft: 20, overflow: 'visible', whiteSpace: 'nowrap'}}>
				<span style={{fontFamily: FONTES.titulo, fontSize: 56, color: texto, opacity: p}}>+{mi(ganho * p)} mi</span>
			</div>
		</div>
	);
};

const Interrogacao: React.FC<{inicio: number; top: number}> = ({inicio, top}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const s = spring({frame: frame - inicio, fps, config: {damping: 8}});
	return (
		<div style={{position: 'absolute', left: 0, right: 0, top, textAlign: 'center', fontFamily: FONTES.titulo, fontSize: 220, color: VERMELHO, lineHeight: 1, opacity: frame < inicio ? 0 : 1, transform: `scale(${interpolate(s, [0, 1], [0.3, 1])})`}}>?</div>
	);
};

const Carimbo: React.FC<{inicio: number; texto: string; top: number}> = ({inicio, texto, top}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const s = spring({frame: frame - inicio, fps, config: {damping: 10, stiffness: 180}});
	return (
		<div style={{position: 'absolute', left: 0, right: 0, top, display: 'flex', justifyContent: 'center'}}>
			<div style={{padding: '10px 36px', border: `10px solid ${VERMELHO}`, borderRadius: 16, background: 'rgba(251,246,234,0.9)', color: VERMELHO, fontFamily: FONTES.titulo, fontSize: 76, whiteSpace: 'nowrap', transform: `rotate(-6deg) scale(${interpolate(s, [0, 1], [2.2, 1])})`, opacity: frame < inicio ? 0 : interpolate(s, [0, 0.2], [0, 1], {extrapolateRight: 'clamp'})}}>{texto}</div>
		</div>
	);
};

const Linha: React.FC<{rotulo: string; valor: number; texto: string; inicio: number}> = ({rotulo, valor, texto, inicio}) => {
	const frame = useCurrentFrame();
	const p = progresso(frame, inicio, inicio + 20);
	return (
		<div style={{marginTop: 18}}>
			<div style={{display: 'flex', justifyContent: 'space-between', fontFamily: FONTES.texto, fontWeight: 800, fontSize: 30, color: CORES.preto}}>
				<span>{rotulo}</span>
				<span style={{fontFamily: FONTES.titulo, fontSize: 40}}>{texto}</span>
			</div>
			<div style={{height: 50, border: `5px solid ${CORES.preto}`, background: CORES.papel, marginTop: 6}}>
				<div style={{height: '100%', width: `${(valor / 25) * 100 * p}%`, background: CORES.cinza}} />
			</div>
		</div>
	);
};

const CartaoPergunta: React.FC<{inicio: number; top: number; cor: string; texto: string}> = ({inicio, top, cor, texto}) => {
	const frame = useCurrentFrame();
	const e = useEntrada(inicio);
	return (
		<div style={{position: 'absolute', left: 90, right: 90, top, padding: '30px 36px', background: cor, border: `6px solid ${CORES.preto}`, boxShadow: '0 14px 22px rgba(40,30,15,0.3)', fontFamily: FONTES.titulo, fontSize: 60, color: CORES.preto, lineHeight: 1.15, textAlign: 'center', opacity: frame < inicio ? 0 : interpolate(e, [0, 0.3], [0, 1], {extrapolateRight: 'clamp'}), transform: `translateY(${(1 - e) * 30}px)`}}>{texto}</div>
	);
};
