import { type RolePrimitives } from '../../domain/Role'
import { type RoleRepository } from '../../domain/RoleRepository'
import { RolesModel } from './RolesSchema'

export class SequelizeRolesRepository implements RoleRepository {
  async searchAll (): Promise<RolePrimitives[]> {
    return await RolesModel.findAll()
  }
}
