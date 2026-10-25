// Identidade visual do canal. Troque aqui o nome e as cores; tudo no vídeo e na
// thumbnail lê destes valores.

export const CANAL = {
	nome: 'VIRALMENTE VIRAL',
	chamada: 'Inscreva-se',
};

export const FPS = 30;
export const LARGURA = 1920;
export const ALTURA = 1080;

export const CORES = {
	bege: '#ECE1CA',
	begeEscuro: '#D9C9A6',
	papel: '#FBF6EA', // papel claro dos recortes
	preto: '#161412',
	cinza: '#5A5248',
	amarelo: '#FFD23F',
	azul: '#2457A6',
	azulClaro: '#8FB0DE',
};

export const FONTES = {
	titulo: '"Archivo Black", "Archivo", sans-serif',
	texto: '"Archivo", sans-serif',
	jornal: '"Playfair Display", Georgia, serif',
	mao: '"Caveat", cursive',
};

// Área ocupada pelas legendas (parte de baixo da tela). O conteúdo das cenas
// deve ficar acima de AREA_UTIL.base para nunca ficar atrás da legenda.
export const AREA_UTIL = {
	topo: 60,
	base: 830,
	margem: 110,
};
