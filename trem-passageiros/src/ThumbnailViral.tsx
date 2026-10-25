import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {CANAL, CORES, FONTES} from './config';
import {Espantado} from './components/Personagem';
import {Locomotiva} from './components/Trem';

// Thumbnail principal (1280x720): "Cadê o trem?" com bilhete carimbado e o
// personagem espantado. Nenhuma marca de empresa.

const contornoAdesivo = `drop-shadow(6px 0 0 ${CORES.papel}) drop-shadow(-6px 0 0 ${CORES.papel}) drop-shadow(0 6px 0 ${CORES.papel}) drop-shadow(0 -6px 0 ${CORES.papel}) drop-shadow(0 14px 18px rgba(30,20,5,0.45))`;

export const ThumbnailViral: React.FC = () => (
	<AbsoluteFill style={{backgroundColor: CORES.amarelo, overflow: 'hidden'}}>
		<Img src={staticFile('textura-papel.jpg')} style={{position: 'absolute', left: -300, top: -250, width: 2000, height: 1180, mixBlendMode: 'multiply', opacity: 0.55}} />

		<div style={{position: 'absolute', left: 820, top: 190, filter: contornoAdesivo, transform: 'rotate(4deg)'}}>
			<Espantado />
		</div>
		<div style={{position: 'absolute', left: 470, top: 500, filter: contornoAdesivo, transform: 'rotate(-4deg)', opacity: 0.95}}>
			<Locomotiva largura={360} tipo="vapor" />
		</div>

		<div style={{position: 'absolute', left: 50, top: 40, fontFamily: FONTES.titulo, fontSize: 110, lineHeight: 1.02, color: CORES.preto, textShadow: `6px 6px 0 ${CORES.papel}`}}>
			CADÊ O
		</div>
		<div style={{position: 'absolute', left: 40, top: 165, padding: '6px 34px 12px', background: CORES.preto, color: CORES.amarelo, fontFamily: FONTES.titulo, fontSize: 170, lineHeight: 1, transform: 'rotate(-3deg)', boxShadow: '0 12px 20px rgba(30,20,5,0.4)', whiteSpace: 'nowrap'}}>
			TREM?
		</div>
		<div style={{position: 'absolute', left: 60, top: 400, padding: '8px 24px', background: CORES.azul, color: CORES.papel, fontFamily: FONTES.titulo, fontSize: 52, transform: 'rotate(2deg)', border: `5px solid ${CORES.preto}`, boxShadow: '0 10px 16px rgba(30,20,5,0.35)', whiteSpace: 'nowrap'}}>
			30 MIL KM · SÓ 2 LINHAS
		</div>
		<div style={{position: 'absolute', left: 74, bottom: 12, fontFamily: FONTES.texto, fontWeight: 800, fontSize: 22, color: CORES.preto, letterSpacing: 2, opacity: 0.8}}>
			{CANAL.nome}
		</div>
	</AbsoluteFill>
);
