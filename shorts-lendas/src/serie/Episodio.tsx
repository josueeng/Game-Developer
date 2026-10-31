import React, {useMemo} from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Flash, Grao} from '../Efeitos';
import {fundos} from './Fundos';
import {elementos} from './Elementos';
import {agrupar, Borrado, camera, COR, FONTE, Gancho, LegendaPop, Neblina, Particulas, SeloSerie, VazamentoLuz, type Grupo} from './Vertical';

export type FalaEp = {t: string; leg?: string; chave?: string; pausa: number; tipo: string};
export type CenaEp = {de: number; fundo: string; zoom?: number[]; elementos: Record<string, any>[]; [k: string]: unknown};
export type Ep = {numero: number; titulo: string; gancho: string[]; destaque: number; falas: FalaEp[]; cenas: CenaEp[]; punch: number[]; fontes: string; ficcao?: boolean};
export type Tempo = {de: number; ate: number; tipo: string};
export type EpProps = {ep: Ep; tempos: Tempo[]; fim: number; pasta: string};

const FPS = 30;
const NOTURNOS = ['floresta', 'estrada', 'casaNoite', 'cemiterio', 'terreno', 'carro', 'paris', 'escola', 'quarto'];

export const Episodio: React.FC<EpProps> = ({ep, tempos, fim, pasta}) => {
	const f = useCurrentFrame();
	const t = f / FPS;
	const total = Math.round(fim * FPS);
	const inicioCena = (c: CenaEp, i: number) => (i === 0 ? 0 : Math.round((tempos[c.de].de - 0.3) * FPS));
	const ini = ep.cenas.map(inicioCena);
	// loop: últimos 18 quadros voltam ao cenário da 1ª cena
	const loop = f >= total - 18;
	const idx = loop ? 0 : ini.reduce((a, q, i) => (f >= q ? i : a), 0);
	const cena = ep.cenas[idx];
	const fimCena = idx === ep.cenas.length - 1 || loop ? total : ini[idx + 1];
	const prog = interpolate(f, [ini[idx], fimCena], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const z = cena.zoom ? cena.zoom[0] + (cena.zoom[1] - cena.zoom[0]) * prog : 1;

	// punch: zoom rápido + tremor + borrão, no fim da fala marcada
	const punchQ = ep.punch.map((i) => (i === 0 ? 2 : Math.round((tempos[i].ate - 0.35) * FPS)));
	const imp = punchQ.reduce((a, q) => (f >= q && f < q + 24 ? Math.max(a, Math.exp(-(f - q) / 7)) : a), 0);
	const borrado = punchQ.some((q) => f >= q && f < q + 7);

	const grupos: Grupo[] = useMemo(() => ep.falas.flatMap((fl, i) => agrupar(fl.leg ?? fl.t, tempos[i].de, tempos[i].ate, fl.chave)), [ep, tempos]);
	const Fundo = fundos[cena.fundo] ?? fundos.preto;
	const extra: Record<string, unknown> = {...cena};
	if (cena.fundo === 'banheiro') {
		const tb = tempos.filter((x) => x.tipo === 'S').map((x) => x.ate);
		extra.nevoa = interpolate(t, [0, tb[2] ?? 6], [0.2, 1], {extrapolateRight: 'clamp'});
		extra.fantasma = tb.length && t > (tb[2] ?? 99) - 0.2 && t < (tb[2] ?? 99) + 0.9 ? 1 : idx > 0 && !loop ? 0.6 : 0;
		extra.treme = tb.reduce((a, x) => (t > x && t < x + 0.4 ? a + 14 * Math.sin((t - x) * 70) : a), 0);
	}
	const corte = ini.slice(1).some((q) => Math.abs(f - q) < 2);

	return (
		<AbsoluteFill style={{background: COR.noite, overflow: 'hidden'}}>
			<Borrado ativo={borrado}>
				<AbsoluteFill style={{transform: `${camera(f, imp)} scale(${z * (1 + 0.12 * imp)})`, transformOrigin: '50% 45%'}}>
					<Fundo frame={f} t={t} extra={extra} />
					{cena.elementos.map((e, k) => {
						const El = elementos[e.tipo];
						if (!El || loop) return null;
						const t0 = e.em !== undefined ? Math.round(tempos[e.em].de * FPS) : ini[idx];
						return <El key={k} frame={f} fps={FPS} t0={t0} e={e} fimCena={fimCena} />;
					})}
					{NOTURNOS.includes(cena.fundo) ? <Neblina frame={f} forca={0.16} /> : null}
					<Particulas frame={f} n={cena.fundo === 'preto' ? 25 : 40} />
				</AbsoluteFill>
			</Borrado>
			{punchQ.map((q) => <VazamentoLuz key={q} de={q} dur={26} hue={ep.ficcao ? 200 : 10} seed={q % 7} />)}
			<Flash frame={f} tempos={punchQ.map((q) => q / FPS)} fps={FPS} cor={COR.sangue} />
			{corte ? <AbsoluteFill style={{background: '#000'}} /> : null}
			<Gancho frame={f} linhas={ep.gancho} destaque={ep.destaque} ate={Math.round(Math.max(1.6, tempos[0].ate) * FPS)} />
			{loop ? <Gancho frame={0} linhas={ep.gancho} destaque={ep.destaque} ate={10} /> : null}
			{!loop ? <LegendaPop frame={f} fps={FPS} grupos={grupos} /> : null}
			<SeloSerie numero={ep.numero} />
			{ep.ficcao ? <div style={{position: 'absolute', top: 150, left: 60, fontFamily: FONTE.documento, fontSize: 26, color: COR.osso, opacity: 0.6}}>HISTÓRIA DE FICÇÃO</div> : null}
			<div style={{position: 'absolute', left: 60, right: 200, bottom: 330, fontFamily: FONTE.apoio, fontSize: 22, color: COR.osso, opacity: 0.45, letterSpacing: 1}}>{ep.ficcao ? '' : `FONTES: ${ep.fontes}`}</div>
			<Grao frame={f} forca={0.2} />
			<Audio src={staticFile(`${pasta}/sons.mp3`)} volume={0.6} />
			<Audio src={staticFile(`${pasta}/narracao.mp3`)} />
			<Audio src={staticFile(`${pasta}/sussurro.mp3`)} />
		</AbsoluteFill>
	);
};
