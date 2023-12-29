import { notFound } from '@hapi/boom'
import { type CreateBrand, type Brand, type UpdateBrand } from '../../domain/entities/brand.entity'
import { type Id } from '../../types/types'
import { type BrandRepositotoryInterface } from '../../infrastructure/persistance/local-file-system/brand'

export class BrandService {
  constructor (
    private readonly store: BrandRepositotoryInterface
  ) {}

  async getAll (): Promise<Brand[]> {
    return await this.store.getAll.exec()
  }

  async getOne ({ id }: { id: Id }): Promise<Brand | undefined> {
    const data = await this.store.getById.exec({ id })
    if (data === undefined || data === null) {
      throw notFound('Marca no encontrada')
    }
    return data
  }

  async create (payload: CreateBrand): Promise<Brand> {
    return await this.store.create.exec(payload)
  }

  async update (id: Id, payload: UpdateBrand): Promise<Brand | undefined> {
    const brandToChange = await this.store.getById.exec({ id })
    if (brandToChange === undefined || brandToChange === null) {
      throw notFound('Marca no encontrada')
    }
    // if (!payload?.name) {
    //   throw new Error('Falta informacion')
    // }

    // if (brandToChange.name === payload.name) {
    //   throw new Error('Sin modificar, es el mismo valor actual')
    // }
    return await this.store.update.exec(id, payload)
  }
}
