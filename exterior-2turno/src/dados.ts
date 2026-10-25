// Votos de Lula (l) e Flávio Bolsonaro (f), 1º e 2º turno, no exterior.
// 2º turno: boletins parciais de 25/10/2026, início da tarde (Brasília).
// Fontes em roteiro_narracao.md. Percentuais só entre os dois candidatos.
export type Pais = {nome: string; t1: {l: number; f: number}; t2: {l: number; f: number}};

export const PAISES: Pais[] = [
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
