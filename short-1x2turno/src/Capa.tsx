import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {CANAL, CORES, FONTES} from './config';

// Capa do Short (1080x1920), sem fotos nem logotipos; cores neutras.
export const Capa: React.FC = () => (
	<AbsoluteFill style={{backgroundColor: CORES.papel, overflow: 'hidden'}}>
		<Img src={staticFile('textura-papel.jpg')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'multiply', opacity: 0.5}} />
		<div style={{position: 'absolute', top: 280, left: 60, right: 60, textAlign: 'center', fontFamily: FONTES.titulo, fontSize: 120, lineHeight: 1.05, color: CORES.preto}}>
			DE ONDE
			<br />
			VIERAM OS
			<br />
			<span style={{background: CORES.amarelo, padding: '0 20px'}}>VOTOS?</span>
		</div>
		<div style={{position: 'absolute', top: 820, left: 0, right: 0, textAlign: 'center', fontFamily: FONTES.titulo, fontSize: 300, color: '#B3261E', lineHeight: 1}}>?</div>
		<div style={{position: 'absolute', top: 1160, left: 0, right: 0, textAlign: 'center', fontFamily: FONTES.titulo, fontSize: 56, color: CORES.preto}}>1º TURNO × 2º TURNO</div>
		<div style={{position: 'absolute', bottom: 120, left: 0, right: 0, textAlign: 'center', fontFamily: FONTES.texto, fontWeight: 800, fontSize: 34, letterSpacing: 3, color: CORES.preto}}>{CANAL.nome}</div>
	</AbsoluteFill>
);
