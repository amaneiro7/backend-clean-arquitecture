import { type CreateModelSeries, type ModelSeriesOutput } from '../../domain/entities/modelSeries.entity'
import { type Repository } from '../../domain/repositories/respoitory'
import { createFunction } from '../../utils/createFunction'

interface Props {
  payload: CreateModelSeries
  repository: Repository
}

export async function createNewModelSeries ({ payload, repository }: Props): Promise<ModelSeriesOutput | undefined> {
  await createFunction({ storeName: 'Modelo', payload, store: repository.modelSeries })
  return await repository.modelSeries.create(payload)
}
