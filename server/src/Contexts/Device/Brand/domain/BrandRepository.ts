import { type GenericRepository } from '../../../Shared/domain/GenericRepository'
import { type Uuid } from '../../../Shared/domain/Uuid'
import { type Brand } from './Brand'
import { type BrandName } from './BrandName'

export abstract class BrandRepository implements GenericRepository<Brand, BrandName> {
  abstract save (payload: Brand): void

  abstract searchAll: () => Promise<Brand[]>

  abstract searchById: (id: Uuid) => Promise<Brand | null>

  abstract searchByName: (name: BrandName) => Promise<Brand | null>

  abstract remove: (id: Uuid) => Promise<void>
}
