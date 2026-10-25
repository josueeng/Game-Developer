import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {CORES} from '../config';

export const FundoPapel: React.FC = () => (
	<AbsoluteFill style={{backgroundColor: CORES.bege}}>
		<Img
			src={staticFile('textura-papel.jpg')}
			style={{position: 'absolute', left: -140, top: -110, width: 2200, height: 1300}}
		/>
	</AbsoluteFill>
);
