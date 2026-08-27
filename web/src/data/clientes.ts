export type Cliente = { nombre: string; logo: string; link?: string; grupo: 'Vialidad' | 'Municipios' | 'Privados' };

export const clientes: Cliente[] = [
  { nombre: 'Vialidad Nacional', logo: 'vialidad-nacional.png', link: 'https://www.argentina.gob.ar/transporte/vialidad-nacional/', grupo: 'Vialidad' },
  { nombre: 'Vialidad Buenos Aires', logo: 'dvba.png', link: 'https://www.vialidad.gba.gob.ar/', grupo: 'Vialidad' },
  { nombre: 'Vialidad La Pampa', logo: 'vialidad-la-pampa.png', grupo: 'Vialidad' },
  { nombre: 'Vialidad Neuquén', logo: 'vialidad-nequen.jpg', grupo: 'Vialidad' },
  { nombre: 'Dirección Provincial de Vialidad', logo: 'dpv.png', grupo: 'Vialidad' },

  { nombre: 'Saavedra - Pigüé', logo: 'saavedra.png', link: 'https://saavedra.gob.ar/', grupo: 'Municipios' },
  { nombre: 'Bahía Blanca', logo: 'bahia-blanca.webp', link: 'https://www.bahia.gob.ar/', grupo: 'Municipios' },
  { nombre: 'Puerto Madryn', logo: 'puerto-madrin.png', link: 'https://www.madryn.gob.ar/', grupo: 'Municipios' },
  { nombre: 'Adolfo Alsina', logo: 'adolfo-alsina.jpg', link: 'https://www.adolfoalsina.gov.ar/', grupo: 'Municipios' },
  { nombre: 'Coronel de Marina L. Rosales', logo: 'puan.jpeg', grupo: 'Municipios' },
  { nombre: 'Tornquist', logo: 'torquinst.jpg', grupo: 'Municipios' },
  { nombre: 'Pinamar', logo: 'pinamar.png', grupo: 'Municipios' },
  { nombre: 'Patagones', logo: 'patagones.jpeg', grupo: 'Municipios' },
  { nombre: 'General Roca', logo: 'roca.png', grupo: 'Municipios' },
  { nombre: 'Cipolletti', logo: 'cipoletti.png', grupo: 'Municipios' },
  { nombre: 'Sierra Grande', logo: 'sierra-grande.png', grupo: 'Municipios' },
  { nombre: 'Guatraché', logo: 'guatrache.jpeg', grupo: 'Municipios' },
  { nombre: 'Lincoln', logo: 'lincoln.png', grupo: 'Municipios' },
  { nombre: 'Casilda', logo: 'casilda.jpg', grupo: 'Municipios' },

  { nombre: 'Techint', logo: 'techint.png', link: 'https://www.techint.com/es', grupo: 'Privados' },
  { nombre: 'Aeropuertos Argentina 2000', logo: 'aerop-arg-2000.png', link: 'https://www.aeropuertosargentina.com/es', grupo: 'Privados' },
  { nombre: 'PROA S.A.', logo: 'proa.png', link: 'https://www.proasa.com.ar/', grupo: 'Privados' },
  { nombre: 'Coarco', logo: 'coarco.jpg', grupo: 'Privados' },
  { nombre: 'Covisur', logo: 'covisur.png', grupo: 'Privados' },
  { nombre: 'Autopista', logo: 'autopista.png', grupo: 'Privados' },
  { nombre: 'Guzmán Nacich', logo: 'guzman-nacich.jpeg', grupo: 'Privados' },
  { nombre: 'Milla', logo: 'milla.jpeg', grupo: 'Privados' },
];
