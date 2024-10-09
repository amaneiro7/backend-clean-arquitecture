import { type CacheRepository } from '../../../../Shared/domain/CacheRepository'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type RolePrimitives } from '../../domain/Role'
import { type RoleRepository } from '../../domain/RoleRepository'
import { RoleId } from '../../domain/RoleId'
import { RolesModel } from './RolesSchema'

export class SequelizeRolesRepository implements RoleRepository {
  private readonly cacheKey: string = 'roles'
  constructor(private readonly cache: CacheRepository) { }
  async searchById(id: Primitives<RoleId>): Promise<RolePrimitives | null> {
    return await RolesModel.findByPk(id) ?? null
  }

  async searchAll(): Promise<RolePrimitives[]> {
    const cache = await this.cache.get(this.cacheKey)
    if (cache) {
      return JSON.parse(cache)
    }
    const res = await RolesModel.findAll()
    await this.cache.set(this.cacheKey, JSON.stringify(res))
    return res

  }
}
