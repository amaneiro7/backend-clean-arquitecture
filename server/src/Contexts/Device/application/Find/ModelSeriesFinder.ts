import { ModelSeriesDoesNotExistError } from '../../domain/DeviceDoesNotExistError'
import { type Repository } from '../../../Shared/domain/Repository'
import { type ModelSeriesId } from '../../domain/DeviceId'
import { type ModelSeriesName } from '../../domain/DeviceActivo'
import { type ModelSeriesResponse } from '../../domain/DeviceResponse'
import { type ModelSeriesPrimitives } from '../../domain/Device'

export class ModelSeriesFinder {
  constructor (private readonly repository: Repository) {}

  async searchById (modelSeriesId: ModelSeriesId): Promise<ModelSeriesPrimitives> {
    const modelSeries = await this.repository.modelSeries.searchById(modelSeriesId)

    if (modelSeries === null) {
      throw new ModelSeriesDoesNotExistError(String(modelSeriesId))
    }

    return modelSeries.toPrimitives()
  }

  async searchByName (modelSeriesName: ModelSeriesName): Promise<ModelSeriesResponse> {
    const modelSeries = await this.repository.modelSeries.searchByName(modelSeriesName)

    if (modelSeries === null) {
      throw new ModelSeriesDoesNotExistError(String(modelSeriesName))
    }

    return modelSeries
  }
}
