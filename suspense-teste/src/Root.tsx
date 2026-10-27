import React from 'react';
import {Composition, continueRender, delayRender} from 'remotion';
import {carregarFontes} from './fontes';
import {Corredor} from './Corredor';

const espera = delayRender('Carregando fontes');
carregarFontes().then(() => continueRender(espera));

export const RemotionRoot: React.FC = () => <Composition id="Teste" component={Corredor} fps={30} width={1080} height={1920} durationInFrames={480} />;
