import { type Repository } from '../../../Shared/domain/Repository'
import { ModelSeriesCannotDeleteIsNotEmptyError } from '../../domain/DeviceCannotDeleteIsNotEmptyError'
import { ModelSeriesDoesNotExistError } from '../../domain/DeviceDoesNotExistError'
import { ModelSeriesId } from '../../domain/DeviceId'

export class ModelSeriesRemover {
  constructor (private readonly repository: Repository) {}

  async run (params: { id: string }): Promise<void> {
    const { id } = params
    const modelSeriesId = new ModelSeriesId(id)

    const modelSeries = await this.repository.modelSeries.searchAll()
    if (modelSeries.length > 0) {
      throw new ModelSeriesCannotDeleteIsNotEmptyError()
    }
    const modelSerie = await this.repository.modelSeries.searchById(modelSeriesId)
    if (modelSerie === null) {
      throw new ModelSeriesDoesNotExistError(id)
    }

    await this.repository.modelSeries.remove(new ModelSeriesId(modelSerie.IdValue))
  }
}
