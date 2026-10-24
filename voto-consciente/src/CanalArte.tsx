import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {CANAL, CORES, FONTES} from './config';
import {MapaBrasil} from './components/MapaBrasil';
import {Recorte} from './components/Recorte';
import {RecorteJornal} from './components/RecorteJornal';
import {IconeCheck} from './components/Icones';

// Arte do canal no mesmo estilo de colagem dos vídeos.
// Capa do YouTube: 2560x1440. A área que aparece em TODOS os dispositivos é o
// retângulo central de 1546x423 (x 507–2053, y 508–931); o resto só aparece
// na TV/desktop e serve de decoração.

const SEGURA = {x: 507, y: 508, w: 1546, h: 423};

const Fundo: React.FC<{escala?: number}> = ({escala = 1}) => (
	<>
		<AbsoluteFill style={{backgroundColor: CORES.bege}} />
		<Img src={staticFile('textura-papel.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 2200 * escala, height: 1300 * escala}} />
	</>
);

// "VIRALMENTE VIRAL" com o segundo VIRAL em destaque amarelo.
const Logotipo: React.FC<{tamanho: number}> = ({tamanho}) => {
	const [a, ...resto] = CANAL.nome.split(' ');
	return (
		<div style={{fontFamily: FONTES.titulo, fontSize: tamanho, lineHeight: 1, color: CORES.preto, whiteSpace: 'nowrap', letterSpacing: -1}}>
			{a}{' '}
			<span style={{background: CORES.amarelo, padding: '0 0.14em', boxShadow: '0 10px 18px rgba(40,30,15,0.25)'}}>{resto.join(' ')}</span>
		</div>
	);
};

// Ícone próprio do canal: seta em zigue-zague subindo ("viralizando").
const IconeViral: React.FC<{tamanho: number}> = ({tamanho}) => (
	<svg width={tamanho} height={tamanho} viewBox="0 0 100 100">
		<circle cx="50" cy="50" r="45" fill={CORES.azul} stroke={CORES.preto} strokeWidth="6" />
		<path d="M20 70 L40 50 L52 60 L74 34" fill="none" stroke={CORES.amarelo} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M60 30 L78 30 L78 48" fill="none" stroke={CORES.amarelo} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

export const CapaCanal: React.FC = () => (
	<AbsoluteFill style={{overflow: 'hidden'}}>
		<Fundo escala={1.2} />

		{/* Decoração fora da área segura (só TV/desktop) */}
		<div style={{position: 'absolute', left: 60, top: 180, opacity: 0.95}}>
			<MapaBrasil largura={520} altura={520} inicio={-200} corBase={CORES.azul} />
		</div>
		<RecorteJornal seed="capa-jornal" inicio={-100} x={1990} y={110} largura={520} rotacao={5} tamanhoManchete={50}
			manchete={<span style={{background: CORES.amarelo, padding: '0 6px'}}>Os números contam</span>} linhaFina="a história que ninguém te explicou" linhas={4} colunas={2} />
		<div style={{position: 'absolute', left: 2120, top: 1010, display: 'flex', alignItems: 'flex-end', gap: 22}}>
			{[90, 150, 210, 300].map((h, i) => (
				<div key={h} style={{width: 70, height: h, background: i === 3 ? CORES.amarelo : CORES.azul, border: `5px solid ${CORES.preto}`, boxShadow: '0 10px 14px rgba(40,30,15,0.25)'}} />
			))}
		</div>
		<Recorte seed="capa-sticker" inicio={-100} cor={CORES.preto} rotacao={-6} style={{left: 120, top: 1050}} padding="18px 34px">
			<div style={{fontFamily: FONTES.titulo, fontSize: 56, color: CORES.amarelo}}>FATOS &gt; BOATOS</div>
		</Recorte>

		{/* Área segura: logotipo, chamada e selos */}
		<div style={{position: 'absolute', left: SEGURA.x, top: SEGURA.y, width: SEGURA.w, height: SEGURA.h, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 46}}>
			<div style={{filter: 'drop-shadow(0 12px 14px rgba(40,30,15,0.3))', transform: 'rotate(-8deg)', flexShrink: 0}}>
				<IconeViral tamanho={210} />
			</div>
			<div style={{display: 'flex', flexDirection: 'column', gap: 26}}>
				<Logotipo tamanho={112} />
				<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 46, color: CORES.preto}}>
					Os fatos por trás do que todo mundo comenta
				</div>
				<div style={{display: 'flex', gap: 28}}>
					{['Explicado em minutos', 'Com fonte', 'Sem enrolação'].map((t) => (
						<div key={t} style={{display: 'flex', alignItems: 'center', gap: 12}}>
							<IconeCheck tamanho={46} />
							<span style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 30, color: CORES.azul}}>{t}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	</AbsoluteFill>
);

// Ícone de perfil 800x800 (o YouTube recorta em círculo).
export const AvatarCanal: React.FC = () => (
	<AbsoluteFill style={{overflow: 'hidden', alignItems: 'center', justifyContent: 'center'}}>
		<Fundo />
		<div
			style={{
				position: 'relative',
				width: 640,
				height: 640,
				borderRadius: 320,
				background: CORES.amarelo,
				border: `22px solid ${CORES.preto}`,
				boxSizing: 'border-box',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				boxShadow: '0 20px 30px rgba(40,30,15,0.35)',
			}}
		>
			<div style={{fontFamily: FONTES.titulo, fontSize: 300, lineHeight: 0.9, color: CORES.preto, letterSpacing: -16, marginTop: -20}}>VV</div>
			<div style={{marginTop: 26, transform: 'rotate(-4deg)', filter: 'drop-shadow(0 6px 8px rgba(40,30,15,0.3))'}}>
				<IconeViral tamanho={150} />
			</div>
		</div>
	</AbsoluteFill>
);
