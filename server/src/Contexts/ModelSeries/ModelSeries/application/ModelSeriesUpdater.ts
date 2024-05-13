import { BrandDoesNotExistError } from '../../../Brand/domain/BrandDoesNotExistError'
import { BrandId } from '../../../Brand/domain/BrandId'
import { CategoryDoesNotExistError } from '../../../Category/domain/CategoryDoesNotExistError'
import { CategoryId } from '../../../Category/domain/CategoryId'
import { ModelSeriesAlreadyExistError } from '../domain/ModelSeriesAlreadyExistError'
import { ModelSeriesDoesNotExistError } from '../domain/ModelSeriesDoesNotExistError'
import { ModelSeriesId } from '../domain/ModelSeriesId'
import { ModelSeriesName } from '../domain/ModelSeriesName'
import { type Repository } from '../../../Shared/domain/Repository'
import { ModelSeries } from '../domain/ModelSeries'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { ModelParams } from './ModelSeriesCreator'

export class ModelSeriesUpdater {
  constructor (private readonly repository: Repository) {}

  async run ({id, params}: {id: Primitives<ModelSeriesId>, params: Partial<ModelParams>}): Promise<void> {
    const { name, brandId, categoryId } = params
    const modelSeriesId = new ModelSeriesId(id).toString()
    const modelSeries = await this.repository.modelSeries.searchById(modelSeriesId)
    if (modelSeries === null) {
      throw new ModelSeriesDoesNotExistError(id)
    }
    const modelEntity = ModelSeries.fromPrimitives(modelSeries)
    if (name !== undefined) {
      await this.ensureModelSeriesDoesNotExist(name)
      modelEntity.updateName(name)
    }

    if (categoryId !== undefined) {
      await this.ensureCategoryIdExist(categoryId)
      modelEntity.updateCategoryId(categoryId)
    }

    if (brandId !== undefined) {
      await this.ensureBrandIdExist(brandId)
      modelEntity.updateBrandId(brandId)
    }

    await this.repository.modelSeries.save(modelEntity.toPrimitives())
  }

  private async ensureModelSeriesDoesNotExist (name: string): Promise<void> {
    if (await this.repository.modelSeries.searchByName(new ModelSeriesName(name).toString()) !== null) {
      throw new ModelSeriesAlreadyExistError(name)
    }
  }

  private async ensureCategoryIdExist (categoryId: Primitives<CategoryId>): Promise<void> {
    if (await this.repository.category.searchById(new CategoryId(categoryId).value) === null) {
      throw new CategoryDoesNotExistError(categoryId.toString())
    }
  }

  private async ensureBrandIdExist (brandId: string): Promise<void> {
    if (await this.repository.brand.searchById(new BrandId(brandId).toString()) === null) {
      throw new BrandDoesNotExistError(brandId)
    }
  }
}
