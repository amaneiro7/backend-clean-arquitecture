import { type Repository } from '../../../Shared/domain/Repository'
import { ModelSeriesAlreadyExistError } from '../../domain/ModelSeriesAlreadyExistError'
import { ModelSeriesDoesNotExistError } from '../../domain/ModelSeriesDoesNotExistError'
import { ModelSeriesId } from '../../domain/ModelSeriesId'
import { ModelSeriesName } from '../../domain/ModelSeriesName'

export class ModelSeriesUpdater {
  constructor (private readonly repository: Repository) {}

  async run (params: { id: string, newName?: string, categoryId?: string, brandId?: string }): Promise<void> {
    const { id } = params

    const modelSeries = await this.repository.modelSeries.searchById(new ModelSeriesId(id))
    if (modelSeries === null) {
      throw new ModelSeriesDoesNotExistError(id)
    }
    if (params.newName !== undefined) {
      this.ensureModelSeriesDoesNotExist(params.newName)
      modelSeries.updateName(params.newName)
    }

    await this.repository.modelSeries.save(modelSeries)
  }

  private ensureModelSeriesDoesNotExist (name: string): void {
    if (this.repository.modelSeries.searchByName(new ModelSeriesName(name)) !== null) {
      throw new ModelSeriesAlreadyExistError(name)
    }
  }
}
