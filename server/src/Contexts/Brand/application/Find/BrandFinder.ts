import { BrandDoesNotExistError } from '../../domain/BrandDoesNotExistError'
import { type BrandId } from '../../domain/BrandId'
import { type BrandName } from '../../domain/BrandName'
import { type BrandRepository } from '../../domain/BrandRepository'
import { BrandResponse } from './BrandResponse'

export class BrandsFinder {
  constructor (private readonly repository: BrandRepository) {}

  async searchById (brandId: BrandId): Promise<BrandResponse> {
    const brand = await this.repository.searchById(brandId)

    if (brand === null) {
      throw new BrandDoesNotExistError(String(brandId))
    }

    return new BrandResponse(brand.IdValue, brand.IdValue)
  }

  async searchByName (brandName: BrandName): Promise<BrandResponse> {
    const brand = await this.repository.searchByName(brandName)

    if (brand === null) {
      throw new BrandDoesNotExistError(String(brandName))
    }

    return new BrandResponse(brand.IdValue, brand.IdValue)
  }
}
