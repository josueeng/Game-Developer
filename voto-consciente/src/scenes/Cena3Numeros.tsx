import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {janela, progresso, useTempoCena} from '../anim';
import {KenBurns} from '../components/KenBurns';
import {Titulo} from '../components/Titulo';
import {Recorte} from '../components/Recorte';
import {Fonte} from '../components/Fonte';
import {Numero} from '../components/Numero';
import {MapaBrasil, centroideUF} from '../components/MapaBrasil';
import {GraficoBarras} from '../components/GraficoBarras';
import {MarcaTexto} from '../components/MarcaTexto';

// Dados oficiais do TSE:
// - Eleitorado apto 2026: 158.745.463; SP 34.104.226; MG 16.377.659; RR ~401 mil.
// - Abstenção no 1º turno das eleições gerais: 2014 19,39%; 2018 20,33%;
//   2022 20,95%; 2026 21,08%.
// - Presidente, 1º turno 2026: brancos 2.300.798 (1,84%); nulos 3.674.249 (2,93%).
const MAPA = {x: 130, y: 165, w: 720, h: 665};

export const Cena3Numeros: React.FC = () => {
	const frame = useCurrentFrame();
	const t = useTempoCena();
	const fimA = t(0.48);
	const iniB = t(0.46);
	const fimB = t(0.83);
	const iniC = t(0.81);

	const estados = [
		{uf: 'SP', nome: 'São Paulo', valor: '34.104.226', cor: CORES.amarelo, inicio: t(0.19)},
		{uf: 'MG', nome: 'Minas Gerais', valor: '16.377.659', cor: CORES.azul, inicio: t(0.28)},
		{uf: 'RR', nome: 'Roraima', valor: '~401 mil', cor: CORES.amarelo, inicio: t(0.36)},
	];

	return (
		<AbsoluteFill>
			{/* Parte A: mapa e eleitorado */}
			<AbsoluteFill style={{opacity: janela(frame, -12, fimA)}}>
				<KenBurns zoom={[1.0, 1.05]} origem="30% 50%">
					<div style={{position: 'absolute', left: MAPA.x, top: MAPA.y}}>
						<MapaBrasil largura={MAPA.w} altura={MAPA.h} inicio={4} duracaoEntrada={t(0.12)} destaques={estados.map((e) => ({uf: e.uf, cor: e.cor, inicio: e.inicio}))} />
						{estados.map((e) => {
							const [cx, cy] = centroideUF(e.uf, MAPA.w, MAPA.h);
							return (
								<div
									key={e.uf}
									style={{
										position: 'absolute',
										left: cx - 40,
										top: cy - 20,
										width: 80,
										textAlign: 'center',
										fontFamily: FONTES.titulo,
										fontSize: 30,
										color: e.cor === CORES.azul ? CORES.papel : CORES.preto,
										opacity: progresso(frame, e.inicio + 6, e.inicio + 14),
									}}
								>
									{e.uf}
								</div>
							);
						})}
					</div>
					<Titulo texto="Os números" inicio={2} x={110} y={60} />
					<div style={{position: 'absolute', left: 960, top: 120, width: 860}}>
						<div style={{fontFamily: FONTES.titulo, fontSize: 120, color: CORES.preto, lineHeight: 1, opacity: progresso(frame, t(0.06), t(0.07))}}>
							<Numero para={158.7} inicio={t(0.06)} duracao={40} casas={1} /> mi
						</div>
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 44, color: CORES.preto, marginTop: 10, opacity: progresso(frame, t(0.07), t(0.09))}}>
							de <MarcaTexto inicio={t(0.09)}>eleitores aptos</MarcaTexto> em 2026
						</div>
					</div>
					{estados.map((e, i) => (
						<Recorte key={e.uf} seed={`uf-${e.uf}`} inicio={e.inicio} rotacao={i % 2 ? 1.5 : -1.5} style={{left: 960, top: 340 + i * 132, width: 780}} padding="18px 28px">
							<div style={{display: 'flex', alignItems: 'center', gap: 22}}>
								<span style={{width: 40, height: 40, background: e.cor, border: `4px solid ${CORES.preto}`, flexShrink: 0}} />
								<span style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 40, color: CORES.preto, flex: 1}}>{e.nome}</span>
								<span style={{fontFamily: FONTES.titulo, fontSize: 46, color: CORES.preto}}>{e.valor}</span>
							</div>
						</Recorte>
					))}
					<Fonte texto="TSE — ELEITORADO APTO, ELEIÇÕES 2026" inicio={t(0.08)} style={{left: 965, top: 760}} />
					<Fonte texto="MALHA: IBGE (GIS-DATASET-BRASIL)" inicio={20} style={{left: 965, top: 798, fontSize: 16}} />
				</KenBurns>
			</AbsoluteFill>

			{/* Parte B: abstenção ao longo do tempo */}
			<AbsoluteFill style={{opacity: janela(frame, iniB, fimB)}}>
				<KenBurns zoom={[1.05, 1.0]}>
					<Titulo texto="Abstenção no 1º turno" inicio={iniB} x={110} y={60} />
					<div style={{position: 'absolute', left: 1240, top: 70, width: 560, fontFamily: FONTES.texto, fontWeight: 700, fontSize: 30, color: CORES.cinza, lineHeight: 1.3, textAlign: 'right', opacity: progresso(frame, iniB + 10, iniB + 22)}}>
						% do eleitorado que não foi votar nas eleições gerais
					</div>
					<div style={{position: 'absolute', left: 360, top: 170}}>
						<GraficoBarras
							inicio={iniB + 14}
							intervalo={18}
							largura={1200}
							altura={560}
							maximo={25}
							dados={[
								{rotulo: '2014', valor: 19.39},
								{rotulo: '2018', valor: 20.33},
								{rotulo: '2022', valor: 20.95},
								{rotulo: '2026', valor: 21.08, destaque: true, nota: 'maior desde 1998'},
							]}
						/>
					</div>
					<Fonte texto="TSE — RESULTADOS DO 1º TURNO; AGÊNCIA SENADO (05/10/2026)" inicio={iniB + 30} style={{left: 360, top: 760}} />
				</KenBurns>
			</AbsoluteFill>

			{/* Parte C: brancos e nulos para presidente */}
			<AbsoluteFill style={{opacity: janela(frame, iniC, t(1) + 40)}}>
				<KenBurns zoom={[1.0, 1.05]}>
					<Titulo texto="Brancos e nulos · Presidente" inicio={iniC} x={110} y={60} />
					<Recorte seed="brancos" inicio={iniC + 10} rotacao={-2} style={{left: 120, top: 300, width: 540}} padding="34px 36px">
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 40, color: CORES.cinza}}>BRANCOS</div>
						<div style={{fontFamily: FONTES.titulo, fontSize: 82, color: CORES.preto}}>
							<Numero para={2_300_798} inicio={iniC + 14} duracao={40} />
						</div>
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 36, color: CORES.azul}}>1,84% dos votos</div>
					</Recorte>
					<div style={{position: 'absolute', left: 688, top: 390, fontFamily: FONTES.titulo, fontSize: 110, color: CORES.preto, opacity: progresso(frame, iniC + 22, iniC + 30)}}>+</div>
					<Recorte seed="nulos" inicio={iniC + 22} rotacao={1.5} style={{left: 790, top: 300, width: 540}} padding="34px 36px">
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 40, color: CORES.cinza}}>NULOS</div>
						<div style={{fontFamily: FONTES.titulo, fontSize: 82, color: CORES.preto}}>
							<Numero para={3_674_249} inicio={iniC + 26} duracao={40} />
						</div>
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 36, color: CORES.azul}}>2,93% dos votos</div>
					</Recorte>
					<Recorte seed="total-bn" inicio={iniC + 50} cor={CORES.amarelo} rotacao={-1} style={{left: 1390, top: 280, width: 410}} padding="26px 30px">
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 34, color: CORES.preto}}>= QUASE</div>
						<div style={{fontFamily: FONTES.titulo, fontSize: 120, color: CORES.preto, lineHeight: 1}}>6</div>
						<div style={{fontFamily: FONTES.titulo, fontSize: 64, color: CORES.preto, lineHeight: 1.05}}>milhões</div>
						<div style={{fontFamily: FONTES.texto, fontWeight: 800, fontSize: 30, color: CORES.preto}}>de votos</div>
					</Recorte>
					<Fonte texto="TSE — TOTALIZAÇÃO DO 1º TURNO 2026 (PRESIDENTE)" inicio={iniC + 30} style={{left: 125, top: 700}} />
				</KenBurns>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
