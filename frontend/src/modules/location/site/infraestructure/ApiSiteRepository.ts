import { makeRequest } from '../../../shared/infraestructure/fetching'
import { Site, type SitePrimitives } from '../domain/site'
import { type SiteRepository } from '../domain/siteRepository'
import { type SiteId } from '../domain/SiteId'

export class ApiSiteRepository implements SiteRepository {
  private readonly endpoint: string = 'sites'
  async getAll(): Promise<SitePrimitives[]> {
    return await makeRequest({ method: 'GET', endpoint: this.endpoint })
  }

  async getById({ id }: { id: SiteId }): Promise<SitePrimitives> {
    return await makeRequest({ method: 'GET', endpoint: `${this.endpoint}/${id.value}` })
  }

  async save({ site }: { site: Site }): Promise<void> {
    return await makeRequest({ method: 'POST', endpoint: this.endpoint, data: site.toPrimitives() })
  }

  async update({ id, site }: { id: SiteId, site: Site }): Promise<void> {
    return await makeRequest({ method: 'PATCH', endpoint: `${this.endpoint}/${id.value}`, data: site.toPrimitives() })
  }
}
