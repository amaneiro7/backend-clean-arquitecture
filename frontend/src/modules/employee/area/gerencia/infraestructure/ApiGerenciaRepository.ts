import { API_URL } from '../../../../shared/infraestructure/config'
import { errorApiMessage } from '../../../../shared/infraestructure/errorMessage'
import { type GerenciaPrimitives } from '../domain/gerencia'
import { type GerenciaRepository } from '../domain/gerenciaRepository'

export class ApiGerenciaRepository implements GerenciaRepository {
  async getAll (): Promise<GerenciaPrimitives[]> {
    return await fetch(`${API_URL}/gerencias`)
      .then(async res => {
        if (!res.ok) {
          throw new Error(await res.text())
        }
        return await (res.json() as Promise<GerenciaPrimitives[]>)
      })
      .catch(() => {
        throw new Error(errorApiMessage)
      })
  }
}
