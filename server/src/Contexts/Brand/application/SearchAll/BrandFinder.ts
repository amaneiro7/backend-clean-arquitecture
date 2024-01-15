import { type Repository } from '../../../Shared/domain/Repository'
import { BrandsResponse } from './BrandResponse'

export class SearchAllBrands {
  constructor (private readonly repository: Repository) {}

  async search (): Promise<BrandsResponse> {
    const brands = await this.repository.brand.searchAll()

    return new BrandsResponse(brands)
  }
}
