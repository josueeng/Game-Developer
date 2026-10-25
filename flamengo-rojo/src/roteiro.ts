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
			'O Flamengo foi eliminado da Libertadores nos pênaltis.',
			'No dia seguinte, pediu para ir à final mesmo assim.',
			'O motivo tem nome: Marcos Rojo.',
			'Vamos entender o que está acontecendo.',
		],
	},
	{
		id: 'confronto',
		titulo: 'O confronto',
		duracaoSegundos: 20,
		legendas: [
			'Na semifinal, Flamengo e Estudiantes, da Argentina,',
			'empataram em 0 a 0 em La Plata, no dia 15 de outubro.',
			'Na volta, no Maracanã, outro 0 a 0.',
			'Nos pênaltis, o Estudiantes venceu por 3 a 2.',
			'E vai enfrentar o Palmeiras na final,',
			'no dia 28 de novembro, em Montevidéu.',
		],
	},
	{
		id: 'problema',
		titulo: 'O problema do Rojo',
		duracaoSegundos: 28,
		legendas: [
			'O zagueiro Marcos Rojo não jogou a ida.',
			'O Estudiantes pediu para inscrevê-lo no lugar de um jogador lesionado,',
			'mas a Conmebol negou:',
			'depois de consultar a FIFA, entendeu que a contratação',
			'tinha sido feita fora da janela de transferências.',
			'O Estudiantes então recorreu ao CAS, o Tribunal Arbitral do Esporte.',
			'Um dia antes do jogo de volta, o CAS liberou o jogador.',
			'E Rojo foi titular no Maracanã.',
		],
	},
	{
		id: 'liminar',
		titulo: 'O que é uma liminar',
		duracaoSegundos: 20,
		legendas: [
			'Só que o CAS deu uma liminar:',
			'uma decisão provisória, que vale na hora, mas não encerra o caso.',
			'O mérito, ou seja, se o Rojo podia ou não jogar,',
			'ainda não foi julgado.',
			'E, segundo o Flamengo, a decisão deixava claro',
			'que usar o jogador era responsabilidade do Estudiantes.',
		],
	},
	{
		id: 'lados',
		titulo: 'Os dois lados',
		duracaoSegundos: 26,
		legendas: [
			'O Flamengo reclamou dentro do prazo de 24 horas',
			'e se apoia no Código Disciplinar da Conmebol:',
			'quem escala jogador irregular perde o jogo por 3 a 0.',
			'Se isso fosse aplicado, o Flamengo iria à final.',
			'Já o Estudiantes diz que agiu amparado por uma decisão do CAS,',
			'e que por isso o jogador estava liberado.',
		],
	},
	{
		id: 'antes',
		titulo: 'Já aconteceu antes',
		duracaoSegundos: 20,
		legendas: [
			'E não seria a primeira vez.',
			'Em 2018, o Santos escalou o volante Carlos Sánchez,',
			'que tinha uma suspensão antiga para cumprir, contra o Independiente.',
			'O jogo terminou 0 a 0,',
			'mas a Conmebol deu vitória por 3 a 0 ao Independiente.',
			'A diferença: o Santos não tinha nenhuma decisão do CAS a seu favor.',
		],
	},
	{
		id: 'agora',
		titulo: 'E agora?',
		duracaoSegundos: 20,
		legendas: [
			'E agora?',
			'O Estudiantes tem até segunda-feira, 26 de outubro, para apresentar a defesa.',
			'Depois, a Comissão Disciplinar da Conmebol decide,',
			'e ainda cabe recurso à Câmara de Apelações e ao próprio CAS.',
			'Por enquanto, quem está na final é o Estudiantes.',
			'Se inscreva no Viralmente Viral',
			'para entender as notícias de verdade.',
		],
	},
];
