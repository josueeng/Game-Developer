import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {CANAL, CORES, FONTES} from './config';
import {Espantado} from './components/Personagem';
import {Pizza} from './components/Gasolina';

// Thumbnail principal (1280x720): preço gigante, personagem espantado e a
// moeda dividida em fatias. Legível em tamanho de celular (~320x180).

const contornoAdesivo = `drop-shadow(6px 0 0 ${CORES.papel}) drop-shadow(-6px 0 0 ${CORES.papel}) drop-shadow(0 6px 0 ${CORES.papel}) drop-shadow(0 -6px 0 ${CORES.papel}) drop-shadow(0 14px 18px rgba(30,20,5,0.45))`;

export const ThumbnailViral: React.FC = () => (
	<AbsoluteFill style={{backgroundColor: CORES.amarelo, overflow: 'hidden'}}>
		<Img src={staticFile('textura-papel.jpg')} style={{position: 'absolute', left: -300, top: -250, width: 2000, height: 1180, mixBlendMode: 'multiply', opacity: 0.55}} />

		<div style={{position: 'absolute', left: 930, top: -10, transform: 'rotate(12deg)'}}>
			<Pizza raio={150} inicios={[-100, -100, -100, -100, -100]} centro={<div style={{fontFamily: FONTES.titulo, fontSize: 44}}>R$ 1</div>} />
		</div>

		<div style={{position: 'absolute', left: 790, top: 170, filter: contornoAdesivo, transform: 'rotate(4deg)'}}>
			<Espantado />
		</div>

		<div style={{position: 'absolute', left: 50, top: 40, fontFamily: FONTES.titulo, fontSize: 110, lineHeight: 1, color: CORES.preto, textShadow: `6px 6px 0 ${CORES.papel}`}}>
			O LITRO
		</div>
		<div style={{position: 'absolute', left: 36, top: 150, fontFamily: FONTES.titulo, fontSize: 200, lineHeight: 1, letterSpacing: -10, color: CORES.preto, textShadow: `10px 10px 0 ${CORES.papel}`, whiteSpace: 'nowrap'}}>
			R$ 6,53
		</div>
		<div style={{position: 'absolute', left: 40, top: 390, padding: '10px 30px 14px', background: CORES.preto, color: CORES.papel, fontFamily: FONTES.titulo, fontSize: 84, lineHeight: 1, transform: 'rotate(-3deg)', boxShadow: '0 12px 20px rgba(30,20,5,0.4)', whiteSpace: 'nowrap'}}>
			PRA ONDE VAI?
		</div>
		<div
			style={{
				position: 'absolute',
				left: 70,
				top: 530,
				padding: '8px 22px',
				background: CORES.azul,
				color: CORES.papel,
				fontFamily: FONTES.titulo,
				fontSize: 50,
				transform: 'rotate(2deg)',
				border: `5px solid ${CORES.preto}`,
				boxShadow: '0 10px 16px rgba(30,20,5,0.35)',
				whiteSpace: 'nowrap',
			}}
		>
			SÓ R$ 2 É DA PETROBRAS
		</div>

		<div style={{position: 'absolute', left: 74, bottom: 12, fontFamily: FONTES.texto, fontWeight: 800, fontSize: 22, color: CORES.preto, letterSpacing: 2, opacity: 0.8}}>
			{CANAL.nome}
		</div>
	</AbsoluteFill>
);
