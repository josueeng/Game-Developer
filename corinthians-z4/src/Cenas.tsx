import React from 'react';
import {AbsoluteFill, Easing, interpolate, random} from 'remotion';
import {FONTES} from './config';
import {AMARELO, Carimbo, Datilografado, Glitch, OSSO, VERMELHO} from './Efeitos';
import {Alianca, Banheiro, Casarao, Fantasma, Joia, Navio, PortaBanheiro, Torre, Trem, Urna} from './Desenhos';
import {MapaBrasil, projecaoBrasil} from './components/MapaBrasil';

export type Fala = {de: number; ate: number; tipo: string};
export type Eventos = {
	cenas: number[];
	titulo: number;
	drops: number[];
	risers: number[];
	punch: number[];
	batidas: number[];
	digita: {de: number; texto: string}[];
	coracao: number[];
	caixinha: number[][];
	apagao: number;
	fim: number;
};
export type Ctx = {f: number; falas: Fala[]; ev: Eventos};

export const FPS = 30;
const cl = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const q = (t: number) => Math.round(t * FPS);
const de = (c: Ctx, i: number, aj = 0) => q(c.falas[i].de + aj);
const ate = (c: Ctx, i: number, aj = 0) => q(c.falas[i].ate + aj);
const entra = (f: number, ini: number, dur = 10) => interpolate(f, [ini, ini + dur], [0, 1], {...cl, easing: Easing.out(Easing.cubic)});
const janela = (f: number, a: number, b: number, fade = 8) => interpolate(f, [a, a + fade, b - fade, b], [0, 1, 1, 0], cl);

const Titulo: React.FC<{children: React.ReactNode; tam?: number; cor?: string; style?: React.CSSProperties}> = ({children, tam = 110, cor = OSSO, style}) => (
	<div style={{fontFamily: FONTES.titulo, fontSize: tam, color: cor, lineHeight: 1.02, textAlign: 'center', textShadow: '0 6px 0 #000, 0 0 30px rgba(0,0,0,0.8)', ...style}}>{children}</div>
);

// 1 · Cold open no banheiro + título com glitch.
export const Cena1: React.FC<{c: Ctx}> = ({c}) => {
	const {f, ev} = c;
	const nevoa = interpolate(f, [0, q(ev.batidas[2])], [0.1, 1], cl);
	const treme = ev.batidas.reduce((a, t) => {
		const d = f - q(t);
		return d >= 0 && d < 12 ? a + Math.sin(d * 2.4) * 14 * (1 - d / 12) : a;
	}, 0);
	const fantasma = Math.max(...ev.batidas.map((t, i) => (i === 2 ? janela(f, q(t), q(t) + 14, 3) : 0)), interpolate(f, [de(c, 4, 2.4), ate(c, 4)], [0, 0.5], cl));
	const pisca = random(`l${Math.floor(f / 3)}`) > (f < q(ev.batidas[2]) ? 0.93 : 0.8) ? 0.25 : 1;
	if (f >= q(ev.titulo)) {
		return (
			<AbsoluteFill style={{background: '#000'}}>
				<Glitch frame={f} inicio={q(ev.titulo)} style={{fontFamily: FONTES.titulo, textAlign: 'center'}}>
					<div style={{fontSize: 70, letterSpacing: 8}}>A HISTÓRIA REAL DA</div>
					<div style={{fontSize: 170, lineHeight: 1}}>LOIRA DO</div>
					<div style={{fontSize: 170, lineHeight: 1}}>BANHEIRO</div>
				</Glitch>
			</AbsoluteFill>
		);
	}
	return (
		<AbsoluteFill style={{transform: `scale(${1 + 0.08 * (f / q(ev.titulo))})`, transformOrigin: '42% 40%'}}>
			<Banheiro nevoa={nevoa} tremePorta={treme} fantasma={fantasma} luz={pisca} />
		</AbsoluteFill>
	);
};

