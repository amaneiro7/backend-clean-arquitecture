import { API_URL } from '../../../../shared/infraestructure/config'
import { errorApiMessage } from '../../../../shared/infraestructure/errorMessage'
import { type VicepresidenciaPrimitives } from '../domain/Vicepresidencia'
import { type VicepresidenciaRepository } from '../domain/VicepresidenciaRepository'

export class ApiVicepresidenciaRepository implements VicepresidenciaRepository {
  async getAll (): Promise<VicepresidenciaPrimitives[]> {
    return await fetch(`${API_URL}/vicepresidencias`)
      .then(async res => {
        if (!res.ok) {
          throw new Error(await res.text())
        }
        return await (res.json() as Promise<VicepresidenciaPrimitives[]>)
      })
      .catch(() => {
        throw new Error(errorApiMessage)
      })
  }
}
