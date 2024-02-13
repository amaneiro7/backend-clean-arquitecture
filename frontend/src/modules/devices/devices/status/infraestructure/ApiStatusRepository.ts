import { API_URL } from '../../../../shared/infraestructure/config'
import { errorApiMessage } from '../../../../shared/infraestructure/errorMessage'
import { type StatusPrimitives } from '../domain/Status'
import { type StatusRepository } from '../domain/StatusRepository'

export class ApiStatusRepository implements StatusRepository {
  async getAll (): Promise<StatusPrimitives[]> {
    return await fetch(`${API_URL}/status`)
      .then(async res => {
        if (!res.ok) {
          throw new Error(await res.text())
        }
        return await (res.json() as Promise<StatusPrimitives[]>)
      })
      .catch(() => {
        throw new Error(errorApiMessage)
      })
  }
}
