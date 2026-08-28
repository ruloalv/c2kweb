/**
 * Prueba la negociación de contenido del Worker contra un sitio en vivo.
 *
 *   npm run prueba-worker                        (contra el sitio publicado)
 *   npm run prueba-worker http://127.0.0.1:8788  (contra `npx wrangler dev`)
 *
 * Comprueba que un navegador reciba HTML, que un agente que pide markdown
 * reciba markdown, que las rutas inexistentes den 404 en el formato pedido, y
 * que todo declare Vary: Accept.
 */

const base = (process.argv[2] || 'https://c2kweb.ruloalv.workers.dev').replace(/\/$/, '');

const NAVEGADOR = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8';
const AGENTE = 'text/markdown';

const casos = [
  { nombre: 'home, navegador', ruta: '/', accept: NAVEGADOR, estado: 200, tipo: 'text/html' },
  { nombre: 'vecinos, navegador', ruta: '/vecinos', accept: NAVEGADOR, estado: 200, tipo: 'text/html' },
  { nombre: 'home, agente markdown', ruta: '/', accept: AGENTE, estado: 200, tipo: 'text/markdown', empiezaCon: '# ' },
  { nombre: 'vecinos, agente markdown', ruta: '/vecinos', accept: AGENTE, estado: 200, tipo: 'text/markdown', empiezaCon: '# ' },
  { nombre: 'markdown por URL directa', ruta: '/vecinos.md', accept: '*/*', estado: 200, tipo: 'text/markdown' },
  { nombre: '404, navegador', ruta: '/ruta-que-no-existe', accept: NAVEGADOR, estado: 404, tipo: 'text/html' },
  { nombre: '404, agente markdown', ruta: '/ruta-que-no-existe', accept: AGENTE, estado: 404, tipo: 'text/markdown', empiezaCon: '# 404' },
  { nombre: 'el comodín no fuerza markdown', ruta: '/', accept: '*/*', estado: 200, tipo: 'text/html' },
  { nombre: 'llms.txt', ruta: '/llms.txt', accept: '*/*', estado: 200, tipo: 'text/plain' },
  { nombre: 'robots.txt', ruta: '/robots.txt', accept: '*/*', estado: 200, tipo: 'text/plain' },
  { nombre: 'sitemap', ruta: '/sitemap-index.xml', accept: '*/*', estado: 200, tipo: 'xml' },
];

// Estas respuestas dependen del Accept, así que tienen que declararlo.
const conVary = new Set(['/', '/vecinos', '/vecinos.md', '/ruta-que-no-existe']);

let bien = 0;
const fallas = [];

console.log(`\n  Probando ${base}\n`);

for (const c of casos) {
  let r;
  try {
    r = await fetch(base + c.ruta, { headers: { Accept: c.accept }, redirect: 'manual' });
  } catch (e) {
    fallas.push(`${c.nombre} — no respondió: ${e.message}`);
    continue;
  }

  const tipo = r.headers.get('content-type') || '';
  const problemas = [];

  if (r.status !== c.estado) problemas.push(`estado ${r.status}, esperaba ${c.estado}`);
  if (!tipo.includes(c.tipo)) problemas.push(`tipo "${tipo}", esperaba "${c.tipo}"`);

  if (c.empiezaCon) {
    const cuerpo = await r.text();
    if (!cuerpo.trimStart().startsWith(c.empiezaCon)) {
      problemas.push(`el cuerpo no empieza con "${c.empiezaCon}"`);
    }
  }

  if (conVary.has(c.ruta)) {
    const vary = r.headers.get('vary') || '';
    if (!/accept(?!-)/i.test(vary)) problemas.push(`Vary sin Accept (dice "${vary || 'nada'}")`);
  }

  if (problemas.length) {
    fallas.push(`${c.nombre} — ${problemas.join('; ')}`);
    console.log(`  \x1b[31m✗\x1b[0m ${c.nombre}`);
  } else {
    bien++;
    console.log(`  \x1b[32m✓\x1b[0m ${c.nombre}`);
  }
}

console.log(`\n  ${bien}/${casos.length} pruebas pasadas`);

if (fallas.length) {
  console.log('\n\x1b[31m  Fallas:\x1b[0m');
  for (const f of fallas) console.log(`   · ${f}`);
  console.log('');
  process.exit(1);
}
console.log('\x1b[32m  Todo en orden.\x1b[0m\n');
