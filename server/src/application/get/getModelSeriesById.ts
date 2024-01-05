import { notFound } from '@hapi/boom'
import { type ModelSeriesOutput } from '../../domain/entities/modelSeries.entity'
import { type Repository } from '../../domain/repositories/respoitory'
import { type Id } from '../../types/types'

export async function getModelSeriesById ({ id, repository }: { id: Id, repository: Repository }): Promise<ModelSeriesOutput | undefined> {
  const data = await repository.modelSeries.getById(id)
  if (data === undefined) {
    throw notFound('Modelo no encontrado')
  }
  return data
}
