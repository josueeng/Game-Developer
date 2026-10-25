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
			'O Brasil tem cerca de 30 mil quilômetros de trilhos.',
			'Mas tente ir de São Paulo ao Rio de trem: não dá.',
			'Fora os trens urbanos e os turísticos,',
			'só duas linhas de passageiros de longa distância funcionam no país.',
			'Como isso aconteceu?',
		],
	},
	{
		id: 'auge',
		titulo: 'O auge',
		duracaoSegundos: 20,
		legendas: [
			'As ferrovias chegaram em 1854 e se espalharam com o café,',
			'levando a produção do interior até os portos.',
			'Em 1960, a malha chegou ao auge:',
			'mais de 38 mil quilômetros, em 24 estados.',
			'Naquela época, viajar de trem entre cidades era comum.',
		],
	},
	{
		id: 'pedacos',
		titulo: 'Uma malha feita em pedaços',
		duracaoSegundos: 22,
		legendas: [
			'Mas essa malha nasceu em pedaços.',
			'Cada linha foi feita para ligar uma região produtora a um porto,',
			'não as cidades entre si.',
			'E com bitolas diferentes:',
			'a maior parte com trilhos a um metro de distância,',
			'outra parte a um metro e sessenta.',
			'Um trem de uma bitola não roda na outra.',
		],
	},
	{
		id: 'estrada',
		titulo: 'A virada para a estrada',
		duracaoSegundos: 28,
		legendas: [
			'A partir dos anos 1950, o país apostou nas rodovias.',
			'O Plano de Metas de Juscelino Kubitschek trouxe a indústria automobilística',
			'e priorizou estradas e caminhões.',
			'Em 1966, um decreto organizou a retirada dos ramais ferroviários considerados antieconômicos,',
			'a começar pelos que já tinham uma estrada ao lado.',
			'Segundo o pesquisador Ralph Giesbrecht,',
			'nos anos 60 e 70 sumiram praticamente todas as ferrovias menores.',
		],
	},
	{
		id: 'fim',
		titulo: 'O fim dos trens',
		duracaoSegundos: 24,
		legendas: [
			'As linhas que restaram ficaram com a estatal Rede Ferroviária Federal,',
			'criada em 1957, que passou décadas em crise financeira.',
			'Entre 1996 e 1998, a malha foi concedida a empresas privadas,',
			'que passaram a operar trens de carga.',
			'Os últimos trens de passageiros acabaram nesse processo.',
			'O Trem de Prata, entre Rio e São Paulo,',
			'fez sua última viagem em novembro de 1998.',
		],
	},
	{
		id: 'sobrou',
		titulo: 'O que sobrou',
		duracaoSegundos: 26,
		legendas: [
			'Hoje, a malha tem cerca de 30 mil quilômetros,',
			'e é usada quase só para carga, como minério e grãos.',
			'Os dois trens regulares de passageiros de longa distância são da Vale:',
			'o Vitória a Minas, com 664 quilômetros e viagens todos os dias,',
			'e o Carajás, com 861 quilômetros, entre o Maranhão e o Pará.',
			'Só o Vitória a Minas levou cerca de 860 mil passageiros em 2025.',
		],
	},
	{
		id: 'futuro',
		titulo: 'Vai voltar?',
		duracaoSegundos: 28,
		legendas: [
			'E vem trem novo por aí?',
			'Em São Paulo, as obras do Trem Intercidades até Campinas começaram em 2026,',
			'com previsão de operar em 2031:',
			'101 quilômetros em cerca de 64 minutos.',
			'Já o trem-bala entre Rio e São Paulo teve o leilão adiado várias vezes,',
			'e em 2013 nenhuma empresa apresentou proposta.',
			'Resumindo: uma malha feita para exportar, bitolas diferentes,',
			'a aposta nas rodovias e concessões voltadas para carga.',
			'Se inscreva no Viralmente Viral.',
		],
	},
];
