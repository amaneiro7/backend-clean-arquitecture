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
      throw new BrandDoesNotExistError(brandId.toString())
    }

    return new BrandResponse(brand.id, brand.name)
  }

  async searchByName (brandName: BrandName): Promise<BrandResponse> {
    const brand = await this.repository.brand.searchByName(brandName)

    if (brand === null) {
      throw new BrandDoesNotExistError(brandName.toString())
    }

    return new BrandResponse(brand.id, brand.name)
  }
}
