/**
 * Genera los íconos del sitio a partir del logo de la empresa.
 *
 * Correlo si cambia src/assets/logo del ícono:
 *   npm run genera-favicon
 *
 * Produce:
 *   public/favicon.png          32×32   — la pestaña del navegador
 *   public/favicon-192.png     192×192  — Android y accesos directos
 *   public/apple-touch-icon.png 180×180 — pantalla de inicio en iOS
 */
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const origen = join(raiz, 'public', 'imgs', 'logo', 'icono.png');
const fuente = readFileSync(origen);

// iOS no respeta la transparencia y recorta las esquinas, así que ese ícono
// lleva fondo sólido. Los demás se quedan en transparente.
const salidas = [
  { archivo: 'favicon.png', tamano: 32, fondo: null },
  { archivo: 'favicon-192.png', tamano: 192, fondo: null },
  { archivo: 'apple-touch-icon.png', tamano: 180, fondo: '#ffffff' },
];

for (const s of salidas) {
  const png = await sharp(fuente)
    .resize(s.tamano, s.tamano, {
      fit: 'contain',
      background: s.fondo ?? { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9 })
    .toBuffer();

  writeFileSync(join(raiz, 'public', s.archivo), png);
  console.log(`  ${s.archivo.padEnd(22)} ${s.tamano}×${s.tamano}  ${(png.length / 1024).toFixed(1)} KB`);
}
