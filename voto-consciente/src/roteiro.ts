// Texto da narração por cena (o mesmo de roteiro_narracao.md), já quebrado nos
// trechos que viram legenda. Cada trecho aparece na tela por um tempo
// proporcional ao seu tamanho dentro da duração da cena.

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
		duracaoSegundos: 17,
		legendas: [
			'No dia 4 de outubro de 2026,',
			'mais de 33 milhões de eleitores não foram votar.',
			'É quase o eleitorado inteiro de São Paulo,',
			'o maior do país.',
			'E se eu te disser que o seu voto',
			'pesa muito mais do que parece?',
		],
	},
	{
		id: 'decide',
		titulo: 'O que o voto decide',
		duracaoSegundos: 25,
		legendas: [
			'Quando você aperta "confirma",',
			'não está escolhendo só um rosto.',
			'Está decidindo quem vai administrar o orçamento',
			'que paga hospitais, escolas, policiamento',
			'e as obras da sua cidade.',
			'E essa escolha não dura um dia:',
			'presidente, governadores e deputados',
			'ficam quatro anos no cargo. Senadores, oito.',
			'O voto de 2026 ainda vai estar valendo em 2034.',
		],
	},
	{
		id: 'numeros',
		titulo: 'Os números',
		duracaoSegundos: 35,
		legendas: [
			'Vamos aos números.',
			'Em 2026, o Brasil tem 158,7 milhões de eleitores aptos.',
			'Só São Paulo tem mais de 34 milhões.',
			'Minas Gerais, 16,4 milhões.',
			'Roraima, um dos menores colégios, cerca de 401 mil.',
			'No primeiro turno, 21,08% do eleitorado não compareceu',
			'— a maior abstenção em eleições gerais desde 1998.',
			'E o índice vem subindo a cada eleição.',
			'Na disputa para presidente,',
			'quase 6 milhões de votos foram brancos ou nulos.',
		],
	},
	{
		id: 'pesquisar',
		titulo: 'Como pesquisar um candidato',
		duracaoSegundos: 23,
		legendas: [
			'Então, como escolher bem?',
			'Comece pelo DivulgaCandContas, o site oficial do TSE.',
			'Lá você vê os bens declarados, as certidões criminais,',
			'as contas da campanha',
			'e, para cargos executivos, o plano de governo.',
			'Depois, olhe o histórico: o que a pessoa já fez,',
			'como votou, o que prometeu e cumpriu.',
		],
	},
	{
		id: 'desinformacao',
		titulo: 'Desinformação',
		duracaoSegundos: 22,
		legendas: [
			'Cuidado com o que chega no seu celular.',
			'Notícia falsa costuma ter título alarmante,',
			'não cita fonte nem data',
			'e pede para você compartilhar "antes que apaguem".',
			'Antes de repassar, confira em veículos conhecidos',
			'e na página Fato ou Boato, da Justiça Eleitoral.',
			'Na dúvida, não compartilhe.',
		],
	},
	{
		id: 'crime',
		titulo: 'Compra de votos é crime',
		duracaoSegundos: 26,
		legendas: [
			'E tem uma linha que não se cruza:',
			'comprar ou vender voto é crime.',
			'O artigo 299 do Código Eleitoral',
			'prevê até quatro anos de reclusão e multa —',
			'para quem oferece e também para quem aceita.',
			'E o candidato que compra votos',
			'pode ter o registro ou o mandato cassado,',
			'pela Lei das Eleições.',
			'Denuncie pelo aplicativo Pardal, do TSE.',
		],
	},
	{
		id: 'fechamento',
		titulo: 'Fechamento',
		duracaoSegundos: 18,
		legendas: [
			'O seu voto é um entre milhões, sim.',
			'Mas é a soma de milhões de escolhas conscientes',
			'que muda uma cidade, um estado, um país.',
			'Informe-se, converse, vá votar.',
			'Se este vídeo te ajudou,',
			'se inscreva no canal e compartilhe.',
		],
	},
];
