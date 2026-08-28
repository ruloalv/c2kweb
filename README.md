# Sitio web de Carreteras 2000 S.A.

Sitio institucional de [Carreteras 2000 S.A.](https://www.carreteras2000.com.ar),
empresa de obras viales de Pigüé y Bahía Blanca: mezclas asfálticas en caliente y
en frío, hormigón elaborado y movimiento de suelos.

Incluye una **calculadora de pavimento para vecinos**: con los metros de frente
del lote estima cuánto sale pavimentar la cuadra, y mantiene el valor al día
ajustándolo por la cotización del dólar del Banco Nación.

## Arrancar

```bash
cd web
npm install
npm run dev
```

Queda en http://localhost:4321

## Stack

Astro 5 + Tailwind 4. Sitio estático: no hay servidor ni base de datos, se
compila a HTML y se sube a cualquier hosting.

Sin dependencias de terceros en el navegador salvo una consulta a
[dolarapi.com](https://dolarapi.com) para actualizar el estimado de la
calculadora. Las tipografías viajan con el sitio.

## Lo que se edita seguido

| Para cambiar…                            | Archivo                      |
| :--------------------------------------- | :--------------------------- |
| **Precios de la calculadora**             | `web/src/config/precios.ts`  |
| Teléfonos, direcciones, mails, WhatsApps  | `web/src/config/empresa.ts`  |
| Productos, obras y clientes               | `web/src/data/`              |
| Fotos y logos                             | `web/src/assets/`            |

Cada carpeta de imágenes tiene un `LEEME.txt` con los nombres y tamaños que
espera el sitio.

La documentación completa está en [`web/README.md`](web/README.md).

## Publicar en Cloudflare

GitHub Pages sirve el sitio desde un subdirectorio (`/c2kweb`), y eso trae dos
límites que no se arreglan con código: la raíz del dominio no es el sitio, y no
se pueden definir cabeceras HTTP. Cloudflare resuelve las dos cosas, es gratis y
no pide tarjeta.

Cloudflare está migrando Pages hacia Workers, así que un proyecto nuevo conectado
a Git termina siendo un **Worker con archivos estáticos**. Sirve igual: no hay
código de servidor, Cloudflare publica directamente lo que Astro deja en
`dist/`, y lee el `_headers`.

La configuración vive en [`web/wrangler.jsonc`](web/wrangler.jsonc).

### Campos en el panel de Cloudflare

| Campo | Valor |
| :--- | :--- |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Version command | *(vacío)* |
| Root directory | `web` |
| Production branch | `main` |

Variables de entorno:

| Variable | Valor |
| :--- | :--- |
| `NODE_VERSION` | `22` |
| `SITE_URL` | la URL final del proyecto |

`SITE_URL` define a dónde apuntan el canonical, el sitemap y el robots.txt. La
URL de Workers se conoce recién después del primer deploy
(`c2kweb.<subdominio>.workers.dev`), así que el orden es: desplegar, copiar la
URL, cargarla como variable y volver a desplegar.

Cuando se conecte el dominio propio, se cambia esa variable por
`https://www.carreteras2000.com.ar`.

**No hay que definir `BASE_PATH`**: sin esa variable el sitio se compila para la
raíz del dominio, que es lo que corresponde acá.

### Qué resuelve el wrangler.jsonc

- `html_handling: drop-trailing-slash` — la URL buena es `/vecinos` y
  `/vecinos/` redirige hacia ella. Los agentes que no siguen redirecciones
  llegan a la primera.
- `not_found_handling: 404-page` — las rutas inexistentes devuelven `404.html`
  con estado HTTP 404 real, no un 200 con la página de inicio.

### Sobre GitHub Pages

El deploy de GitHub Pages puede quedar andando en paralelo sin problema. Si se
quiere apagar, se borra `.github/workflows/deploy.yml`.

## Diseño

[@ruloalv](https://github.com/ruloalv)
