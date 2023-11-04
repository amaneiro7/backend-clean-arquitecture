import { type Id } from '../../src/types/types'
import { type CreateBrand, type Brand, type UpdateBrand } from '../entities/brand.entity'

export interface BrandRepository {
  getAll: () => Promise<Brand[]>
  getOne: ({ id }: { id: Id }) => Promise<Brand | undefined>

  create: (payload: CreateBrand) => Promise<Brand>
  update: (id: Id, payload: UpdateBrand) => Promise<Brand | undefined>
}
