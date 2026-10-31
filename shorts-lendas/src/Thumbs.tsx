import React from 'react';
import {AbsoluteFill} from 'remotion';
import {FONTES} from './config';
import {AMARELO, OSSO, VERMELHO} from './Efeitos';
import {Banheiro, Fantasma} from './Desenhos';

// Thumbnails (1280x720). Ilustração, nenhuma foto; nada no canto inferior direito.
const traco = '0 6px 0 #000, 0 0 24px rgba(0,0,0,0.9)';

// 1 · Espelho com a silhueta + "ELA EXISTIU?"
export const Thumb1: React.FC = () => (
	<AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
		<div style={{position: 'absolute', left: -320, top: -120, transform: 'scale(1.05)', transformOrigin: '0 0'}}>
			<Banheiro nevoa={0.4} tremePorta={0} fantasma={1} luz={0.7} />
		</div>
		<AbsoluteFill style={{background: 'linear-gradient(90deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.85) 75%)'}} />
		<div style={{position: 'absolute', right: 50, top: 90, textAlign: 'right', fontFamily: FONTES.titulo, fontSize: 130, lineHeight: 0.98, color: OSSO, textShadow: traco}}>
			ELA
			<br />
			<span style={{color: AMARELO}}>EXISTIU?</span>
		</div>
		<div style={{position: 'absolute', right: 60, top: 400, padding: '8px 24px', background: VERMELHO, color: '#fff', fontFamily: FONTES.titulo, fontSize: 48, transform: 'rotate(-2deg)'}}>LOIRA DO BANHEIRO</div>
	</AbsoluteFill>
);

// 2 · Fantasma grande + "HISTÓRIA REAL"
export const Thumb2: React.FC = () => (
	<AbsoluteFill style={{background: 'radial-gradient(circle at 70% 40%, #2A3A3A 0%, #050606 70%)', overflow: 'hidden'}}>
		<div style={{position: 'absolute', left: 760, top: 30, filter: 'drop-shadow(0 0 40px rgba(220,230,220,0.35))'}}>
			<Fantasma escala={0.9} />
		</div>
		<div style={{position: 'absolute', left: 50, top: 80, fontFamily: FONTES.titulo, fontSize: 120, lineHeight: 0.98, color: OSSO, textShadow: traco}}>
			A HISTÓRIA
			<br />
			<span style={{color: VERMELHO}}>REAL</span>
		</div>
		<div style={{position: 'absolute', left: 56, top: 360, padding: '8px 24px', background: AMARELO, color: '#111', fontFamily: FONTES.titulo, fontSize: 56, transform: 'rotate(-2deg)'}}>LOIRA DO BANHEIRO</div>
	</AbsoluteFill>
);

// 3 · Data datilografada + "1891"
export const Thumb3: React.FC = () => (
	<AbsoluteFill style={{background: '#0A0806', overflow: 'hidden', alignItems: 'center'}}>
		<div style={{position: 'absolute', top: 40, fontFamily: '"Courier New", monospace', fontWeight: 700, fontSize: 250, color: AMARELO, letterSpacing: 10}}>1891</div>
		<div style={{position: 'absolute', top: 330, fontFamily: FONTES.titulo, fontSize: 82, color: OSSO, textAlign: 'center', lineHeight: 1.05, textShadow: traco}}>
			A LOIRA DO BANHEIRO
			<br />
			<span style={{color: VERMELHO}}>COMEÇOU AQUI?</span>
		</div>
	</AbsoluteFill>
);