// 2 · A lenda: versões, aparência e o mapa.
export const Cena2: React.FC<{c: Ctx}> = ({c}) => {
	const {f} = c;
	const mapa = f >= de(c, 10, -0.2);
	const aparencia = f >= de(c, 8, -0.2) && !mapa;
	const W = 2600;
	const proj = projecaoBrasil(W, W);
	const [gx, gy] = proj([-45.19, -22.82]) as [number, number];
	const zoomMapa = interpolate(f, [de(c, 10), ate(c, 10)], [1, 1.5], cl);
	const cartas = [
		{t: '3× NO ESPELHO', i: de(c, 6, 0.8)},
		{t: 'DAR DESCARGA', i: de(c, 7, 0.6)},
		{t: 'CHUTAR A PORTA', i: de(c, 7, 1.6)},
		{t: 'PALAVRÃO', i: de(c, 7, 2.6)},
	];
	return (
		<AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, #1C2228 0%, #07080B 80%)'}}>
			{!aparencia && !mapa ? (
				<>
					<div style={{position: 'absolute', top: 110, left: 0, right: 0, opacity: entra(f, de(c, 5))}}>
						<Titulo tam={84}>
							A LENDA <span style={{color: AMARELO}}>MUDA</span>
						</Titulo>
					</div>
					<div style={{position: 'absolute', top: 330, left: 160, right: 160, display: 'flex', justifyContent: 'center', gap: 40}}>
						{cartas.map((k, i) => {
							const p = entra(f, k.i, 12);
							return (
								<div key={k.t} style={{width: 340, height: 400, background: '#EDE6D6', border: '8px solid #000', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 20, boxSizing: 'border-box', fontFamily: FONTES.titulo, fontSize: 46, color: '#111', transform: `rotateY(${(1 - p) * 90}deg) rotate(${(i - 1.5) * 3}deg)`, opacity: p > 0 ? 1 : 0, boxShadow: '0 20px 40px rgba(0,0,0,0.6)'}}>
									{k.t}
								</div>
							);
						})}
					</div>
				</>
			) : null}
			{aparencia ? (
				<AbsoluteFill>
					<div style={{position: 'absolute', left: 770, top: 40, opacity: entra(f, de(c, 8, -0.2), 16), transform: `scale(${0.95 + 0.05 * entra(f, de(c, 8), 60)})`}}>
						<Fantasma escala={1.0} />
					</div>
					{[
						{t: 'vestido branco', x: 1280, y: 760, i: de(c, 8, 0.6)},
						{t: 'cabelo loiro', x: 380, y: 300, i: de(c, 8, 1.6)},
						{t: 'algodão no nariz', x: 1280, y: 330, i: de(c, 8, 2.6)},
					].map((k) => (
						<div key={k.t} style={{position: 'absolute', left: k.x, top: k.y, padding: '10px 26px', background: AMARELO, color: '#111', fontFamily: FONTES.titulo, fontSize: 44, transform: `scale(${entra(f, k.i, 8)}) rotate(-3deg)`, border: '6px solid #000'}}>{k.t}</div>
					))}
					{f >= de(c, 9) ? (
						<div style={{position: 'absolute', left: 120, top: 760, fontFamily: '"Caveat", cursive', fontSize: 90, color: OSSO, opacity: entra(f, de(c, 9), 8), transform: 'rotate(-4deg)'}}>invenção de criança?</div>
					) : null}
				</AbsoluteFill>
			) : null}
			{mapa ? (
				<AbsoluteFill style={{background: '#0B0E14'}}>
					<div style={{position: 'absolute', left: 960 - gx, top: 540 - gy, transform: `scale(${zoomMapa})`, transformOrigin: `${gx}px ${gy}px`}}>
						<MapaBrasil largura={W} altura={W} inicio={-100} destaques={[{uf: 'SP', cor: '#3A4A66', inicio: -100}]} corBase="#1A1F2A" />
						<div style={{position: 'absolute', left: gx - 22, top: gy - 22, width: 44, height: 44, borderRadius: 22, background: VERMELHO, border: '6px solid #fff', transform: `scale(${entra(f, de(c, 10, 2.5), 8)})`}} />
					</div>
					<div style={{position: 'absolute', left: 1080, top: 380, fontFamily: FONTES.titulo, fontSize: 64, color: OSSO, opacity: entra(f, de(c, 10, 2.8), 8), textShadow: '0 4px 0 #000'}}>GUARATINGUETÁ (SP)</div>
				</AbsoluteFill>
			) : null}
		</AbsoluteFill>
	);
};

