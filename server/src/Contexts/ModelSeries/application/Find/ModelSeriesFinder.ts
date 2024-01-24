import { ModelSeriesDoesNotExistError } from '../../domain/ModelSeriesDoesNotExistError'
import { type Repository } from '../../../Shared/domain/Repository'
import { type ModelSeriesId } from '../../domain/ModelSeriesId'
import { type ModelSeriesName } from '../../domain/ModelSeriesName'
import { type ModelSeriesPrimitives } from '../../domain/ModelSeries'

export class ModelSeriesFinder {
  constructor (private readonly repository: Repository) {}

  async searchById (modelSeriesId: ModelSeriesId): Promise<ModelSeriesPrimitives> {
    const modelSeries = await this.repository.modelSeries.searchById(modelSeriesId.toString())

    if (modelSeries === null) {
      throw new ModelSeriesDoesNotExistError(modelSeriesId.toString())
    }

    return modelSeries
  }

  async searchByName (modelSeriesName: ModelSeriesName): Promise<ModelSeriesPrimitives> {
    const modelSeries = await this.repository.modelSeries.searchByName(modelSeriesName.toString())

    if (modelSeries === null) {
      throw new ModelSeriesDoesNotExistError(modelSeriesName.toString())
    }

    return modelSeries
  }
}
