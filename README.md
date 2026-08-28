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

## Publicar en Cloudflare Pages

GitHub Pages sirve el sitio desde un subdirectorio (`/c2kweb`), y eso trae dos
límites que no se arreglan con código: la raíz del dominio no es el sitio, y no
se pueden definir cabeceras HTTP. Cloudflare Pages resuelve las dos cosas, es
gratis y no pide tarjeta.

### Configuración

En [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** →
**Create application** → pestaña **Pages** → **Connect to Git** → autorizar
GitHub y elegir el repo `c2kweb`.

Después, en la pantalla de build:

| Campo | Valor |
| :--- | :--- |
| Project name | `c2kweb` |
| Production branch | `main` |
| Framework preset | `Astro` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory *(en Advanced)* | `web` |

Y dos variables de entorno:

| Variable | Valor |
| :--- | :--- |
| `SITE_URL` | `https://c2kweb.pages.dev` |
| `NODE_VERSION` | `22` |

`SITE_URL` es lo que hace que el canonical, el sitemap y el robots.txt apunten
al dominio correcto. Si más adelante se conecta el dominio propio, se cambia
ese valor por `https://www.carreteras2000.com.ar` y listo.

**No hay que definir `BASE_PATH`**: sin esa variable el sitio se compila para
la raíz del dominio, que es lo que corresponde acá.

### Después del primer deploy

Queda en `https://c2kweb.pages.dev`. Cada push a `main` republica solo, igual
que con GitHub Pages.

El archivo `web/public/_headers` pasa a tener efecto: define `Vary: Accept` y
el tipo de contenido de los `.md`.

El deploy de GitHub Pages puede quedar andando en paralelo sin problema. Si se
quiere apagar, se borra `.github/workflows/deploy.yml`.

## Diseño

Raúl Alvarado ([@ruloalv](https://github.com/ruloalv)), asistido por IA.
