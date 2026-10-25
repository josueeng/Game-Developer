import type {ShortConfig} from './Short';

// Shorts deste vídeo: trechos contínuos do vídeo principal (segundos da
// narração em public/narracao-tempos.json), cortados entre frases.
// O B1 corta o "fica até o final: golpe novo" do gancho, porque esse Short
// não chega à resposta.
export const SHORTS: ShortConfig[] = [
	{
		id: 'bets-casa-sempre-ganha',
		titulo: ['POR QUE A CASA', 'SEMPRE GANHA'],
		destaque: 1,
		trechos: [
			{de: 0, ate: 15.0},
			{de: 19.25, ate: 67.7},
		],
		fontes: 'Fontes: Banco Central, CPI das Bets (abr/2025) · SPA/Ministério da Fazenda',
	},
	{
		id: 'bets-proibidas-golpe',
		titulo: ['BETS PROIBIDAS:', 'CUIDADO COM', 'ESTE GOLPE'],
		destaque: 2,
		trechos: [{de: 90.57, ate: 134.66}],
		fontes: 'Fontes: MP nº 1.394/2026 · Agência Brasil / Ministério da Fazenda (out/2026)',
	},
];
