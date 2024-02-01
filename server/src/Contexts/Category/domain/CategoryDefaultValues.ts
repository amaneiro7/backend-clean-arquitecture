export const CategoryDefault = {
  COMPUTERS: 'Computadoras',
  SERVERS: 'Servidores',
  LAPTOSP: 'Laptops',
  ALLINONE: 'All in One',
  MONITORS: 'Monitores',
  DOCMATRIXPRINTER: 'Impresoras Financieras',
  LASERPRINTER: 'Impresoras Laser',
  INKJETPRNTER: 'Impresoras Tinta',
  HARDDRIVE: 'Discos Duros'
} as const

export type CategoryDefaultValues = typeof CategoryDefault[keyof typeof CategoryDefault]
