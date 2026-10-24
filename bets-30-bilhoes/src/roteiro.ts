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
		duracaoSegundos: 19,
		legendas: [
			'Até poucas semanas atrás, os brasileiros mandavam',
			'até 30 bilhões de reais por mês para sites de apostas.',
			'Aí, em outubro, tudo saiu do ar.',
			'Mas a pergunta que quase ninguém fez é:',
			'para onde ia esse dinheiro?',
			'E fica até o final: tem um golpe novo circulando.',
		],
	},
	{
		id: 'dinheiro',
		titulo: 'Para onde ia o dinheiro',
		duracaoSegundos: 24,
		legendas: [
			'Primeiro, um detalhe que muda tudo:',
			'esses 30 bilhões não eram perda.',
			'A maior parte voltava para os próprios apostadores, em prêmios.',
			'Segundo dados do governo citados pelo Banco Central,',
			'de cada 100 reais apostados, 93 voltavam em prêmios.',
			'Os outros 7 ficavam com a casa. Sempre.',
		],
	},
	{
		id: 'casa',
		titulo: 'Por que a casa sempre ganha',
		duracaoSegundos: 32,
		legendas: [
			'Sete por cento parece pouco.',
			'O truque é que o prêmio quase nunca sai do jogo:',
			'quem ganha, aposta de novo.',
			'Imagine 100 reais apostados e reapostados sem parar.',
			'Em média, depois de 10 rodadas, sobram 48 reais.',
			'Depois de 20, sobram 23.',
			'Alguns ganham muito, e são esses que viram propaganda.',
			'Mas, na soma de todo mundo,',
			'a conta sempre pende para o mesmo lado.',
		],
	},
	{
		id: 'mercado',
		titulo: 'O tamanho do mercado',
		duracaoSegundos: 24,
		legendas: [
			'E não era pouca gente.',
			'Só no primeiro semestre de 2025,',
			'17,7 milhões de brasileiros apostaram em sites autorizados.',
			'As casas ficaram com 17,4 bilhões de reais,',
			'já descontados os prêmios.',
			'Em média, cada apostador deixou 164 reais por mês.',
		],
	},
	{
		id: 'proibicao',
		titulo: 'A proibição',
		duracaoSegundos: 26,
		legendas: [
			'Em 25 de setembro de 2026,',
			'o governo federal publicou uma medida provisória',
			'que proíbe as apostas online e os jogos de cassino na internet,',
			'inclusive a propaganda.',
			'Os sites saíram do ar em 6 de outubro,',
			'e os bancos começaram a devolver mais de 1,3 bilhão de reais',
			'em saldos para 26,5 milhões de contas.',
			'Segundo as empresas, 9 em cada 10 contas tinham menos de 1 real.',
		],
	},
	{
		id: 'agora',
		titulo: 'E agora?',
		duracaoSegundos: 22,
		legendas: [
			'Mas a história não acabou.',
			'Medida provisória vale na hora,',
			'mas precisa ser aprovada pelo Congresso,',
			'senão perde a validade.',
			'E atenção: ninguém precisa pagar nada',
			'para receber saldo de volta.',
			'Se alguém pedir, é golpe.',
		],
	},
	{
		id: 'fechamento',
		titulo: 'Fechamento',
		duracaoSegundos: 16,
		legendas: [
			'No fim, a matemática é simples:',
			'no longo prazo, quem aposta paga a conta.',
			'Se a aposta virou problema para você ou alguém próximo,',
			'procure o CAPS da sua cidade, pelo SUS.',
			'E se inscreva no Viralmente Viral:',
			'aqui fatos valem mais que boatos.',
		],
	},
];
