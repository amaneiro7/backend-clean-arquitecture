import { errorApiMessage } from '../../../shared/infraestructure/errorMessage'
import { API_URL } from '../../../shared/infraestructure/config'
import { type StatePrimitives } from '../domain/state'
import { type StateRepository } from '../domain/stateRepository'

export class ApiStateRepository implements StateRepository {
  async getAll (): Promise<StatePrimitives[]> {
    return await fetch(`${API_URL}/states`)
      .then(async res => {
        if (!res.ok) {
          throw new Error(await res.text())
        }
        return await (res.json() as Promise<StatePrimitives[]>)
      })
      .catch(() => {
        throw new Error(errorApiMessage)
      })
  }
}
