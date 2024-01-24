import { BrandDoesNotExistError } from '../../../Brand/domain/BrandDoesNotExistError'
import { BrandId } from '../../../Brand/domain/BrandId'
import { CategoryDoesNotExistError } from '../../../Category/domain/CategoryDoesNotExistError'
import { CategoryId } from '../../../Category/domain/CategoryId'
import { ModelSeriesAlreadyExistError } from '../../domain/ModelSeriesAlreadyExistError'
import { ModelSeriesDoesNotExistError } from '../../domain/ModelSeriesDoesNotExistError'
import { ModelSeriesId } from '../../domain/ModelSeriesId'
import { ModelSeriesName } from '../../domain/ModelSeriesName'
import { type Repository } from '../../../Shared/domain/Repository'

export class ModelSeriesUpdater {
  constructor (private readonly repository: Repository) {}

  async run (params: { id: string, newName?: string, categoryId?: string, brandId?: string }): Promise<void> {
    const { id } = params
    const modelSeriesId = new ModelSeriesId(id).toString()
    const modelSeries = await this.repository.modelSeries.searchById(modelSeriesId)
    if (modelSeries === null) {
      throw new ModelSeriesDoesNotExistError(id)
    }

    if (params.newName !== undefined) {
      await this.ensureModelSeriesDoesNotExist(params.newName)
      modelSeries.name = new ModelSeriesName(params.newName).value
    }

    if (params.categoryId !== undefined) {
      await this.ensureCategoryIdExist(params.categoryId)
      modelSeries.categoryId = new CategoryId(params.categoryId).value
    }

    if (params.brandId !== undefined) {
      await this.ensureBrandIdExist(params.brandId)
      modelSeries.brandId = new BrandId(params.brandId).value
    }

    await this.repository.modelSeries.save(modelSeries)
  }

  private async ensureModelSeriesDoesNotExist (name: string): Promise<void> {
    if (await this.repository.modelSeries.searchByName(new ModelSeriesName(name).toString()) !== null) {
      throw new ModelSeriesAlreadyExistError(name)
    }
  }

  private async ensureCategoryIdExist (categoryId: string): Promise<void> {
    if (await this.repository.category.searchById(new CategoryId(categoryId).toString()) === null) {
      throw new CategoryDoesNotExistError(categoryId)
    }
  }

  private async ensureBrandIdExist (brandId: string): Promise<void> {
    if (await this.repository.brand.searchById(new BrandId(brandId).toString()) === null) {
      throw new BrandDoesNotExistError(brandId)
    }
  }
}
