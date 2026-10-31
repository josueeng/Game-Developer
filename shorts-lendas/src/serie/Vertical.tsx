import React from 'react';
import {AbsoluteFill, interpolate, random, Sequence, spring} from 'remotion';
import {noise2D} from '@remotion/noise';
import {LightLeak} from '@remotion/light-leaks';
import {CameraMotionBlur} from '@remotion/motion-blur';

// Kit de efeitos para a série "Mistérios e lendas do Brasil" (Shorts 9:16).
// Tudo procedural: nada de vídeo de banco ou imagem de terceiros.

export const FONTE = {
	impacto: '"Anton", "Oswald", sans-serif', // legendas e ganchos
	terror: '"Creepster", cursive', // título da lenda (uso pontual)
	documento: '"Special Elite", "Courier New", monospace', // datas, arquivos, laudos
	apoio: '"Oswald", sans-serif',
};
export const COR = {osso: '#EDE6D6', amarelo: '#FFD23F', sangue: '#D7261E', noite: '#05070C', verde: '#3DDC84'};

// Neblina: manchas grandes e borradas que derivam com ruído (camadas de profundidade).
export const Neblina: React.FC<{frame: number; cor?: string; forca?: number; seed?: string}> = ({frame, cor = '#B8C4D6', forca = 0.2, seed = 'nb'}) => (
	<AbsoluteFill style={{pointerEvents: 'none', mixBlendMode: 'screen'}}>
		{Array.from({length: 7}).map((_, i) => {
			const t = frame / 220;
			const x = 540 + 700 * noise2D(`${seed}x${i}`, t, i);
			const y = 1100 + 700 * noise2D(`${seed}y${i}`, i, t);
			const r = 380 + 160 * random(`${seed}r${i}`);
			return <div key={i} style={{position: 'absolute', left: x - r, top: y - r, width: r * 2, height: r * 1.2, borderRadius: '50%', background: cor, opacity: forca * (0.5 + 0.5 * random(`${seed}o${i}`)), filter: 'blur(90px)'}} />;
		})}
	</AbsoluteFill>
);

// Poeira/cinzas flutuando (partículas guiadas por ruído).
export const Particulas: React.FC<{frame: number; n?: number; cor?: string; seed?: string}> = ({frame, n = 45, cor = '#F4ECD8', seed = 'pt'}) => (
	<AbsoluteFill style={{pointerEvents: 'none'}}>
		{Array.from({length: n}).map((_, i) => {
			const bx = random(`${seed}x${i}`) * 1080;
			const by = random(`${seed}y${i}`) * 1920;
			const vel = 0.3 + random(`${seed}v${i}`) * 0.9;
			const x = (bx + 60 * noise2D(seed, i, frame / 90)) % 1080;
			const y = (by - frame * vel + 1920 * 4) % 1920;
			const tam = 2 + random(`${seed}t${i}`) * 5;
			return <div key={i} style={{position: 'absolute', left: x, top: y, width: tam, height: tam, borderRadius: tam, background: cor, opacity: 0.25 + 0.5 * Math.abs(noise2D(`${seed}o`, i, frame / 40)), filter: tam > 5 ? 'blur(2px)' : undefined}} />;
		})}
	</AbsoluteFill>
);

// Câmera "de mão": deriva suave com ruído + tremor extra quando `susto` > 0.
export const camera = (frame: number, susto = 0) => {
	const x = 10 * noise2D('cx', frame / 70, 0) + susto * 26 * (random(`sx${frame}`) - 0.5);
	const y = 8 * noise2D('cy', 0, frame / 70) + susto * 18 * (random(`sy${frame}`) - 0.5);
	const r = 0.4 * noise2D('cr', frame / 90, 3) + susto * 1.2 * (random(`sr${frame}`) - 0.5);
	return `translate(${x}px, ${y}px) rotate(${r}deg)`;
};

// Vazamento de luz (light leak) com tonalidade quente ou fria.
export const VazamentoLuz: React.FC<{de: number; dur?: number; hue?: number; seed?: number}> = ({de, dur = 30, hue = 0, seed = 3}) => (
	<Sequence from={de} durationInFrames={dur} layout="none">
		<AbsoluteFill style={{mixBlendMode: 'screen', opacity: 0.85}}>
			<LightLeak seed={seed} hueShift={hue} />
		</AbsoluteFill>
	</Sequence>
);

// Bloco com motion blur de câmera (usar só em trechos curtos de movimento rápido).
export const Borrado: React.FC<{ativo: boolean; children: React.ReactNode}> = ({ativo, children}) =>
	ativo ? (
		<CameraMotionBlur shutterAngle={240} samples={6}>
			{children}
		</CameraMotionBlur>
	) : (
		<>{children}</>
	);

