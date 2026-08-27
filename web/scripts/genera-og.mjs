/**
 * Genera public/og.jpg, la imagen que se ve cuando alguien comparte el sitio
 * por WhatsApp, Facebook o LinkedIn.
 *
 * Correlo cada vez que cambies src/assets/obras/planta.jpg:
 *   node scripts/genera-og.mjs
 */
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const origen = join(raiz, 'src', 'assets', 'obras', 'planta.jpg');
const destino = join(raiz, 'public', 'og.jpg');

const salida = await sharp(readFileSync(origen))
  .resize(1200, 630, { fit: 'cover', position: 'attention' })
  .modulate({ brightness: 0.72 })
  .jpeg({ quality: 82, mozjpeg: true })
  .toBuffer();

writeFileSync(destino, salida);
console.log(`  og.jpg generada — 1200x630, ${(salida.length / 1024).toFixed(0)} KB`);
