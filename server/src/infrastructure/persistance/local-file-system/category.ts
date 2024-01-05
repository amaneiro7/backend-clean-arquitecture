import { type Category } from '../../../domain/entities/category.entity'
import { type Id } from '../../../types/types'
import { type CategoryRepository } from '../../../domain/repositories/category.repository'

const categories: Category[] = [
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
  }
]

export class CategoryRepositoryImpl implements CategoryRepository {
  async getAll (): Promise<Category[]> {
    return categories
  }

  async getById (id: Id): Promise<Category | undefined> {
    return categories.find(brand => brand.id === id)
  }

  async getByName (name: string): Promise<Category | undefined> {
    return categories.find(brand => brand.name.toLowerCase().trim() === name.toLowerCase().trim())
  }
}
