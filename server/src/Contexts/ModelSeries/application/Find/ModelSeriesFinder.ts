import { ModelSeriesDoesNotExistError } from '../../domain/ModelSeriesDoesNotExistError'
import { type Repository } from '../../../Shared/domain/Repository'
import { type ModelSeriesId } from '../../domain/ModelSeriesId'
import { type ModelSeriesName } from '../../domain/ModelSeriesName'
import { type ModelSeriesPrimitives } from '../../domain/ModelSeries'
import { type CategoryPrimitives } from '../../../Category/domain/Category'
import { type BrandPrimitives } from '../../../Brand/domain/Brand'
import { CategoryDoesNotExistError } from '../../../Category/domain/CategoryDoesNotExistError'
import { BrandDoesNotExistError } from '../../../Brand/domain/BrandDoesNotExistError'

export interface ModelSeriesResponse {
  id: string
  name: string
  category: CategoryPrimitives
  brand: BrandPrimitives
}
export class ModelSeriesFinder {
  constructor (private readonly repository: Repository) {}

  async searchById (modelSeriesId: ModelSeriesId): Promise<ModelSeriesResponse> {
    const modelSeries = await this.repository.modelSeries.searchById(modelSeriesId.toString())

    if (modelSeries === null) {
      throw new ModelSeriesDoesNotExistError(modelSeriesId.toString())
    }

    const category = await this.repository.category.searchById(modelSeries.categoryId)
    if (category === null) {
      throw new CategoryDoesNotExistError(modelSeries.categoryId)
    }
    const brand = await this.repository.brand.searchById(modelSeries.brandId)
    if (brand === null) {
      throw new BrandDoesNotExistError(modelSeries.brandId)
    }

    return {
      id: modelSeries.id,
      name: modelSeries.name,
      category,
      brand
    }
  }

  async searchByName (modelSeriesName: ModelSeriesName): Promise<ModelSeriesPrimitives> {
    const modelSeries = await this.repository.modelSeries.searchByName(modelSeriesName.toString())

    if (modelSeries === null) {
      throw new ModelSeriesDoesNotExistError(modelSeriesName.toString())
    }

    return modelSeries
  }
}