// 3 · Guaratinguetá, 1864.
export const Cena3: React.FC<{c: Ctx}> = ({c}) => {
	const {f, ev} = c;
	const casa = f >= de(c, 14, -0.2);
	return (
		<AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #3B2E20 0%, #120D08 85%)', filter: 'sepia(0.5)'}}>
			{!casa ? (
				<>
					<div style={{position: 'absolute', top: 200, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
						<Datilografado frame={f} inicio={q(ev.digita[0].de)} texto={ev.digita[0].texto} style={{fontSize: 92}} />
					</div>
					<div style={{position: 'absolute', top: 420, left: 0, right: 0, textAlign: 'center', fontFamily: FONTES.jornal, fontStyle: 'italic', fontSize: 104, color: OSSO, opacity: entra(f, de(c, 12), 14), textShadow: '0 4px 0 #000'}}>
						Maria Augusta de Oliveira Borges
					</div>
					<div style={{position: 'absolute', top: 600, left: 0, right: 0, textAlign: 'center', fontFamily: FONTES.texto, fontWeight: 800, fontSize: 52, color: AMARELO, opacity: entra(f, de(c, 13), 12)}}>filha do Visconde de Guaratinguetá</div>
				</>
			) : (
				<div style={{position: 'absolute', left: 460, top: 130, opacity: entra(f, de(c, 14, -0.2), 14), transform: `scale(${1 + 0.06 * interpolate(f, [de(c, 14), ate(c, 14, 1.4)], [0, 1], cl)})`}}>
					<Casarao largura={1000} />
					<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 30, color: '#BFAF90', textAlign: 'center', marginTop: 10}}>representação artística</div>
				</div>
			)}
		</AbsoluteFill>
	);
};

// 4 · O casamento.
export const Cena4: React.FC<{c: Ctx}> = ({c}) => {
	const {f} = c;
	const tremor = (random(`t4${f}`) - 0.5) * 12 * (f < de(c, 16) ? 1 : 0);
	return (
		<AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #2A1416 0%, #070405 85%)'}}>
			{f < de(c, 16, -0.2) ? (
				<div style={{position: 'absolute', top: 330, left: 120, right: 120, transform: `translate(${tremor}px, ${tremor / 2}px)`, opacity: entra(f, de(c, 15, -0.1), 6)}}>
					<Titulo tam={120}>
						E É AQUI QUE A HISTÓRIA FICA <span style={{color: VERMELHO}}>ESTRANHA</span>
					</Titulo>
				</div>
			) : (
				<>
					<div style={{position: 'absolute', left: 260, top: 200, textAlign: 'center', opacity: entra(f, de(c, 16, 1.6), 10)}}>
						<div style={{fontFamily: FONTES.titulo, fontSize: 230, color: OSSO, lineHeight: 1}}>14</div>
						<div style={{fontFamily: FONTES.titulo, fontSize: 52, color: AMARELO}}>ANOS · ELA</div>
					</div>
					<div style={{position: 'absolute', left: 810, top: 270, opacity: entra(f, de(c, 16, 2.6), 10)}}>
						<Alianca racha={interpolate(f, [de(c, 18), de(c, 18, 0.6)], [0, 1], cl)} />
					</div>
					<div style={{position: 'absolute', right: 260, top: 200, textAlign: 'center', opacity: entra(f, de(c, 17), 10)}}>
						<div style={{fontFamily: FONTES.titulo, fontSize: 230, color: OSSO, lineHeight: 1}}>35</div>
						<div style={{fontFamily: FONTES.titulo, fontSize: 52, color: AMARELO}}>ANOS · ELE</div>
					</div>
					<div style={{position: 'absolute', left: 0, right: 0, top: 120, textAlign: 'center', fontFamily: FONTES.texto, fontWeight: 800, fontSize: 40, color: '#C9B9A9', opacity: entra(f, de(c, 16), 10)}}>SEGUNDO OS RELATOS DA CIDADE</div>
					<Carimbo frame={f} inicio={de(c, 18, 0.7)} texto="ARRANJADO" style={{left: 700, top: 690}} />
				</>
			)}
		</AbsoluteFill>
	);
};

