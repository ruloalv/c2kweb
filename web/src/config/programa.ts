// =====================================================================
//  PROGRAMA MUNICIPAL DE CONSORCIOS VECINALES — BAHÍA BLANCA
//  >>> ÚNICO ARCHIVO A TOCAR SI CAMBIA ALGO DEL PROGRAMA <<<
//
//  Cómo funciona el programa, y por qué el sitio ya no publica precios:
//  el Municipio inscribe a los vecinos, la Cámara de la Construcción
//  presupuesta a un precio consensuado igual para todas las empresas, y
//  reparte las cuadras entre las asociadas. Competir por precio dejó de
//  tener sentido; lo que conviene es que se inscriban más cuadras.
// =====================================================================

export const programa = {
  nombre: 'Programa de fomento de consorcios vecinales',
  municipio: 'Municipalidad de Bahía Blanca',
  portal: 'Mi Bahía',

  // Donde se inscribe el vecino. Pide registro previo con DNI, ANSES o
  // Mi Argentina, así que no se puede ver sin estar logueado.
  inscripcion: 'https://mibahia.gob.ar/asfalto',

  // Cómo se llama la opción adentro del portal. Sin este dato el vecino
  // entra, no la encuentra y abandona.
  opcionPortal: 'Consorcio Vecinal',

  // WhatsApp de atención del programa, que atiende el Municipio.
  whatsapp: '5492914273947',
  whatsappLegible: '291 427-3947',

  // Reuniones informativas en el Palacio Municipal. Pasada la fecha, la
  // sección desaparece sola del sitio: no hay que acordarse de sacarla.
  reuniones: {
    hasta: '2026-10-31',
    dias: 'de lunes a viernes',
    horario: 'de 18 a 19 h',
    lugar: 'Salón Héroes de Malvinas, Palacio Municipal',
    direccion: 'Alsina 65, 1.º piso',
  },

  // Bancos con financiación anunciada. Solo los nombres: las tasas y las
  // cuotas cambian seguido y mantenerlas acá sería trabajo perdido. El
  // vecino las ve actualizadas en el portal del Municipio.
  bancos: ['Provincia', 'Nación', 'Macro', 'Credicoop'],

  // Trabajos que cubre el programa.
  trabajos: ['pavimento', 'cordón cuneta', 'vereda'],
} as const;

// ---------------------------------------------------------------------
// De acá para abajo no hace falta tocar nada.
// ---------------------------------------------------------------------

/** true mientras siguen abiertas las reuniones informativas. */
export function reunionesVigentes(hoy = new Date()): boolean {
  const limite = new Date(programa.reuniones.hasta + 'T23:59:59');
  return hoy.getTime() <= limite.getTime();
}

/** Fecha límite de las reuniones en formato 31/10/2026. */
export function fechaReuniones(): string {
  const [a, m, d] = programa.reuniones.hasta.split('-');
  return `${d}/${m}/${a}`;
}
