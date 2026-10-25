import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {CANAL, CORES, FONTES} from './config';

// Capa do Short (1080x1920), sem fotos nem logotipos. Os dois candidatos com o
// mesmo peso visual.
export const Capa: React.FC = () => (
	<AbsoluteFill style={{backgroundColor: CORES.amarelo, overflow: 'hidden'}}>
		<Img src={staticFile('textura-papel.jpg')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'multiply', opacity: 0.5}} />
		<div style={{position: 'absolute', top: 300, left: 60, right: 60, textAlign: 'center', fontFamily: FONTES.titulo, fontSize: 120, lineHeight: 1.05, color: CORES.preto}}>
			O VOTO NO
			<br />
			EXTERIOR
			<br />
			MUDOU?
		</div>
		<div style={{position: 'absolute', top: 800, left: 80, right: 80, display: 'flex', height: 160, border: `8px solid ${CORES.preto}`}}>
			<div style={{flex: 1, background: CORES.papel, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONTES.titulo, fontSize: 64, color: CORES.preto}}>1º TURNO</div>
			<div style={{flex: 1, background: CORES.papel, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONTES.titulo, fontSize: 64, color: CORES.preto, borderLeft: `8px solid ${CORES.preto}`}}>2º TURNO</div>
		</div>
		<div style={{position: 'absolute', top: 1040, left: 0, right: 0, textAlign: 'center'}}>
			<span style={{background: CORES.preto, color: CORES.amarelo, fontFamily: FONTES.titulo, fontSize: 64, padding: '10px 30px'}}>8 PAÍSES</span>
		</div>
		<div style={{position: 'absolute', bottom: 120, left: 0, right: 0, textAlign: 'center', fontFamily: FONTES.texto, fontWeight: 800, fontSize: 34, letterSpacing: 3, color: CORES.preto}}>{CANAL.nome}</div>
	</AbsoluteFill>
);
