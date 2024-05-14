import { makeRequest } from '../../../shared/infraestructure/fetching'
import { type RolePrimitives } from '../domain/Role'
import { type RoleRepository } from '../domain/RoleRepository'

export class ApiRoleRepository implements RoleRepository {
  private readonly endpoint: string = 'roles'
  async getAll(): Promise<RolePrimitives[]> {
    return await makeRequest({ method: 'GET', endpoint: this.endpoint })
  }
}
