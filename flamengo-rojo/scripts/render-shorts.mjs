// Renderiza todos os Shorts deste projeto em out/shorts/<id>.mp4.
// Uso: npm run shorts
import {execFileSync} from 'node:child_process';
import {readFileSync, mkdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ids = [...readFileSync(path.join(raiz, 'src', 'shorts.ts'), 'utf8').matchAll(/id: '([^']+)'/g)].map((m) => m[1]);
mkdirSync(path.join(raiz, 'out', 'shorts'), {recursive: true});
for (const id of ids) {
	console.log(`Renderizando ${id}...`);
	execFileSync('npx', ['remotion', 'render', `Short-${id}`, `out/shorts/${id}.mp4`], {cwd: raiz, stdio: 'inherit'});
}
