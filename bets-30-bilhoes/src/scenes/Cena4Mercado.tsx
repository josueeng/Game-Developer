import React, {useMemo} from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {progresso, useMarcas} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Titulo} from '../components/Titulo';
import {Recorte} from '../components/Recorte';
import {Fonte} from '../components/Fonte';
import {Numero} from '../components/Numero';
import {MarcaTexto} from '../components/MarcaTexto';
import {MapaBrasil, pontosNoMapa} from '../components/MapaBrasil';

// Ministério da Fazenda (SPA), panorama do 1º semestre de 2025:
// 17,7 milhões de apostadores; GGR (receita das casas, já sem prêmios) de
// R$ 17,4 bi; gasto médio de R$ 164 por mês por apostador.
const MAPA = {x: 120, y: 170, w: 660, h: 640};

export const Cena4Mercado: React.FC = () => {
	const frame = useCurrentFrame();
	const m = useMarcas();
	const pontos = useMemo(() => pontosNoMapa(420, MAPA.w, MAPA.h, 'apostadores'), []);
	const iniPontos = m(1);
	const fimPontos = m(2, 40);

	return (
		<AbsoluteFill>
			<KenBurns zoom={[1.0, 1.05]} origem="30% 50%">
				<Titulo texto="Não era pouca gente" inicio={2} />
				<div style={{position: 'absolute', left: MAPA.x, top: MAPA.y}}>
					<MapaBrasil largura={MAPA.w} altura={MAPA.h} inicio={2} duracaoEntrada={24} />
					<svg width={MAPA.w} height={MAPA.h} style={{position: 'absolute', left: 0, top: 0}}>
						{pontos.map(([x, y], i) => {
							const em = iniPontos + (i / pontos.length) * (fimPontos - iniPontos);
							const p = progresso(frame, em, em + 6);
							return <circle key={i} cx={x} cy={y} r={7 * p} fill={i % 9 === 0 ? CORES.amarelo : CORES.azul} stroke={CORES.preto} strokeWidth={1.5 * p} />;
						})}
					</svg>
				</div>
				<div style={{position: 'absolute', left: 140, top: 790, fontFamily: FONTES.texto, fontWeight: 700, fontSize: 18, color: CORES.cinza, opacity: progresso(frame, iniPontos, iniPontos + 10)}}>
					pontos ilustrativos
				</div>

				<Cartao inicio={m(2)} y={170} cor={CORES.papel} seed="c1">
					<Grande><Numero para={17.7} inicio={m(2)} duracao={36} casas={1} /> milhões</Grande>
					<Pequeno>de brasileiros apostaram no 1º semestre de 2025</Pequeno>
				</Cartao>
				<Cartao inicio={m(3)} y={380} cor={CORES.amarelo} seed="c2">
					<Grande>R$ <Numero para={17.4} inicio={m(3)} duracao={36} casas={1} /> bi</Grande>
					<Pequeno>
						ficaram com as casas, <MarcaTexto inicio={m(4)} cor={CORES.papel}>já sem os prêmios</MarcaTexto>
					</Pequeno>
				</Cartao>
				<Cartao inicio={m(5)} y={590} cor={CORES.papel} seed="c3">
					<Grande>R$ <Numero para={164} inicio={m(5)} duracao={30} /> /mês</Grande>
					<Pequeno>deixados, em média, por cada apostador</Pequeno>
				</Cartao>
				<Fonte texto="MINISTÉRIO DA FAZENDA (SPA), 1º SEMESTRE DE 2025" inicio={m(2, 10)} style={{left: 905, top: 800}} />
			</KenBurns>
		</AbsoluteFill>
	);
};

const Cartao: React.FC<{inicio: number; y: number; cor: string; seed: string; children: React.ReactNode}> = ({inicio, y, cor, seed, children}) => (
	<Recorte seed={seed} inicio={inicio} cor={cor} rotacao={y % 2 ? 1.5 : -1.5} style={{left: 890, top: y, width: 900}} padding="20px 34px">
		{children}
	</Recorte>
);
const Grande: React.FC<{children: React.ReactNode}> = ({children}) => (
	<div style={{fontFamily: FONTES.titulo, fontSize: 84, color: CORES.preto, lineHeight: 1}}>{children}</div>
);
const Pequeno: React.FC<{children: React.ReactNode}> = ({children}) => (
	<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 30, color: CORES.preto, marginTop: 8}}>{children}</div>
);
