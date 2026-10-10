// Node >= 18. Sin dependencias externas. Ejecutar desde cualquier cwd.
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
const json = path => JSON.parse(readFileSync(resolve(root, path), 'utf8'));
const hash = path => createHash('sha256').update(readFileSync(resolve(root, path))).digest('hex');
const manifest = json('docs/assets-manifest.json');
const runtime = json('public/assets/runtime-manifest.json');
const prototypes = json('public/assets/prototypes/manifest.json');
const ids = new Set();
const byId = new Map();
for (const asset of manifest.assets) {
  check(!ids.has(asset.id), `ID duplicado: ${asset.id}`);
  ids.add(asset.id); byId.set(asset.id, asset);
  check(!asset.path.includes('..') && !asset.path.startsWith('/'), `Ruta invalida: ${asset.path}`);
  const path = resolve(root, asset.path);
  if (!existsSync(path)) { failures.push(`Falta archivo: ${asset.path}`); continue; }
  check(hash(asset.path) === asset.sha256, `Hash distinto: ${asset.path}`);
  const bytes = readFileSync(path);
  check(bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])), `No es PNG: ${asset.path}`);
  check(bytes.readUInt32BE(16) === asset.width && bytes.readUInt32BE(20) === asset.height,
    `Dimensiones distintas: ${asset.path}`);
  if (asset.path.startsWith('public/')) {
    check(asset.status === 'usable_icon', `Asset no aprobado en public: ${asset.path}`);
    check(!asset.animated, `Icono marcado animado: ${asset.id}`);
    check(asset.width === 32 && asset.height === 32, `Icono no 32x32: ${asset.id}`);
  }
}
const atlasFrames = new Map();
const atlasKeys = new Set();
for (const atlas of runtime.atlases) {
  check(!atlasKeys.has(atlas.key), `Atlas duplicado: ${atlas.key}`); atlasKeys.add(atlas.key);
  const imagePath = `public/${atlas.image}`;
  const dataPath = `public/${atlas.data}`;
  if (!existsSync(resolve(root,imagePath)) || !existsSync(resolve(root,dataPath))) {
    failures.push(`Falta atlas: ${atlas.key}`); continue;
  }
  check(hash(imagePath) === atlas.imageSha256, `Hash atlas distinto: ${atlas.key}`);
  const image = readFileSync(resolve(root,imagePath));
  const width = image.readUInt32BE(16), height = image.readUInt32BE(20);
  const data = json(dataPath);
  check(Object.keys(data.frames).length === atlas.frames, `Conteo distinto: ${atlas.key}`);
  check(data.meta.size.w === width && data.meta.size.h === height, `Tamano atlas distinto: ${atlas.key}`);
  for (const [id, frame] of Object.entries(data.frames)) {
    const f = frame.frame;
    check(!atlasFrames.has(id), `Frame duplicado: ${id}`);
    atlasFrames.set(id, atlas.key);
    check(f.w === 32 && f.h === 32 && f.x >= 0 && f.y >= 0 &&
      f.x + f.w <= width && f.y + f.h <= height, `Frame fuera de atlas: ${id}`);
    check(frame.rotated === false && frame.trimmed === false, `Frame transformado: ${id}`);
    check(byId.has(id), `Frame sin fuente: ${id}`);
  }
}
const runtimeIds = new Set();
for (const icon of runtime.icons) {
  check(!runtimeIds.has(icon.id), `ID runtime duplicado: ${icon.id}`); runtimeIds.add(icon.id);
  const original = byId.get(icon.id);
  check(original?.status === 'usable_icon', `Runtime no aprobado: ${icon.id}`);
  check(original?.hasTransparency === true, `Runtime no transparente: ${icon.id}`);
  check(icon.frameName === icon.id && atlasFrames.get(icon.frameName) === icon.atlasKey,
    `Referencia de frame incorrecta: ${icon.id}`);
}
check(runtime.icons.length === atlasFrames.size, 'Frames y runtime no coinciden');
check(prototypes.schemaVersion === 1, 'Version invalida del manifest de prototipos');
check(Array.isArray(prototypes.assets) && prototypes.assets.length === 5, 'El manifest de prototipos debe tener 5 recursos');
for (const asset of prototypes.assets ?? []) {
  check(typeof asset.id === 'string' && asset.id.length > 0, 'ID invalido en prototipo');
  check(typeof asset.path === 'string' && asset.path.startsWith('assets/prototypes/') && !asset.path.includes('..'), `Ruta invalida de prototipo: ${asset.path}`);
  check(typeof asset.source === 'string' && asset.source.startsWith('asset-workbench/candidates/') && !asset.source.includes('..'), `Origen invalido de prototipo: ${asset.source}`);
  check(Array.isArray(asset.dimensions) && asset.dimensions.length === 2, `Dimensiones invalidas de prototipo: ${asset.id}`);
  const path = `public/${asset.path}`;
  if (!existsSync(resolve(root, path))) { failures.push(`Falta prototipo: ${path}`); continue; }
  check(hash(path) === asset.sha256, `Hash distinto de prototipo: ${asset.id}`);
  const image = readFileSync(resolve(root, path));
  check(image.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])), `Prototipo no PNG: ${asset.id}`);
  check(image.readUInt32BE(16) === asset.dimensions[0] && image.readUInt32BE(20) === asset.dimensions[1], `Dimensiones distintas de prototipo: ${asset.id}`);
  check(existsSync(resolve(root, asset.source)), `Falta fuente local de prototipo: ${asset.source}`);
}
check(existsSync(resolve(root, 'public/assets/prototypes/LICENSE-source.txt')), 'Falta referencia de licencia de prototipos');
if (failures.length) {
  console.error('ERROR DE ASSETS:\n' + failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`OK: ${manifest.assets.length} imagenes, ${runtime.icons.length} iconos runtime, ${runtime.atlases.length} atlas y ${prototypes.assets.length} prototipos. Rutas, hashes, dimensiones y referencias correctos.`);
  console.log('No certifica licencias de capturas ni prueba el juego en Phaser.');
}
