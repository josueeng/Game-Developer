import React from 'react';
import {CORES, FONTES} from '../config';
import {Recorte} from './Recorte';

// Etiqueta de título da cena: tira de papel preto com letras claras.
export const Titulo: React.FC<{
	texto: string;
	inicio?: number;
	x?: number;
	y?: number;
	rotacao?: number;
	cor?: string;
	corTexto?: string;
	tamanho?: number;
}> = ({texto, inicio = 0, x = 110, y = 70, rotacao = -1.5, cor = CORES.preto, corTexto = CORES.papel, tamanho = 46}) => (
	<Recorte seed={`titulo-${texto}`} inicio={inicio} cor={cor} rotacao={rotacao} style={{left: x, top: y}} padding="14px 30px 12px">
		<div style={{fontFamily: FONTES.titulo, fontSize: tamanho, color: corTexto, textTransform: 'uppercase', letterSpacing: 1, whiteSpace: 'nowrap'}}>
			{texto}
		</div>
	</Recorte>
);
