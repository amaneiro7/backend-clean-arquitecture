import { API_URL } from '../../../../shared/infraestructure/config'
import { errorApiMessage } from '../../../../shared/infraestructure/errorMessage'
import { type CoordinacionPrimitives } from '../domain/Coordinacion'
import { type CoordinacionRepository } from '../domain/CoordinacionRepository'

export class ApiCoordinacionRepository implements CoordinacionRepository {
  async getAll (): Promise<CoordinacionPrimitives[]> {
    return await fetch(`${API_URL}/coordinaciones`)
      .then(async res => {
        if (!res.ok) {
          throw new Error(await res.text())
        }
        return await (res.json() as Promise<CoordinacionPrimitives[]>)
      })
      .catch(() => {
        throw new Error(errorApiMessage)
      })
  }
}
