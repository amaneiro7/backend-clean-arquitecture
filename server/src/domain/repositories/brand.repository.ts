// import { type Id } from '../../types/types'
import { type CreateBrand, type Brand, type UpdateBrand } from '../entities/brand.entity'
import { type CreateRepository } from './create.repository'
import { type GetAllRepository } from './getAll.repository'
import { type GetByIdRepository } from './getById.repositoy'
import { type GetByNameRepository } from './getByName.repository'
import { type UpdateRepository } from './update.repository'

// export interface BrandRepository {
//   getAll: () => Promise<Brand[]>
//   getOne: ({ id }: { id: Id }) => Promise<Brand | undefined>

//   create: (payload: CreateBrand) => Promise<Brand>
//   update: (id: Id, payload: UpdateBrand) => Promise<Brand | undefined>
// }

export interface BrandRepositotory {
  getAll: GetAllRepository<Brand>
  getById: GetByIdRepository<Brand>
  getByName: GetByNameRepository<Brand>
  create: CreateRepository<Brand, CreateBrand>
  update: UpdateRepository<Brand, UpdateBrand>
}
