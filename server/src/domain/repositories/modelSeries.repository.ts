import { type UpdateModelSeries, type CreateModelSeries, type ModelSeriesOutput } from '../entities/modelSeries.entity'
import { type CreateRepository } from './create.repository'
import { type GetAllRepository } from './getAll.repository'
import { type GetByIdRepository } from './getById.repositoy'
import { type GetByNameRepository } from './getByName.repository'
import { type UpdateRepository } from './update.repository'

// export interface ModelSeriesRepository {
//   getAll: () => Promise<ModelSeriesOutout[]>
//   getOne: ({ id }: { id: Id }) => Promise<ModelSeriesOutout | undefined>

//   create: (payload: CreateModelSeries) => Promise<ModelSeriesOutout>
//   update: (id: Id, payload: UpdateModelSeries) => Promise<ModelSeriesOutout | undefined>
// }

export interface ModelSeriesRepository {
  getAll: GetAllRepository<ModelSeriesOutput>
  getById: GetByIdRepository<ModelSeriesOutput>
  getByName: GetByNameRepository<ModelSeriesOutput>
  create: CreateRepository<ModelSeriesOutput, CreateModelSeries>
  update: UpdateRepository<ModelSeriesOutput, UpdateModelSeries>
}
