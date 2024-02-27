import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { type RegionPrimitives } from './Region'
import { type RegionId } from './RegionId'

export abstract class RegionRepository {
  abstract searchAll (): Promise<RegionPrimitives[]>

  abstract searchById (id: Primitives<RegionId>): Promise<RegionPrimitives | null>
}
