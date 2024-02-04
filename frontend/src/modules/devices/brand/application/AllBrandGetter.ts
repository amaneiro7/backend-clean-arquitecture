import { type Repository } from '../../../shared/domain/repository'
import { type BrandPrimitives } from '../domain/Brand'

export class AllBrandGetter {
  constructor (private readonly repository: Repository) {}
  async get (): Promise<BrandPrimitives[]> {
    return await this.repository.brand.getAll()
  }
}
