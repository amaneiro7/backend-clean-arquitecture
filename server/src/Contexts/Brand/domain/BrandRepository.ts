import { type GenericRepository } from '../../Shared/domain/GenericRepository'
import { type Brand } from './Brand'
import { type BrandId } from './BrandId'
import { type BrandName } from './BrandName'

export abstract class BrandRepository implements GenericRepository<Brand, BrandId, BrandName> {
  abstract save (payload: Brand): Promise<void>

  abstract searchAll: () => Promise<Brand[]>

  abstract searchById: (id: BrandId) => Promise<Brand | null>

  abstract searchByName: (name: BrandName) => Promise<Brand | null>

  abstract remove: (id: BrandId) => Promise<void>
}
