import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {CORES, FONTES} from './config';

// Variantes de thumbnail para o "Testar e comparar" do YouTube Studio.
// Regras: no máximo 4 palavras, um objeto central, contraste forte e nada
// importante no canto inferior direito (onde fica a duração do vídeo).

const VERMELHO = '#D7261E';

// B · Celular bloqueado em fundo escuro.
export const ThumbCelular: React.FC = () => (
	<AbsoluteFill style={{background: '#141210', overflow: 'hidden'}}>
		<div style={{position: 'absolute', left: 900, top: 50, width: 340, height: 640, borderRadius: 56, background: '#2B2825', border: `14px solid ${CORES.papel}`, transform: 'rotate(8deg)', boxShadow: '0 30px 60px rgba(0,0,0,0.6)'}}>
			<div style={{position: 'absolute', left: 22, right: 22, top: 60, bottom: 90, borderRadius: 18, background: VERMELHO, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20}}>
				<svg width="160" height="190" viewBox="0 0 160 190">
					<path d="M40 80 V55 a40 40 0 0 1 80 0 V80" fill="none" stroke={CORES.papel} strokeWidth="18" />
					<rect x="14" y="78" width="132" height="104" rx="16" fill={CORES.papel} />
					<circle cx="80" cy="122" r="14" fill={VERMELHO} />
					<rect x="73" y="128" width="14" height="30" rx="5" fill={VERMELHO} />
				</svg>
				<div style={{fontFamily: FONTES.titulo, fontSize: 52, color: CORES.papel, textAlign: 'center', lineHeight: 1.05}}>
					SAIU
					<br />
					DO AR
				</div>
			</div>
		</div>
		<div style={{position: 'absolute', left: 60, top: 70, fontFamily: FONTES.titulo, fontSize: 190, lineHeight: 0.95, color: CORES.amarelo, letterSpacing: -6, whiteSpace: 'nowrap'}}>
			R$ 30 BI
		</div>
		<div style={{position: 'absolute', left: 66, top: 300, fontFamily: FONTES.titulo, fontSize: 120, lineHeight: 1, color: CORES.papel, whiteSpace: 'nowrap'}}>POR MÊS</div>
		<div style={{position: 'absolute', left: 66, top: 470, padding: '8px 26px', background: CORES.amarelo, color: CORES.preto, fontFamily: FONTES.titulo, fontSize: 84, transform: 'rotate(-3deg)', whiteSpace: 'nowrap'}}>PRA ONDE?</div>
	</AbsoluteFill>
);

// C · A matemática: R$ 100 vira R$ 23.
export const ThumbMatematica: React.FC = () => (
	<AbsoluteFill style={{background: CORES.papel, overflow: 'hidden'}}>
		<Img src={staticFile('textura-papel.jpg')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'multiply', opacity: 0.5}} />
		<div style={{position: 'absolute', left: 60, top: 60, fontFamily: FONTES.titulo, fontSize: 230, color: CORES.preto, lineHeight: 1, letterSpacing: -6, whiteSpace: 'nowrap'}}>R$ 100</div>
		<svg width="700" height="300" viewBox="0 0 700 300" style={{position: 'absolute', left: 260, top: 230}}>
			<path d="M20 30 C 200 40, 330 90, 430 170" fill="none" stroke={VERMELHO} strokeWidth="34" strokeLinecap="round" />
			<path d="M380 200 L490 215 L470 100Z" fill={VERMELHO} />
		</svg>
		<div style={{position: 'absolute', left: 560, top: 400, padding: '10px 34px 18px', background: VERMELHO, color: CORES.papel, fontFamily: FONTES.titulo, fontSize: 200, lineHeight: 1, letterSpacing: -6, transform: 'rotate(-4deg)', boxShadow: '0 16px 28px rgba(30,20,5,0.4)', whiteSpace: 'nowrap'}}>R$ 23</div>
		<div style={{position: 'absolute', left: 70, top: 420, fontFamily: FONTES.titulo, fontSize: 64, lineHeight: 1.1, color: CORES.preto}}>
			A CONTA
			<br />
			DAS BETS
		</div>
	</AbsoluteFill>
);

// D · Pergunta direta, número gigante, sem personagem.
export const ThumbNumero: React.FC = () => (
	<AbsoluteFill style={{background: CORES.amarelo, overflow: 'hidden'}}>
		<div style={{position: 'absolute', left: 0, right: 0, top: 40, textAlign: 'center', fontFamily: FONTES.titulo, fontSize: 330, lineHeight: 1, color: CORES.preto, letterSpacing: -14, whiteSpace: 'nowrap'}}>30 BI</div>
		<div style={{position: 'absolute', left: 0, right: 0, top: 380, textAlign: 'center', fontFamily: FONTES.titulo, fontSize: 96, color: CORES.preto, whiteSpace: 'nowrap'}}>POR MÊS NAS BETS</div>
		<div style={{position: 'absolute', left: 0, right: 0, top: 520, display: 'flex', justifyContent: 'center'}}>
			<span style={{padding: '6px 30px 12px', background: CORES.preto, color: CORES.amarelo, fontFamily: FONTES.titulo, fontSize: 96, transform: 'rotate(-2deg)', whiteSpace: 'nowrap'}}>CADÊ?</span>
		</div>
	</AbsoluteFill>
);
