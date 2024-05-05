import { type LocationPrimitives } from '../domain/location'
import { type LocationRepository } from '../domain/locationRepository'
import { makeRequest } from '../../../shared/infraestructure/fetching'

export class ApiLocationRepository implements LocationRepository {
  private readonly endpoint: string = 'locations'
  async getAll (): Promise<LocationPrimitives[]> {
    return await makeRequest({ method: 'GET', endpoint: `${this.endpoint}/all` })
  }
}
