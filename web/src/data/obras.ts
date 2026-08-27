// Obras destacadas. Cambiá los textos por obras reales y agregá las fotos
// en src/assets/obras/ (el nombre del archivo va en `foto`).
export type Obra = {
  titulo: string;
  lugar: string;
  detalle: string;
  foto: string;
  tipo: 'Vial' | 'Suelos' | 'Hormigón';
};

export const obras: Obra[] = [
  {
    titulo: 'Pavimentación urbana',
    lugar: 'Sudoeste bonaerense',
    detalle: 'Carpeta asfáltica en caliente sobre base estabilizada, con cordón cuneta y señalización.',
    foto: 'obra-vial.png',
    tipo: 'Vial',
  },
  {
    titulo: 'Movimiento de suelos',
    lugar: 'Obra industrial',
    detalle: 'Desmonte, terraplenamiento y compactación con control de densidad en todas las capas.',
    foto: 'movimiento-suelos.png',
    tipo: 'Suelos',
  },
  {
    titulo: 'Pavimento de hormigón',
    lugar: 'Pigüé, Buenos Aires',
    detalle: 'Calzada de hormigón elaborado en planta propia, con juntas tomadas y curado controlado.',
    foto: 'hormigon.png',
    tipo: 'Hormigón',
  },
];
