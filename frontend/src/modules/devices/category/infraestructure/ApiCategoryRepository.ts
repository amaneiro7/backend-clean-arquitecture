import { API_URL } from '../../../shared/infraestructure/config'
import { type Category } from '../domain/Category'
import { type CategoryRepository } from '../domain/CategoryRepository'

export class ApiCategoryRepository implements CategoryRepository {
  async getAll (): Promise<Category[]> {
    return await fetch(`${API_URL}/categories`).then(async res => await (res.json() as Promise<Category[]>))
  }

  async getById ({ id }: { id: number }): Promise<Category | null> {
    return await fetch(`${API_URL}/categories/${id}`).then(async res => await (res.json() as Promise<Category>))
  }

  async getByName ({ name }: { name: string }): Promise<Category | null> {
    return await fetch(`${API_URL}/categories/name/${name}`).then(async res => await (res.json() as Promise<Category>))
  }
}
