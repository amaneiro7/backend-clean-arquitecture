import { type GenericRepository } from '../../Shared/domain/GenericRepository'
import { type ModelSeriesPrimitives } from './ModelSeries'

export abstract class ModelSeriesRepository implements GenericRepository<ModelSeriesPrimitives> {
  abstract save (payload: ModelSeriesPrimitives): Promise<void>

  abstract searchAll (): Promise<ModelSeriesPrimitives[]>

  abstract searchById (id: string): Promise<ModelSeriesPrimitives | null>

  abstract searchByName (name: string): Promise<ModelSeriesPrimitives | null>

  abstract remove (id: string): Promise<void>
}
