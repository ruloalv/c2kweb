// Contenido de la página de vecinos. Vive acá porque lo usan tanto la página
// como su versión en markdown y los datos estructurados para Google.

export type Paso = { n: string; titulo: string; texto: string };
export type Pregunta = { p: string; r: string };

export const pasos: Paso[] = [
  {
    n: '01',
    titulo: 'Te registrás en Mi Bahía',
    texto:
      'Una sola vez, con tu DNI, tu cuenta de ANSES, de ARCA o de Mi Argentina. Es el portal de trámites del Municipio.',
  },
  {
    n: '02',
    titulo: 'Inscribís tu cuadra',
    texto:
      'Elegís qué necesita la cuadra: pavimento, cordón cuneta o vereda. La inscripción es gratuita y no te obliga a nada.',
  },
  {
    n: '03',
    titulo: 'Se suman todos los frentistas',
    texto:
      'La cuadra entra al programa recién cuando se inscribe el 100% de los frentistas. Es el paso que más demora, y en el que te damos una mano.',
  },
  {
    n: '04',
    titulo: 'El Municipio pasa el detalle técnico',
    texto:
      'Obras Públicas releva la cuadra y se la gira a la Cámara de la Construcción para que prepare el presupuesto.',
  },
  {
    n: '05',
    titulo: 'Elegís cómo pagarlo',
    texto:
      'Contado o financiado con los bancos del programa, cada uno con sus plazos y su calificación crediticia. El acuerdo es entre la Cámara, el vecino y el banco.',
  },
  {
    n: '06',
    titulo: 'Se hace la obra',
    texto:
      'La ejecuta una de las empresas asociadas a la Cámara, con la supervisión técnica del Municipio. Carreteras 2000 es una de ellas.',
  },
];

export const preguntas: Pregunta[] = [
  {
    p: '¿Qué cambió respecto de antes?',
    r: 'Antes el grupo de vecinos contrataba directamente a una empresa y cada una ponía su precio. Ahora el Municipio centraliza la inscripción, la Cámara de la Construcción arma el presupuesto y la obra se reparte entre las empresas asociadas. Para el vecino es más simple y más transparente.',
  },
  {
    p: '¿Cuánto sale?',
    r: 'El precio lo define la Cámara de la Construcción una vez que el Municipio releva la cuadra, y es el mismo para todas las empresas. Por eso en esta página ya no publicamos valores propios: cualquier número que pongamos sería inventado. Lo vas a conocer con el presupuesto formal, antes de decidir nada.',
  },
  {
    p: '¿Puedo elegir qué empresa hace mi cuadra?',
    r: 'No. La Cámara está terminando de definir el mecanismo, y la idea es repartir las cuadras entre las empresas asociadas por rotación. Carreteras 2000 es una de ellas, así que puede tocarnos o no. Lo que sí podemos hacer es ayudarte a que tu cuadra llegue a inscribirse completa.',
  },
  {
    p: '¿Por qué tiene que estar toda la cuadra de acuerdo?',
    r: 'Porque el pavimento es una obra continua: no se puede hacer medio frente ni saltear una casa. El programa exige el 100% de los frentistas inscriptos, y es la razón por la que la mayoría de las cuadras se queda en el camino.',
  },
  {
    p: '¿Me obliga a algo inscribirme?',
    r: 'No. La inscripción solo manifiesta el interés y sirve para que el Municipio sepa qué cuadras tienen demanda. Recién asumís un compromiso cuando aceptás el presupuesto y la forma de pago.',
  },
  {
    p: '¿Qué pasa con las conexiones de agua, gas y cloacas?',
    r: 'Las que están en servicio no se ven afectadas. Si tu lote necesita una conexión nueva, conviene resolverla antes del pavimento: una vez ejecutada la calzada, hay que romperla para llegar.',
  },
  {
    p: 'Vivo fuera de Bahía Blanca, ¿me sirve este programa?',
    r: 'No: el programa es solo del partido de Bahía Blanca. En Pigüé y el resto de la zona seguimos trabajando como siempre, directo con el grupo de vecinos. Escribinos por WhatsApp y lo vemos caso por caso.',
  },
  {
    p: '¿Carreteras 2000 participa del programa?',
    r: 'Sí. Somos socios de la Cámara de la Construcción de Bahía Blanca y estamos adheridos al programa. Hacemos pavimento asfáltico, articulado y de hormigón, con plantas propias en Bahía Blanca y Pigüé.',
  },
];
