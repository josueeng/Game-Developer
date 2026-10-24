import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {CORES, FONTES} from '../config';
import {janela, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Titulo} from '../components/Titulo';
import {Recorte} from '../components/Recorte';
import {Fonte} from '../components/Fonte';
import {MarcaTexto} from '../components/MarcaTexto';
import {IconeX} from '../components/Icones';

// Lei nº 4.737/1965 (Código Eleitoral), art. 299 — texto legal.
// Lei nº 9.504/1997 (Lei das Eleições), art. 41-A — incluído pela Lei nº 9.840/1999.
export const Cena6Crime: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	const fimA = m(5, 10);
	const iniB = m(5, -6);

	return (
		<AbsoluteFill>
			{/* Parte A: o crime */}
			<AbsoluteFill style={{opacity: janela(frame, -12, fimA)}}>
				<KenBurns zoom={[1.0, 1.05]} origem="35% 50%">
					<Titulo texto="Compra de votos" inicio={4} />
					<Recorte seed="lei299" inicio={m(2, -8)} cor="#F7F1E1" rotacao={-1.5} intensidade={1.4} style={{left: 120, top: 190, width: 900}} padding="34px 42px 40px">
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 24, letterSpacing: 2, color: CORES.cinza, borderBottom: `3px solid ${CORES.preto}`, paddingBottom: 10, marginBottom: 18}}>
							CÓDIGO ELEITORAL · LEI Nº 4.737/1965
						</div>
						<div style={{fontFamily: FONTES.jornal, fontWeight: 700, fontSize: 35, lineHeight: 1.42, color: CORES.preto}}>
							<b>Art. 299.</b> <MarcaTexto inicio={m(4)}>Dar, oferecer, prometer,</MarcaTexto>{' '}
							<MarcaTexto inicio={m(4.55)}>solicitar ou receber,</MarcaTexto> para si ou para outrem, dinheiro, dádiva, ou qualquer outra vantagem, para obter ou dar voto (…)
							<div style={{marginTop: 14}}>
								<MarcaTexto inicio={m(3, 4)}>Pena – reclusão até quatro anos</MarcaTexto> e pagamento de cinco a quinze dias-multa.
							</div>
						</div>
					</Recorte>
					<Carimbo inicio={m(1.45)} />
					<Recorte seed="pena" inicio={m(3.3)} cor={CORES.amarelo} rotacao={2} style={{left: 1130, top: 470, width: 640}} padding="22px 32px">
						<div style={{fontFamily: FONTES.titulo, fontSize: 50, color: CORES.preto, lineHeight: 1.1}}>Até 4 anos de reclusão + multa</div>
					</Recorte>
					<Recorte seed="quem" inicio={m(4.3)} rotacao={-1} style={{left: 1130, top: 640, width: 640}} padding="18px 32px">
						<div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
							{['quem oferece', 'quem aceita'].map((q) => (
								<div key={q} style={{display: 'flex', alignItems: 'center', gap: 10}}>
									<IconeX tamanho={46} />
									<span style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 36, color: CORES.preto}}>{q}</span>
								</div>
							))}
						</div>
					</Recorte>
					<Fonte texto="LEI Nº 4.737/1965 (CÓDIGO ELEITORAL), ART. 299" inicio={m(2)} style={{left: 130, top: 775}} />
				</KenBurns>
			</AbsoluteFill>

			{/* Parte B: o candidato e a denúncia */}
			<AbsoluteFill style={{opacity: janela(frame, iniB, 99999)}}>
				<KenBurns zoom={[1.05, 1.0]}>
					<Titulo texto="E o candidato?" inicio={iniB} />
					<Recorte seed="41a" inicio={iniB + 10} cor="#F7F1E1" rotacao={1.5} style={{left: 130, top: 220, width: 860}} padding="36px 44px 44px">
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 24, letterSpacing: 2, color: CORES.cinza, borderBottom: `3px solid ${CORES.preto}`, paddingBottom: 10, marginBottom: 20}}>
							LEI DAS ELEIÇÕES · LEI Nº 9.504/1997, ART. 41-A
						</div>
						<div style={{fontFamily: FONTES.jornal, fontWeight: 700, fontSize: 40, lineHeight: 1.35, color: CORES.preto}}>
							Comprar votos pode custar ao candidato <MarcaTexto inicio={m(6)}>multa e cassação do registro ou do diploma</MarcaTexto> — ou seja, perder a candidatura ou o mandato.
						</div>
					</Recorte>
					<Recorte seed="pardal" inicio={m(8)} cor={CORES.azul} rotacao={-2} style={{left: 1110, top: 300, width: 660}} padding="34px 40px">
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 36, color: CORES.azulClaro}}>VIU COMPRA DE VOTOS?</div>
						<div style={{fontFamily: FONTES.titulo, fontSize: 70, color: CORES.papel, lineHeight: 1.1, marginTop: 6}}>Denuncie no app Pardal</div>
						<div style={{fontFamily: FONTES.texto, fontWeight: 700, fontSize: 30, color: CORES.papel, marginTop: 10}}>aplicativo oficial do TSE</div>
					</Recorte>
					<Fonte texto="LEI Nº 9.504/1997, ART. 41-A (INCLUÍDO PELA LEI Nº 9.840/1999) · TSE" inicio={iniB + 20} style={{left: 140, top: 775}} />
				</KenBurns>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

// Carimbo "CRIME" que bate no papel.
const Carimbo: React.FC<{inicio: number}> = ({inicio}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const s = spring({frame: frame - inicio, fps, config: {damping: 10, stiffness: 180}});
	return (
		<div
			style={{
				position: 'absolute',
				left: 1190,
				top: 200,
				padding: '16px 44px',
				border: `12px solid ${CORES.azul}`,
				borderRadius: 18,
				color: CORES.azul,
				fontFamily: FONTES.titulo,
				fontSize: 124,
				lineHeight: 1,
				letterSpacing: 8,
				transform: `rotate(-8deg) scale(${interpolate(s, [0, 1], [2.2, 1])})`,
				opacity: interpolate(s, [0, 0.2], [0, 0.92], {extrapolateRight: 'clamp'}),
				mixBlendMode: 'multiply',
			}}
		>
			CRIME
		</div>
	);
};
