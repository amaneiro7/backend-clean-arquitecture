import { type GenericRepository } from '../../Shared/domain/GenericRepository'
import { type BrandPrimitives } from './Brand'

export abstract class BrandRepository implements GenericRepository<BrandPrimitives> {
  abstract save (payload: BrandPrimitives): Promise<void>

  abstract searchAll (): Promise<BrandPrimitives[]>

  abstract searchById (id: string): Promise<BrandPrimitives | null>

  abstract searchByName (name: string): Promise<BrandPrimitives | null>

  abstract remove (id: string): Promise<void>
}
