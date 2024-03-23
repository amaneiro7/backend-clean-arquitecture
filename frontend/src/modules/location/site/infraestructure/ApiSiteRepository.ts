import { errorApiMessage } from '../../../shared/infraestructure/errorMessage'
import { API_URL } from '../../../shared/infraestructure/config'
import { type SitePrimitives } from '../domain/site'
import { type SiteRepository } from '../domain/siteRepository'

export class ApiSiteRepository implements SiteRepository {
  async getAll (): Promise<SitePrimitives[]> {
    return await fetch(`${API_URL}/sites`)
      .then(async res => {
        if (!res.ok) {
          throw new Error(await res.text())
        }
        return await (res.json() as Promise<SitePrimitives[]>)
      })
      .catch(() => {
        throw new Error(errorApiMessage)
      })
  }
}
