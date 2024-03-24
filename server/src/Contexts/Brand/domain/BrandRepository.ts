import { type GenericRepository } from '../../Shared/domain/GenericRepository'
import { type Primitives } from '../../Shared/domain/value-object/Primitives'
import { type BrandPrimitives } from './Brand'
import { type BrandId } from './BrandId'
import { type BrandName } from './BrandName'

export abstract class BrandRepository implements GenericRepository<BrandPrimitives> {
  abstract save (payload: BrandPrimitives): Promise<void>

  abstract searchAll (): Promise<BrandPrimitives[]>

  abstract searchById (id: Primitives<BrandId>): Promise<BrandPrimitives | null>

  abstract searchByName (name: Primitives<BrandName>): Promise<BrandPrimitives | null>

  abstract remove (id: Primitives<BrandId>): Promise<void>
}
