import { type Repository } from '../../../Shared/domain/Repository'
import { ComputerModels, type ComputerModelsPrimitives } from '../../ModelCharacteristics/Computers/domain/ComputerModels'
import { LaptopsModels, type LaptopsModelsPrimitives } from '../../ModelCharacteristics/Laptops/domain/LaptopsModels'
import { ModelSeries, type ModelSeriesPrimitives } from '../domain/ModelSeries'
import { ModelSeriesAlreadyExistError } from '../domain/ModelSeriesAlreadyExistError'
import { ModelSeriesName } from '../domain/ModelSeriesName'

export interface ModelParams extends Omit<ModelSeriesPrimitives, 'id'> {}

export class ModelSeriesCreator {
  constructor (private readonly repository: Repository) {}

  async run ({ name, categoryId, brandId, ...otherParams }: ModelParams): Promise<void> {
    await this.ensureModelSeriesDoesNotExist(name)

    let modelSeries

    if (ComputerModels.isComputerCategory({ categoryId })) {
      const computerParams = otherParams as ComputerModelsPrimitives
      modelSeries = ComputerModels.create({ ...computerParams, name, categoryId, brandId })
    } else if (LaptopsModels.isLaptopCategory({ categoryId })) {
      const laptopParams = otherParams as LaptopsModelsPrimitives
      modelSeries = LaptopsModels.create({ ...laptopParams, name, categoryId, brandId })
    } else {
      modelSeries = ModelSeries.create({ name, categoryId, brandId })
    }

    await this.repository.modelSeries.save(modelSeries.toPrimitives())
  }

  private async ensureModelSeriesDoesNotExist (name: string): Promise<void> {
    if (await this.repository.modelSeries.searchByName(new ModelSeriesName(name).toString()) !== null) {
      throw new ModelSeriesAlreadyExistError(name)
    }
  }
}
