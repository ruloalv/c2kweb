/**
 * Arma el paquete para publicar el sitio en un hosting tradicional (cPanel con
 * Apache o LiteSpeed), sin Cloudflare Workers.
 *
 *   npm run empaqueta-hosting
 *
 * Deja en c2kweb/entregas/ un ZIP con:
 *   LEEME-DESPLIEGUE.txt   instrucciones para quien administra el hosting
 *   public_html/           el contenido a subir a la raíz pública del dominio
 *
 * Hay que volver a correrlo y reenviar el ZIP cada vez que cambia algo del
 * sitio, incluidos los precios de la calculadora.
 */
import { execFileSync, execSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const SITIO = 'https://www.carreteras2000.com.ar';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(raiz, 'dist');
const entregas = join(raiz, '..', 'entregas');
const fecha = new Date().toISOString().slice(0, 10);
const trabajo = join(entregas, `c2kweb-hosting-${fecha}`);
const publico = join(trabajo, 'public_html');
const zip = join(entregas, `c2kweb-hosting-${fecha}.zip`);

// --- 1. Compilar para el dominio propio, en la raíz ---
console.log(`\n  Compilando para ${SITIO}\n`);
const env = { ...process.env, SITE_URL: SITIO };
delete env.BASE_PATH;
execSync('npm run build', { cwd: raiz, stdio: 'inherit', env });

// --- 2. Copiar el sitio compilado ---
rmSync(trabajo, { recursive: true, force: true });
rmSync(zip, { force: true });
mkdirSync(publico, { recursive: true });
cpSync(dist, publico, { recursive: true });

// _headers solo lo entiende Cloudflare; en Apache quedaría público y confunde.
rmSync(join(publico, '_headers'), { force: true });

// --- 3. Configuración de Apache / LiteSpeed ---
writeFileSync(
  join(publico, '.htaccess'),
  `# =====================================================================
#  Carreteras 2000 S.A. — configuración para Apache 2.4 / LiteSpeed
# =====================================================================
#  Sitio estático: HTML, CSS e imágenes. No usa PHP ni base de datos.

Options -Indexes -MultiViews
DirectoryIndex index.html

# Codificación y tipos que el servidor no siempre trae configurados
AddDefaultCharset utf-8
AddCharset utf-8 .html .md .txt .xml
AddType text/markdown .md
AddType image/webp .webp
AddType font/woff2 .woff2

# Página de error propia, con estado 404 real
ErrorDocument 404 /404.html

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # 1. Sin barra final: /vecinos/ redirige a /vecinos
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.+)/$ /$1 [R=301,L]

  # 2. Los asistentes de IA que piden markdown reciben la versión .md
  RewriteCond %{HTTP_ACCEPT} text/markdown [NC]
  RewriteRule ^(index\\.html)?$ index.md [L]

  RewriteCond %{HTTP_ACCEPT} text/markdown [NC]
  RewriteRule ^vecinos(\\.html)?$ vecinos.md [L]

  # 3. URLs sin extensión: /vecinos sirve vecinos.html
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME}.html -f
  RewriteRule ^(.+)$ $1.html [L]
</IfModule>

<IfModule mod_headers.c>
  # La misma URL puede devolver HTML o markdown según lo que pida el cliente
  Header merge Vary Accept

  # Las páginas se revisan seguido, así un cambio de precios se ve enseguida
  <FilesMatch "\\.(html|md|txt|xml)$">
    Header set Cache-Control "public, max-age=300"
  </FilesMatch>
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/plain text/markdown application/javascript application/xml image/svg+xml
</IfModule>

# No se fuerza HTTPS acá a propósito: lo resuelve Cloudflare. Con Cloudflare
# en modo SSL "Flexible", una redirección en el servidor produce un bucle.
`
);

writeFileSync(
  join(publico, '_astro', '.htaccess'),
  `# Archivos con un código en el nombre: cuando cambian, cambia el nombre.
# Por eso el navegador puede guardarlos un año sin riesgo de ver versiones viejas.
<IfModule mod_headers.c>
  Header set Cache-Control "public, max-age=31536000, immutable"
</IfModule>
`
);

// --- 4. Instrucciones para quien administra el hosting ---
writeFileSync(
  join(trabajo, 'LEEME-DESPLIEGUE.txt'),
  `CARRETERAS 2000 S.A. — SITIO WEB NUEVO
Instrucciones de publicación · paquete del ${fecha}
======================================================================

QUÉ ES
Sitio estático generado con Astro: HTML, CSS, imágenes y archivos de texto.
No usa PHP, ni base de datos, ni Node.js en el servidor.


QUÉ SUBIR
Todo el contenido de la carpeta public_html/ de este ZIP, a la raíz pública
del dominio (en cPanel, normalmente la carpeta public_html).

  1. Hacer una copia de respaldo del sitio actual.
  2. Borrar los archivos del sitio anterior de la raíz pública, para que no
     queden páginas viejas accesibles. No tocar nada del correo.
  3. Subir el contenido de public_html/.

IMPORTANTE: el paquete trae dos archivos .htaccess, uno en la raíz y otro en
_astro/. Son necesarios. El administrador de archivos de cPanel suele ocultar
los archivos que empiezan con punto: activar "Mostrar archivos ocultos" y
confirmar que se subieron.


REQUISITOS DEL SERVIDOR
Apache 2.4 o LiteSpeed con mod_rewrite y mod_headers, lo habitual en cPanel.
Si el servidor es nginx, ver la sección del final.


HTTPS Y CLOUDFLARE
El dominio ya está detrás de Cloudflare, que resuelve el HTTPS. No agregar una
redirección a HTTPS en el servidor: con Cloudflare en modo SSL "Flexible"
produce un bucle de redirecciones.

Después de subir, purgar la caché en Cloudflare:
Caching > Configuration > Purge Everything.


CÓMO VERIFICAR
Cada comando tiene que devolver el código indicado a la derecha.

  curl -s -o /dev/null -w "%{http_code}" ${SITIO}/              -> 200
  curl -s -o /dev/null -w "%{http_code}" ${SITIO}/vecinos       -> 200
  curl -s -o /dev/null -w "%{http_code}" ${SITIO}/no-existe     -> 404
  curl -s -o /dev/null -w "%{http_code}" ${SITIO}/llms.txt      -> 200
  curl -s -o /dev/null -w "%{http_code}" ${SITIO}/robots.txt    -> 200

Y este tiene que empezar con "# Pavimento para vecinos":

  curl -s -H "Accept: text/markdown" ${SITIO}/vecinos

Si /vecinos da 404, el .htaccess no se subió o mod_rewrite no está activo.


SI EL SERVIDOR ES NGINX
El .htaccess no aplica. Configuración equivalente dentro del bloque server:

  error_page 404 /404.html;

  types { text/markdown md; }

  location = / {
      if ($http_accept ~* "text/markdown") { rewrite ^ /index.md last; }
      try_files /index.html =404;
  }

  location = /vecinos {
      if ($http_accept ~* "text/markdown") { rewrite ^ /vecinos.md last; }
      try_files /vecinos.html =404;
  }

  location / {
      rewrite ^/(.+)/$ /$1 permanent;
      try_files $uri $uri.html =404;
  }

  location /_astro/ {
      add_header Cache-Control "public, max-age=31536000, immutable";
  }


CONTACTO
Consultas sobre el sitio: ruloalv@gmail.com
`
);

// --- 5. Comprimir ---
// En Windows se usa el tar del sistema, que genera ZIP con barras normales.
// El Compress-Archive de PowerShell 5 usa barras invertidas y el ZIP se rompe
// al descomprimirlo en un servidor Linux.
const entradas = ['LEEME-DESPLIEGUE.txt', 'public_html'];
if (process.platform === 'win32') {
  const tar = join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'tar.exe');
  execFileSync(tar, ['-a', '-c', '-f', zip, '-C', trabajo, ...entradas], { stdio: 'inherit' });
} else {
  execFileSync('zip', ['-r', '-q', zip, ...entradas], { cwd: trabajo, stdio: 'inherit' });
}

if (!existsSync(zip)) {
  console.error('\n  No se pudo generar el ZIP.\n');
  process.exit(1);
}
rmSync(trabajo, { recursive: true, force: true });

console.log(`\n  Paquete listo para entregar:\n  ${zip}\n`);
