// Uso: node stills.mjs <projeto> <saida> frame1 frame2 ...
// Ferramenta de conferência: stills em meia resolução. COMP=<id> para outra composição.
import path from 'node:path';
import {createRequire} from 'node:module';
const [proj, saida, ...frames] = process.argv.slice(2);
const req = createRequire(path.join(proj, 'package.json'));
const {bundle} = await import(req.resolve('@remotion/bundler'));
const {selectComposition, renderStill} = await import(req.resolve('@remotion/renderer'));
const browserExecutable = '/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const serveUrl = await bundle({entryPoint: path.join(proj, 'src/index.ts')});
const id = process.env.COMP ?? 'Video';
const composition = await selectComposition({serveUrl, id, browserExecutable});
for (const f of frames) {
	const out = path.join(saida, `${id}-${String(f).padStart(5, '0')}.png`);
	await renderStill({serveUrl, composition, frame: Number(f), output: out, browserExecutable, scale: 0.5});
	console.log(out);
}
