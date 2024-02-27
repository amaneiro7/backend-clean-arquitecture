import { type Repository } from '../../../Shared/domain/Repository'
import { type RegionPrimitives } from '../domain/Region'

export class SearchAllRegion {
  constructor (private readonly repository: Repository) {}

  async search (): Promise<RegionPrimitives[]> {
    return await this.repository.region.searchAll()
  }
}
