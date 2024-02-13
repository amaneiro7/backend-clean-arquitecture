import { API_URL } from '../../../shared/infraestructure/config'
import { errorApiMessage } from '../../../shared/infraestructure/errorMessage'
import { type CategoryPrimitives } from '../domain/Category'
import { type CategoryId } from '../domain/CategoryId'
import { type CategoryName } from '../domain/CategoryName'
import { type CategoryRepository } from '../domain/CategoryRepository'

export class ApiCategoryRepository implements CategoryRepository {
  async getAll (): Promise<CategoryPrimitives[]> {
    return await fetch(`${API_URL}/categories`)
      .then(async res => {
        if (!res.ok) {
          throw new Error(await res.text())
        }
        return await (res.json() as Promise<CategoryPrimitives[]>)
      })
      .catch(() => {
        throw new Error(errorApiMessage)
      })
  }

  async getById ({ id }: { id: CategoryId }): Promise<CategoryPrimitives | null> {
    return await fetch(`${API_URL}/categories/${id.value}`)
      .then(async res => {
        if (!res.ok) {
          throw new Error(await res.text())
        }
        return await (res.json() as Promise<CategoryPrimitives>)
      })
      .catch(() => {
        throw new Error(errorApiMessage)
      })
  }

  async getByName ({ name }: { name: CategoryName }): Promise<CategoryPrimitives | null> {
    return await fetch(`${API_URL}/categories/name/${name.value}`)
      .then(async res => {
        if (!res.ok) {
          throw new Error(await res.text())
        }
        return await (res.json() as Promise<CategoryPrimitives>)
      })
      .catch(() => {
        throw new Error(errorApiMessage)
      })
  }
}
