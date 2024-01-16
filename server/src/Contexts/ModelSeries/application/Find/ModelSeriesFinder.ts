import { ModelSeriesDoesNotExistError } from '../../domain/ModelSeriesDoesNotExistError'
import { type Repository } from '../../../Shared/domain/Repository'
import { type ModelSeriesId } from '../../domain/ModelSeriesId'
import { type ModelSeriesName } from '../../domain/ModelSeriesName'
import { type ModelSeries, type ModelSeriesPrimitives } from '../../domain/ModelSeries'

export class ModelSeriesFinder {
  constructor (private readonly repository: Repository) {}

  async searchById (modelSeriesId: ModelSeriesId): Promise<ModelSeriesPrimitives> {
    const modelSeries = await this.repository.modelSeries.searchById(modelSeriesId)

    if (modelSeries === null) {
      throw new ModelSeriesDoesNotExistError(modelSeriesId.toString())
    }

    return modelSeries.toPrimitives()
  }

  async searchByName (modelSeriesName: ModelSeriesName): Promise<ModelSeries> {
    const modelSeries = await this.repository.modelSeries.searchByName(modelSeriesName)

    if (modelSeries === null) {
      throw new ModelSeriesDoesNotExistError(modelSeriesName.toString())
    }

    return modelSeries
  }
}
