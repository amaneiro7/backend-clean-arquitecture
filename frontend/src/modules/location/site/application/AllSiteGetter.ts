import { type Repository } from '../../../shared/domain/repository'
import { type SitePrimitives } from '../domain/site'
export class AllSiteGetter {
  constructor (private readonly repository: Repository) {}

  async get (): Promise<SitePrimitives[]> {
    return await this.repository.site.getAll()
  }
}
