import { API_URL } from '../../../../shared/infraestructure/config'
import { type Status } from '../domain/Status'
import { type StatusRepository } from '../domain/StatusRepository'

export class ApiStatusRepository implements StatusRepository {
  async getAll (): Promise<Status[]> {
    return await fetch(`${API_URL}/status`).then(async res => await (res.json() as Promise<Status[]>))
  }
}
