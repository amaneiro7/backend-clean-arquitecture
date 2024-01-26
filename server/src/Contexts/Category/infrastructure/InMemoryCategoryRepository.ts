import { type CategoryPrimitives } from '../domain/Category'
import { type CategoryRepository } from '../domain/CategoryRepository'

const categories: CategoryPrimitives[] = [
  {
    id: 1,
    name: 'Computadoras'
  },
  {
    id: 2,
    name: 'Monitores'
  },
  {
    id: 3,
    name: 'Impresoras Financieras'
  },
  {
    id: 4,
    name: 'Impresoras Laser'
  },
  {
    id: 5,
    name: 'Discos Duros'
  }
]

export class InMemoryCategoryRepository implements CategoryRepository {
  async searchAll (): Promise<CategoryPrimitives[]> {
    return categories
  }

  async searchById (id: string): Promise<CategoryPrimitives | null> {
    return categories.find(category => category.id === id.toString()) ?? null
  }

  async searchByName (name: string): Promise<CategoryPrimitives | null> {
    return categories.find(category => category.name.toLowerCase().trim() === name.toString().toLowerCase().trim()) ?? null
  }
}
