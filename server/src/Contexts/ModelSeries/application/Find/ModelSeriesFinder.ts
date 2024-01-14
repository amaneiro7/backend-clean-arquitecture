import { BrandsFinder } from '../../../Brand/application/Find/BrandFinder'
import { BrandId } from '../../../Brand/domain/BrandId'
import { CategoriesFinder } from '../../../Category/application/Find/CategoryFinder'
import { type Repository } from '../../../Shared/domain/Repository'
import { ModelSeriesDoesNotExistError } from '../../domain/ModelSeriesDoesNotExistError'
import { type ModelSeriesId } from '../../domain/ModelSeriesId'
import { type ModelSeriesName } from '../../domain/ModelSeriesName'
import { ModelSeriesResponse } from './ModelSeriesResponse'

export class ModelSeriesFinder {
  private readonly brandFinder: BrandsFinder
  private readonly categoryFinder: CategoriesFinder
  constructor (private readonly repository: Repository) {
    this.brandFinder = new BrandsFinder(repository)
    this.categoryFinder = new CategoriesFinder(repository)
  }

  async searchById (modelSeriesId: ModelSeriesId): Promise<ModelSeriesResponse> {
    const modelSeries = await this.repository.modelSeries.searchById(modelSeriesId)

    if (modelSeries === null) {
      throw new ModelSeriesDoesNotExistError(String(modelSeriesId))
    }
    const brand = await this.brandFinder.searchById(new BrandId(modelSeries.brandIdValue))
    const category = await this.categoryFinder.searchById(new BrandId(modelSeries.categoryIdValue))

    return new ModelSeriesResponse({
      modelSeriesId: modelSeries.IdValue,
      modelSeriesName: modelSeries.nameValue,
      brandId: brand.id,
      brandName: brand.name,
      categoryId: category.id,
      categoryName: category.name
    })
  }

  async searchByName (modelSeriesName: ModelSeriesName): Promise<ModelSeriesResponse> {
    const modelSeries = await this.repository.modelSeries.searchByName(modelSeriesName)

    if (modelSeries === null) {
      throw new ModelSeriesDoesNotExistError(String(modelSeriesName))
    }

    const brand = await this.brandFinder.searchById(new BrandId(modelSeries.brandIdValue))
    const category = await this.categoryFinder.searchById(new BrandId(modelSeries.categoryIdValue))

    return new ModelSeriesResponse({
      modelSeriesId: modelSeries.IdValue,
      modelSeriesName: modelSeries.nameValue,
      brandId: brand.id,
      brandName: brand.name,
      categoryId: category.id,
      categoryName: category.name
    })
  }
}
