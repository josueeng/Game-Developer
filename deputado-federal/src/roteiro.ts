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
		duracaoSegundos: 15,
		legendas: [
			'Um deputado federal ganha 46 mil reais por mês.',
			'Mas o salário é a menor parte da conta.',
			'Somando tudo o que cada gabinete pode gastar,',
			'o valor passa de 270 mil por mês.',
			'Para onde vai esse dinheiro, e o que um deputado faz de verdade?',
		],
	},
	{
		id: 'quem',
		titulo: 'Quem são os 513',
		duracaoSegundos: 20,
		legendas: [
			'A Câmara tem 513 deputados federais,',
			'eleitos para mandatos de quatro anos.',
			'Cada estado elege no mínimo 8 e no máximo 70, conforme a população.',
			'São Paulo tem 70. Os menores estados, como Roraima e Acre, têm 8.',
			'Os deputados eleitos em outubro tomam posse em fevereiro de 2027.',
		],
	},
	{
		id: 'salario',
		titulo: 'O salário',
		duracaoSegundos: 20,
		legendas: [
			'O salário, que a lei chama de subsídio,',
			'é de 46.366 reais e 19 centavos por mês,',
			'o mesmo valor pago a senadores e ministros do Supremo.',
			'Em um ano, são mais de 556 mil reais,',
			'antes do Imposto de Renda e da previdência.',
			'E falta sem justificativa nas sessões de votação é descontada.',
		],
	},
	{
		id: 'verbas',
		titulo: 'Além do salário',
		duracaoSegundos: 34,
		legendas: [
			'Além do salário, cada gabinete tem três verbas.',
			'A primeira é a verba de gabinete:',
			'até 165 mil reais por mês para pagar de 5 a 25 assessores,',
			'os secretários parlamentares.',
			'A segunda é a cota parlamentar,',
			'para passagens, aluguel de escritório, combustível e divulgação do mandato:',
			'vai de 41 mil reais, no Distrito Federal, a 58 mil, em Roraima, por mês.',
			'Quanto mais longe de Brasília, maior a cota.',
			'E a terceira: quem não mora num apartamento da Câmara',
			'recebe auxílio-moradia de 4.253 reais.',
			'Essas verbas não vão para o bolso do deputado: são tetos de gasto,',
			'e cada nota fica registrada no Portal da Transparência da Câmara.',
		],
	},
	{
		id: 'conta',
		titulo: 'A conta completa',
		duracaoSegundos: 20,
		legendas: [
			'Somando o salário e os tetos das três verbas,',
			'cada mandato pode custar entre 258 e 275 mil reais por mês,',
			'cerca de 3,3 milhões por ano.',
			'O salário é só 17% disso.',
			'E tem mais um poder que não aparece no contracheque:',
			'as emendas parlamentares.',
		],
	},
	{
		id: 'faz',
		titulo: 'O que ele faz',
		duracaoSegundos: 28,
		legendas: [
			'E o que faz um deputado?',
			'Primeiro, legisla: propõe, discute e vota leis,',
			'medidas provisórias e o orçamento do país.',
			'Segundo, fiscaliza o governo:',
			'convoca ministros, pede informações e pode abrir CPIs.',
			'Só a Câmara pode autorizar, com dois terços dos votos,',
			'um processo contra o presidente.',
			'E cada deputado indica, em média,',
			'cerca de 40 milhões de reais por ano em emendas individuais:',
			'dinheiro do orçamento que ele escolhe para onde vai,',
			'como obras e saúde nos municípios.',
		],
	},
	{
		id: 'fiscalizar',
		titulo: 'Como fiscalizar o seu',
		duracaoSegundos: 18,
		legendas: [
			'A boa notícia: tudo isso é público.',
			'No site da Câmara, você vê quanto cada deputado gastou da cota,',
			'quem trabalha no gabinete, como votou e para onde mandou as emendas.',
			'Agora você sabe quanto custa, e o que cobrar.',
			'Se inscreva no Viralmente Viral.',
		],
	},
];
