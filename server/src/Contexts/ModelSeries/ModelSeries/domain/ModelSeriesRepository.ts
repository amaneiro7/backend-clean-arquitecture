import { type CategoryId } from '../../../Category/domain/CategoryId'
import { Criteria } from '../../../Shared/domain/criteria/Criteria'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { type ModelSeriesPrimitives } from './ModelSeries'
import { type ModelSeriesId } from './ModelSeriesId'
import { type ModelSeriesName } from './ModelSeriesName'

export abstract class ModelSeriesRepository {
  abstract save (payload: ModelSeriesPrimitives): Promise<void>

  abstract searchAll (): Promise<ModelSeriesPrimitives[]>
  
  abstract matching (criteria: Criteria): Promise<ModelSeriesPrimitives[]>

  abstract searchById (id: Primitives<ModelSeriesId>): Promise<ModelSeriesPrimitives | null>

  abstract searchByName (name: Primitives<ModelSeriesName>): Promise<ModelSeriesPrimitives | null>

  abstract searchByCategory (categoryId: Primitives<CategoryId>): Promise<ModelSeriesPrimitives[]>

  abstract remove (id: Primitives<ModelSeriesId>): Promise<void>
}
