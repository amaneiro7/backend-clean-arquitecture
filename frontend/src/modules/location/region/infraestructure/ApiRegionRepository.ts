import { errorApiMessage } from '../../../shared/infraestructure/errorMessage'
import { API_URL } from '../../../shared/infraestructure/config'
import { type RegionPrimitives } from '../domain/region'
import { type RegionRepository } from '../domain/regionRepository'

export class ApiRegionRepository implements RegionRepository {
  async getAll (): Promise<RegionPrimitives[]> {
    return await fetch(`${API_URL}/regions`)
      .then(async res => {
        if (!res.ok) {
          throw new Error(await res.text())
        }
        return await (res.json() as Promise<RegionPrimitives[]>)
      })
      .catch(() => {
        throw new Error(errorApiMessage)
      })
  }
}
