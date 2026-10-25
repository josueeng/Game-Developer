import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {CANAL, CORES, FONTES} from './config';
import {Espantado} from './components/Personagem';

// Thumbnail principal (1280x720): pergunta grande, placar "3 × 0?" e o
// personagem espantado. Sem escudos ou marcas dos clubes.

const contornoAdesivo = `drop-shadow(6px 0 0 ${CORES.papel}) drop-shadow(-6px 0 0 ${CORES.papel}) drop-shadow(0 6px 0 ${CORES.papel}) drop-shadow(0 -6px 0 ${CORES.papel}) drop-shadow(0 14px 18px rgba(30,20,5,0.45))`;

export const ThumbnailViral: React.FC = () => (
	<AbsoluteFill style={{backgroundColor: CORES.amarelo, overflow: 'hidden'}}>
		<Img src={staticFile('textura-papel.jpg')} style={{position: 'absolute', left: -300, top: -250, width: 2000, height: 1180, mixBlendMode: 'multiply', opacity: 0.55}} />

		<div style={{position: 'absolute', left: 790, top: 170, filter: contornoAdesivo, transform: 'rotate(4deg)'}}>
			<Espantado />
		</div>

		<div style={{position: 'absolute', left: 50, top: 40, fontFamily: FONTES.titulo, fontSize: 116, lineHeight: 1.02, color: CORES.preto, textShadow: `6px 6px 0 ${CORES.papel}`}}>
			FLAMENGO
			<br />
			NA FINAL?
		</div>
		<div style={{position: 'absolute', left: 40, top: 300, padding: '6px 34px 12px', background: CORES.preto, color: CORES.amarelo, fontFamily: FONTES.titulo, fontSize: 180, lineHeight: 1, transform: 'rotate(-3deg)', boxShadow: '0 12px 20px rgba(30,20,5,0.4)', whiteSpace: 'nowrap'}}>
			3 × 0?
		</div>
		<div style={{position: 'absolute', left: 70, top: 540, padding: '8px 24px', background: CORES.azul, color: CORES.papel, fontFamily: FONTES.titulo, fontSize: 56, transform: 'rotate(2deg)', border: `5px solid ${CORES.preto}`, boxShadow: '0 10px 16px rgba(30,20,5,0.35)', whiteSpace: 'nowrap'}}>
			ENTENDA O CASO ROJO
		</div>
		<div style={{position: 'absolute', left: 74, bottom: 12, fontFamily: FONTES.texto, fontWeight: 800, fontSize: 22, color: CORES.preto, letterSpacing: 2, opacity: 0.8}}>
			{CANAL.nome}
		</div>
	</AbsoluteFill>
);
