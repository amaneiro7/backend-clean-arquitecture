type TypeCategoryDefaultData = Readonly<Record<string, string>>
export const CategoryDefaultData: TypeCategoryDefaultData = {
  1: 'Computadoras',
  2: 'Servidores',
  3: 'Laptops',
  4: 'All in One',
  5: 'Monitores',
  6: 'Impresoras Financieras',
  7: 'Impresoras Laser',
  8: 'Impresoras Tinta',
  9: 'Discos Duros',
  10: 'Teclados'
} as const

export type CategoryKeys = keyof typeof CategoryDefaultData
export type CategoryValues = typeof CategoryDefaultData[keyof typeof CategoryDefaultData]
