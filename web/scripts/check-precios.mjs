/**
 * Avisa por consola cuando los precios de la calculadora de vecinos quedaron
 * viejos. Corre solo, antes de `npm run dev` y de `npm run build`.
 *
 * Para actualizar: editar web/src/config/precios.ts
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const archivo = join(raiz, 'src', 'config', 'precios.ts');

const texto = readFileSync(archivo, 'utf8');
const fecha = texto.match(/fechaActualizacion:\s*'(\d{4}-\d{2}-\d{2})'/)?.[1];
const vigencia = Number(texto.match(/vigenciaDias:\s*(\d+)/)?.[1] ?? 45);

if (!fecha) {
  console.warn('\n  [precios] No pude leer fechaActualizacion en src/config/precios.ts\n');
  process.exit(0);
}

const dias = Math.floor((Date.now() - new Date(fecha + 'T00:00:00').getTime()) / 86_400_000);
const linea = '─'.repeat(66);

if (dias > vigencia) {
  console.warn(
    `\n\x1b[33m${linea}\n` +
      `  PRECIOS VENCIDOS — la calculadora de vecinos necesita una revisión\n` +
      `${linea}\x1b[0m\n` +
      `  Última actualización: ${fecha} (hace ${dias} días, vigencia ${vigencia})\n` +
      `  Actualizá 'fechaActualizacion', 'dolarReferencia' y los precios en:\n` +
      `  src/config/precios.ts\n` +
      `\x1b[33m${linea}\x1b[0m\n`
  );
} else {
  const restan = vigencia - dias;
  console.log(`  [precios] al día — cargados hace ${dias} días, revisar en ${restan} días.`);
}
