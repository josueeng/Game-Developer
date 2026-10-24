import {FPS} from './config';
import {ROTEIRO} from './roteiro';

// Duração (em quadros) da transição entre duas cenas.
export const TRANSICAO = 20;

export const DURACOES_PADRAO = ROTEIRO.map((c) => Math.round(c.duracaoSegundos * FPS));

// Formato de public/narracao-tempos.json (opcional, criado depois de ouvir a
// narração): segundo em que cada cena começa e segundo em que o vídeo termina.
//   { "inicios": [0, 17.4, 42.9, ...], "fim": 168.2 }
export type TemposNarracao = {inicios: number[]; fim: number};

export const duracoesDeTempos = (t: TemposNarracao): number[] =>
	t.inicios.map((ini, i) => {
		const fim = i + 1 < t.inicios.length ? t.inicios[i + 1] : t.fim;
		return Math.round((fim - ini) * FPS);
	});

// Sem marcações manuais: estica/encolhe as cenas proporcionalmente para caber
// na duração do áudio.
export const duracoesProporcionais = (totalQuadros: number): number[] => {
	const soma = DURACOES_PADRAO.reduce((a, b) => a + b, 0);
	const out = DURACOES_PADRAO.map((d) => Math.round((d * totalQuadros) / soma));
	out[out.length - 1] += totalQuadros - out.reduce((a, b) => a + b, 0);
	return out;
};

export const inicios = (duracoes: number[]): number[] => {
	const r: number[] = [];
	duracoes.reduce((acc, d) => {
		r.push(acc);
		return acc + d;
	}, 0);
	return r;
};

export type Legenda = {texto: string; de: number; ate: number};

// Distribui as legendas de cada cena pelo tempo da cena, proporcional ao
// número de caracteres de cada trecho.
export const calcularLegendas = (duracoes: number[]): Legenda[] => {
	const ini = inicios(duracoes);
	const out: Legenda[] = [];
	ROTEIRO.forEach((cena, i) => {
		const comeco = ini[i] + 8;
		const fim = ini[i] + duracoes[i] - 10;
		const pesos = cena.legendas.map((t) => t.length + 10);
		const total = pesos.reduce((a, b) => a + b, 0);
		let cursor = comeco;
		cena.legendas.forEach((texto, j) => {
			const dur = ((fim - comeco) * pesos[j]) / total;
			out.push({texto, de: Math.round(cursor), ate: Math.round(cursor + dur) - 2});
			cursor += dur;
		});
	});
	return out;
};
