import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {CORES, FONTES} from './config';
import {MapaBrasil, centroideUF} from './components/MapaBrasil';
import {FolhaCalendario, VERMELHO} from './components/Posse';

// 5 variantes de thumbnail inspiradas nos estilos (não nas marcas) dos canais
// sem rosto mais bem avaliados. Nenhum candidato aparece; nada importante no
// canto inferior direito (duração do vídeo).

// 1 · Ilustração plana, um objeto só (estilo "educação animada"):
// a cadeira vazia + "72 DIAS".
export const ThumbCadeira: React.FC = () => {
	const t = {stroke: '#0E1B33', strokeWidth: 10, strokeLinejoin: 'round' as const};
	return (
		<AbsoluteFill style={{background: 'linear-gradient(160deg, #1F3B73 0%, #0E1B33 100%)', overflow: 'hidden'}}>
			{Array.from({length: 40}).map((_, i) => (
				<div key={i} style={{position: 'absolute', left: (i * 211) % 1280, top: (i * 137) % 720, width: 6, height: 6, borderRadius: 3, background: '#FFFFFF', opacity: 0.25}} />
			))}
			<div style={{position: 'absolute', left: 720, top: 120, width: 520, height: 520, borderRadius: 260, background: CORES.amarelo, opacity: 0.18}} />
			<svg width="520" height="600" viewBox="0 0 260 300" style={{position: 'absolute', left: 740, top: 80}}>
				<path d="M60 20 Q130 0 200 20 L200 170 L60 170Z" fill={VERMELHO} {...t} />
				<path d="M80 40 Q130 26 180 40 L180 150 L80 150Z" fill="#E8504A" stroke="none" />
				<path d="M40 170 L220 170 L230 200 L30 200Z" fill={CORES.amarelo} {...t} />
				<path d="M50 200 L40 290 M210 200 L220 290 M80 200 L75 260 M180 200 L185 260" {...t} fill="none" />
			</svg>
			<div style={{position: 'absolute', left: 60, top: 90, fontFamily: FONTES.titulo, fontSize: 250, color: CORES.amarelo, lineHeight: 0.9}}>72</div>
			<div style={{position: 'absolute', left: 66, top: 320, fontFamily: FONTES.titulo, fontSize: 120, color: '#FFFFFF', lineHeight: 1}}>DIAS</div>
			<div style={{position: 'absolute', left: 70, top: 460, fontFamily: FONTES.titulo, fontSize: 60, color: '#BFD1F2'}}>até a posse</div>
		</AbsoluteFill>
	);
};

// 2 · Mapa + seta + marca-texto (estilo "geografia explicada").
export const ThumbMapa: React.FC = () => {
	const W = 640;
	const [bx, by] = centroideUF('DF', W, W);
	return (
		<AbsoluteFill style={{background: '#EFE6D2', overflow: 'hidden'}}>
			<Img src={staticFile('textura-papel.jpg')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'multiply', opacity: 0.6}} />
			<div style={{position: 'absolute', left: 680, top: 40}}>
				<MapaBrasil largura={W} altura={W} inicio={-200} destaques={[{uf: 'DF', cor: VERMELHO, inicio: -200}]} corBase="#FFFDF6" />
				<svg width={W} height={W} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
					<path d={`M${bx - 360} ${by - 170} Q ${bx - 160} ${by - 220}, ${bx - 26} ${by - 26}`} fill="none" stroke={VERMELHO} strokeWidth="18" strokeLinecap="round" />
					<path d={`M${bx - 16} ${by - 10} l-52 -18 l26 -46Z`} fill={VERMELHO} />
					<circle cx={bx} cy={by} r="22" fill={VERMELHO} stroke="#141210" strokeWidth="6" />
				</svg>
			</div>
			<div style={{position: 'absolute', left: 60, top: 70, fontFamily: FONTES.titulo, fontSize: 96, color: '#141210', lineHeight: 1}}>BRASÍLIA</div>
			<div style={{position: 'absolute', left: 60, top: 210, fontFamily: FONTES.titulo, fontSize: 210, lineHeight: 1}}>
				<span style={{background: CORES.amarelo, padding: '0 20px', color: '#141210'}}>5/1</span>
			</div>
			<div style={{position: 'absolute', left: 66, top: 470, fontFamily: FONTES.titulo, fontSize: 64, color: '#141210'}}>a nova data da posse</div>
		</AbsoluteFill>
	);
};

