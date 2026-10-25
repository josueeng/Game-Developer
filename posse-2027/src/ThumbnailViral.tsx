import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {CORES, FONTES} from './config';
import {FolhaCalendario, VERMELHO} from './components/Posse';

// Thumbnails (1280x720), no estilo novo: até 4 palavras, um objeto central,
// fundos diferentes entre variantes e nada no canto inferior direito.
// Nenhum candidato aparece.

// A (principal) · calendário com o 5 circulado.
export const ThumbnailViral: React.FC = () => (
	<AbsoluteFill style={{background: CORES.papel, overflow: 'hidden'}}>
		<Img src={staticFile('textura-papel.jpg')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'multiply', opacity: 0.5}} />
		<div style={{position: 'absolute', left: 60, top: 90, fontFamily: FONTES.titulo, fontSize: 150, lineHeight: 0.98, color: CORES.preto}}>
			A POSSE
			<br />
			<span style={{background: VERMELHO, color: CORES.papel, padding: '0 18px'}}>MUDOU</span>
		</div>
		<div style={{position: 'absolute', left: 66, top: 450, fontFamily: FONTES.titulo, fontSize: 84, color: CORES.preto}}>não é mais 1º/1</div>
		<div style={{position: 'absolute', left: 840, top: 60}}>
			<FolhaCalendario inicio={-100} mes="JANEIRO" dia="5" largura={400} circulo={-100} rotacao={5} />
		</div>
	</AbsoluteFill>
);

// B · fundo escuro, 1º riscado → 5.
export const ThumbRiscado: React.FC = () => (
	<AbsoluteFill style={{background: '#141210', overflow: 'hidden'}}>
		<div style={{position: 'absolute', left: 70, top: 40, fontFamily: FONTES.titulo, fontSize: 330, color: '#6B645C', lineHeight: 1}}>
			1º
			<svg width="420" height="300" viewBox="0 0 420 300" style={{position: 'absolute', left: -20, top: 40}}>
				<line x1="20" y1="40" x2="400" y2="260" stroke={VERMELHO} strokeWidth="34" strokeLinecap="round" />
			</svg>
		</div>
		<svg width="260" height="120" viewBox="0 0 260 120" style={{position: 'absolute', left: 470, top: 170}}>
			<path d="M10 60 L200 60" stroke={CORES.papel} strokeWidth="22" strokeLinecap="round" />
			<path d="M180 20 L250 60 L180 100Z" fill={CORES.papel} />
		</svg>
		<div style={{position: 'absolute', left: 760, top: 30, fontFamily: FONTES.titulo, fontSize: 400, color: CORES.amarelo, lineHeight: 1}}>5</div>
		<div style={{position: 'absolute', left: 70, top: 470, padding: '6px 28px 12px', background: CORES.amarelo, color: CORES.preto, fontFamily: FONTES.titulo, fontSize: 90, transform: 'rotate(-2deg)', whiteSpace: 'nowrap'}}>NOVA DATA DA POSSE</div>
	</AbsoluteFill>
);

// C · amarelo, "72 dias".
export const Thumb72: React.FC = () => (
	<AbsoluteFill style={{background: CORES.amarelo, overflow: 'hidden'}}>
		<div style={{position: 'absolute', left: 50, top: 10, fontFamily: FONTES.titulo, fontSize: 360, color: CORES.preto, lineHeight: 1, letterSpacing: -12}}>72</div>
		<div style={{position: 'absolute', left: 660, top: 70, fontFamily: FONTES.titulo, fontSize: 150, color: CORES.preto, lineHeight: 1}}>DIAS</div>
		<div style={{position: 'absolute', left: 660, top: 240, fontFamily: FONTES.titulo, fontSize: 70, color: CORES.preto, lineHeight: 1.05}}>
			ATÉ A
			<br />
			POSSE
		</div>
		<div style={{position: 'absolute', left: 60, top: 450, padding: '6px 28px 12px', background: CORES.preto, color: CORES.amarelo, fontFamily: FONTES.titulo, fontSize: 92, transform: 'rotate(-2deg)', whiteSpace: 'nowrap'}}>O QUE ACONTECE?</div>
	</AbsoluteFill>
);
