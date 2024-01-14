import { type Repository } from '../../../Shared/domain/Repository'
import { BrandDoesNotExistError } from '../../domain/BrandDoesNotExistError'
import { type BrandId } from '../../domain/BrandId'
import { type BrandName } from '../../domain/BrandName'
import { BrandResponse } from './BrandResponse'

export class BrandsFinder {
  constructor (private readonly repository: Repository) {}

  async searchById (brandId: BrandId): Promise<BrandResponse> {
    const brand = await this.repository.brand.searchById(brandId)

    if (brand === null) {
      throw new BrandDoesNotExistError(String(brandId))
    }

    return new BrandResponse(brand.IdValue, brand.IdValue)
  }

  async searchByName (brandName: BrandName): Promise<BrandResponse> {
    const brand = await this.repository.brand.searchByName(brandName)

    if (brand === null) {
      throw new BrandDoesNotExistError(String(brandName))
    }

    return new BrandResponse(brand.IdValue, brand.IdValue)
  }
}
