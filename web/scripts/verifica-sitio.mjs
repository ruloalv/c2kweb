/**
 * Revisa el sitio ya compilado (dist/) antes de publicarlo.
 *
 * Comprueba lo que buscadores y asistentes de IA necesitan encontrar. Si algo
 * falta, corta el deploy con error en vez de publicar un sitio roto.
 *
 *   npm run verifica          (después de npm run build)
 */
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(raiz, 'dist');

const errores = [];
const avisos = [];
const oks = [];

const leer = (rel) => readFileSync(join(dist, rel), 'utf8');
const hay = (rel) => existsSync(join(dist, rel));

function check(nombre, condicion, detalle = '') {
  if (condicion) oks.push(nombre);
  else errores.push(detalle ? `${nombre} — ${detalle}` : nombre);
}

if (!existsSync(dist)) {
  console.error('  No existe dist/. Corré primero: npm run build');
  process.exit(1);
}

// --- Archivos que tienen que existir ---
for (const f of [
  'index.html',
  'vecinos/index.html',
  '404.html',
  'robots.txt',
  'llms.txt',
  'sitemap-index.xml',
  'og.jpg',
]) {
  check(`existe ${f}`, hay(f));
}

// --- La home tiene que ser legible sin JavaScript ---
if (hay('index.html')) {
  const html = leer('index.html');
  const soloTexto = html
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  check('la home tiene un H1', /<h1[\s>]/.test(html));
  check(
    'la home tiene 500+ caracteres de texto sin JS',
    soloTexto.length >= 500,
    `tiene ${soloTexto.length}`
  );
  check('la home declara idioma español', /<html[^>]+lang="es"/.test(html));
  check('la home tiene meta description', /<meta name="description" content="[^"]{50,}"/.test(html));
  check('la home tiene canonical', /<link rel="canonical"/.test(html));
  check('la home tiene og:image', /property="og:image"/.test(html));
  check('la home tiene datos estructurados', /application\/ld\+json/.test(html));

  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1].replace(/<[^>]+>/g, '').trim();
  if (h1) oks.push(`H1: "${h1.replace(/\s+/g, ' ').slice(0, 60)}"`);
}

// --- Los datos estructurados tienen que ser JSON válido ---
for (const pagina of ['index.html', 'vecinos/index.html']) {
  if (!hay(pagina)) continue;
  const bloques = [...leer(pagina).matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  check(`${pagina} tiene datos estructurados`, bloques.length > 0);
  for (const [i, b] of bloques.entries()) {
    try {
      const dato = JSON.parse(b[1]);
      check(`${pagina} · schema ${i + 1} (${dato['@type']}) es JSON válido`, true);
    } catch (e) {
      errores.push(`${pagina} · schema ${i + 1} tiene JSON inválido: ${e.message}`);
    }
  }
}

// --- robots.txt ---
if (hay('robots.txt')) {
  const robots = leer('robots.txt');
  check('robots.txt permite el paso', /^Allow: \//m.test(robots));
  check('robots.txt no bloquea nada', !/^Disallow: \/\s*$/m.test(robots));
  check('robots.txt declara el sitemap', /^Sitemap: https?:\/\//m.test(robots));
  for (const bot of ['GPTBot', 'ClaudeBot', 'Google-Extended', 'PerplexityBot']) {
    check(`robots.txt nombra a ${bot}`, new RegExp(`User-agent: ${bot}`).test(robots));
  }
}

// --- llms.txt según llmstxt.org ---
if (hay('llms.txt')) {
  const llms = leer('llms.txt');
  check('llms.txt arranca con un título H1', /^# .+/m.test(llms));
  check('llms.txt tiene el resumen en blockquote', /^> .+/m.test(llms));
  check('llms.txt enlaza páginas del sitio', /^- \[.+\]\(https?:\/\/.+\)/m.test(llms));
  check('llms.txt tiene contenido suficiente', llms.length >= 800, `tiene ${llms.length} caracteres`);
}

// --- El 404 tiene que ofrecer salidas ---
if (hay('404.html')) {
  const p404 = leer('404.html');
  check('el 404 enlaza el sitemap', /sitemap-index\.xml/.test(p404));
  check('el 404 enlaza llms.txt', /llms\.txt/.test(p404));
  check('el 404 enlaza páginas del sitio', /href="[^"]*vecinos"/.test(p404));
}

// --- Las URLs del sitemap tienen que coincidir con el destino ---
if (hay('sitemap-0.xml')) {
  const mapa = leer('sitemap-0.xml');
  const urls = [...mapa.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  check('el sitemap lista páginas', urls.length >= 2, `lista ${urls.length}`);
  if (hay('index.html')) {
    const canonical = leer('index.html').match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    if (canonical) {
      const base = new URL(canonical).origin;
      check(
        'el sitemap y el canonical apuntan al mismo dominio',
        urls.every((u) => u.startsWith(base)),
        `canonical en ${base}, sitemap en ${new URL(urls[0]).origin}`
      );
    }
  }
}

// --- Salida ---
const linea = '─'.repeat(64);
console.log(`\n${linea}\n  VERIFICACIÓN DEL SITIO\n${linea}`);
console.log(`  ${oks.length} controles pasados`);
for (const a of avisos) console.log(`  aviso: ${a}`);
if (errores.length) {
  console.log(`\n\x1b[31m  ${errores.length} problema(s):\x1b[0m`);
  for (const e of errores) console.log(`   · ${e}`);
  console.log(`${linea}\n`);
  process.exit(1);
}
console.log(`\x1b[32m  Todo en orden.\x1b[0m\n${linea}\n`);
