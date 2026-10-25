import type {ShortConfig} from './Short';

// Shorts deste vídeo: trechos contínuos do vídeo principal (segundos da
// narração em public/narracao-tempos.json), cortados entre frases.
// O G1 corta o "fica até o final: data de novembro" do gancho, porque esse
// Short não chega à resposta (ela está no G2).
export const SHORTS: ShortConfig[] = [
	{
		id: 'gasolina-cada-real',
		titulo: ['PRA ONDE VAI', 'CADA R$ 1', 'DA GASOLINA'],
		destaque: 1,
		trechos: [
			{de: 0, ate: 11.2},
			{de: 17.5, ate: 39.8},
		],
		fontes: 'Fonte: Petrobras, composição do preço (coleta ANP de 11 a 17/10/2026)',
	},
	{
		id: 'gasolina-imposto-zerado',
		titulo: ['IMPOSTO DA GASOLINA', 'ZERADO ATÉ 9/11'],
		destaque: 1,
		trechos: [
			{de: 79.5, ate: 102.7},
			{de: 122.3, ate: 134.45},
		],
		fontes: 'Fontes: Comsefaz/Confaz (ICMS 2026) · Ministério da Fazenda (out/2026)',
	},
];
