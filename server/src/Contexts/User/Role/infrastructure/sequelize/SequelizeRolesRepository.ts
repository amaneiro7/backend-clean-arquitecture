import { type CacheRepository } from '../../../../Shared/domain/CacheRepository'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type RolePrimitives } from '../../domain/Role'
import { type RoleRepository } from '../../domain/RoleRepository'
import { RoleId } from '../../domain/RoleId'
import { RolesModel } from './RolesSchema'
import { CacheService } from '../../../../Shared/domain/CacheService'

export class SequelizeRolesRepository implements RoleRepository {
  private readonly cacheKey: string = 'roles'
  constructor(private readonly cache: CacheRepository) { }
  async searchById(id: Primitives<RoleId>): Promise<RolePrimitives | null> {
    return await RolesModel.findByPk(id) ?? null
  }

  async searchAll(): Promise<RolePrimitives[]> {
    return await new CacheService(this.cache).getCachedData(this.cacheKey, async () => {
      return await RolesModel.findAll()
    })

  }
}