// 5 · Paris.
export const Cena5: React.FC<{c: Ctx}> = ({c}) => {
	const {f, ev} = c;
	const paris = f >= de(c, 21, -0.2);
	const viagem = interpolate(f, [de(c, 19), ate(c, 19, 0.3)], [0, 1], {...cl, easing: Easing.inOut(Easing.quad)});
	const some = interpolate(f, [ate(c, 23, -1.2), ate(c, 23, 0.1)], [0, 1], cl);
	return (
		<AbsoluteFill style={{background: paris ? 'linear-gradient(#0A0F22, #1A1F38)' : 'radial-gradient(circle at 50% 45%, #10202C 0%, #05090D 85%)'}}>
			{!paris ? (
				<>
					<svg width="1920" height="1080" style={{position: 'absolute', inset: 0}}>
						<path d="M260 760 Q960 200 1660 520" fill="none" stroke="#3A5266" strokeWidth="8" strokeDasharray="24 18" />
					</svg>
					<div style={{position: 'absolute', left: 160, top: 800, fontFamily: FONTES.titulo, fontSize: 56, color: OSSO}}>BRASIL</div>
					<div style={{position: 'absolute', left: 1560, top: 560, fontFamily: FONTES.titulo, fontSize: 56, color: OSSO}}>FRANÇA</div>
					<div style={{position: 'absolute', left: 260 + 1400 * viagem - 110, top: 760 - 560 * Math.sin(Math.PI * viagem * 0.8) + 240 * viagem - 120}}>
						<Navio />
					</div>
					{f >= de(c, 20) ? (
						<div style={{position: 'absolute', left: 560, top: 180, display: 'flex', gap: 30}}>
							{['#4FC3F7', '#E53935', '#43A047', '#FDD835', '#AB47BC'].map((cor, i) => {
								const p = interpolate(f, [de(c, 20, 0.3 + i * 0.25), de(c, 20, 1.8 + i * 0.25)], [0, 1], cl);
								return (
									<div key={cor} style={{transform: `translateY(${p * 300}px) scale(${1 - 0.6 * p})`, opacity: 1 - p}}>
										<Joia cor={cor} />
									</div>
								);
							})}
						</div>
					) : null}
				</>
			) : (
				<>
					<div style={{position: 'absolute', right: 180, bottom: 0}}>
						<Torre altura={760} />
					</div>
					<div style={{position: 'absolute', left: 160, top: 170}}>
						<Datilografado frame={f} inicio={q(ev.digita[1].de)} texto={ev.digita[1].texto} style={{fontSize: 84}} />
					</div>
					<div style={{position: 'absolute', left: 160, top: 320, fontFamily: FONTES.titulo, fontSize: 130, color: AMARELO, opacity: entra(f, de(c, 21, 4.6), 8)}}>26 ANOS</div>
					<div style={{position: 'absolute', left: 160, top: 500, fontFamily: FONTES.titulo, fontSize: 80, color: OSSO, opacity: entra(f, de(c, 22), 8)}}>
						CAUSA: <span style={{color: VERMELHO}}>?</span>
					</div>
					{f >= de(c, 23, -0.2) ? (
						<div style={{position: 'absolute', left: 1080, top: 260, width: 400, height: 500, background: '#EDE6D6', border: '4px solid #000', padding: 34, boxSizing: 'border-box', transform: `rotate(-4deg) translateY(${-60 * some}px)`, opacity: 1 - some, filter: `blur(${12 * some}px)`}}>
							<div style={{fontFamily: FONTES.jornal, fontWeight: 900, fontSize: 40, color: '#222', textAlign: 'center'}}>ATESTADO DE ÓBITO</div>
							{Array.from({length: 9}).map((_, i) => (
								<div key={i} style={{height: 10, background: '#9A9488', marginTop: 32, width: `${70 + random(`a${i}`) * 30}%`}} />
							))}
						</div>
					) : null}
				</>
			)}
		</AbsoluteFill>
	);
};

