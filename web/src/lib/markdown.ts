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
import { programa, reunionesVigentes, fechaReuniones } from '../config/programa';

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

- [Pavimento para vecinos: el programa municipal de Bahía Blanca](${url('/vecinos')}) · [en markdown](${url('/vecinos.md')})
`;
}

/** Markdown de la página de vecinos, sobre el programa municipal. */
export function markdownVecinos(
  url: (p: string) => string,
  preguntas: { p: string; r: string }[],
  pasos: { n: string; titulo: string; texto: string }[]
): string {
  const reuniones = reunionesVigentes()
    ? `\n## Reuniones informativas\n\nEl Municipio recibe consultas ${programa.reuniones.dias} ${programa.reuniones.horario}, en el ${programa.reuniones.lugar} (${programa.reuniones.direccion}), hasta el ${fechaReuniones()}.\n`
    : '';

  return `# Pavimento para vecinos en Bahía Blanca — ${empresa.nombre}

> Cómo inscribir tu cuadra en el ${programa.nombre} de la ${programa.municipio} para hacer el pavimento, el cordón cuneta o la vereda, con financiación bancaria y supervisión técnica del Municipio.

## Qué es el programa

La ${programa.municipio} abrió la inscripción para que los frentistas de una cuadra resuelvan juntos la obra que les falta: ${programa.trabajos.join(', ')}. El vecino se inscribe en el portal ${programa.portal} (${programa.inscripcion}), en la opción **${programa.opcionPortal}**, que es donde se pide la cuadra. El portal exige registro previo con DNI, ANSES, ARCA o Mi Argentina.

Una vez inscripto el 100% de los frentistas de la cuadra, el Municipio gira el detalle técnico a la Cámara de la Construcción, que elabora el presupuesto. El acuerdo final es entre la Cámara, el vecino y el banco.

Consultas del programa: WhatsApp ${programa.whatsappLegible}.
${reuniones}
## Precios

El sitio no publica precios propios para este programa. El valor lo define la Cámara de la Construcción una vez relevada la cuadra, y es el mismo para todas las empresas asociadas. Es un precio consensuado, no una cotización por empresa.

## Financiación

Hay líneas anunciadas por los bancos ${programa.bancos.join(', ')}, cada una con sus plazos y su calificación crediticia, además de la opción de pago al contado. Las condiciones vigentes las publica el Municipio en ${programa.inscripcion}; cambian seguido, así que no se reproducen acá.

## Pasos para inscribir una cuadra

${pasos.map((p) => `${Number(p.n)}. **${p.titulo}** — ${p.texto}`).join('\n')}

## Qué empresa ejecuta la obra

La Cámara de la Construcción reparte las cuadras entre las empresas asociadas; el vecino no elige empresa. ${empresa.nombre} es socia de la Cámara de Bahía Blanca y está adherida al programa.

## Fuera de Bahía Blanca

El programa rige solo en el partido de Bahía Blanca. En Pigüé y el resto del sudoeste bonaerense, ${empresa.nombre} trabaja directo con el grupo de vecinos: hay que consultar por WhatsApp +${empresa.whatsappPrincipal}.

## Preguntas frecuentes

${preguntas.map((f) => `### ${f.p}\n\n${f.r}`).join('\n\n')}

## Acompañamiento de ${empresa.nombre}

La empresa acompaña a los vecinos sin cargo y sin compromiso: explica el programa, va a la reunión de la cuadra si el grupo la organiza, revisa el estado de la calle y el escurrimiento, y avisa qué conexiones de servicios conviene resolver antes del pavimento. No garantiza que ejecute esa cuadra, porque la obra la asigna la Cámara.

## Contacto

WhatsApp +${empresa.whatsappPrincipal} o correo ${empresa.email}.

## Otras páginas

- [Inicio](${url('/')}) · [en markdown](${url('/index.md')})
`;
}
