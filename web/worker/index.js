/**
 * Worker que sirve el sitio estático y agrega negociación de contenido.
 *
 * El sitio sigue siendo estático: todo lo que se publica sale de dist/. Este
 * archivo solo se mete en el medio para dos cosas que un hosting de archivos
 * no puede hacer por sí solo:
 *
 *   1. Si el que pide es un agente y acepta text/markdown, devolverle la
 *      versión en markdown de la página en vez del HTML.
 *   2. Que las rutas inexistentes contesten un 404 con un cuerpo que le sirva
 *      al agente para reorientarse.
 *
 * En los dos casos se declara `Vary: Accept`, para que un intermediario no
 * guarde una variante y se la sirva a quien pidió la otra.
 */

/** Páginas HTML que tienen gemela en markdown. */
const MARKDOWN_POR_RUTA = {
  '/': '/index.md',
  '/index.html': '/index.md',
  '/vecinos': '/vecinos.md',
  '/vecinos.html': '/vecinos.md',
};

/**
 * true si quien pide prefiere markdown antes que HTML.
 *
 * Se lee el Accept como corresponde: cada tipo con su factor de calidad `q`
 * (1 si no lo aclara). Un navegador manda "text/html,...,*​/*" y gana HTML;
 * un agente que pide "text/markdown" gana markdown. El comodín no cuenta como
 * pedido explícito de markdown.
 */
function prefiereMarkdown(request) {
  const accept = request.headers.get('accept') || '';

  const calidades = new Map();
  for (const parte of accept.split(',')) {
    const [tipo, ...params] = parte.trim().split(';');
    const q = params
      .map((p) => p.trim().match(/^q=([0-9.]+)$/i))
      .find(Boolean);
    calidades.set(tipo.trim().toLowerCase(), q ? parseFloat(q[1]) : 1);
  }

  const md = calidades.get('text/markdown') ?? -1;
  const html = calidades.get('text/html') ?? -1;

  return md > 0 && md >= html;
}

/** Normaliza la ruta para buscarla en el mapa de arriba. */
function normalizar(pathname) {
  const sinBarra = pathname.replace(/\/+$/, '');
  return sinBarra === '' ? '/' : sinBarra;
}

/** Cuerpo del 404 en markdown, para que un agente sepa a dónde ir. */
function markdown404(origen) {
  return `# 404 — Página no encontrada

Esta URL no existe en el sitio de Carreteras 2000 S.A.

## Dónde seguir

- [Inicio](${origen}/) — empresa, productos, obras y contacto. En markdown: ${origen}/index.md
- [Pavimento para vecinos](${origen}/vecinos) — calculadora de costo por metro de frente. En markdown: ${origen}/vecinos.md
- [Resumen del sitio para modelos](${origen}/llms.txt)
- [Índice de páginas](${origen}/sitemap-index.xml)

## Contacto

WhatsApp +5492915065029 · info@carreteras2000.com.ar
`;
}

/** Copia una respuesta agregándole cabeceras. */
function conCabeceras(respuesta, cabeceras) {
  const salida = new Response(respuesta.body, respuesta);
  for (const [k, v] of Object.entries(cabeceras)) salida.headers.set(k, v);
  return salida;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origen = url.origin;
    const quiereMd = prefiereMarkdown(request);

    // --- 1. La misma página, en markdown ---
    if (quiereMd) {
      const gemela = MARKDOWN_POR_RUTA[normalizar(url.pathname)];
      if (gemela) {
        const md = await env.ASSETS.fetch(new URL(gemela, origen));
        if (md.ok) {
          return conCabeceras(md, {
            'Content-Type': 'text/markdown; charset=utf-8',
            Vary: 'Accept, Accept-Encoding',
            'Cache-Control': 'public, max-age=300',
          });
        }
      }
    }

    const respuesta = await env.ASSETS.fetch(request);

    // --- 2. El 404, también en markdown si lo piden ---
    if (respuesta.status === 404 && quiereMd) {
      return new Response(markdown404(origen), {
        status: 404,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          Vary: 'Accept, Accept-Encoding',
        },
      });
    }

    // Los .md pedidos por su URL directa también salen como markdown.
    if (url.pathname.endsWith('.md')) {
      return conCabeceras(respuesta, {
        'Content-Type': 'text/markdown; charset=utf-8',
        Vary: 'Accept, Accept-Encoding',
      });
    }

    // Todo lo demás viaja igual, declarando que la respuesta depende del Accept.
    return conCabeceras(respuesta, { Vary: 'Accept, Accept-Encoding' });
  },
};
