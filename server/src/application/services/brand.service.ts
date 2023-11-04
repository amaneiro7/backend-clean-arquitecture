import { type CreateBrand, type Brand, type UpdateBrand } from '../../domain/entities/brand.entity'
import { type BrandRepository } from '../../domain/repositories/brand.repository'
import { type Id } from '../../types/types'

export class BrandService {
  constructor (private readonly store: BrandRepository) {}

  async getAll (): Promise<Brand[]> {
    return await this.store.getAll()
  }

  async getOne ({ id }: { id: Id }): Promise<Brand | undefined> {
    const data = await this.store.getOne({ id })
    if (data === undefined || data === null) {
      throw new Error('Brand not Found')
    }
    return data
  }

  async create (payload: CreateBrand): Promise<Brand> {
    // const { name } = payload
    return await this.store.create(payload)
  }

  async update (id: Id, payload: UpdateBrand): Promise<Brand | undefined> {
    const brandToChange = await this.store.getOne({ id })
    if (brandToChange === undefined || brandToChange === null) {
      throw new Error('Brand not Found')
    }
    // if (!payload?.name) {
    //   throw new Error('Falta informacion')
    // }

    // if (brandToChange.name === payload.name) {
    //   throw new Error('Sin modificar, es el mismo valor actual')
    // }
    return await this.store.update(id, payload)
  }
}
