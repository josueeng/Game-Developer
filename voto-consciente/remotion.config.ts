import {existsSync} from 'node:fs';
import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(90);
Config.setCodec('h264');
Config.setCrf(18);
Config.setConcurrency(4);
Config.setOverwriteOutput(true);

// Usa um Chromium já instalado, se existir (ex.: REMOTION_BROWSER=/caminho/chrome).
// Sem isso, o Remotion baixa o próprio Chrome Headless Shell na primeira execução.
const navegador = process.env.REMOTION_BROWSER ?? '/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
if (existsSync(navegador)) {
	Config.setBrowserExecutable(navegador);
}
