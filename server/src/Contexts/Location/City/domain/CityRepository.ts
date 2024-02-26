import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { type CityPrimitives } from './City'
import { type CityId } from './CityId'

export abstract class CityRepository {
  abstract searchAll (): Promise<CityPrimitives[]>

  abstract searchById (id: Primitives<CityId>): Promise<CityPrimitives | null>
}
