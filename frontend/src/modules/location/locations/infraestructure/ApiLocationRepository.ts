import { errorApiMessage } from '../../../shared/infraestructure/errorMessage'
import { API_URL } from '../../../shared/infraestructure/config'
import { type LocationPrimitives } from '../domain/location'
import { type LocationRepository } from '../domain/locationRepository'

export class ApiLocationRepository implements LocationRepository {
  async getAll (): Promise<LocationPrimitives[]> {
    return await fetch(`${API_URL}/locations`)
      .then(async res => {
        if (!res.ok) {
          throw new Error(await res.text())
        }
        return await (res.json() as Promise<LocationPrimitives[]>)
      })
      .catch(() => {
        throw new Error(errorApiMessage)
      })
  }
}
