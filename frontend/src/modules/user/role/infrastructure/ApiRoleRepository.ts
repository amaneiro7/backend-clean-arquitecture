import { API_URL } from '../../../shared/infraestructure/config'
import { type RolePrimitives } from '../domain/Role'
import { type RoleRepository } from '../domain/RoleRepository'

export class ApiRoleRepository implements RoleRepository {
  async getAll (): Promise<RolePrimitives[]> {
    return await fetch(`${API_URL}/roles`)
      .then(async response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return await (response.json() as Promise<RolePrimitives[]>)
      })
      .catch(() => {
        throw new Error('Error al cargar roles')
      })
  }
}
