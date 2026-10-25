// Votos de Lula (l) e Flávio Bolsonaro (f), 1º e 2º turno, no exterior.
// 2º turno: boletins parciais de 25/10/2026 (até ~15h, Brasília).
// Fontes em roteiro_narracao.md. Percentuais só entre os dois candidatos.
export type Pais = {nome: string; t1: {l: number; f: number}; t2: {l: number; f: number}};

export const PAISES: Pais[] = [
	{nome: 'França', t1: {l: 8769, f: 1758}, t2: {l: 10676, f: 2039}},
	{nome: 'Espanha', t1: {l: 7263, f: 3338}, t2: {l: 9293, f: 4289}},
	{nome: 'Japão', t1: {l: 5234, f: 24601}, t2: {l: 7098, f: 28538}},
	{nome: 'Israel', t1: {l: 92, f: 523}, t2: {l: 166, f: 699}},
	{nome: 'Austrália', t1: {l: 4562, f: 2579}, t2: {l: 6017, f: 3465}},
	{nome: 'China', t1: {l: 367, f: 203}, t2: {l: 502, f: 267}},
	{nome: 'Nova Zelândia', t1: {l: 234, f: 64}, t2: {l: 418, f: 101}},
	{nome: 'Coreia do Sul', t1: {l: 123, f: 72}, t2: {l: 148, f: 82}},
	{nome: 'Singapura', t1: {l: 190, f: 92}, t2: {l: 213, f: 121}},
	{nome: 'Finlândia', t1: {l: 475, f: 155}, t2: {l: 550, f: 185}},
];

export const pctLula = (t: {l: number; f: number}) => (100 * t.l) / (t.l + t.f);
export const fmt = (v: number) => v.toLocaleString('pt-BR', {minimumFractionDigits: 1, maximumFractionDigits: 1});

// Cartões narrados, em pares (um par por legenda).
export const PARES: string[][] = [
	['França', 'Espanha'],
	['Japão', 'Israel'],
	['Austrália', 'Singapura'],
];

// Placar geral do exterior (somas da imprensa).
export const PLACARES = [
	{hora: '11h41', fonte: 'g1', l: 16585, f: 34056},
	{hora: '15h', fonte: 'InfoMoney', l: 87393, f: 60739},
];
export const VOTOS_DOIS_1T = 301287; // Lula + Flávio no exterior, 1º turno (TSE)
export const PAISES_ENCERRADOS = {n: 54, total: 134, hora: '14h50'};
