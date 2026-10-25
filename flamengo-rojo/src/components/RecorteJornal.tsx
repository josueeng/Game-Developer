import React from 'react';
import {random} from 'remotion';
import {CORES, FONTES} from '../config';
import {Recorte} from './Recorte';

// Recorte de jornal inventado (nome e textos fictícios), com manchete e
// colunas de "texto" representadas por linhas cinzas.
export const RecorteJornal: React.FC<{
	seed: string;
	inicio: number;
	manchete: React.ReactNode;
	linhaFina?: React.ReactNode;
	jornal?: string;
	data?: string;
	largura: number;
	x: number;
	y: number;
	rotacao?: number;
	tamanhoManchete?: number;
	linhas?: number;
	colunas?: number;
}> = ({
	seed,
	inicio,
	manchete,
	linhaFina,
	jornal = 'O CORREIO DO CIDADÃO',
	data = 'EDIÇÃO EXTRA',
	largura,
	x,
	y,
	rotacao = 0,
	tamanhoManchete = 64,
	linhas = 6,
	colunas = 3,
}) => (
	<Recorte seed={seed} inicio={inicio} rotacao={rotacao} cor="#F7F1E1" intensidade={1.6} style={{left: x, top: y, width: largura}} padding="26px 34px 30px">
		<div style={{borderBottom: `3px double ${CORES.preto}`, paddingBottom: 8, marginBottom: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
			<span style={{fontFamily: FONTES.jornal, fontWeight: 900, fontSize: 26, letterSpacing: 2, color: CORES.preto}}>{jornal}</span>
			<span style={{fontFamily: FONTES.texto, fontWeight: 700, fontSize: 15, letterSpacing: 2, color: CORES.cinza}}>{data}</span>
		</div>
		<div style={{fontFamily: FONTES.jornal, fontWeight: 900, fontSize: tamanhoManchete, lineHeight: 1.08, color: CORES.preto}}>{manchete}</div>
		{linhaFina ? (
			<div style={{fontFamily: FONTES.jornal, fontWeight: 700, fontStyle: 'italic', fontSize: tamanhoManchete * 0.42, lineHeight: 1.3, color: '#3b352d', marginTop: 12}}>
				{linhaFina}
			</div>
		) : null}
		{linhas > 0 ? (
			<div style={{display: 'flex', gap: 22, marginTop: 18}}>
				{Array.from({length: colunas}).map((_, c) => (
					<div key={c} style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 9}}>
						{Array.from({length: linhas}).map((__, l) => (
							<div
								key={l}
								style={{
									height: 7,
									background: '#B9AE98',
									borderRadius: 2,
									width: l === linhas - 1 ? `${45 + random(`${seed}${c}${l}`) * 30}%` : `${90 + random(`${seed}${c}${l}`) * 10}%`,
								}}
							/>
						))}
					</div>
				))}
			</div>
		) : null}
	</Recorte>
);
