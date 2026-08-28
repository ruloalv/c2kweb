// Contenido de la página de vecinos. Vive acá porque lo usan tanto la página
// como su versión en markdown y los datos estructurados para Google.

export type Paso = { n: string; titulo: string; texto: string };
export type Pregunta = { p: string; r: string };

export const pasos: Paso[] = [
  {
    n: '01',
    titulo: 'Calculás tu frente',
    texto: 'Con los metros de frente de tu lote tenés una idea del orden de magnitud de la obra.',
  },
  {
    n: '02',
    titulo: 'Juntás a la cuadra',
    texto:
      'La obra mínima es una cuadra completa y necesita el acuerdo de todos los frentistas.',
  },
  {
    n: '03',
    titulo: 'Acordamos el presupuesto',
    texto:
      'Preparamos el presupuesto formal y definimos con vos la forma de pago y la financiación.',
  },
  {
    n: '04',
    titulo: 'Gestionamos y ejecutamos',
    texto:
      'Iniciamos el expediente municipal y hacemos la obra completa, con plazos acordados por escrito.',
  },
];

export const preguntas: Pregunta[] = [
  {
    p: '¿Por qué se calcula por metro de frente?',
    r: 'Porque en las obras de pavimento urbano cada frentista aporta por la parte de calzada que da a su lote, que es media calzada de ancho por los metros de frente que tiene. Es el criterio que usan la mayoría de los municipios.',
  },
  {
    p: '¿El precio que muestra la calculadora es un presupuesto?',
    r: 'No. Es una estimación orientativa para que sepas el orden de magnitud antes de arrancar. El presupuesto real depende del ancho de calzada, del estado del suelo, de los desagües y de cuántas cuadras entran en la obra.',
  },
  {
    p: '¿Por qué el valor cambia con el dólar?',
    r: 'El asfalto, el cemento y el combustible siguen al tipo de cambio. Para que el estimado no quede viejo, guardamos el precio en su equivalente en dólares y lo reexpresamos con la cotización del día. Abajo del resultado siempre ves la fecha del precio base.',
  },
  {
    p: '¿Qué pasa con las conexiones de agua, gas y cloacas?',
    r: 'Las que están en servicio no se ven afectadas. Si el lote necesita una conexión nueva, la gestiona el frentista y conviene resolverla antes del pavimento: una vez ejecutada la calzada, hay que romperla.',
  },
  {
    p: '¿Se puede pavimentar una sola casa?',
    r: 'No está permitido. La obra mínima que el municipio aprueba es una cuadra completa, y requiere el acuerdo de todos los frentistas.',
  },
  {
    p: '¿Trabajan con el municipio o directo con los vecinos?',
    r: 'Directo con los vecinos. El municipio pide el expediente e inspecciona los trabajos; la gestión de la obra la lleva la empresa de principio a fin. La forma de pago y la financiación se acuerdan con nosotros.',
  },
];
