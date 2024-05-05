import { Criteria } from '../../../Shared/domain/criteria/Criteria'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { type LocationPrimitives } from './Location'
import { type LocationId } from './LocationId'

export abstract class LocationRepository {
  abstract searchAll (): Promise<LocationPrimitives[]>

  abstract searchById (id: Primitives<LocationId>): Promise<LocationPrimitives | null>

  abstract matching (criteria: Criteria): Promise<LocationPrimitives[]>
}
