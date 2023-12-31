import { conflict, notFound } from '@hapi/boom'
import { type CreateBrand, type Brand, type UpdateBrand } from '../../domain/entities/brand.entity'
import { type Id } from '../../types/types'
import { type BrandRepositoryInterface } from '../../infrastructure/persistance/local-file-system/brand'
import { updateFunction } from '../../utils/updateFunction'

export class BrandService {
  constructor (
    private readonly store: BrandRepositoryInterface
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
    const { name } = payload
    const array = await this.store.getByName.exec({ name })
    if (array !== undefined) {
      throw conflict('Ya existe una Marca con ese nombre')
    }
    return await this.store.create.exec(payload)
  }

  async update (id: Id, payload: UpdateBrand): Promise<Brand | undefined> {
    await updateFunction({ storeName: 'Marca', id, payload, store: this.store })
    return await this.store.update.exec(id, payload)
  }
}
