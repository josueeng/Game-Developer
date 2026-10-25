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
		titulo: 'Exterior: 1º turno × 2º turno',
		duracaoSegundos: 52,
		legendas: [
			'No exterior, as urnas do segundo turno já fecharam em vários países.',
			'E o voto mudou desde o primeiro turno?',
			'Contando só os votos de Lula e Flávio Bolsonaro,',
			'comparamos oito países com boletins já divulgados.',
			'No Japão, Flávio tinha 82% e agora tem 80%.',
			'Em Israel, foi de 85% para 81%.',
			'Na Austrália, Lula foi de 64% para 63%.',
			'Na China, de 64% para 65%.',
			'Na Nova Zelândia, de 79% para 81%.',
			'Na Coreia do Sul, Lula foi de 63% para 64%.',
			'Em Singapura, caiu de 67% para 64%.',
			'Na Finlândia, ficou em 75%.',
			'Na maioria, a divisão mudou poucos pontos.',
			'Mas atenção: são boletins parciais,',
			'e o exterior é menos de meio por cento dos votos.',
			'O resultado oficial sai a partir das cinco da tarde.',
			'Siga o Viralmente Viral.',
		],
	},
];
