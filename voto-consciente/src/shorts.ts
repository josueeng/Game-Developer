import type {ShortConfig} from './Short';

// Shorts deste vídeo: trechos contínuos do vídeo principal (segundos da
// narração em public/narracao-tempos.json), cortados entre frases.
export const SHORTS: ShortConfig[] = [
	{
		id: 'voto-33-milhoes',
		titulo: ['33 MILHÕES', 'NÃO FORAM VOTAR'],
		destaque: 0,
		trechos: [
			{de: 0, ate: 15.6},
			{de: 41.97, ate: 80.2},
		],
		fontes: 'Fontes: TSE (Eleições 2026, 1º turno) · Agência Senado · malha IBGE',
	},
	{
		id: 'voto-compra-crime',
		titulo: ['COMPRAR OU VENDER', 'VOTO É CRIME'],
		destaque: 1,
		trechos: [{de: 121.98, ate: 162.4}],
		fontes: 'Fontes: Lei 4.737/1965 (Código Eleitoral), art. 299 · Lei 9.504/1997, art. 41-A · TSE',
	},
	{
		id: 'voto-pesquisar-candidato',
		titulo: ['PESQUISE O CANDIDATO', 'E NÃO CAIA', 'EM FAKE NEWS'],
		destaque: 0,
		trechos: [{de: 80.61, ate: 121.58}],
		fontes: 'Fontes: TSE (DivulgaCandContas) · Justiça Eleitoral (Fato ou Boato)',
	},
];
