# Sitio de Carreteras 2000 S.A.

Sitio estático hecho con Astro 5 + Tailwind 4. No tiene servidor ni base de
datos: se compila a HTML y se sube a cualquier hosting.

## Comandos

| Comando                 | Qué hace                                          |
| :---------------------- | :------------------------------------------------ |
| `npm install`           | Instala las dependencias                           |
| `npm run dev`           | Levanta el sitio en http://localhost:4321          |
| `npm run build`         | Genera el sitio final en `dist/`                   |
| `npm run preview`       | Prueba el sitio ya compilado                       |
| `npm run check-precios` | Dice si hay que actualizar los precios de vecinos  |
| `npm run genera-og`     | Rehace la imagen que se ve al compartir el sitio    |
| `npm run verifica`      | Revisa el sitio compilado (corre solo tras el build) |

`npm run dev` y `npm run build` corren solos el chequeo de precios y avisan por
consola si están vencidos.

## Qué se edita y dónde

| Para cambiar…                                 | Archivo                        |
| :-------------------------------------------- | :----------------------------- |
| **Precios de la calculadora de vecinos**       | `src/config/precios.ts`        |
| Teléfonos, direcciones, mails, WhatsApps       | `src/config/empresa.ts`        |
| Productos y servicios                          | `src/data/productos.ts`        |
| Obras destacadas                               | `src/data/obras.ts`            |
| Clientes y sus logos                           | `src/data/clientes.ts`         |
| Preguntas frecuentes de vecinos                | `src/pages/vecinos.astro`      |
| Colores y tipografías                          | `src/styles/global.css`        |
| Dominio del sitio (canonical, sitemap)         | `astro.config.mjs`             |

Las fotos van en `src/assets/obras/` y los logos en `src/assets/clientes/`. Cada
carpeta tiene un `LEEME.txt` con los nombres y tamaños que espera el sitio. Astro
las convierte a webp y genera los tamaños solo, no hace falta comprimirlas.

En `public/` solo quedan el logo, el favicon, `og.jpg` y `robots.txt`.

## Actualizar los precios de vecinos

La forma más simple es abrir la página **/precios** del sitio (no está enlazada
ni indexada): cargás los valores, trae solo el dólar del día, te muestra cuánto
daría un frente de 10 m para que controles, y te arma el texto listo para pegar.

También se puede editar el archivo a mano.

En `src/config/precios.ts` se cargan tres cosas:

1. `fechaActualizacion` — el día que ponés los precios.
2. `dolarReferencia` — el dólar BNA billetes venta de ese día.
3. Los precios de ese día: `precioM2` de cada tipo de calzada y
   `precioPorMetroFrente` de cada adicional.

La calzada se cobra por metro cuadrado: la calculadora multiplica el `precioM2`
por `anchoMediaCalzada` (4 m) y por los metros de frente del lote. Los
adicionales (cordón cuneta, vereda) van por metro lineal.

La calculadora guarda internamente el precio en dólares y lo reexpresa con la
cotización del día (`dolarapi.com`, tipo `oficial`, que es el del Banco Nación),
así el estimado no queda viejo. Debajo del resultado siempre se muestra la fecha
del precio base.

Pasados los días de `vigenciaDias` (hoy, 30), la web muestra sola una
advertencia al vecino y la consola avisa al compilar.

Si preferís precio fijo en pesos, poné `ajustarPorDolar: false`.

## Archivos para buscadores y asistentes de IA

Se generan en cada build, así que las URLs siempre coinciden con el destino:

| Archivo | Origen |
| :--- | :--- |
| `robots.txt` | `src/pages/robots.txt.ts` |
| `llms.txt` | `src/pages/llms.txt.ts` |
| `sitemap-index.xml` | integración `@astrojs/sitemap` |

`npm run verifica` los controla después de cada build: 38 chequeos que incluyen
H1 presente, 500+ caracteres de texto sin JavaScript, datos estructurados con
JSON válido y coincidencia entre el sitemap y la URL canónica.

## Estructura

```
src/
├── config/     empresa.ts y precios.ts (lo que se edita seguido)
├── data/       productos, obras y clientes
├── assets/     fotos y logos que Astro optimiza
├── components/ piezas de la interfaz
├── layouts/    BaseLayout.astro (head, SEO, tema claro/oscuro)
└── pages/      index.astro, vecinos.astro, 404.astro
```
