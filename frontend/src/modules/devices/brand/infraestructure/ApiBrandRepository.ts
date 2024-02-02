import { API_URL } from '../../../shared/infraestructure/config'
import { type Brand, type BrandCreate } from '../domain/Brand'
import { type BrandRepository } from '../domain/BrandRepository'

export class ApiBrandRepository implements BrandRepository {
  async save ({ brand }: { brand: BrandCreate }): Promise<void> {
    await fetch(`${API_URL}/brands`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(brand)
    })
  }

  async update ({ id, brand }: { id: string, brand: BrandCreate }): Promise<void> {
    await fetch(`${API_URL}/brands/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(brand)
    })
  }

  async getAll (): Promise<Brand[]> {
    return await fetch(`${API_URL}/brands`).then(async res => await (res.json() as Promise<Brand[]>))
  }

  async getById ({ id }: { id: string }): Promise<Brand | null> {
    return await fetch(`${API_URL}/brands/${id}`).then(async res => await (res.json() as Promise<Brand | null>))
  }

  async getByName ({ name }: { name: string }): Promise<Brand | null> {
    return await fetch(`${API_URL}/brands/name/${name}`).then(async res => await (res.json() as Promise<Brand | null>))
  }

  async delete ({ id }: { id: string }): Promise<void> {
    await fetch(`${API_URL}/brands/${id}`, {
      method: 'DELETE'
    })
  }
}
