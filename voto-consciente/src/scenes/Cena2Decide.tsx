import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {janela, progresso, useTempoCena} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Titulo} from '../components/Titulo';
import {Recorte} from '../components/Recorte';
import {Fonte} from '../components/Fonte';
import {LinhaDoTempo} from '../components/LinhaDoTempo';
import {IconeEducacao, IconeOrcamento, IconeSaude, IconeSeguranca} from '../components/Icones';

// `em`: fração da cena em que o card aparece (acompanha a narração).
const AREAS = [
	{nome: 'Orçamento', Icone: IconeOrcamento, rot: 3, em: 0.2},
	{nome: 'Saúde', Icone: IconeSaude, rot: -3, em: 0.31},
	{nome: 'Educação', Icone: IconeEducacao, rot: 2, em: 0.345},
	{nome: 'Segurança', Icone: IconeSeguranca, rot: -1.5, em: 0.38},
];

export const Cena2Decide: React.FC = () => {
	const frame = useCurrentFrame();
	const t = useTempoCena();
	const fimA = t(0.54);
	const iniB = t(0.52);

	return (
		<AbsoluteFill>
			<KenBurns zoom={[1.04, 1.0]} pan={[10, 0]}>
				{/* Parte A: as áreas que o voto decide */}
				<AbsoluteFill style={{opacity: janela(frame, -12, fimA)}}>
					<Titulo texto="O que o voto decide" inicio={4} />
					<Recorte seed="confirma" inicio={t(0.04)} cor={CORES.azul} rotacao={2} style={{left: 1330, top: 90}} padding="14px 34px">
						<div style={{fontFamily: FONTES.titulo, fontSize: 40, color: CORES.papel, letterSpacing: 2}}>CONFIRMA</div>
					</Recorte>
					{AREAS.map((a, i) => {
						const inicio = t(a.em);
						return (
							<Recorte
								key={a.nome}
								seed={`area-${a.nome}`}
								inicio={inicio}
								rotacao={a.rot}
								style={{left: 150 + i * 410, top: 300, width: 350, height: 380}}
								padding="40px 20px"
							>
								<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28}}>
									<a.Icone tamanho={170} />
									<div style={{fontFamily: FONTES.titulo, fontSize: 46, color: CORES.preto}}>{a.nome}</div>
								</div>
							</Recorte>
						);
					})}
					<div
						style={{
							position: 'absolute',
							top: 740,
							width: '100%',
							textAlign: 'center',
							fontFamily: FONTES.mao,
							fontWeight: 700,
							fontSize: 52,
							color: CORES.preto,
							opacity: progresso(frame, t(0.43), t(0.46)),
						}}
					>
						…e as obras da sua cidade
					</div>
				</AbsoluteFill>

				{/* Parte B: por quantos anos — linha do tempo */}
				<AbsoluteFill style={{opacity: janela(frame, iniB, t(1) + 40)}}>
					<Titulo texto="Por quantos anos?" inicio={iniB} />
					<div style={{position: 'absolute', left: 160, top: 340}}>
						<LinhaDoTempo
							inicio={iniB + 12}
							duracao={t(0.3)}
							largura={1600}
							posicoes={[0.02, 0.2, 0.62, 0.98]}
							marcos={[
								{ano: '2026', texto: 'Eleição', destaque: true},
								{ano: '2027', texto: 'Posse dos eleitos'},
								{ano: '2030', texto: 'Último ano dos mandatos de 4 anos'},
								{ano: '2034', texto: 'Último ano dos senadores eleitos agora', destaque: true},
							]}
						/>
					</div>
					<Faixa inicio={t(0.64)} de={0.2} ate={0.62} y={255} cor={CORES.azul} texto="Presidente, governadores, deputados: 4 anos" />
					<Faixa inicio={t(0.76)} de={0.2} ate={0.98} y={175} cor={CORES.amarelo} texto="Senadores: 8 anos" corTexto={CORES.preto} />
					<Fonte texto="CONSTITUIÇÃO FEDERAL, ARTS. 28, 44, 46 E 82" inicio={iniB + 30} style={{left: 160, top: 760}} />
				</AbsoluteFill>
			</KenBurns>
		</AbsoluteFill>
	);
};

// Faixa horizontal que marca a duração de um mandato sobre a linha do tempo.
const Faixa: React.FC<{inicio: number; de: number; ate: number; y: number; cor: string; texto: string; corTexto?: string}> = ({
	inicio,
	de,
	ate,
	y,
	cor,
	texto,
	corTexto = CORES.papel,
}) => {
	const frame = useCurrentFrame();
	const p = progresso(frame, inicio, inicio + 24);
	const x0 = 160 + de * 1600;
	const w = (ate - de) * 1600;
	return (
		<div
			style={{
				position: 'absolute',
				left: x0,
				top: y,
				width: w * p,
				height: 66,
				background: cor,
				border: `4px solid ${CORES.preto}`,
				boxSizing: 'border-box',
				boxShadow: '0 6px 12px rgba(40,30,15,0.22)',
				overflow: 'hidden',
				display: 'flex',
				alignItems: 'center',
				paddingLeft: 20,
				opacity: p > 0 ? 1 : 0,
			}}
		>
			<span style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 26, color: corTexto, whiteSpace: 'nowrap', opacity: p}}>{texto}</span>
		</div>
	);
};
