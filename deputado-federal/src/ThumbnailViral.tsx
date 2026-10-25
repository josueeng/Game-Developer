import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {CANAL, CORES, FONTES} from './config';
import {Espantado} from './components/Personagem';

// Thumbnail principal (1280x720): "R$ 46 mil?" e o choque de que o salário
// é só 17% da conta. Personagem genérico; nenhum político real.

const contornoAdesivo = `drop-shadow(6px 0 0 ${CORES.papel}) drop-shadow(-6px 0 0 ${CORES.papel}) drop-shadow(0 6px 0 ${CORES.papel}) drop-shadow(0 -6px 0 ${CORES.papel}) drop-shadow(0 14px 18px rgba(30,20,5,0.45))`;

export const ThumbnailViral: React.FC = () => (
	<AbsoluteFill style={{backgroundColor: CORES.amarelo, overflow: 'hidden'}}>
		<Img src={staticFile('textura-papel.jpg')} style={{position: 'absolute', left: -300, top: -250, width: 2000, height: 1180, mixBlendMode: 'multiply', opacity: 0.55}} />

		<div style={{position: 'absolute', left: 800, top: 170, filter: contornoAdesivo, transform: 'rotate(4deg)'}}>
			<Espantado />
		</div>

		<div style={{position: 'absolute', left: 50, top: 40, fontFamily: FONTES.titulo, fontSize: 104, lineHeight: 1.02, color: CORES.preto, textShadow: `6px 6px 0 ${CORES.papel}`}}>
			DEPUTADO
			<br />
			GANHA
		</div>
		<div style={{position: 'absolute', left: 40, top: 270, padding: '6px 30px 12px', background: CORES.preto, color: CORES.amarelo, fontFamily: FONTES.titulo, fontSize: 150, lineHeight: 1, transform: 'rotate(-3deg)', boxShadow: '0 12px 20px rgba(30,20,5,0.4)', whiteSpace: 'nowrap'}}>
			R$ 46 MIL?
		</div>
		<div style={{position: 'absolute', left: 70, top: 500, padding: '8px 24px', background: CORES.azul, color: CORES.papel, fontFamily: FONTES.titulo, fontSize: 54, transform: 'rotate(2deg)', border: `5px solid ${CORES.preto}`, boxShadow: '0 10px 16px rgba(30,20,5,0.35)', whiteSpace: 'nowrap'}}>
			É SÓ 17% DA CONTA
		</div>
		<div style={{position: 'absolute', left: 820, top: 46, padding: '8px 20px', background: CORES.papel, color: CORES.preto, fontFamily: FONTES.titulo, fontSize: 40, transform: 'rotate(4deg)', border: `5px solid ${CORES.preto}`, boxShadow: '0 10px 16px rgba(30,20,5,0.35)', whiteSpace: 'nowrap'}}>
			R$ 275 MIL/MÊS
		</div>
		<div style={{position: 'absolute', left: 74, bottom: 12, fontFamily: FONTES.texto, fontWeight: 800, fontSize: 22, color: CORES.preto, letterSpacing: 2, opacity: 0.8}}>
			{CANAL.nome}
		</div>
	</AbsoluteFill>
);
