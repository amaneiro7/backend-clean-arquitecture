import { type BrandRepository } from '../../domain/BrandRepository'
import { BrandsResponse } from './BrandResponse'

export class searchAllBrands {
  constructor (private readonly repository: BrandRepository) {}

  async run (): Promise<BrandsResponse> {
    const brands = await this.repository.searchAll()

    return new BrandsResponse(brands)
  }
}
