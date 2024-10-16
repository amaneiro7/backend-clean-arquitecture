export const CategoryDefault = {
  COMPUTERS: 'Computadoras',
  SERVERS: 'Servidores',
  LAPTOSP: 'Laptops',
  ALLINONE: 'All in One',
  MONITORS: 'Monitores',
  DOCMATRIXPRINTER: 'Impresoras Financieras',
  LASERPRINTER: 'Impresoras Laser',
  INKJETPRNTER: 'Impresoras Tinta',
  HARDDRIVE: 'Discos Duros',
  KEYBOARDS: 'Teclados',
  ANTENAS: 'Antenas',
  CABLEUSB: 'Cable USB',
  CAMARAS: 'Camaras',
  IPAD: 'IPAD',
  CORNETAS: 'Cornetas',
  DOCKING: 'Docking',
  LAPIZOPTICO: 'Lapiz Optico',
  CONVERTIDORVGAHDMI: 'Convertidor de VGA - HDMI',
  MIC: 'Micrófono',
} as const

export type CategoryDefaultValues = typeof CategoryDefault[keyof typeof CategoryDefault]
