// Texto da narração do Short (o mesmo de roteiro_narracao.md), já quebrado nos
// trechos que viram legenda. As animações se prendem ao início destes trechos
// (useMarcas), então a ordem importa. Uma cena só.

export type CenaRoteiro = {
	id: string;
	titulo: string;
	duracaoSegundos: number;
	legendas: string[];
};

export const ROTEIRO: CenaRoteiro[] = [
	{
		id: 'short',
		titulo: 'O exterior virou',
		duracaoSegundos: 60,
		legendas: [
			'Faltando uma hora e meia para a apuração no Brasil,',
			'o voto no exterior já virou.',
			'Às 11h41, com as urnas da Ásia, Flávio Bolsonaro liderava: 34 mil votos a 17 mil, segundo o g1.',
			'Às 15h, com a Europa, Lula passou à frente: 87 mil a 61 mil, segundo o InfoMoney.',
			'Quanto já foi apurado? Esses 148 mil votos',
			'são cerca de metade dos 301 mil que os dois tiveram no exterior no primeiro turno.',
			'E até as 14h50, a votação tinha terminado em 54 dos 134 países.',
			'Comparando com o primeiro turno, só entre os dois:',
			'na França, Lula foi de 83% para 84%. Na Espanha, ficou em 68%.',
			'No Japão, Flávio foi de 82% para 80%. Em Israel, de 85% para 81%.',
			'Na Austrália, Lula foi de 64% para 63%. Em Singapura, de 67% para 64%.',
			'Ou seja: até agora, cada país vota parecido com o primeiro turno.',
			'Mas são números parciais, e o exterior é menos de meio por cento dos votos.',
			'A apuração oficial começa às cinco da tarde.',
			'Siga o Viralmente Viral.',
		],
	},
];
