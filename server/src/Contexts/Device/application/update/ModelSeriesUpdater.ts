import { BrandDoesNotExistError } from '../../../Brand/domain/BrandDoesNotExistError'
import { BrandId } from '../../../Brand/domain/BrandId'
import { CategoryDoesNotExistError } from '../../../Category/domain/CategoryDoesNotExistError'
import { CategoryId } from '../../../Category/domain/CategoryId'
import { ModelSeriesAlreadyExistError } from '../../domain/DeviceAlreadyExistError'
import { ModelSeriesDoesNotExistError } from '../../domain/DeviceDoesNotExistError'
import { ModelSeriesId } from '../../domain/DeviceId'
import { ModelSeriesName } from '../../domain/DeviceName'
import { type Repository } from '../../../Shared/domain/Repository'

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

    if (params.categoryId !== undefined) {
      this.ensureCategoryIdExist(params.categoryId)
      modelSeries.updateCategoryId(params.categoryId)
    }

    if (params.brandId !== undefined) {
      this.ensureBrandIdExist(params.brandId)
      modelSeries.updateBrandId(params.brandId)
    }

    await this.repository.modelSeries.save(modelSeries)
  }

  private ensureModelSeriesDoesNotExist (name: string): void {
    if (this.repository.modelSeries.searchByName(new ModelSeriesName(name)) !== null) {
      throw new ModelSeriesAlreadyExistError(name)
    }
  }

  private ensureCategoryIdExist (categoryId: string): void {
    if (this.repository.category.searchById(new CategoryId(categoryId)) === null) {
      throw new CategoryDoesNotExistError(categoryId)
    }
  }

  private ensureBrandIdExist (brandId: string): void {
    if (this.repository.brand.searchById(new BrandId(brandId)) === null) {
      throw new BrandDoesNotExistError(brandId)
    }
  }
}
