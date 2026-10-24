import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {CANAL, CORES, FONTES} from './config';
import {MapaBrasil} from './components/MapaBrasil';

// Thumbnail principal (1280x720): fundo amarelo de alto contraste, número
// gigante e personagem recortado com expressão de espanto. Poucas palavras,
// legível até no tamanho de celular (~320x180).

const contornoAdesivo = `drop-shadow(0 0 0 ${CORES.papel}) drop-shadow(6px 0 0 ${CORES.papel}) drop-shadow(-6px 0 0 ${CORES.papel}) drop-shadow(0 6px 0 ${CORES.papel}) drop-shadow(0 -6px 0 ${CORES.papel}) drop-shadow(0 14px 18px rgba(30,20,5,0.45))`;

// Personagem genérico (não representa ninguém real), estilo recorte de papel.
const Espantado: React.FC = () => {
	const traco = {stroke: CORES.preto, strokeWidth: 7, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
	const pele = '#E9B98F';
	return (
		<svg width="520" height="600" viewBox="0 0 520 600">
			{/* corpo */}
			<path d="M60 600 C60 470 150 420 260 420 C370 420 460 470 460 600Z" fill={CORES.azul} {...traco} />
			<path d="M215 425 L260 500 L305 425" fill={CORES.papel} {...traco} />
			{/* pescoço */}
			<path d="M225 380 L225 430 L295 430 L295 380Z" fill={pele} {...traco} />
			{/* cabeça */}
			<ellipse cx="260" cy="250" rx="150" ry="170" fill={pele} {...traco} />
			{/* cabelo */}
			<path d="M112 230 C100 120 180 60 270 66 C360 70 420 130 408 230 C380 160 330 140 300 150 C250 120 170 140 112 230Z" fill={CORES.preto} {...traco} />
			{/* orelhas */}
			<ellipse cx="110" cy="265" rx="22" ry="34" fill={pele} {...traco} />
			<ellipse cx="410" cy="265" rx="22" ry="34" fill={pele} {...traco} />
			{/* sobrancelhas levantadas */}
			<path d="M165 172 C185 150 220 148 238 160" fill="none" {...traco} strokeWidth={11} />
			<path d="M282 160 C300 148 335 150 355 172" fill="none" {...traco} strokeWidth={11} />
			{/* olhos arregalados */}
			<circle cx="203" cy="225" r="36" fill="#FFFFFF" {...traco} />
			<circle cx="317" cy="225" r="36" fill="#FFFFFF" {...traco} />
			<circle cx="207" cy="230" r="13" fill={CORES.preto} />
			<circle cx="313" cy="230" r="13" fill={CORES.preto} />
			{/* boca em "O" */}
			<ellipse cx="260" cy="335" rx="34" ry="44" fill="#3A1410" {...traco} />
			<ellipse cx="260" cy="356" rx="20" ry="13" fill="#C8574A" />
			{/* mãos no rosto */}
			<path d="M70 420 C40 360 60 300 100 290 C120 286 140 300 140 320 L150 380 C150 410 120 440 70 420Z" fill={pele} {...traco} />
			<path d="M450 420 C480 360 460 300 420 290 C400 286 380 300 380 320 L370 380 C370 410 400 440 450 420Z" fill={pele} {...traco} />
		</svg>
	);
};

export const ThumbnailViral: React.FC = () => (
	<AbsoluteFill style={{backgroundColor: CORES.amarelo, overflow: 'hidden'}}>
		{/* textura de papel sobre o amarelo */}
		<Img src={staticFile('textura-papel.jpg')} style={{position: 'absolute', left: -300, top: -250, width: 2000, height: 1180, mixBlendMode: 'multiply', opacity: 0.55}} />

		{/* mapa azul atrás do personagem */}
		<div style={{position: 'absolute', left: 690, top: -10, opacity: 0.95}}>
			<MapaBrasil largura={620} altura={620} inicio={-200} corBase={CORES.azul} />
		</div>

		{/* personagem recortado */}
		<div style={{position: 'absolute', left: 760, top: 150, filter: contornoAdesivo, transform: 'rotate(4deg)'}}>
			<Espantado />
		</div>

		{/* número gigante */}
		<div
			style={{
				position: 'absolute',
				left: 38,
				top: 8,
				fontFamily: FONTES.titulo,
				fontSize: 400,
				lineHeight: 1,
				letterSpacing: -18,
				color: CORES.preto,
				textShadow: `10px 10px 0 ${CORES.papel}`,
			}}
		>
			33
		</div>
		<div
			style={{
				position: 'absolute',
				left: 50,
				top: 365,
				fontFamily: FONTES.titulo,
				fontSize: 132,
				lineHeight: 1,
				color: CORES.preto,
				textShadow: `6px 6px 0 ${CORES.papel}`,
			}}
		>
			MILHÕES
		</div>

		{/* tarja "NÃO VOTARAM" */}
		<div
			style={{
				position: 'absolute',
				left: 34,
				top: 520,
				padding: '10px 30px 14px',
				background: CORES.preto,
				color: CORES.papel,
				fontFamily: FONTES.titulo,
				fontSize: 92,
				lineHeight: 1,
				transform: 'rotate(-3deg)',
				boxShadow: '0 12px 20px rgba(30,20,5,0.4)',
			}}
		>
			NÃO VOTARAM
		</div>

		{/* adesivo "E VOCÊ?" */}
		<div
			style={{
				position: 'absolute',
				left: 995,
				top: 26,
				width: 250,
				height: 250,
				borderRadius: 125,
				background: CORES.papel,
				border: `8px solid ${CORES.preto}`,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				transform: 'rotate(10deg)',
				boxShadow: '0 12px 20px rgba(30,20,5,0.4)',
				fontFamily: FONTES.titulo,
				color: CORES.preto,
				lineHeight: 1,
			}}
		>
			<div style={{fontSize: 42}}>E</div>
			<div style={{fontSize: 50}}>VOCÊ?</div>
		</div>

		<div style={{position: 'absolute', left: 52, bottom: 16, fontFamily: FONTES.texto, fontWeight: 800, fontSize: 22, color: CORES.preto, letterSpacing: 2, opacity: 0.8}}>
			{CANAL.nome}
		</div>
	</AbsoluteFill>
);
