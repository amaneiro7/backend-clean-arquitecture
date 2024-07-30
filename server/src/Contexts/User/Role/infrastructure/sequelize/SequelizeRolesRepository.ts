import { Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type RolePrimitives } from '../../domain/Role'
import { RoleId } from '../../domain/RoleId'
import { type RoleRepository } from '../../domain/RoleRepository'
import { RolesModel } from './RolesSchema'

export class SequelizeRolesRepository implements RoleRepository {
  async searchById(id: Primitives<RoleId>): Promise<RolePrimitives | null> {
    return await RolesModel.findByPk(id) ?? null
  }

  async searchAll(): Promise<RolePrimitives[]> {
    return await RolesModel.findAll()
  }
}
