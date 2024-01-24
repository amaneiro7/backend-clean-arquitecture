import { type CategoryPrimitives } from '../domain/Category'
import { type CategoryRepository } from '../domain/CategoryRepository'

const categories: CategoryPrimitives[] = [
  {
    id: 'dcdd0fad-a94c-4810-8acc-5f108d3b18c3',
    name: 'Computadoras'
  },
  {
    id: 'c8a7d63f-3b04-44d3-9d95-8782fd7dcfaf',
    name: 'Monitores'
  },
  {
    id: '5ad1a235-0d9c-410a-b32b-220d91689a08',
    name: 'Impresoras Financieras'
  },
  {
    id: '241bf55d-b649-4109-af7c-0e6890ded3fc',
    name: 'Impresoras Laser'
  },
  {
    id: '8cc4abd7-31bf-468d-8470-fcd939ec8ba3',
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
