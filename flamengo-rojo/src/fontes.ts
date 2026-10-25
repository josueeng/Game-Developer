import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';

// Fontes livres (SIL Open Font License) servidas localmente de public/fonts.
const lista = [
	{family: 'Archivo Black', file: 'archivo-black-latin-400-normal.woff2', weight: '400'},
	{family: 'Archivo', file: 'archivo-latin-400-normal.woff2', weight: '400'},
	{family: 'Archivo', file: 'archivo-latin-700-normal.woff2', weight: '700'},
	{family: 'Archivo', file: 'archivo-latin-800-normal.woff2', weight: '800'},
	{family: 'Playfair Display', file: 'playfair-display-latin-700-normal.woff2', weight: '700'},
	{family: 'Playfair Display', file: 'playfair-display-latin-900-normal.woff2', weight: '900'},
	{family: 'Caveat', file: 'caveat-latin-700-normal.woff2', weight: '700'},
];

export const carregarFontes = () =>
	Promise.all(
		lista.map((f) =>
			loadFont({family: f.family, url: staticFile(`fonts/${f.file}`), weight: f.weight, format: 'woff2'}),
		),
	);
