// =====================================================================
//  PRECIOS DE REFERENCIA — PAVIMENTO PARA VECINOS
//  >>> ESTE ES EL ÚNICO ARCHIVO QUE TENÉS QUE TOCAR PARA ACTUALIZAR <<<
//
//  Cómo funciona:
//  1. Cargás el precio del m² de HOY en pesos y el dólar de HOY.
//  2. El sitio guarda internamente el precio en dólares.
//  3. Cada vez que un vecino abre la calculadora, el sitio busca el dólar
//     del día y reexpresa el precio. Así el estimado no se desactualiza
//     aunque pasen semanas.
//  4. Siempre se muestra la fecha del precio base, para que quede claro
//     que es una referencia y no un presupuesto cerrado.
//
//  Pasados los días de `vigenciaDias`, la web le avisa sola al vecino y
//  `npm run dev` / `npm run build` te avisan a vos por consola.
// =====================================================================

export const precios = {
  // --- ACTUALIZAR ESTOS TRES VALORES ---
  fechaActualizacion: '2026-08-27', // AAAA-MM-DD del día que cargaste los precios
  dolarReferencia: 1535,            // dólar BNA billetes VENTA de ese mismo día
  vigenciaDias: 30,                 // a los cuántos días la web muestra la advertencia

  // --- CONFIGURACIÓN ---
  // 'oficial' es el del Banco Nación (billetes, venta), el mismo que figura
  // en bna.com.ar. Otras opciones: 'mayorista' | 'blue' | 'tarjeta'.
  fuenteDolar: 'oficial' as 'oficial' | 'mayorista' | 'blue' | 'tarjeta',
  // Poner en false si preferís mostrar el precio fijo en pesos sin ajustar.
  ajustarPorDolar: true,

  // Metros de ancho de calzada que le corresponden al frentista (media calzada).
  // Con 4 m, un lote de 10 m de frente paga 40 m².
  anchoMediaCalzada: 4,

  // --- TIPOS DE CALZADA ---
  // El precio va por METRO CUADRADO. La calculadora lo multiplica por el
  // ancho de media calzada y por los metros de frente del lote.
  obras: [
    {
      id: 'asfalto',
      nombre: 'Pavimento asfáltico',
      detalle: 'Base estabilizada y carpeta de concreto asfáltico en caliente.',
      precioM2: 48000,
    },
    {
      id: 'articulado',
      nombre: 'Pavimento articulado',
      detalle: 'Adoquines de hormigón sobre cama de arena, con contención lateral.',
      precioM2: 82000,
    },
  ],

  // --- TRABAJOS QUE VAN POR METRO LINEAL DE FRENTE ---
  // Se pueden pedir junto con el pavimento o por separado. El cordón cuneta,
  // por ejemplo, se cotiza solo si la cuadra todavía no lo tiene.
  adicionales: [
    {
      id: 'cordon',
      nombre: 'Cordón cuneta',
      detalle: 'Si la cuadra todavía no tiene. Se puede hacer sin pavimentar.',
      precioPorMetroFrente: 79000,
    },
    {
      id: 'vereda',
      nombre: 'Vereda de hormigón',
      detalle: 'Vereda de 1,20 m de ancho.',
      precioPorMetroFrente: 39000,
    },
  ],

  // --- BADENES ---
  // Solo se ofrecen cuando se hace cordón cuneta, porque van integrados a él.
  //
  // Ojo con la cuenta: el badén es una obra de la cuadra entera, no del lote.
  // Por eso el costo se prorratea entre los frentistas según los metros de
  // frente de cada uno. Cargarle el badén completo a un solo vecino daría un
  // número disparatado.
  badenes: {
    nombre: 'Badenes',
    detalle:
      'Los define el proyecto hidráulico del municipio: pueden ser 0, 1 o 2 por cuadra. El costo se reparte entre los frentistas.',
    superficiePromedioM2: 70, // superficie promedio de un badén
    precioM2: 95000, // $ por m²  → 70 m² × 95.000 = $6.650.000 cada uno
    maximo: 2,
    // Metros de frente que suele tener una cuadra completa, sumando ambas
    // veredas. Se usa para repartir el costo; el vecino puede corregirlo.
    frenteCuadraPorDefecto: 200,
  },

  // --- AVISOS DESTACADOS DEBAJO DE LA CALCULADORA ---
  // Van resaltados en amarillo. Son las dos cosas que más pregunta la gente.
  notasDestacadas: [
    {
      titulo: 'Trámite municipal incluido',
      texto:
        'Toda obra en la vía pública requiere expediente y aprobación municipal para certificarse. La gestión está a cargo de la empresa e incluida en el precio.',
    },
    {
      titulo: 'Servicios existentes',
      texto:
        'Las conexiones en servicio no se ven afectadas por la obra. Las conexiones nuevas las gestiona el frentista y no están incluidas.',
    },
    {
      titulo: 'Los badenes se reparten',
      texto:
        'El badén es una obra de la cuadra entera, no de un lote. Su costo se divide entre todos los frentistas según los metros de frente de cada uno, así que el valor que te toca depende de cuántos vecinos participen y de cuánto frente tenga cada uno. La cantidad —ninguno, uno o dos— la define el proyecto hidráulico del municipio.',
    },
  ],

  // --- LETRA CHICA QUE SE MUESTRA DEBAJO DEL RESULTADO ---
  aclaraciones: [
    'El valor es una estimación orientativa, no constituye presupuesto ni oferta.',
    'No incluye IVA.',
    'El precio final depende del ancho de calzada, el estado del suelo y el volumen de la obra.',
    'La obra mínima es una cuadra completa, con el acuerdo de todos los frentistas.',
  ],
} as const;

// ---------------------------------------------------------------------
// De acá para abajo no hace falta tocar nada.
// ---------------------------------------------------------------------

/** Días transcurridos desde que se cargaron los precios. */
export function diasDesdeActualizacion(hoy = new Date()): number {
  const base = new Date(precios.fechaActualizacion + 'T00:00:00');
  return Math.floor((hoy.getTime() - base.getTime()) / 86_400_000);
}

/** true cuando ya pasó la vigencia y conviene revisar los valores. */
export function preciosVencidos(hoy = new Date()): boolean {
  return diasDesdeActualizacion(hoy) > precios.vigenciaDias;
}

/** Fecha del precio base en formato 27/08/2026. */
export function fechaLegible(): string {
  const [a, m, d] = precios.fechaActualizacion.split('-');
  return `${d}/${m}/${a}`;
}
