import { Category } from '../domain/Category'
import { CategoryId } from '../domain/CategoryId'
import { CategoryName } from '../domain/CategoryName'
import { type CategoryRepository } from '../domain/CategoryRepository'

const categories: Category[] = [
  new Category(
    new CategoryId('dcdd0fad-a94c-4810-8acc-5f108d3b18c3'),
    new CategoryName('Computadoras')
  ),
  new Category(
    new CategoryId('c8a7d63f-3b04-44d3-9d95-8782fd7dcfaf'),
    new CategoryName('Monitores')
  ),
  new Category(
    new CategoryId('5ad1a235-0d9c-410a-b32b-220d91689a08'),
    new CategoryName('Impresoras Financieras')
  ),
  new Category(
    new CategoryId('241bf55d-b649-4109-af7c-0e6890ded3fc'),
    new CategoryName('Impresoras Laser')
  ),
  new Category(
    new CategoryId('8cc4abd7-31bf-468d-8470-fcd939ec8ba3'),
    new CategoryName('Discos Duros')
  )
]

export class InMemoryCategoryRepository implements CategoryRepository {
  async searchAll (): Promise<Category[]> {
    return categories
  }

  async searchById (id: CategoryId): Promise<Category | null> {
    return categories.find(category => category.id === id.toString()) ?? null
  }

  async searchByName (name: CategoryName): Promise<Category | null> {
    return categories.find(category => category.name.toLowerCase().trim() === name.toString().toLowerCase().trim()) ?? null
  }
}
