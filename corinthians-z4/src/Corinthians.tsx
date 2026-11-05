import React, {useMemo} from 'react';
import {AbsoluteFill, Audio, interpolate, spring, staticFile, useCurrentFrame} from 'remotion';
import {noise2D} from '@remotion/noise';
import {Flash, Grao} from './Efeitos';
import {agrupar, Borrado, camera, COR, FONTE, Gancho, LegendaPop, Particulas, VazamentoLuz, type Grupo} from './serie/Vertical';
import type {Ep, Tempo} from './serie/Episodio';

// Short de dados: risco de rebaixamento do Corinthians + simulação dos 4 jogos.
// Sem escudos, camisas ou logotipos: só nomes, números e cores neutras.
type Cenario = {pts: number; falta: number; p45: number; p42: number; placar: string};
export type CorProps = {ep: Ep & {cenario: Cenario}; tempos: Tempo[]; fim: number; pasta: string};
const FPS = 30;
const cl = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const entra = (f: number, t0: number, d = 10) => interpolate(f, [t0, t0 + d], [0, 1], cl);
const BRANCO = '#F2F0EA';
const txt = (tam: number, cor = BRANCO): React.CSSProperties => ({fontFamily: FONTE.impacto, fontSize: tam, color: cor, WebkitTextStroke: `${Math.max(3, tam / 22)}px #000`, paintOrder: 'stroke fill', lineHeight: 1.05, textTransform: 'uppercase'});

const JOGOS = [
	{adv: 'BOTAFOGO', mando: 'CASA', data: '18/11'},
	{adv: 'ATLÉTICO-MG', mando: 'FORA', data: '~25/11'},
	{adv: 'GRÊMIO', mando: 'CASA', data: '~29/11'},
	{adv: 'REMO', mando: 'FORA', data: '02/12'},
];
const PROB = {CASA: [0.45, 0.28, 0.27], FORA: [0.25, 0.28, 0.47]} as const;

const Estadio: React.FC<{f: number}> = ({f}) => (
	<svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}>
		<defs>
			<radialGradient id="ref" cx="0.5" cy="0" r="1">
				<stop offset="0" stopColor="#FFFFFF" stopOpacity="0.55" />
				<stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
			</radialGradient>
		</defs>
		<rect width="1080" height="1920" fill="#06070A" />
		{[140, 940].map((x, i) => (
			<g key={x}>
				<rect x={x - 6} y="240" width="12" height="520" fill="#1A1C22" />
				<rect x={x - 80} y="190" width="160" height="70" fill="#2A2C34" />
				{Array.from({length: 8}).map((_, k) => <circle key={k} cx={x - 60 + (k % 4) * 40} cy={210 + Math.floor(k / 4) * 30} r="10" fill="#FFFDF0" opacity={0.7 + 0.3 * Math.abs(noise2D('lz', k + i * 9, f / 20))} />)}
				<path d={`M${x} 230 L${x + (i ? -900 : 900)} 1500 L${x + (i ? -400 : 400)} 1500Z`} fill="url(#ref)" opacity="0.22" />
			</g>
		))}
		<path d="M0 1150 L1080 1150 L1080 1920 L0 1920Z" fill="#0E2414" />
		{Array.from({length: 7}).map((_, i) => <rect key={i} x="0" y={1150 + i * 110} width="1080" height="55" fill="#12301A" />)}
		<path d="M0 1150 L1080 1150" stroke="#E8E8E8" strokeWidth="6" opacity="0.6" />
		<ellipse cx="540" cy="1500" rx="260" ry="90" fill="none" stroke="#E8E8E8" strokeWidth="6" opacity="0.5" />
		{Array.from({length: 120}).map((_, i) => <circle key={i} cx={(i * 97) % 1080} cy={900 + ((i * 53) % 230)} r="7" fill="#15161C" />)}
	</svg>
);

