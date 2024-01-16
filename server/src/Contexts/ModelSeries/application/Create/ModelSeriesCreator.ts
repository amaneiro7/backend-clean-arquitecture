import { type Repository } from '../../../Shared/domain/Repository'
import { ModelSeries } from '../../domain/ModelSeries'
import { ModelSeriesAlreadyExistError } from '../../domain/ModelSeriesAlreadyExistError'
import { ModelSeriesName } from '../../domain/ModelSeriesName'

export class ModelSeriesCreator {
  constructor (private readonly repository: Repository) {}

  async run (params: { name: string, categoryId: string, brandId: string }): Promise<void> {
    const { name, brandId, categoryId } = params

    this.ensureModelSeriesDoesNotExist(name)

    const modelSeries = ModelSeries.create({ name, categoryId, brandId })

    await this.repository.modelSeries.save(modelSeries)
  }

  private ensureModelSeriesDoesNotExist (name: string): void {
    if (this.repository.modelSeries.searchByName(new ModelSeriesName(name)) !== null) {
      throw new ModelSeriesAlreadyExistError(name)
    }
  }
}
