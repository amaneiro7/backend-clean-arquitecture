import { API_URL } from '../../../shared/infraestructure/config'
import { type CategoryPrimitives } from '../domain/Category'
import { type CategoryId } from '../domain/CategoryId'
import { type CategoryName } from '../domain/CategoryName'
import { type CategoryRepository } from '../domain/CategoryRepository'

export class ApiCategoryRepository implements CategoryRepository {
  async getAll (): Promise<CategoryPrimitives[]> {
    return await fetch(`${API_URL}/categories`).then(async res => await (res.json() as Promise<CategoryPrimitives[]>))
  }

  async getById ({ id }: { id: CategoryId }): Promise<CategoryPrimitives | null> {
    return await fetch(`${API_URL}/categories/${id.value}`).then(async res => await (res.json() as Promise<CategoryPrimitives>))
  }

  async getByName ({ name }: { name: CategoryName }): Promise<CategoryPrimitives | null> {
    return await fetch(`${API_URL}/categories/name/${name.value}`).then(async res => await (res.json() as Promise<CategoryPrimitives>))
  }
}
