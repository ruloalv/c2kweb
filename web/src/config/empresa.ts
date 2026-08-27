// =====================================================================
// DATOS DE LA EMPRESA
// Única fuente de verdad para teléfonos, direcciones y mails.
// Si cambia un dato, se cambia acá y se actualiza en todo el sitio:
// header, footer, contacto, botones de WhatsApp y datos para Google.
// =====================================================================

export const empresa = {
  nombre: 'Carreteras 2000 S.A.',
  nombreCorto: 'Carreteras 2000',
  claim: 'Pavimentos que duran',
  descripcion:
    'Construcción y conservación de pavimentos en obra pública y privada. Mezclas asfálticas en caliente y en frío, hormigón elaborado y movimiento de suelos.',
  // Fecha del estatuto de conformación de la sociedad.
  anioInicio: 2001,
  email: 'info@carreteras2000.com.ar',
  sitio: 'https://www.carreteras2000.com.ar',

  // Actas de patente de los reparadores de pavimento.
  patentes: [
    { producto: 'Rapibach', acta: '3933733' },
    { producto: 'Rapirod', acta: '3933732' },
  ],

  // Diseño del sitio.
  autorSitio: { nombre: 'Raúl Alvarado', usuario: '@ruloalv' },

  sedes: [
    {
      ciudad: 'Bahía Blanca',
      provincia: 'Buenos Aires',
      direccion: "O'Higgins 408",
      telefono: '0291-4544862',
      telefonoLink: '+542914544862',
      celular: '291 506-5029',
      mapa: "https://www.google.com/maps/search/?api=1&query=O'Higgins+408+Bah%C3%ADa+Blanca",
    },
    {
      ciudad: 'Pigüé',
      provincia: 'Buenos Aires',
      direccion: 'Caseaux 1514',
      telefono: '02923-407910',
      telefonoLink: '+542923407910',
      celular: '291 506-5034',
      mapa: 'https://www.google.com/maps/search/?api=1&query=Caseaux+1514+Pig%C3%BC%C3%A9+Buenos+Aires',
    },
  ],

  // Cada área atiende por su propio WhatsApp.
  contactos: [
    {
      id: 'obras',
      titulo: 'Obras y movimiento de suelos',
      texto: 'Proyectos de pavimentación, movimiento de suelos y alquiler de equipos.',
      whatsapp: '5492915065029',
      telefono: '0291-4544862',
      telefonoLink: '+542914544862',
    },
    {
      id: 'asfalto',
      titulo: 'Mezclas asfálticas',
      texto: 'Asfalto en caliente y en frío. Venta de Rapibach y Rapirod a todo el país.',
      whatsapp: '5492914378577',
    },
    {
      id: 'hormigon',
      titulo: 'Hormigón elaborado',
      texto: 'Cotización y entrega de hormigón en Pigüé y la zona.',
      whatsapp: '5492915065034',
      telefono: '02923-407910',
      telefonoLink: '+542923407910',
    },
  ],

  // WhatsApp general, el mismo que atiende las obras de vecinos.
  whatsappPrincipal: '5492915065029',
  // Teléfono que se muestra en el encabezado.
  telefonoPrincipal: '0291-4544862',
  telefonoPrincipalLink: '+542914544862',
} as const;

/** Arma un link de WhatsApp con el mensaje ya escrito. */
export const wa = (numero: string, mensaje: string) =>
  `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