// 6 · O corpo.
export const Cena6: React.FC<{c: Ctx}> = ({c}) => {
	const {f} = c;
	const parte = f < de(c, 25, -0.2) ? 0 : f < de(c, 26, -0.2) ? 1 : f < de(c, 27, -0.2) ? 2 : f < de(c, 28, -0.2) ? 3 : 4;
	const tremor = parte === 0 ? (random(`t6${f}`) - 0.5) * 12 : 0;
	const chama = 0.5 + 0.5 * Math.sin(f / 3) * random(`ch${Math.floor(f / 4)}`);
	return (
		<AbsoluteFill style={{background: 'linear-gradient(#05060A, #10131C)'}}>
			{parte === 0 ? (
				<div style={{position: 'absolute', top: 360, left: 120, right: 120, transform: `translate(${tremor}px, 0)`}}>
					<Titulo tam={130}>
						MAS O MAIS <span style={{color: VERMELHO}}>ASSUSTADOR</span> AINDA VEM
					</Titulo>
				</div>
			) : null}
			{parte === 1 ? (
				<AbsoluteFill>
					<div style={{position: 'absolute', left: 1500, top: 120, width: 140, height: 140, borderRadius: 70, background: '#E6ECFF', boxShadow: '0 0 80px #9FB2FF'}} />
					<div style={{position: 'absolute', left: interpolate(f, [de(c, 25, -0.2), ate(c, 25, 0.4)], [1920, -1500], cl), top: 640}}>
						<Trem />
					</div>
					<div style={{position: 'absolute', left: 0, right: 0, top: 260, opacity: entra(f, de(c, 25, 0.4), 10)}}>
						<Titulo tam={90}>
							<span style={{color: AMARELO}}>EMBALSAMADO</span>
						</Titulo>
					</div>
				</AbsoluteFill>
			) : null}
			{parte === 2 ? (
				<div style={{position: 'absolute', left: 460, top: 160, transform: `scale(${1 + 0.05 * interpolate(f, [de(c, 26), ate(c, 26)], [0, 1], cl)})`}}>
					<Casarao largura={1000} noite />
				</div>
			) : null}
			{parte === 3 ? (
				<AbsoluteFill>
					<div style={{position: 'absolute', left: 460, top: 330, transform: `scale(${1 + 0.08 * interpolate(f, [de(c, 27), ate(c, 27, 1)], [0, 1], cl)})`}}>
						<Urna chama={chama} />
					</div>
					<Carimbo frame={f} inicio={ate(c, 27, 0.2)} texto="SEGUNDO RELATOS" cor={AMARELO} tam={60} style={{left: 640, top: 120}} />
				</AbsoluteFill>
			) : null}
			{parte === 4 ? (
				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
					{Array.from({length: 6}).map((_, i) => {
						const p = interpolate(f, [de(c, 28, i * 0.35), de(c, 28, i * 0.35 + 0.3)], [0, 1], cl);
						return (
							<div key={i} style={{position: 'absolute', width: 420, height: 480, background: '#EDE6D6', border: '6px solid #000', display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `rotateX(${-80 * p}deg) translateY(${-200 * p}px)`, opacity: p >= 1 || (p === 0 && i > 0 && f < de(c, 28, i * 0.35 - 0.05)) ? (p >= 1 ? 0 : 1) : 1 - p, zIndex: 10 - i, top: 140}}>
								<div style={{width: '100%', height: 110, background: VERMELHO, color: '#fff', fontFamily: FONTES.titulo, fontSize: 56, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{['ABRIL', 'MAIO', 'JUNHO', 'JULHO', 'AGOSTO', 'SETEMBRO'][i]}</div>
								<div style={{fontFamily: FONTES.titulo, fontSize: 220, color: '#111'}}>?</div>
							</div>
						);
					})}
					<div style={{position: 'absolute', top: 820, fontFamily: FONTES.titulo, fontSize: 90, color: AMARELO, opacity: entra(f, de(c, 28, 1.2), 8)}}>MESES?</div>
				</AbsoluteFill>
			) : null}
		</AbsoluteFill>
	);
};

// 7 · A escola.
export const Cena7: React.FC<{c: Ctx}> = ({c}) => {
	const {f} = c;
	const porta = f >= de(c, 31, -0.2);
	const abre = interpolate(f, [de(c, 32), ate(c, 32, 0.8)], [0, 1], {...cl, easing: Easing.in(Easing.quad)});
	return (
		<AbsoluteFill style={{background: porta ? '#06070A' : 'linear-gradient(#7FA6C9, #C9DCEB)'}}>
			{!porta ? (
				<>
					<div style={{position: 'absolute', left: 460, top: 250}}>
						<Casarao largura={1000} placa={f >= de(c, 30) ? 'E.E. CONSELHEIRO RODRIGUES ALVES' : undefined} />
					</div>
					<div style={{position: 'absolute', left: 0, right: 0, top: 110, opacity: entra(f, de(c, 29, 1.6), 10)}}>
						<Titulo tam={90}>
							O CASARÃO VIROU <span style={{color: AMARELO}}>ESCOLA</span>
						</Titulo>
					</div>
					<div style={{position: 'absolute', right: 160, top: 260, padding: '10px 26px', background: '#1E5A36', color: '#fff', fontFamily: FONTES.titulo, fontSize: 44, border: '6px solid #000', transform: `scale(${entra(f, de(c, 30, 2.6), 8)}) rotate(4deg)`}}>EXISTE ATÉ HOJE</div>
				</>
			) : (
				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
					<div style={{transform: `translateY(-90px) scale(${0.8 + 0.12 * abre})`}}>
						<PortaBanheiro abre={abre} />
					</div>
					<div style={{position: 'absolute', left: 860, top: 300, opacity: 0.25 * abre}}>
						<Fantasma escala={0.5} />
					</div>
				</AbsoluteFill>
			)}
		</AbsoluteFill>
	);
};

// 8 · Lenda ou fato?
const Check: React.FC<{ok: boolean}> = ({ok}) => (
	<svg width="56" height="56" viewBox="0 0 56 56">
		{ok ? <path d="M8 30 L22 44 L48 12" fill="none" stroke="#3DDC84" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" /> : <path d="M12 12 L44 44 M44 12 L12 44" stroke={VERMELHO} strokeWidth="9" strokeLinecap="round" />}
	</svg>
);
export const Cena8: React.FC<{c: Ctx}> = ({c}) => {
	const {f} = c;
	const itens = [
		{t: 'Maria Augusta existiu', ok: true, i: de(c, 34, 1.0), col: 0},
		{t: 'morreu em Paris, 1891', ok: true, i: de(c, 34, 3.2), col: 0},
		{t: 'a casa virou escola', ok: true, i: de(c, 35, 0.6), col: 0},
		{t: 'ligação com o banheiro', ok: false, i: de(c, 36, 1.2), col: 1},
		{t: 'parecida com a Bloody Mary (EUA)', ok: false, i: de(c, 37, 2.6), col: 1},
	];
	return (
		<AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, #1A1D24 0%, #060709 85%)'}}>
			<div style={{position: 'absolute', top: 90, left: 0, right: 0, opacity: entra(f, de(c, 33), 8)}}>
				<Titulo tam={96}>
					O QUE É <span style={{color: AMARELO}}>VERDADE?</span>
				</Titulo>
			</div>
			{[
				{t: 'FATO', cor: '#3DDC84', x: 160},
				{t: 'LENDA', cor: VERMELHO, x: 1000},
			].map((col, k) => (
				<div key={col.t} style={{position: 'absolute', left: col.x, top: 260, width: 760, opacity: entra(f, de(c, 33, 1), 8)}}>
					<div style={{fontFamily: FONTES.titulo, fontSize: 72, color: col.cor, borderBottom: `8px solid ${col.cor}`, paddingBottom: 8}}>{col.t}</div>
					{itens
						.filter((it) => it.col === k)
						.map((it) => (
							<div key={it.t} style={{display: 'flex', alignItems: 'center', gap: 20, marginTop: 30, opacity: entra(f, it.i, 8), transform: `translateX(${(1 - entra(f, it.i, 8)) * 40}px)`}}>
								<Check ok={it.ok} />
								<span style={{fontFamily: FONTES.titulo, fontSize: 46, color: OSSO}}>{it.t}</span>
							</div>
						))}
				</div>
			))}
		</AbsoluteFill>
	);
};

// 9 · Final: comentários, próxima lenda e volta ao espelho.
export const Cena9: React.FC<{c: Ctx}> = ({c}) => {
	const {f, ev} = c;
	if (f >= de(c, 41, -0.3)) {
		const pisca = random(`l9${Math.floor(f / 3)}`) > 0.75 ? 0.25 : 1;
		return f >= q(ev.apagao) ? (
			<AbsoluteFill style={{background: '#000', alignItems: 'center', justifyContent: 'center'}}>
				<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 40, letterSpacing: 8, color: '#77706A', opacity: entra(f, q(ev.apagao) + 15, 15)}}>VIRALMENTE VIRAL</div>
			</AbsoluteFill>
		) : (
			<AbsoluteFill style={{transform: `scale(${1 + 0.1 * interpolate(f, [de(c, 41, -0.3), q(ev.apagao)], [0, 1], cl)})`, transformOrigin: '42% 40%'}}>
				<Banheiro nevoa={1} tremePorta={0} fantasma={0.9} luz={pisca} />
			</AbsoluteFill>
		);
	}
	const lendas = ['CORPO SECO', 'MULHER DE BRANCO', 'HOMEM DO SACO'];
	return (
		<AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, #241A12 0%, #070504 85%)'}}>
			{f < de(c, 40, -0.2) ? (
				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 40}}>
					<Titulo tam={110}>
						VOCÊ JÁ <span style={{color: AMARELO}}>CHAMOU?</span>
					</Titulo>
					<div style={{padding: '18px 44px', background: VERMELHO, color: '#fff', fontFamily: FONTES.titulo, fontSize: 70, border: '8px solid #000', transform: `scale(${entra(f, de(c, 39, 2.6), 8)}) rotate(-2deg)`}}>COMENTA 👇</div>
				</AbsoluteFill>
			) : (
				<>
					<div style={{position: 'absolute', top: 110, left: 0, right: 0}}>
						<Titulo tam={84}>
							QUAL É A <span style={{color: AMARELO}}>PRÓXIMA?</span>
						</Titulo>
					</div>
					<div style={{position: 'absolute', top: 320, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 50}}>
						{lendas.map((l, i) => {
							const p = entra(f, de(c, 40, 1.6 + i * 0.9), 10);
							return (
								<div key={l} style={{width: 460, height: 520, background: '#0E0F14', border: `8px solid ${AMARELO}`, borderRadius: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 30, boxSizing: 'border-box', transform: `scale(${0.6 + 0.4 * p}) rotate(${(i - 1) * 3}deg)`, opacity: p}}>
									<div style={{fontFamily: FONTES.titulo, fontSize: 200, color: '#2A2C35', lineHeight: 1}}>?</div>
									<div style={{fontFamily: FONTES.titulo, fontSize: 48, color: OSSO, textAlign: 'center'}}>{l}</div>
								</div>
							);
						})}
					</div>
				</>
			)}
		</AbsoluteFill>
	);
};
