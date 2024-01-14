import { type ModelSeries } from './ModelSeries'
import { type ModelSeriesId } from './ModelSeriesId'
import { type ModelSeriesName } from './ModelSeriesName'

export abstract class ModelSeriesRepository {
  abstract save (payload: ModelSeries): Promise<void>

  abstract searchAll: () => Promise<ModelSeries[]>

  abstract searchById: (id: ModelSeriesId) => Promise<ModelSeries | null>

  abstract searchByName: (name: ModelSeriesName) => Promise<ModelSeries | null>

  abstract remove: (id: ModelSeriesId) => Promise<void>
}
