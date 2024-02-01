import { type Repository } from '../../../Shared/domain/Repository'
import { ModelSeries } from '../domain/ModelSeries'
import { ModelSeriesAlreadyExistError } from '../domain/ModelSeriesAlreadyExistError'
import { ModelSeriesName } from '../domain/ModelSeriesName'

export class ModelSeriesCreator {
  constructor (private readonly repository: Repository) {}

  async run (params: { name: string, categoryId: number, brandId: string }): Promise<void> {
    const { name, brandId, categoryId } = params

    await this.ensureModelSeriesDoesNotExist(name)

    const modelSeries = ModelSeries.create({ name, categoryId, brandId })

    await this.repository.modelSeries.save(modelSeries.toPrimitives())
  }

  private async ensureModelSeriesDoesNotExist (name: string): Promise<void> {
    if (await this.repository.modelSeries.searchByName(new ModelSeriesName(name).toString()) !== null) {
      throw new ModelSeriesAlreadyExistError(name)
    }
  }
}
