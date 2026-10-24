import React from 'react';
import {CORES} from '../config';

// Personagem genérico (não representa ninguém real), estilo recorte de papel.
export const Espantado: React.FC = () => {
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

