import { errorApiMessage } from '../../../shared/infraestructure/errorMessage'
import { API_URL } from '../../../shared/infraestructure/config'
import { type TypeOfSitePrimitives } from '../domain/typeOfSite'
import { type TypeOfSiteRepository } from '../domain/typeOfSiteRepository'

export class ApiTypeOfSiteRepository implements TypeOfSiteRepository {
  async getAll (): Promise<TypeOfSitePrimitives[]> {
    return await fetch(`${API_URL}/typeofsites`)
      .then(async res => {
        if (!res.ok) {
          throw new Error(await res.text())
        }
        return await (res.json() as Promise<TypeOfSitePrimitives[]>)
      })
      .catch(() => {
        throw new Error(errorApiMessage)
      })
  }
}
