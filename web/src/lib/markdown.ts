/**
 * Versiones en markdown de las páginas del sitio.
 *
 * Los agentes de IA leen mucho mejor markdown que HTML: no tienen que
 * adivinar qué es contenido y qué es maquetado. Cada página HTML declara su
 * gemela en markdown con <link rel="alternate" type="text/markdown">.
 *
 * Todo sale de los mismos archivos de configuración que el sitio, así que no
 * hay dos versiones del contenido que puedan desincronizarse.
 */
import { empresa } from '../config/empresa';
import { productos } from '../data/productos';
import { obras } from '../data/obras';
import { clientes } from '../data/clientes';
import { precios, fechaLegible, notaBadenes } from '../config/precios';

const pesos = (n: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(n);

/** Markdown de la página de inicio. */
export function markdownInicio(url: (p: string) => string): string {
  const anios = new Date().getFullYear() - empresa.anioInicio;

  return `# ${empresa.nombre}

> ${empresa.descripcion}

Obra pública y privada desde ${empresa.anioInicio}: ${anios} años de trayectoria, dos plantas propias y trabajos para más de veinte municipios y vialidades.

## Productos y servicios

${productos
  .map((p) => `### ${p.nombre}\n\n${p.bajada}\n\n${p.detalle.map((d) => `- ${d}`).join('\n')}`)
  .join('\n\n')}

## Productos patentados

${empresa.patentes
  .map(
    (p) =>
      `- **${p.producto}®** — reparador instantáneo de pavimento, se aplica en frío y sin equipo especial. Patente acta ${p.acta}.`
  )
  .join('\n')}

## Obras

${obras.map((o) => `- **${o.titulo}** (${o.lugar}, ${o.tipo}): ${o.detalle}`).join('\n')}

## Clientes

${(['Vialidad', 'Municipios', 'Privados'] as const)
  .map(
    (g) =>
      `- **${g}**: ${clientes
        .filter((c) => c.grupo === g)
        .map((c) => c.nombre)
        .join(', ')}.`
  )
  .join('\n')}

## Sedes

${empresa.sedes
  .map(
    (s) =>
      `- **${s.ciudad}** (${s.provincia}): ${s.direccion}. Tel. ${s.telefono}, cel. ${s.celular}.`
  )
  .join('\n')}

## Contacto

${empresa.contactos
  .map(
    (c) =>
      `- **${c.titulo}**: WhatsApp +${c.whatsapp}${'telefono' in c ? `, tel. ${c.telefono}` : ''}. ${c.texto}`
  )
  .join('\n')}

Correo: ${empresa.email}

## Otras páginas

- [Calculadora de pavimento para vecinos](${url('/vecinos')}) · [en markdown](${url('/vecinos.md')})
`;
}

/** Markdown de la página de vecinos, con los precios vigentes. */
export function markdownVecinos(
  url: (p: string) => string,
  preguntas: { p: string; r: string }[],
  pasos: { n: string; titulo: string; texto: string }[]
): string {
  const nota = notaBadenes();

  return `# Pavimento para vecinos — ${empresa.nombre}

> Cuánto sale pavimentar el frente de tu casa. Estimación por metro de frente sobre media calzada, actualizada con la cotización del dólar del Banco Nación.

## Cómo se calcula

Cada frentista paga la media calzada que da a su lote: ${precios.anchoMediaCalzada} metros de ancho por los metros de frente del terreno. Un lote de 10 m de frente son ${10 * precios.anchoMediaCalzada} m².

## Precios de referencia al ${fechaLegible()}

Tipos de calzada, por metro cuadrado:

${precios.obras
  .map(
    (o) =>
      `- **${o.nombre}**: ${pesos(o.precioM2)} el m². ${o.detalle} Un frente de 10 m da ${pesos(o.precioM2 * precios.anchoMediaCalzada * 10)}.`
  )
  .join('\n')}

Trabajos que se cobran por metro lineal de frente, y se pueden pedir por separado:

${precios.adicionales
  .map((a) => `- **${a.nombre}**: ${pesos(a.precioPorMetroFrente)} el metro. ${a.detalle}`)
  .join('\n')}

Los valores se guardan en su equivalente en dólares y se reexpresan con la cotización del día, así que el estimado no queda viejo. El dólar de referencia al ${fechaLegible()} fue ${pesos(precios.dolarReferencia)}.

## Importante

${precios.notasDestacadas.map((n) => `- **${n.titulo}**: ${n.texto}`).join('\n')}
- **${nota.titulo}**: ${nota.texto}
- **Lotes en esquina**: ${precios.notaEsquina}

${precios.aclaraciones.map((a) => `- ${a}`).join('\n')}

## Cómo se hace el pavimento de una cuadra

${pasos.map((p) => `${Number(p.n)}. **${p.titulo}** — ${p.texto}`).join('\n')}

## Preguntas frecuentes

${preguntas.map((f) => `### ${f.p}\n\n${f.r}`).join('\n\n')}

## Contacto

Para un presupuesto formal, WhatsApp +${empresa.whatsappPrincipal} o correo ${empresa.email}.

## Otras páginas

- [Inicio](${url('/')}) · [en markdown](${url('/index.md')})
`;
}
