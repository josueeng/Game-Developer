import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {CANAL, CORES, FONTES} from './config';
import {MapaBrasil} from './components/MapaBrasil';
import {Recorte} from './components/Recorte';
import {RecorteJornal} from './components/RecorteJornal';

// Thumbnail 1280x720 no mesmo estilo do vídeo (quadro estático: todas as
// animações já no estado final).
export const Thumbnail: React.FC = () => (
	<AbsoluteFill style={{backgroundColor: CORES.bege, overflow: 'hidden'}}>
		<Img src={staticFile('textura-papel.jpg')} style={{position: 'absolute', left: -300, top: -250, width: 2000, height: 1180}} />
		<div style={{position: 'absolute', right: -60, top: 20, opacity: 0.95}}>
			<MapaBrasil largura={640} altura={640} inicio={-200} corBase={CORES.azul} />
		</div>
		<RecorteJornal
			seed="thumb-jornal"
			inicio={-100}
			x={760}
			y={420}
			largura={470}
			rotacao={4}
			tamanhoManchete={46}
			manchete={
				<span style={{background: CORES.amarelo, padding: '0 6px'}}>33 milhões</span>
			}
			jornal="CORREIO DO CIDADÃO"
			data=""
			linhaFina="não foram votar no 1º turno"
			linhas={2}
			colunas={2}
		/>
		<div style={{position: 'absolute', left: 60, top: 70, width: 760}}>
			<div style={{fontFamily: FONTES.titulo, fontSize: 118, lineHeight: 1.02, color: CORES.preto, textShadow: `4px 4px 0 ${CORES.papel}`}}>
				SEU VOTO
				<br />
				VALE{' '}
				<span style={{background: CORES.amarelo, padding: '0 14px', boxShadow: '0 8px 16px rgba(40,30,15,0.25)'}}>MAIS</span>
			</div>
			<div style={{fontFamily: FONTES.titulo, fontSize: 56, lineHeight: 1.1, color: CORES.preto, marginTop: 22}}>do que você imagina</div>
		</div>
		<Recorte seed="thumb-confirma" inicio={-100} cor={CORES.azul} rotacao={-4} style={{left: 70, top: 520}} padding="16px 34px">
			<div style={{fontFamily: FONTES.titulo, fontSize: 52, color: CORES.papel, letterSpacing: 2}}>CONFIRMA?</div>
		</Recorte>
		<div style={{position: 'absolute', left: 74, bottom: 34, fontFamily: FONTES.texto, fontWeight: 800, fontSize: 26, color: CORES.preto, letterSpacing: 2}}>
			{CANAL.nome}
		</div>
	</AbsoluteFill>
);
