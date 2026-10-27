// Narração da cena-teste de suspense (uma cena só).
export type CenaRoteiro = {id: string; titulo: string; duracaoSegundos: number; legendas: string[]};

export const ROTEIRO: CenaRoteiro[] = [
	{
		id: 'corredor',
		titulo: 'O corredor',
		duracaoSegundos: 15,
		legendas: [
			'Era a terceira noite que o Lucas ouvia passos no corredor.',
			'Ele decidiu ver de onde vinham.',
			'Então a luz piscou…',
			'e os passos pararam. Atrás dele.',
		],
	},
];
