import { errorApiMessage } from '../../../shared/infraestructure/errorMessage'
import { API_URL } from '../../../shared/infraestructure/config'
import { type CityPrimitives } from '../domain/city'
import { type CityRepository } from '../domain/cityRepository'

export class ApiCityRepository implements CityRepository {
  async getAll (): Promise<CityPrimitives[]> {
    return await fetch(`${API_URL}/cities`)
      .then(async res => {
        if (!res.ok) {
          throw new Error(await res.text())
        }
        return await (res.json() as Promise<CityPrimitives[]>)
      })
      .catch(() => {
        throw new Error(errorApiMessage)
      })
  }
}
