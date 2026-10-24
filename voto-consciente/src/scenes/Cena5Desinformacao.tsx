import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {janela, progresso, useTempoCena} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Titulo} from '../components/Titulo';
import {Recorte} from '../components/Recorte';
import {Fonte} from '../components/Fonte';
import {MarcaTexto} from '../components/MarcaTexto';
import {IconeCheck} from '../components/Icones';

// Mensagem fictícia, criada só para ilustrar os sinais de alerta.
export const Cena5Desinformacao: React.FC = () => {
	const frame = useCurrentFrame();
	const t = useTempoCena();
	const iniDicas = t(0.53);

	const notas = [
		{texto: 'título alarmante', em: t(0.15), y: 270},
		{texto: 'sem fonte, sem data', em: t(0.3), y: 440},
		{texto: 'pede pressa', em: t(0.4), y: 545},
	];

	return (
		<AbsoluteFill>
			<KenBurns zoom={[1.0, 1.06]} origem="30% 50%">
				<Titulo texto="Desinformação" inicio={4} />

				{/* Celular com a mensagem falsa */}
				<Recorte seed="celular" inicio={t(0.03)} cor={CORES.preto} rotacao={-3} intensidade={0.4} style={{left: 190, top: 170, width: 470, height: 650}} padding={18}>
					<div style={{background: '#E9E3D3', width: '100%', height: '100%', borderRadius: 22, padding: '28px 22px', boxSizing: 'border-box'}}>
						<div style={{fontFamily: FONTES.texto, fontWeight: 700, fontSize: 20, color: CORES.cinza, textAlign: 'center', marginBottom: 18}}>Encaminhada com frequência</div>
						<div style={{background: CORES.papel, borderRadius: 18, padding: '22px 22px', boxShadow: '0 3px 6px rgba(0,0,0,0.12)'}}>
							<div style={{fontFamily: FONTES.titulo, fontSize: 40, lineHeight: 1.12, color: CORES.preto}}>
								<MarcaTexto inicio={notas[0].em}>URGENTE!!! VEJA O QUE ESCONDERAM</MarcaTexto>
							</div>
							<div style={{display: 'flex', flexDirection: 'column', gap: 10, margin: '20px 0'}}>
								{[95, 88, 70].map((w) => (
									<div key={w} style={{height: 10, width: `${w}%`, background: '#B9AE98', borderRadius: 3}} />
								))}
							</div>
							<div style={{fontFamily: FONTES.texto, fontWeight: 700, fontSize: 24, color: CORES.cinza, fontStyle: 'italic'}}>
								<MarcaTexto inicio={notas[1].em}>fonte: ??? · data: ???</MarcaTexto>
							</div>
							<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 30, color: CORES.preto, marginTop: 18}}>
								<MarcaTexto inicio={notas[2].em}>Compartilhe antes que apaguem!!!</MarcaTexto>
							</div>
						</div>
					</div>
				</Recorte>

				{/* Anotações à mão */}
				<AbsoluteFill style={{opacity: janela(frame, notas[0].em, iniDicas + 4)}}>
					{notas.map((n) => (
						<div key={n.texto} style={{position: 'absolute', left: 720, top: n.y, display: 'flex', alignItems: 'center', gap: 18, opacity: progresso(frame, n.em + 8, n.em + 18)}}>
							<svg width="120" height="40" viewBox="0 0 120 40">
								<path d="M116 20 C80 8 50 30 10 20 M10 20 L28 8 M10 20 L26 34" stroke={CORES.azul} strokeWidth={6} fill="none" strokeLinecap="round" />
							</svg>
							<span style={{fontFamily: FONTES.mao, fontWeight: 700, fontSize: 64, color: CORES.azul, transform: 'rotate(-3deg)'}}>{n.texto}</span>
						</div>
					))}
				</AbsoluteFill>

				{/* Dicas */}
				<Recorte seed="dicas" inicio={iniDicas + 4} rotacao={1.5} style={{left: 790, top: 190, width: 1000}} padding="40px 50px 46px">
					<div style={{fontFamily: FONTES.titulo, fontSize: 52, color: CORES.preto, marginBottom: 24}}>Antes de repassar:</div>
					{[
						{texto: 'Confira em veículos conhecidos', em: t(0.56)},
						{texto: 'Consulte o "Fato ou Boato"', sub: 'página da Justiça Eleitoral', em: t(0.72)},
					].map((d) => (
						<div key={d.texto} style={{display: 'flex', alignItems: 'center', gap: 22, marginBottom: 22, opacity: progresso(frame, d.em - 4, d.em + 6)}}>
							<IconeCheck tamanho={56} progresso={progresso(frame, d.em, d.em + 14)} />
							<div>
								<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 42, color: CORES.preto}}>{d.texto}</div>
								{d.sub ? <div style={{fontFamily: FONTES.texto, fontWeight: 700, fontSize: 28, color: CORES.cinza}}>{d.sub}</div> : null}
							</div>
						</div>
					))}
				</Recorte>
				<Recorte seed="na-duvida" inicio={t(0.87)} cor={CORES.amarelo} rotacao={-2.5} style={{left: 1040, top: 570}} padding="20px 40px">
					<div style={{fontFamily: FONTES.titulo, fontSize: 56, lineHeight: 1.1, color: CORES.preto}}>
						NA DÚVIDA,
						<br />
						NÃO COMPARTILHE.
					</div>
				</Recorte>
				<Fonte texto="JUSTICAELEITORAL.JUS.BR/FATO-OU-BOATO" inicio={t(0.72)} style={{left: 800, top: 760}} />
			</KenBurns>
		</AbsoluteFill>
	);
};
