// Texto da narração por cena (o mesmo de roteiro_narracao.md), já quebrado nos
// trechos que viram legenda. As animações de cada cena se prendem ao início
// destes trechos (useMarcas), então a ordem importa.

export type CenaRoteiro = {
	id: string;
	titulo: string;
	duracaoSegundos: number;
	legendas: string[];
};

export const ROTEIRO: CenaRoteiro[] = [
	{
		id: 'gancho',
		titulo: 'Gancho',
		duracaoSegundos: 16,
		legendas: [
			'Quando você paga 6 reais e 53 centavos por um litro de gasolina,',
			'só 2 reais e 8 centavos ficam com a Petrobras.',
			'Então, para onde vai o resto?',
			'E fica até o final:',
			'tem uma data em novembro que pode mudar esse preço.',
		],
	},
	{
		id: 'real',
		titulo: 'Cada real do litro',
		duracaoSegundos: 26,
		legendas: [
			'Vamos dividir esse litro.',
			'De cada real que você paga, 32 centavos vão para a Petrobras.',
			'28 centavos ficam com a distribuição e os postos.',
			'24 centavos são ICMS, o imposto dos estados.',
			'15 centavos pagam o etanol que vem misturado.',
			'E os impostos federais? Hoje, só 1 centavo.',
		],
	},
	{
		id: 'petrobras',
		titulo: 'A fatia da Petrobras',
		duracaoSegundos: 24,
		legendas: [
			'A maior fatia é da Petrobras,',
			'e ela depende de um preço que ninguém aqui controla:',
			'o do petróleo, cotado em dólar no mundo inteiro.',
			'Com a guerra no Oriente Médio,',
			'o barril voltou para perto de 100 dólares, segundo o governo.',
			'Em setembro, a Petrobras passou a vender o litro da gasolina pura',
			'às distribuidoras por 3 reais e 5 centavos, em média.',
		],
	},
	{
		id: 'etanol',
		titulo: 'O etanol que vem junto',
		duracaoSegundos: 16,
		legendas: [
			'Só que a gasolina do posto não é só gasolina.',
			'Desde agosto de 2025, 30% de cada litro é etanol anidro, por lei.',
			'E esse etanol custa 99 centavos em cada litro que você coloca no tanque.',
		],
	},
	{
		id: 'impostos',
		titulo: 'Os impostos',
		duracaoSegundos: 28,
		legendas: [
			'Depois vem o ICMS.',
			'Desde janeiro, ele é um valor fixo, igual em todos os estados:',
			'1 real e 57 centavos por litro.',
			'E os impostos federais?',
			'Normalmente, PIS, Cofins e Cide somam 89 centavos',
			'por litro de gasolina pura.',
			'Mas, desde 10 de outubro, eles estão zerados.',
			'Por enquanto.',
		],
	},
	{
		id: 'caminho',
		titulo: 'Do posto ao seu tanque',
		duracaoSegundos: 20,
		legendas: [
			'Sobram 1 real e 83 centavos para levar o combustível',
			'da refinaria até o seu tanque:',
			'transporte, distribuidoras e o posto, com seus custos e lucros.',
			'E num país do tamanho do Brasil, a distância pesa.',
			'É por isso que o mesmo litro custa diferente de uma cidade para outra.',
		],
	},
	{
		id: 'data',
		titulo: 'A data que pode mudar o preço',
		duracaoSegundos: 20,
		legendas: [
			'E a data de novembro?',
			'A isenção dos impostos federais vale até 9 de novembro.',
			'Se não for prorrogada, esses tributos voltam a ser cobrados,',
			'e parte disso pode chegar à bomba.',
			'Agora você sabe para onde vai cada real do seu tanque.',
			'Se inscreva no Viralmente Viral:',
			'aqui, fatos valem mais que boatos.',
		],
	},
];
