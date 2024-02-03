import { API_URL } from '../../../shared/infraestructure/config'
import { type BrandPrimitives, type Brand } from '../domain/Brand'
import { type BrandId } from '../domain/BrandId'
import { type BrandName } from '../domain/BrandName'
import { type BrandRepository } from '../domain/BrandRepository'

export class ApiBrandRepository implements BrandRepository {
  async save ({ brand }: { brand: Brand }): Promise<void> {
    const brandPrimitives = brand.toPrimitives()
    await fetch(`${API_URL}/brands`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: brandPrimitives.id,
        name: brandPrimitives.name
      })
    })
  }

  async update ({ id, brand }: { id: BrandId, brand: Brand }): Promise<void> {
    const brandPrimitives = brand.toPrimitives()
    await fetch(`${API_URL}/brands/${id.value}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: brandPrimitives.name
      })
    })
  }

  async getAll (): Promise<BrandPrimitives[]> {
    return await fetch(`${API_URL}/brands`).then(async res => await (res.json() as Promise<BrandPrimitives[]>))
  }

  async getById ({ id }: { id: BrandId }): Promise<BrandPrimitives | null> {
    return await fetch(`${API_URL}/brands/${id.value}`).then(
      async res => await (res.json() as Promise<BrandPrimitives | null>)
    )
  }

  async getByName ({ name }: { name: BrandName }): Promise<BrandPrimitives | null> {
    return await fetch(`${API_URL}/brands/name/${name.value}`).then(
      async res => await (res.json() as Promise<BrandPrimitives | null>)
    )
  }
}
