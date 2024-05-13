import { type LocationPrimitives } from '../domain/location'
import { type LocationRepository } from '../domain/locationRepository'
import { makeRequest } from '../../../shared/infraestructure/fetching'
import { Criteria } from '../../../shared/domain/criteria/Criteria'

export class ApiLocationRepository implements LocationRepository {
  private readonly endpoint: string = 'locations'
  async getAll(): Promise<LocationPrimitives[]> {
    return await makeRequest({ method: 'GET', endpoint: `${this.endpoint}/all`})
  }

  async getByCriteria(criteria: Criteria): Promise<LocationPrimitives[]> {
    const criteriaPrimitives = criteria.toPrimitives()

    const queryParams = criteria.buildQuery(criteriaPrimitives)
    return await makeRequest({ method: 'GET', endpoint: `${this.endpoint}?${queryParams}` })
  }
}
