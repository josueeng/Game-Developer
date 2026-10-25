import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CORES, FONTES} from '../config';
import {progresso} from '../anim';

export type Barra = {rotulo: string; valor: number; destaque?: boolean; nota?: string};

// Gráfico de barras com base no zero; as barras crescem uma depois da outra
// e o valor sobe junto.
export const GraficoBarras: React.FC<{
	dados: Barra[];
	maximo: number;
	inicio: number;
	largura: number;
	altura: number;
	casas?: number;
	sufixo?: string;
	intervalo?: number;
}> = ({dados, maximo, inicio, largura, altura, casas = 2, sufixo = '%', intervalo = 14}) => {
	const frame = useCurrentFrame();
	const espaco = largura / dados.length;
	const lb = espaco * 0.56;
	return (
		<div style={{position: 'relative', width: largura, height: altura}}>
			{dados.map((d, i) => {
				const p = progresso(frame, inicio + i * intervalo, inicio + i * intervalo + 30);
				const h = (d.valor / maximo) * (altura - 90) * p;
				const cor = d.destaque ? CORES.amarelo : CORES.azul;
				return (
					<div key={d.rotulo} style={{position: 'absolute', left: i * espaco + (espaco - lb) / 2, bottom: 50, width: lb}}>
						{d.nota ? (
							<div
								style={{
									position: 'absolute',
									bottom: h + 70,
									left: '50%',
									transform: 'translateX(-50%) rotate(-3deg)',
									fontFamily: FONTES.mao,
									fontWeight: 700,
									fontSize: 36,
									color: CORES.preto,
									whiteSpace: 'nowrap',
									opacity: p > 0.95 ? 1 : 0,
								}}
							>
								{d.nota}
							</div>
						) : null}
						<div
							style={{
								position: 'absolute',
								bottom: h + 10,
								width: '100%',
								textAlign: 'center',
								fontFamily: FONTES.titulo,
								fontSize: 40,
								color: CORES.preto,
								opacity: p,
							}}
						>
							{(d.valor * p).toLocaleString('pt-BR', {minimumFractionDigits: casas, maximumFractionDigits: casas})}
							{sufixo}
						</div>
						<div
							style={{
								height: h,
								background: cor,
								boxShadow: '0 8px 14px rgba(40,30,15,0.25)',
								border: `3px solid ${CORES.preto}`,
								borderBottom: 'none',
								boxSizing: 'border-box',
							}}
						/>
					</div>
				);
			})}
			<div style={{position: 'absolute', left: 0, right: 0, bottom: 47, height: 4, background: CORES.preto}} />
			{dados.map((d, i) => (
				<div
					key={`r-${d.rotulo}`}
					style={{position: 'absolute', left: i * espaco, width: espaco, bottom: 0, textAlign: 'center', fontFamily: FONTES.texto, fontWeight: 800, fontSize: 32, color: CORES.preto}}
				>
					{d.rotulo}
				</div>
			))}
		</div>
	);
};
