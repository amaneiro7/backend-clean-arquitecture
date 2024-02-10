import { type OperatingSystem } from '../../../../../shared/domain/types/responseTypes'
import { API_URL } from '../../../../../shared/infraestructure/config'
import { type OperatingSystemPrimitives } from '../domain/OperatingSystem'
import { type OperatingSystemRepository } from '../domain/OperatingSystemRepository'

export class ApiOperatingSystemRepository implements OperatingSystemRepository {
  async getAll (): Promise<OperatingSystemPrimitives[]> {
    return await fetch(`${API_URL}/operatingsystems`)
      .then(async response => await (response.json() as Promise<OperatingSystem[]>))
      .then(async data => (data.map(os => ({
        id: os.id,
        name: os.version
      }))))
  }
}
