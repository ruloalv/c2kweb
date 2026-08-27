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

## Diseño

Raúl Alvarado ([@ruloalv](https://github.com/ruloalv)), asistido por IA.
