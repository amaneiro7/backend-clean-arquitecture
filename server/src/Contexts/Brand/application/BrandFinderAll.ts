import { type Repository } from '../../Shared/domain/Repository'
import { type BrandPrimitives } from '../domain/Brand'

export class SearchAllBrands {
  constructor (private readonly repository: Repository) {}

  async search (): Promise<BrandPrimitives[]> {
    return await this.repository.brand.searchAll()
  }
}
