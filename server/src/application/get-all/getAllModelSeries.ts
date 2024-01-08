import { type ModelSeriesOutput } from '../../domain/entities/DeviceAggregation/modelSeries.entity'
import { type Repository } from '../../domain/repositories/respoitory'

export async function getAllModelSeries (repository: Repository): Promise<ModelSeriesOutput[]> {
  return await repository.modelSeries.getAll()
}
