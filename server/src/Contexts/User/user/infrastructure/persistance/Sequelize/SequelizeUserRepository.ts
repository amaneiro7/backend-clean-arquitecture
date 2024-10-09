import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { UserPrimitivesOptional, type UserPrimitives } from '../../../domain/User'
import { type UserRepository } from '../../../domain/UserRepository'
import { type UserId } from '../../../domain/UserId'
import { type Criteria } from '../../../../../Shared/domain/criteria/Criteria'
import { type CacheRepository } from '../../../../../Shared/domain/CacheRepository'
import { UserModel } from './UserSchema'
import { CriteriaToSequelizeConverter } from '../../../../../Shared/infrastructure/criteria/CriteriaToSequelizeConverter'
import { UsersAssociation } from './UsersAssociation'

export class SequelizeUserRepository extends CriteriaToSequelizeConverter implements UserRepository {
  private readonly cacheKey: string = 'users'
  constructor(private readonly cache: CacheRepository) {
    super()
  }
  async searchAll(): Promise<UserPrimitivesOptional[]> {
    const cache = await this.cache.get(this.cacheKey)
    if (cache) {
      return JSON.parse(cache)
    }
    const result = await UserModel.findAll({
      include: ['role']
    }).then(user => JSON.parse(JSON.stringify(user)))
    await this.cache.set(this.cacheKey, JSON.stringify(result))
    return result
  }

  async matching(criteria: Criteria): Promise<UserPrimitivesOptional[]> {
    const options = this.convert(criteria)
    const opt = new UsersAssociation().convertFilterLocation(criteria, options)
    return await UserModel.findAll(opt).then(user => JSON.parse(JSON.stringify(user)))
  }

  async searchByEmail(userEmail: string): Promise<UserPrimitives | null> {
    return await UserModel.findOne({
      where: { email: userEmail },
      include: ['role']
    }).then(user => JSON.parse(JSON.stringify(user))) ?? null
  }

  async searchById(id: Primitives<UserId>): Promise<UserPrimitives | null> {
    return await UserModel.findByPk(id, {
      include: ['role']
    }).then(user => JSON.parse(JSON.stringify(user))) ?? null
  }

  async save(payload: UserPrimitives): Promise<void> {
    const { id } = payload
    const user = await UserModel.findByPk(id) ?? null
    if (user === null) {
      await UserModel.create({ ...payload })
    } else {
      user.set({ ...payload })
      await user.save()
    }
    await this.cache.del(this.cacheKey)
    await this.searchAll()
  }

  async delete(id: Primitives<UserId>): Promise<void> {
    await UserModel.destroy({ where: { id } })
    await this.cache.del(this.cacheKey)
    await this.searchAll()

  }
}
