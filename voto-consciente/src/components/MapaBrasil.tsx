import React, {useMemo} from 'react';
import {geoMercator, geoPath} from 'd3-geo';
import {feature} from 'topojson-client';
import type {Topology, GeometryCollection} from 'topojson-specification';
import type {Feature, FeatureCollection, Geometry} from 'geojson';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import topo from '../data/brasil-uf.topo.json';
import {CORES} from '../config';

// Malha das 27 UFs (IBGE), em TopoJSON, do projeto público gis-dataset-brasil.
type Props = {name: string; regiao: string};
const estados = feature(
	topo as unknown as Topology<{uf: GeometryCollection<Props>}>,
	(topo as unknown as Topology<{uf: GeometryCollection<Props>}>).objects.uf,
) as FeatureCollection<Geometry, Props>;

export type Destaque = {uf: string; cor: string; inicio: number};

export const MapaBrasil: React.FC<{
	largura: number;
	altura: number;
	inicio: number;
	destaques?: Destaque[];
	duracaoEntrada?: number;
	corBase?: string;
}> = ({largura, altura, inicio, destaques = [], duracaoEntrada = 50, corBase = CORES.papel}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const {caminhos} = useMemo(() => {
		const proj = geoMercator().fitExtent(
			[
				[10, 10],
				[largura - 10, altura - 10],
			],
			estados,
		);
		const gerador = geoPath(proj);
		const lista = estados.features.map((f: Feature<Geometry, Props>) => {
			const [cx, cy] = gerador.centroid(f);
			return {id: String(f.id), d: gerador(f) ?? '', cx, cy};
		});
		// Ordem de entrada: varredura de noroeste para sudeste
		const ordem = [...lista].sort((a, b) => a.cx + a.cy - (b.cx + b.cy));
		return {caminhos: ordem};
	}, [largura, altura]);

	return (
		<svg width={largura} height={altura} style={{overflow: 'visible'}}>
			<defs>
				<filter id="sombra-mapa" x="-10%" y="-10%" width="120%" height="120%">
					<feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#281e0f" floodOpacity="0.3" />
				</filter>
			</defs>
			<g filter="url(#sombra-mapa)">
				{caminhos.map((c, i) => {
					const atraso = inicio + (i / caminhos.length) * duracaoEntrada;
					const e = spring({frame: frame - atraso, fps, config: {damping: 13, mass: 0.6}});
					const dest = destaques.find((d) => d.uf === c.id);
					const pd = dest ? interpolate(frame, [dest.inicio, dest.inicio + 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 0;
					const pulso = dest ? spring({frame: frame - dest.inicio, fps, config: {damping: 8}}) : 0;
					const escala = interpolate(e, [0, 1], [0.4, 1]) * (1 + 0.08 * pulso * (1 - pd * 0.7));
					return (
						<path
							key={c.id}
							d={c.d}
							fill={dest && pd > 0.5 ? dest.cor : corBase}
							stroke={CORES.preto}
							strokeWidth={2}
							strokeLinejoin="round"
							opacity={interpolate(e, [0, 0.3], [0, 1], {extrapolateRight: 'clamp'})}
							style={{transformBox: 'fill-box', transformOrigin: 'center', transform: `scale(${escala})`}}
						/>
					);
				})}
			</g>
		</svg>
	);
};

// Centroide de uma UF na mesma projeção do mapa (para posicionar rótulos).
export const centroideUF = (uf: string, largura: number, altura: number): [number, number] => {
	const proj = geoMercator().fitExtent(
		[
			[10, 10],
			[largura - 10, altura - 10],
		],
		estados,
	);
	const f = estados.features.find((x) => String(x.id) === uf);
	return f ? (geoPath(proj).centroid(f) as [number, number]) : [0, 0];
};
