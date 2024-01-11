import { type Brand } from '../domain/Brand'
import { type BrandRepository } from '../domain/BrandRepository'

export class searchAllBrands {
  constructor (private readonly repository: BrandRepository) {}

  async run (): Promise<Brand[]> {
    return await this.repository.searchAll()
  }
}
