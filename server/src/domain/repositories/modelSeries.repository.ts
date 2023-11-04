import { type Id } from '../../src/types/types'
import { type UpdateModelSeries, type CreateModelSeries, type ModelSeriesOutout } from '../entities/modelSeries.entity'

export interface ModelSeriesRepository {
  getAll: () => Promise<ModelSeriesOutout[]>
  getOne: ({ id }: { id: Id }) => Promise<ModelSeriesOutout | undefined>

  create: (payload: CreateModelSeries) => Promise<ModelSeriesOutout>
  update: (id: Id, payload: UpdateModelSeries) => Promise<ModelSeriesOutout | undefined>
}
