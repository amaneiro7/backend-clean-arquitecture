import { notFound } from '@hapi/boom'
import { type ModelSeriesOutput } from '../../domain/entities/DeviceAggregation/modelSeries.entity'
import { type Repository } from '../../domain/repositories/respoitory'

export async function getModelSeriesByName ({ name, repository }: { name: string, repository: Repository }): Promise<ModelSeriesOutput | undefined> {
  const data = await repository.modelSeries.getByName(name)
  if (data === undefined) {
    throw notFound('Modelo no encontrado')
  }
  return data
}
