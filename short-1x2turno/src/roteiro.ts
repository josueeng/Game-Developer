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
		titulo: 'De onde vieram os votos?',
		duracaoSegundos: 55,
		legendas: [
			'No primeiro turno, Flávio Bolsonaro terminou 2,2 milhões de votos à frente de Lula.',
			'No segundo, Lula venceu por 4,4 milhões. O que mudou em três semanas?',
			'Do primeiro para o segundo turno, Lula ganhou 10,3 milhões de votos.',
			'Flávio ganhou 3,7 milhões.',
			'De onde vieram?',
			'Os outros candidatos do primeiro turno somavam 9,3 milhões de votos.',
			'Eles foram para um lado só? Os números não respondem: o voto é secreto.',
			'E tem mais uma pista: no segundo turno, houve 4,7 milhões de votos válidos a mais.',
			'A abstenção caiu de 21% para cerca de 19%, e os votos brancos e nulos também caíram.',
			'Então, quem decidiu a eleição:',
			'quem votou em outro candidato no primeiro turno, ou quem nem tinha ido votar?',
			'Comenta aí. E siga o Viralmente Viral.',
		],
	},
];