// 3 · Documento escuro e cinematográfico (estilo "documentário"):
// trecho da Constituição com "CARGO VAGO" marcado.
export const ThumbDocumento: React.FC = () => (
	<AbsoluteFill style={{background: 'radial-gradient(circle at 70% 40%, #3A2E22 0%, #0B0907 75%)', overflow: 'hidden'}}>
		<div style={{position: 'absolute', left: 660, top: 80, width: 580, height: 580, background: '#F2E8D2', transform: 'rotate(-5deg)', boxShadow: '0 40px 80px rgba(0,0,0,0.8)', padding: '50px 54px', boxSizing: 'border-box'}}>
			<div style={{fontFamily: FONTES.jornal, fontWeight: 900, fontSize: 40, color: '#2A2118', letterSpacing: 2}}>Art. 78</div>
			<div style={{fontFamily: FONTES.jornal, fontSize: 34, color: '#2A2118', lineHeight: 1.45, marginTop: 20}}>
				Parágrafo único. Se, decorridos dez dias da data fixada para a posse, o Presidente […] não tiver assumido o cargo, este será{' '}
				<span style={{background: CORES.amarelo, padding: '0 6px', fontWeight: 900}}>declarado vago</span>.
			</div>
		</div>
		<div style={{position: 'absolute', left: 60, top: 90, fontFamily: FONTES.titulo, fontSize: 120, color: '#F2E8D2', lineHeight: 1}}>
			CARGO
			<br />
			<span style={{color: VERMELHO}}>VAGO?</span>
		</div>
		<div style={{position: 'absolute', left: 64, top: 400, fontFamily: FONTES.titulo, fontSize: 52, color: '#C9B99A', lineHeight: 1.2}}>
			a regra dos
			<br />
			10 dias
		</div>
	</AbsoluteFill>
);

// 4 · Objeto grande com círculo vermelho e seta (estilo "curiosidades").
export const ThumbCirculo: React.FC = () => (
	<AbsoluteFill style={{background: '#FFFFFF', overflow: 'hidden'}}>
		<div style={{position: 'absolute', left: 90, top: 60}}>
			<FolhaCalendario inicio={-100} mes="JANEIRO" dia="5" largura={520} circulo={-100} rotacao={-4} />
		</div>
		<svg width="420" height="260" viewBox="0 0 420 260" style={{position: 'absolute', left: 620, top: 230}}>
			<path d="M400 40 Q 220 20, 60 160" fill="none" stroke={VERMELHO} strokeWidth="26" strokeLinecap="round" />
			<path d="M30 190 L50 100 L120 170Z" fill={VERMELHO} />
		</svg>
		<div style={{position: 'absolute', left: 690, top: 80, fontFamily: FONTES.titulo, fontSize: 112, color: '#141210', lineHeight: 1}}>MUDOU</div>
		<div style={{position: 'absolute', left: 660, top: 480, padding: '6px 24px 10px', background: VERMELHO, color: '#FFFFFF', fontFamily: FONTES.titulo, fontSize: 64, transform: 'rotate(-2deg)', whiteSpace: 'nowrap'}}>não é mais 1º/1</div>
	</AbsoluteFill>
);

// 5 · Pergunta em texto, cor chapada e ícone pequeno (estilo "texto-only").
export const ThumbPergunta: React.FC = () => (
	<AbsoluteFill style={{background: '#11A36A', overflow: 'hidden'}}>
		<div style={{position: 'absolute', left: 70, top: 70, fontFamily: FONTES.titulo, fontSize: 112, color: '#FFFFFF', lineHeight: 1.02}}>
			POR QUE
			<br />
			SÓ EM
			<br />
			<span style={{background: '#FFFFFF', color: '#11A36A', padding: '0 18px'}}>5 DE JANEIRO?</span>
		</div>
		<svg width="220" height="220" viewBox="0 0 100 100" style={{position: 'absolute', left: 1000, top: 40}}>
			<circle cx="50" cy="50" r="44" fill="#FFFFFF" stroke="#0B6B45" strokeWidth="5" />
			<path d="M50 20 V52 L70 64" fill="none" stroke="#0B6B45" strokeWidth="7" strokeLinecap="round" />
		</svg>
		<div style={{position: 'absolute', left: 74, top: 520, fontFamily: FONTES.titulo, fontSize: 52, color: '#0B3D28'}}>a posse do presidente</div>
	</AbsoluteFill>
);
