import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {progresso, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Titulo} from '../components/Titulo';
import {Recorte} from '../components/Recorte';
import {Fonte} from '../components/Fonte';
import {IconeCheck, Pessoa} from '../components/Icones';

const URL = 'divulgacandcontas.tse.jus.br';

export const Cena4Pesquisar: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();

	const itens = [
		{texto: 'Bens declarados', em: m(2.3)},
		{texto: 'Certidões criminais', em: m(2.65)},
		{texto: 'Contas da campanha', em: m(3, 4)},
		{texto: 'Plano de governo (executivo)', em: m(4.4)},
		{texto: 'O que já fez', em: m(5.55), historico: true},
		{texto: 'Como votou', em: m(6, 2), historico: true},
		{texto: 'Prometeu × cumpriu', em: m(6.45), historico: true},
	];
	const letras = Math.round(progresso(frame, m(1, 4), m(1, 44)) * URL.length);

	return (
		<AbsoluteFill>
			<KenBurns zoom={[1.0, 1.06]} pan={[-30, 0]} origem="40% 50%">
				<Titulo texto="Como pesquisar um candidato" inicio={4} />

				{/* Navegador recortado com a ficha genérica */}
				<Recorte seed="navegador" inicio={m(1, -14)} rotacao={-1.5} style={{left: 120, top: 210, width: 820, height: 480}} padding={0}>
					<div style={{background: CORES.preto, height: 64, display: 'flex', alignItems: 'center', padding: '0 22px', gap: 12}}>
						{[CORES.amarelo, CORES.azulClaro, CORES.papel].map((c) => (
							<span key={c} style={{width: 18, height: 18, borderRadius: 9, background: c}} />
						))}
						<div style={{marginLeft: 14, flex: 1, background: CORES.papel, height: 40, borderRadius: 20, display: 'flex', alignItems: 'center', padding: '0 20px', fontFamily: FONTES.texto, fontWeight: 700, fontSize: 26, color: CORES.preto}}>
							{URL.slice(0, letras)}
							<span style={{opacity: frame % 20 < 10 && letras < URL.length ? 1 : 0}}>|</span>
						</div>
					</div>
					<div style={{display: 'flex', padding: 34, gap: 30, opacity: progresso(frame, m(1, 44), m(1, 56))}}>
						<div style={{width: 190, height: 230, background: CORES.begeEscuro, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden', border: `4px solid ${CORES.preto}`}}>
							<Pessoa tamanho={170} cor={CORES.azulClaro} />
						</div>
						<div style={{flex: 1}}>
							<div style={{fontFamily: FONTES.titulo, fontSize: 38, color: CORES.preto}}>CANDIDATO(A)</div>
							<div style={{fontFamily: FONTES.texto, fontWeight: 700, fontSize: 26, color: CORES.cinza, marginBottom: 18}}>ficha de exemplo</div>
							{[92, 78, 86, 60, 74].map((w, i) => (
								<div key={i} style={{height: 12, width: `${w}%`, background: '#B9AE98', borderRadius: 3, marginBottom: 14}} />
							))}
						</div>
					</div>
					<div style={{display: 'flex', gap: 14, padding: '0 34px', opacity: progresso(frame, m(1, 56), m(1, 68))}}>
						{['Bens', 'Certidões', 'Contas', 'Propostas'].map((aba, i) => (
							<div key={aba} style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 24, padding: '8px 16px', border: `3px solid ${CORES.preto}`, background: i === 0 ? CORES.amarelo : CORES.papel}}>
								{aba}
							</div>
						))}
					</div>
				</Recorte>
				<Fonte texto="DIVULGACANDCONTAS.TSE.JUS.BR (TSE)" inicio={m(1, 10)} style={{left: 130, top: 730}} />

				{/* Checklist */}
				<div style={{position: 'absolute', left: 1030, top: 185, width: 780}}>
					{itens.map((it, i) => {
						const p = progresso(frame, it.em, it.em + 14);
						const mostrar = progresso(frame, it.em - 6, it.em + 4);
						return (
							<React.Fragment key={it.texto}>
								{it.historico && !itens[i - 1].historico ? (
									<div style={{fontFamily: FONTES.mao, fontWeight: 700, fontSize: 44, color: CORES.azul, margin: '10px 0 4px', opacity: progresso(frame, m(5, 6), m(5, 18))}}>
										…e o histórico:
									</div>
								) : null}
								<div style={{display: 'flex', alignItems: 'center', gap: 20, height: 70, opacity: mostrar, transform: `translateX(${(1 - mostrar) * 30}px)`}}>
									<IconeCheck tamanho={52} progresso={p} cor={it.historico ? CORES.azul : CORES.preto} />
									<span style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 40, color: CORES.preto}}>{it.texto}</span>
								</div>
							</React.Fragment>
						);
					})}
				</div>
			</KenBurns>
		</AbsoluteFill>
	);
};
