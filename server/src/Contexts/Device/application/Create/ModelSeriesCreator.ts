import { ModelSeries } from '../../domain/Device'
import { ModelSeriesAlreadyExistError } from '../../domain/DeviceAlreadyExistError'
import { ModelSeriesName } from '../../domain/DeviceActivo'
import { type ModelSeriesRepository } from '../../domain/DeviceRepository'

export class ModelSeriesCreator {
  constructor (private readonly repository: ModelSeriesRepository) {}

  async run (params: { name: string, categoryId: string, brandId: string }): Promise<void> {
    const { name, brandId, categoryId } = params

    this.ensureModelSeriesDoesNotExist(name)

    const modelSeries = ModelSeries.create({ name, categoryId, brandId })
    const modelSeriesPrimitives = modelSeries.toPrimitives()

    await this.repository.save(modelSeriesPrimitives)
  }

  private ensureModelSeriesDoesNotExist (name: string): void {
    if (this.repository.searchByName(new ModelSeriesName(name)) !== null) {
      throw new ModelSeriesAlreadyExistError(name)
    }
  }
}
