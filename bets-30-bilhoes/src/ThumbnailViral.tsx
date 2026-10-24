import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {CANAL, CORES, FONTES} from './config';
import {Espantado} from './components/Personagem';
import {Moeda} from './components/Icones';

// Thumbnail principal (1280x720): número gigante, personagem espantado e
// pergunta no adesivo. Legível em tamanho de celular (~320x180).

const contornoAdesivo = `drop-shadow(6px 0 0 ${CORES.papel}) drop-shadow(-6px 0 0 ${CORES.papel}) drop-shadow(0 6px 0 ${CORES.papel}) drop-shadow(0 -6px 0 ${CORES.papel}) drop-shadow(0 14px 18px rgba(30,20,5,0.45))`;

export const ThumbnailViral: React.FC = () => (
	<AbsoluteFill style={{backgroundColor: CORES.amarelo, overflow: 'hidden'}}>
		<Img src={staticFile('textura-papel.jpg')} style={{position: 'absolute', left: -300, top: -250, width: 2000, height: 1180, mixBlendMode: 'multiply', opacity: 0.55}} />

		{/* moedas voando atrás do personagem */}
		{[
			{x: 760, y: 40, s: 150, r: -20},
			{x: 1100, y: 330, s: 120, r: 25},
			{x: 700, y: 330, s: 100, r: 10},
			{x: 1150, y: 60, s: 90, r: -10},
		].map((c, i) => (
			<div key={i} style={{position: 'absolute', left: c.x, top: c.y, transform: `rotate(${c.r}deg)`, filter: 'drop-shadow(0 10px 12px rgba(30,20,5,0.35))'}}>
				<Moeda tamanho={c.s} cor={i % 2 ? CORES.papel : CORES.amarelo} />
			</div>
		))}

		<div style={{position: 'absolute', left: 760, top: 150, filter: contornoAdesivo, transform: 'rotate(4deg)'}}>
			<Espantado />
		</div>

		<div style={{position: 'absolute', left: 40, top: 34, fontFamily: FONTES.titulo, fontSize: 250, lineHeight: 1, letterSpacing: -10, color: CORES.preto, textShadow: `10px 10px 0 ${CORES.papel}`, whiteSpace: 'nowrap'}}>
			R$ 30
		</div>
		<div style={{position: 'absolute', left: 50, top: 280, fontFamily: FONTES.titulo, fontSize: 132, lineHeight: 1, color: CORES.preto, textShadow: `6px 6px 0 ${CORES.papel}`}}>
			BILHÕES
		</div>
		<div style={{position: 'absolute', left: 40, top: 438, padding: '10px 30px 14px', background: CORES.preto, color: CORES.papel, fontFamily: FONTES.titulo, fontSize: 96, lineHeight: 1, transform: 'rotate(-3deg)', boxShadow: '0 12px 20px rgba(30,20,5,0.4)'}}>
			POR MÊS
		</div>

		<div
			style={{
				position: 'absolute',
				left: 70,
				top: 572,
				padding: '8px 22px',
				background: CORES.azul,
				color: CORES.papel,
				fontFamily: FONTES.titulo,
				fontSize: 58,
				transform: 'rotate(2deg)',
				border: `5px solid ${CORES.preto}`,
				boxShadow: '0 10px 16px rgba(30,20,5,0.35)',
			}}
		>
			PRA ONDE FOI?
		</div>

		<div style={{position: 'absolute', left: 74, bottom: 12, fontFamily: FONTES.texto, fontWeight: 800, fontSize: 22, color: CORES.preto, letterSpacing: 2, opacity: 0.8}}>
			{CANAL.nome}
		</div>
	</AbsoluteFill>
);
