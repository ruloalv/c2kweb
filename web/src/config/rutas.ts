/**
 * Arma las rutas internas del sitio respetando el subdirectorio en el que
 * esté publicado.
 *
 * En el dominio propio (carreteras2000.com.ar) el sitio cuelga de la raíz y
 * ruta('/vecinos') devuelve '/vecinos'.
 *
 * En GitHub Pages cuelga de /c2kweb, y devuelve '/c2kweb/vecinos'.
 *
 * Se usa para todo link o imagen interna. Los anclas de la misma página
 * (#productos) no la necesitan.
 */
export function ruta(camino: string): string {
  const base = import.meta.env.BASE_URL; // termina siempre en '/'
  return base.replace(/\/$/, '') + '/' + camino.replace(/^\//, '');
}
