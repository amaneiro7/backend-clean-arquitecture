import { type Id } from '../../types/types'
import { type Repository } from '../../domain/repositories/respoitory'
import { updateFunction } from '../../utils/updateFunction'
import { type ModelSeriesOutput, type UpdateModelSeries } from '../../domain/entities/modelSeries.entity'

interface Props {
  id: Id
  payload: UpdateModelSeries
  repository: Repository
}

export async function updateModelSeries ({ id, payload, repository }: Props): Promise<ModelSeriesOutput | undefined> {
  await updateFunction({ storeName: 'Modelo', payload, id, store: repository.modelSeries })
  return await repository.modelSeries.update(id, payload)
}