export const Corinthians: React.FC<CorProps> = ({ep, tempos, fim, pasta}) => {
	const f = useCurrentFrame();
	const c = ep.cenario;
	const total = Math.round(fim * FPS);
	const ini = ep.cenas.map((cn, i) => (i === 0 ? 0 : Math.round((tempos[cn.de].de - 0.3) * FPS)));
	const loop = f >= total - 18;
	const idx = loop ? 0 : ini.reduce((a, q, i) => (f >= q ? i : a), 0);
	const cena = ep.cenas[idx].fundo;
	const t0 = ini[idx];
	const fala = (i: number) => Math.round(tempos[i].de * FPS);
	const punchQ = ep.punch.map((i) => (i === 0 ? 2 : Math.round((tempos[i].ate - 0.35) * FPS)));
	const imp = punchQ.reduce((a, q) => (f >= q && f < q + 24 ? Math.max(a, Math.exp(-(f - q) / 7)) : a), 0);
	const grupos: Grupo[] = useMemo(() => ep.falas.flatMap((fl, i) => agrupar(fl.leg ?? fl.t, tempos[i].de, tempos[i].ate, fl.chave)), [ep, tempos]);
	const combos = useMemo(() => {
		const out: {pts: number; p: number}[] = [];
		for (let a = 0; a < 81; a++) {
			let p = 1;
			let pts = 0;
			for (let j = 0; j < 4; j++) {
				const r = Math.floor(a / 3 ** j) % 3;
				p *= PROB[JOGOS[j].mando as 'CASA' | 'FORA'][r];
				pts += [3, 1, 0][r];
			}
			out.push({pts: c.pts + pts, p});
		}
		return out.sort((x, y) => y.pts - x.pts);
	}, [c.pts]);
	const s = (q: number) => spring({frame: f - q, fps: FPS, config: {damping: 12}});

	let conteudo: React.ReactNode = null;
	if (cena === 'tabela') {
		const linhas = [
			{p: '17º', t: 'CORINTHIANS', pts: 36, d: true},
			{p: '18º', t: 'INTERNACIONAL', pts: 35},
			{p: '19º', t: 'REMO', pts: 29},
			{p: '20º', t: 'CHAPECOENSE', pts: 21},
		];
		conteudo = (
			<div style={{position: 'absolute', left: 70, right: 70, top: 330}}>
				<div style={{...txt(64, COR.sangue), textAlign: 'center', marginBottom: 30}}>ZONA DE REBAIXAMENTO</div>
				{linhas.map((l, i) => (
					<div key={l.t} style={{display: 'flex', alignItems: 'center', gap: 24, padding: '22px 30px', marginBottom: 18, background: l.d ? BRANCO : 'rgba(255,255,255,0.08)', border: `6px solid ${l.d ? '#000' : 'rgba(255,255,255,0.2)'}`, opacity: entra(f, t0 + 6 + i * 6, 8), transform: `translateX(${(1 - entra(f, t0 + 6 + i * 6, 8)) * 80}px)`}}>
						<span style={{fontFamily: FONTE.impacto, fontSize: 56, color: l.d ? '#000' : BRANCO, width: 110}}>{l.p}</span>
						<span style={{fontFamily: FONTE.impacto, fontSize: 56, color: l.d ? '#000' : BRANCO, flex: 1}}>{l.t}</span>
						<span style={{fontFamily: FONTE.impacto, fontSize: 56, color: l.d ? COR.sangue : BRANCO}}>{l.pts}</span>
					</div>
				))}
				<div style={{fontFamily: FONTE.documento, fontSize: 30, color: BRANCO, opacity: 0.7, textAlign: 'center', marginTop: 20}}>APÓS A 33ª RODADA</div>
			</div>
		);
	} else if (cena === 'risco') {
		const p = interpolate(f, [t0 + 6, t0 + 40], [0, 1], cl);
		conteudo = (
			<div style={{position: 'absolute', left: 0, right: 0, top: 360, textAlign: 'center'}}>
				<div style={txt(60)}>CHANCE DE QUEDA</div>
				<div style={{...txt(230, COR.sangue), marginTop: 20}}>{Math.round(38 * p)}–{Math.round(44 * p)}%</div>
				<div style={{margin: '30px 90px 0', height: 70, border: '6px solid #000', background: 'rgba(255,255,255,0.15)'}}>
					<div style={{height: '100%', width: `${44 * p}%`, background: COR.sangue}} />
				</div>
				<div style={{fontFamily: FONTE.documento, fontSize: 30, color: BRANCO, opacity: 0.75, marginTop: 24}}>UFMG · VALORFINAL (APÓS A 33ª)</div>
			</div>
		);
	} else if (cena === 'placar') {
		const cor = c.placar === 'VITÓRIA' ? COR.verde : c.placar === 'EMPATE' ? COR.amarelo : COR.sangue;
		conteudo = (
			<div style={{position: 'absolute', left: 0, right: 0, top: 330, textAlign: 'center'}}>
				<div style={txt(56)}>SÃO PAULO × CORINTHIANS</div>
				<div style={{display: 'inline-block', marginTop: 30, padding: '20px 60px', background: cor, border: '8px solid #000', transform: `scale(${s(t0 + 4)}) rotate(-3deg)`, ...txt(140, '#000'), WebkitTextStroke: '0px'}}>{c.placar}</div>
				<div style={{...txt(240), marginTop: 40, opacity: entra(f, t0 + 20)}}>{c.pts}</div>
				<div style={{...txt(64), opacity: entra(f, t0 + 20)}}>PONTOS</div>
			</div>
		);
	} else if (cena === 'jogos') {
		conteudo = (
			<div style={{position: 'absolute', left: 70, right: 70, top: 330}}>
				<div style={{...txt(64, COR.amarelo), textAlign: 'center', marginBottom: 30}}>FALTAM 4 JOGOS</div>
				{JOGOS.map((j, i) => (
					<div key={j.adv} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 30px', marginBottom: 18, background: 'rgba(255,255,255,0.08)', border: '5px solid rgba(255,255,255,0.3)', transform: `scale(${s(fala(4) + 8 + i * 14)})`}}>
						<span style={{fontFamily: FONTE.impacto, fontSize: 60, color: BRANCO}}>{j.adv}</span>
						<span style={{fontFamily: FONTE.impacto, fontSize: 40, color: j.mando === 'CASA' ? COR.verde : COR.sangue}}>{j.mando} · {j.data}</span>
					</div>
				))}
			</div>
		);
	} else if (cena === 'meta') {
		const p = interpolate(f, [t0 + 10, t0 + 50], [0, 1], cl);
		const base = (c.pts / 45) * 100;
		conteudo = (
			<div style={{position: 'absolute', left: 80, right: 80, top: 360, textAlign: 'center'}}>
				<div style={txt(70)}>META: 45 PONTOS</div>
				<div style={{position: 'relative', height: 120, marginTop: 50, border: '8px solid #000', background: 'rgba(255,255,255,0.15)'}}>
					<div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${base}%`, background: BRANCO}} />
					<div style={{position: 'absolute', left: `${base}%`, top: 0, bottom: 0, width: `${(100 - base) * p}%`, background: `repeating-linear-gradient(45deg, ${COR.amarelo} 0 20px, #B8961A 20px 40px)`}} />
				</div>
				<div style={{display: 'flex', justifyContent: 'space-between', marginTop: 16, ...txt(48)}}>
					<span>{c.pts}</span>
					<span>45</span>
				</div>
				<div style={{...txt(150, COR.amarelo), marginTop: 50, transform: `scale(${s(t0 + 30)})`}}>+{c.falta}</div>
				<div style={txt(54)}>PONTOS EM 4 JOGOS</div>
			</div>
		);
	} else if (cena === 'simulacao') {
		const nVis = Math.floor(interpolate(f, [fala(6) + 10, fala(6) + 70], [0, 81], cl));
		const mostra45 = f >= fala(7);
		const mostra42 = f >= fala(8);
		conteudo = (
			<div style={{position: 'absolute', left: 230, right: 230, top: 250}}>
				<div style={{...txt(58), textAlign: 'center', marginBottom: 20}}>81 COMBINAÇÕES</div>
				<div style={{display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: 7}}>
					{combos.map((cb, i) => {
						const ok45 = cb.pts >= 45;
						const ok42 = cb.pts >= 42;
						const cor = mostra45 && ok45 ? COR.verde : mostra42 && ok42 ? COR.amarelo : 'rgba(255,255,255,0.18)';
						return <div key={i} style={{aspectRatio: '1', background: cor, border: '3px solid #000', opacity: i < nVis ? 1 : 0, transform: `scale(${i < nVis ? 1 : 0.4})`}} />;
					})}
				</div>
				<div style={{display: 'flex', justifyContent: 'space-around', marginTop: 24, marginLeft: -110, marginRight: -110}}>
					<div style={{textAlign: 'center', opacity: mostra45 ? 1 : 0, transform: `scale(${mostra45 ? s(fala(7)) : 0})`}}>
						<div style={txt(100, COR.verde)}>{c.p45}%</div>
						<div style={txt(40)}>CHEGA A 45</div>
					</div>
					<div style={{textAlign: 'center', opacity: mostra42 ? 1 : 0, transform: `scale(${mostra42 ? s(fala(8)) : 0})`}}>
						<div style={txt(100, COR.amarelo)}>{c.p42}%</div>
						<div style={txt(40)}>CHEGA A 42</div>
					</div>
				</div>
				<div style={{fontFamily: FONTE.documento, fontSize: 24, color: BRANCO, opacity: 0.7, textAlign: 'center', marginTop: 10, marginLeft: -110, marginRight: -110}}>SIMULAÇÃO SIMPLES: MÉDIAS DE MANDANTE E VISITANTE</div>
			</div>
		);
	} else if (cena === 'serieb') {
		const itens = [
			{a: '2007', t: 'CORINTHIANS CAI', cor: COR.sangue},
			{a: '2008', t: 'CAMPEÃO DA SÉRIE B', cor: COR.verde},
		];
		const outros = ['PALMEIRAS 2013', 'VASCO 2009', 'BOTAFOGO 2015 · 2021', 'CRUZEIRO 2022'];
		conteudo = (
			<div style={{position: 'absolute', left: 80, right: 80, top: 320}}>
				{itens.map((it, i) => (
					<div key={it.a} style={{display: 'flex', alignItems: 'center', gap: 30, marginBottom: 26, opacity: entra(f, t0 + 6 + i * 20)}}>
						<span style={txt(110, it.cor)}>{it.a}</span>
						<span style={txt(54)}>{it.t}</span>
					</div>
				))}
				<div style={{marginTop: 40, opacity: entra(f, fala(10))}}>
					<div style={{...txt(44, COR.amarelo), marginBottom: 16}}>CAÍRAM E VOLTARAM CAMPEÕES:</div>
					{outros.map((o, i) => <div key={o} style={{...txt(52), marginBottom: 10, opacity: entra(f, fala(10) + 8 + i * 8)}}>{o}</div>)}
				</div>
			</div>
		);
	}
	const interrogacao = idx === ep.cenas.length - 1 && !loop;

	return (
		<AbsoluteFill style={{background: '#06070A', overflow: 'hidden'}}>
			<Borrado ativo={punchQ.some((q) => f >= q && f < q + 7)}>
				<AbsoluteFill style={{transform: `${camera(f, imp)} scale(${1.02 + 0.12 * imp})`}}>
					<Estadio f={f} />
					<AbsoluteFill style={{background: cena === 'estadio' ? 'transparent' : 'rgba(4,5,8,0.78)'}} />
					{conteudo}
					{interrogacao ? <div style={{position: 'absolute', left: 0, right: 0, top: 380, textAlign: 'center', ...txt(380, COR.sangue), transform: `scale(${s(total - 70)})`, opacity: f >= total - 70 ? 1 : 0}}>?</div> : null}
					<Particulas frame={f} n={30} />
				</AbsoluteFill>
			</Borrado>
			{punchQ.map((q) => <VazamentoLuz key={q} de={q} dur={24} hue={200} seed={q % 7} />)}
			<Flash frame={f} tempos={punchQ.slice(1).map((q) => q / FPS)} fps={FPS} cor="#FFFFFF" />
			{ini.slice(1).some((q) => Math.abs(f - q) < 2) ? <AbsoluteFill style={{background: '#000'}} /> : null}
			<Gancho frame={f} linhas={ep.gancho} destaque={ep.destaque} ate={Math.round(Math.max(1.6, tempos[0].ate) * FPS)} />
			{loop ? <Gancho frame={0} linhas={ep.gancho} destaque={ep.destaque} ate={10} /> : null}
			{!loop ? <LegendaPop frame={f} fps={FPS} grupos={grupos} y={1330} /> : null}
			<div style={{position: 'absolute', top: 110, left: 60, fontFamily: FONTE.documento, fontSize: 28, color: BRANCO, opacity: 0.75, letterSpacing: 2}}>BRASILEIRÃO 2026 · SITUAÇÃO EM 05/11</div>
			<div style={{position: 'absolute', left: 60, right: 200, bottom: 330, fontFamily: FONTE.apoio, fontSize: 22, color: BRANCO, opacity: 0.45}}>FONTES: {ep.fontes}</div>
			<Grao frame={f} forca={0.18} />
			<Audio src={staticFile(`${pasta}/sons.mp3`)} volume={0.5} />
			<Audio src={staticFile(`${pasta}/narracao.mp3`)} />
		</AbsoluteFill>
	);
};
