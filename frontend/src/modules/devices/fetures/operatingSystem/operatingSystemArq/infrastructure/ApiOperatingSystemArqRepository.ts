import { API_URL } from '../../../../../shared/infraestructure/config'
import { type OperatingSystemArqPrimitives } from '../domain/OperatingSystemArq'

export class ApiOperatingSystemArqRepository implements ApiOperatingSystemArqRepository {
  async getAll (): Promise<OperatingSystemArqPrimitives[]> {
    return await fetch(`${API_URL}/operatingsystemsarq`)
      .then(async response => await (response.json() as Promise<OperatingSystemArqPrimitives[]>))
  }
}
