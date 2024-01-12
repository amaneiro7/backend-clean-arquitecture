import { BrandDoesNotExistError } from '../../domain/BrandDoesNotExistError'
import { type BrandId } from '../../domain/BrandId'
import { type BrandRepository } from '../../domain/BrandRepository'
import { BrandResponse } from './BrandResponse'

export class BrandsFinder {
  constructor (private readonly repository: BrandRepository) {}

  async run (brandId: BrandId): Promise<BrandResponse> {
    const brand = await this.repository.searchById(brandId)

    if (brand === null) {
      throw new BrandDoesNotExistError(String(brandId))
    }

    return new BrandResponse(brand.IdValue, brand.IdValue)
  }
}
