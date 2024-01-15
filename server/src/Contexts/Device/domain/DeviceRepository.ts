import { type ModelSeries } from './Device'
import { type ModelSeriesId } from './DeviceId'
import { type ModelSeriesName } from './DeviceName'

export abstract class ModelSeriesRepository {
  abstract save (payload: ModelSeries): Promise<void>

  abstract searchAll: () => Promise<ModelSeries[]>

  abstract searchById: (id: ModelSeriesId) => Promise<ModelSeries | null>

  abstract searchByName: (name: ModelSeriesName) => Promise<ModelSeries | null>

  abstract remove: (id: ModelSeriesId) => Promise<void>
}
