import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {CORES, FONTES} from '../config';
import {janela, progresso, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Titulo} from '../components/Titulo';
import {Recorte} from '../components/Recorte';
import {Fonte} from '../components/Fonte';
import {MarcaTexto} from '../components/MarcaTexto';
import {IconeCheck, IconeInterrogacao, IconeX} from '../components/Icones';

// Tramitação: MPV 1.394/2026 (Congresso Nacional). Aviso de golpe: a devolução
// oficial não exige nenhum pagamento (Agência Brasil). A mensagem mostrada é
// fictícia, criada só para ilustrar.
export const Cena6Agora: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	const fimA = m(4, 10);
	const iniB = m(4, -6);

	const passos = [
		{t: 'A MP vale na hora', em: m(1), Icone: () => <IconeCheck tamanho={58} progresso={progresso(frame, m(1), m(1, 14))} />},
		{t: 'Precisa ser aprovada pelo Congresso', em: m(2), Icone: () => <IconeInterrogacao tamanho={58} />},
		{t: 'Se não for, perde a validade', em: m(3), Icone: () => <div style={{width: 58, height: 58, background: CORES.preto, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><IconeX tamanho={40} cor={CORES.amarelo} /></div>},
	];

	return (
		<AbsoluteFill>
			{/* A: a MP ainda precisa do Congresso */}
			<AbsoluteFill style={{opacity: janela(frame, -12, fimA)}}>
				<KenBurns zoom={[1.0, 1.05]} origem="30% 50%">
					<Titulo texto="A história não acabou" inicio={2} />
					<div style={{position: 'absolute', left: 140, top: 250, opacity: progresso(frame, 6, 20)}}>
						<Congresso />
					</div>
					<div style={{position: 'absolute', left: 860, top: 250, width: 960}}>
						{passos.map((p) => (
							<div key={p.t} style={{display: 'flex', alignItems: 'center', gap: 26, height: 140, opacity: progresso(frame, p.em - 4, p.em + 8), transform: `translateX(${(1 - progresso(frame, p.em - 4, p.em + 8)) * 30}px)`}}>
								<p.Icone />
								<span style={{fontFamily: FONTES.titulo, fontSize: 50, color: CORES.preto, lineHeight: 1.1}}>{p.t}</span>
							</div>
						))}
					</div>
					<Fonte texto="CONGRESSO NACIONAL: TRAMITAÇÃO DA MPV 1.394/2026" inicio={m(2)} style={{left: 870, top: 720}} />
				</KenBurns>
			</AbsoluteFill>

			{/* B: o golpe do saldo */}
			<AbsoluteFill style={{opacity: janela(frame, iniB, 99999)}}>
				<KenBurns zoom={[1.0, 1.06]} origem="35% 50%">
					<Titulo texto="Atenção: golpe novo" inicio={iniB} cor={CORES.amarelo} corTexto={CORES.preto} />
					<Recorte seed="cel-golpe" inicio={iniB + 4} cor={CORES.preto} rotacao={-3} intensidade={0.4} style={{left: 190, top: 170, width: 520, height: 640}} padding={18}>
						<div style={{background: '#E9E3D3', width: '100%', height: '100%', borderRadius: 22, padding: '30px 24px', boxSizing: 'border-box'}}>
							<div style={{fontFamily: FONTES.texto, fontWeight: 700, fontSize: 22, color: CORES.cinza, textAlign: 'center', marginBottom: 18}}>Mensagem de número desconhecido</div>
							<div style={{background: CORES.papel, borderRadius: 18, padding: '22px 22px', boxShadow: '0 3px 6px rgba(0,0,0,0.12)', fontFamily: FONTES.texto, fontWeight: 700, fontSize: 30, lineHeight: 1.3, color: CORES.preto}}>
								Seu saldo de <b>R$ 847,30</b> das bets foi liberado!
								<br />
								<br />
								Para receber, <MarcaTexto inicio={m(4.5)}>pague a taxa de R$ 29,90 via Pix</MarcaTexto> até hoje.
							</div>
						</div>
					</Recorte>
					<Recorte seed="oficial" inicio={m(5)} rotacao={1.5} style={{left: 900, top: 230, width: 880}} padding="28px 36px">
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 30, color: CORES.cinza}}>DEVOLUÇÃO OFICIAL</div>
						<div style={{fontFamily: FONTES.titulo, fontSize: 52, color: CORES.preto, lineHeight: 1.15, marginTop: 6}}>direto na sua conta, sem pagar nada</div>
					</Recorte>
					<CarimboGolpe inicio={m(6)} />
					<Fonte texto="AGÊNCIA BRASIL (OUT/2026) · MENSAGEM FICTÍCIA" inicio={m(5)} style={{left: 905, top: 760}} />
				</KenBurns>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

// Silhueta simplificada de um parlamento (duas cúpulas e duas torres).
const Congresso: React.FC = () => (
	<svg width="620" height="460" viewBox="0 0 620 460">
		<rect x="20" y="360" width="580" height="40" fill={CORES.preto} />
		<rect x="270" y="80" width="34" height="280" fill={CORES.azul} stroke={CORES.preto} strokeWidth="5" />
		<rect x="316" y="80" width="34" height="280" fill={CORES.azul} stroke={CORES.preto} strokeWidth="5" />
		<path d="M60 360 A90 60 0 0 1 240 360Z" fill={CORES.papel} stroke={CORES.preto} strokeWidth="6" />
		<path d="M380 300 A90 60 0 0 0 560 300 L560 360 L380 360Z" fill={CORES.papel} stroke={CORES.preto} strokeWidth="6" />
		<rect x="40" y="400" width="540" height="18" fill={CORES.begeEscuro} />
	</svg>
);

const CarimboGolpe: React.FC<{inicio: number}> = ({inicio}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const s = spring({frame: frame - inicio, fps, config: {damping: 10, stiffness: 180}});
	return (
		<div
			style={{
				position: 'absolute',
				left: 1000,
				top: 470,
				padding: '14px 44px',
				border: `14px solid ${CORES.preto}`,
				borderRadius: 18,
				background: CORES.amarelo,
				color: CORES.preto,
				fontFamily: FONTES.titulo,
				fontSize: 120,
				lineHeight: 1,
				letterSpacing: 4,
				transform: `rotate(-8deg) scale(${interpolate(s, [0, 1], [2.2, 1])})`,
				opacity: interpolate(s, [0, 0.2], [0, 1], {extrapolateRight: 'clamp'}),
				boxShadow: '0 14px 22px rgba(30,20,5,0.35)',
			}}
		>
			É GOLPE
		</div>
	);
};
