import { type Repository } from '../../../Shared/domain/Repository'
import { type SitePrimitives } from '../domain/Site'

export class SearchAllSite {
  constructor (private readonly repository: Repository) {}

  async search (): Promise<SitePrimitives[]> {
    return await this.repository.site.searchAll()
  }
}
