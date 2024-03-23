import { type Repository } from '../../../shared/domain/repository'
import { type RegionPrimitives } from '../domain/region'

export class AllRegionGetter {
  constructor (private readonly repository: Repository) {}

  async get (): Promise<RegionPrimitives[]> {
    return await this.repository.region.getAll()
  }
}
