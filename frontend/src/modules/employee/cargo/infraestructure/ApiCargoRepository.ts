import { API_URL } from '../../../shared/infraestructure/config'
import { errorApiMessage } from '../../../shared/infraestructure/errorMessage'
import { type CargoPrimitives } from '../domain/cargo'
import { type CargoRepository } from '../domain/cargoRepository'

export class ApiCargoRepository implements CargoRepository {
  async getAll (): Promise<CargoPrimitives[]> {
    return await fetch(`${API_URL}/cargos`)
      .then(async res => {
        if (!res.ok) {
          throw new Error(await res.text())
        }
        return await (res.json() as Promise<CargoPrimitives[]>)
      })
      .catch(() => {
        throw new Error(errorApiMessage)
      })
  }
}
