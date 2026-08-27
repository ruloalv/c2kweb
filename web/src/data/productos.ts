export type Producto = {
  id: string;
  nombre: string;
  bajada: string;
  detalle: string[];
  contacto: string; // id de empresa.contactos
  etiqueta?: string;
};

export const productos: Producto[] = [
  {
    id: 'asfalto-caliente',
    nombre: 'Mezclas asfálticas en caliente',
    bajada: 'Producción propia y colocación con equipo completo.',
    detalle: [
      'Concreto asfáltico en distintas granulometrías',
      'Bacheo, repavimentación y carpetas de rodamiento',
      'Provisión a granel o con colocación llave en mano',
    ],
    contacto: 'asfalto',
  },
  {
    id: 'asfalto-frio',
    nombre: 'Rapibach® y Rapirod®',
    bajada: 'Reparador instantáneo de pavimentos, listo para usar.',
    detalle: [
      'Se aplica en frío, sin equipo especial y con la calle mojada',
      'Envasado y despachado a todo el país',
      'Patentado: Rapibach acta 3933733, Rapirod acta 3933732',
    ],
    contacto: 'asfalto',
    etiqueta: 'Producto patentado',
  },
  {
    id: 'hormigon',
    nombre: 'Hormigón elaborado',
    bajada: 'Planta propia en Pigüé, con entrega en obra.',
    detalle: [
      'Hormigón elaborado en todas las dosificaciones',
      'Obras urbanas, industriales y rurales',
      'Logística de entrega coordinada con la obra',
    ],
    contacto: 'hormigon',
  },
  {
    id: 'obras',
    nombre: 'Obras y movimiento de suelos',
    bajada: 'Equipos y personal propio para obra pública y privada.',
    detalle: [
      'Pavimentación urbana y rutas',
      'Movimiento de suelos y desmonte',
      'Playas industriales y comerciales',
    ],
    contacto: 'obras',
  },
];