// Legenda vertical estilo Shorts: 1 a 3 palavras por vez, centro da tela,
// cada grupo entra com "pop"; palavra-chave em amarelo e maior.
export type Grupo = {palavras: string[]; de: number; ate: number; chave: boolean};
export const agrupar = (texto: string, de: number, ate: number, chave?: string, max = 3): Grupo[] => {
	const ws = texto.split(' ');
	const grupos: string[][] = [];
	let atual: string[] = [];
	ws.forEach((w) => {
		atual.push(w);
		if (atual.length >= max || /[,.:?!…]$/.test(w)) {
			grupos.push(atual);
			atual = [];
		}
	});
	if (atual.length) grupos.push(atual);
	const total = texto.length;
	let pos = 0;
	return grupos.map((g) => {
		const len = g.join(' ').length + 1;
		const a = de + ((ate - de) * pos) / total;
		pos += len;
		const b = de + ((ate - de) * Math.min(pos, total)) / total;
		const txt = g.join(' ');
		return {palavras: g, de: a, ate: b, chave: !!chave && (txt.includes(chave) || chave.includes(txt.replace(/[,.:?!…]/g, '')))};
	});
};

export const LegendaPop: React.FC<{frame: number; fps: number; grupos: Grupo[]; y?: number}> = ({frame, fps, grupos, y = 1180}) => {
	const t = frame / fps;
	const g = grupos.find((x) => t >= x.de && t < x.ate + 0.15);
	if (!g) return null;
	const s = spring({frame: frame - Math.round(g.de * fps), fps, config: {damping: 11, stiffness: 260, mass: 0.5}});
	return (
		<div style={{position: 'absolute', left: 50, right: 50, top: y, textAlign: 'center', transform: `scale(${interpolate(s, [0, 1], [0.6, 1])}) rotate(${g.chave ? -2 : 0}deg)`}}>
			<span style={{fontFamily: FONTE.impacto, fontSize: g.chave ? 132 : 104, lineHeight: 1.02, textTransform: 'uppercase', color: g.chave ? COR.amarelo : COR.osso, WebkitTextStroke: '6px #000', paintOrder: 'stroke fill', textShadow: '0 10px 0 #000, 0 0 40px rgba(0,0,0,0.85)', letterSpacing: 1}}>
				{g.palavras.join(' ')}
			</span>
		</div>
	);
};

// Gancho do 1º quadro: frase grande já visível no quadro 0 (sem fade-in).
export const Gancho: React.FC<{frame: number; linhas: string[]; destaque?: number; ate: number}> = ({frame, linhas, destaque = 1, ate}) => {
	if (frame > ate) return null;
	const sai = interpolate(frame, [ate - 6, ate], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	return (
		<div style={{position: 'absolute', left: 60, right: 60, top: 300, textAlign: 'center', opacity: sai}}>
			{linhas.map((l, i) => (
				<div key={i} style={{fontFamily: FONTE.impacto, fontSize: 120, lineHeight: 1.02, color: i === destaque ? COR.sangue : COR.osso, WebkitTextStroke: '6px #000', paintOrder: 'stroke fill', textShadow: '0 10px 0 #000', textTransform: 'uppercase'}}>{l}</div>
			))}
		</div>
	);
};

// Selo fixo da série (canto superior, discreto).
export const SeloSerie: React.FC<{numero: number}> = ({numero}) => (
	<div style={{position: 'absolute', top: 110, left: 60, fontFamily: FONTE.documento, fontSize: 30, color: COR.osso, opacity: 0.75, letterSpacing: 3, textShadow: '0 2px 6px #000'}}>
		MISTÉRIOS DO BRASIL · Nº {String(numero).padStart(2, '0')}
	</div>
);

// "Arquivo": ficha datilografada que entra girando (datas, laudos, documentos).
export const Ficha: React.FC<{frame: number; de: number; linhas: string[]; carimbo?: string}> = ({frame, de, linhas, carimbo}) => {
	if (frame < de) return null;
	const p = interpolate(frame - de, [0, 12], [0, 1], {extrapolateRight: 'clamp'});
	const n = Math.floor((frame - de) / 2);
	let usado = 0;
	return (
		<div style={{position: 'absolute', left: 80, right: 80, top: 520, background: '#E9DFC6', padding: '46px 46px', boxShadow: '0 30px 60px rgba(0,0,0,0.7)', transform: `rotate(${-4 + 3 * p}deg) translateY(${(1 - p) * 300}px)`, opacity: p}}>
			{linhas.map((l, i) => {
				const vis = l.slice(0, Math.max(0, n - usado));
				usado += l.length;
				return (
					<div key={i} style={{fontFamily: FONTE.documento, fontSize: 44, color: '#231A12', lineHeight: 1.35, minHeight: 60, whiteSpace: 'nowrap'}}>{vis}</div>
				);
			})}
			{carimbo && n > linhas.join('').length + 8 ? (
				<div style={{position: 'absolute', right: 40, bottom: -30, border: `8px solid ${COR.sangue}`, color: COR.sangue, fontFamily: FONTE.impacto, fontSize: 64, padding: '4px 24px', transform: 'rotate(-10deg)', background: 'rgba(233,223,198,0.85)'}}>{carimbo}</div>
			) : null}
		</div>
	);
};
