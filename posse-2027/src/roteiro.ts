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
			'Hoje à noite, o Brasil conhece o próximo presidente.',
			'Mas ele só assume em 5 de janeiro,',
			'e não em 1º, como foi por mais de 30 anos.',
			'Até lá, o atual presidente continua no cargo, com todos os poderes.',
			'São 72 dias. O que acontece neles?',
		],
	},
	{
		id: 'data',
		titulo: 'A data mudou',
		duracaoSegundos: 20,
		legendas: [
			'A mudança veio de uma emenda à Constituição aprovada em 2021.',
			'O presidente e o vice agora tomam posse em 5 de janeiro,',
			'e os governadores, no dia 6.',
			'O motivo: antes, as posses eram no mesmo dia,',
			'e os governadores não podiam ir à do presidente.',
			'Por isso, os mandatos atuais ganharam alguns dias a mais.',
		],
	},
	{
		id: 'transicao',
		titulo: 'A transição',
		duracaoSegundos: 22,
		legendas: [
			'Enquanto isso, começa a transição.',
			'Uma lei de 2002 permite ao eleito montar uma equipe com até 50 cargos especiais,',
			'pagos pelo governo, a partir do segundo dia útil depois da eleição.',
			'Essa equipe tem acesso às contas públicas, aos programas e aos projetos em andamento,',
			'para o novo governo não começar no escuro.',
		],
	},
	{
		id: 'diplomacao',
		titulo: 'A diplomação',
		duracaoSegundos: 15,
		legendas: [
			'Depois vem a diplomação: o documento que prova que a pessoa foi eleita.',
			'O TSE diploma o presidente;',
			'os tribunais regionais, governadores, senadores e deputados.',
			'Neste ano, o prazo vai até 18 de dezembro.',
			'Sem diploma, ninguém toma posse.',
		],
	},
	{
		id: 'posse',
		titulo: 'A posse',
		duracaoSegundos: 20,
		legendas: [
			'Em 5 de janeiro, a posse acontece numa sessão do Congresso Nacional.',
			'O eleito promete manter, defender e cumprir a Constituição.',
			'E tem uma regra pouco conhecida:',
			'se, dez dias depois da data marcada, ele não tiver assumido,',
			'sem motivo de força maior, o cargo é declarado vago.',
		],
	},
	{
		id: 'congresso',
		titulo: 'E o Congresso?',
		duracaoSegundos: 14,
		legendas: [
			'Deputados federais e senadores não mudaram de data:',
			'tomam posse em 1º de fevereiro de 2027.',
			'Os 54 senadores eleitos agora ficam até 2035.',
		],
	},
	{
		id: 'calendario',
		titulo: 'O calendário',
		duracaoSegundos: 14,
		legendas: [
			'Resumindo: 25 de outubro, a eleição.',
			'27, começa a transição. Até 18 de dezembro, a diplomação.',
			'5 de janeiro, o presidente. 6, os governadores. 1º de fevereiro, o Congresso.',
			'Salve este vídeo e se inscreva no Viralmente Viral.',
		],
	},
];
