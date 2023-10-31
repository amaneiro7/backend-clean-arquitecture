import { type Output } from '../../infrastructure/persistance/local-file-system/modelSeries'
import { type Id } from '../../types/types'
import { type UpdateModelSeries, type CreateModelSeries, type ModelSeries } from '../entities/modelSeries.entity'

export interface ModelSeriesRepository {
  getAll: () => Promise<Output[]>
  getOne: ({ id }: { id: Id }) => Promise<Output | undefined>

  create: (payload: CreateModelSeries) => Promise<ModelSeries>
  update: (id: Id, payload: UpdateModelSeries) => Promise<ModelSeries | undefined>
}
