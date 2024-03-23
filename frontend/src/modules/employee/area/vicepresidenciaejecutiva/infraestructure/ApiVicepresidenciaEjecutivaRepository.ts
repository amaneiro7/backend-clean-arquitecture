import { API_URL } from '../../../../shared/infraestructure/config'
import { errorApiMessage } from '../../../../shared/infraestructure/errorMessage'
import { type VicepresidenciaEjecutivaPrimitives } from '../domain/VicepresidenciaEjecutiva'
import { type VicepresidenciaEjecutivaRepository } from '../domain/VicepresidenciaEjecutivaRepository'

export class ApiVicepresidenciaEjecutivaRepository implements VicepresidenciaEjecutivaRepository {
  async getAll (): Promise<VicepresidenciaEjecutivaPrimitives[]> {
    return await fetch(`${API_URL}/vicepresidenciasejecutivas`)
      .then(async res => {
        if (!res.ok) {
          throw new Error(await res.text())
        }
        return await (res.json() as Promise<VicepresidenciaEjecutivaPrimitives[]>)
      })
      .catch(() => {
        throw new Error(errorApiMessage)
      })
  }
}
