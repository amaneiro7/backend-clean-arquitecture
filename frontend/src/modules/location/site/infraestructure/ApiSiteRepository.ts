import { type SitePrimitives } from '../domain/site'
import { type SiteRepository } from '../domain/siteRepository'
import { makeRequest } from '../../../shared/infraestructure/fetching'

export class ApiSiteRepository implements SiteRepository {
  private readonly endpoint: string = 'sites'
  async getAll(): Promise<SitePrimitives[]> {
    return await makeRequest({ method: 'GET', endpoint: this.endpoint })
  }
}
