import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { UserPrimitivesOptional, type UserPrimitives } from '../../../domain/User'
import { type UserRepository } from '../../../domain/UserRepository'
import { type UserId } from '../../../domain/UserId'
import { type Criteria } from '../../../../../Shared/domain/criteria/Criteria'
import { UserModel } from './UserSchema'
import { CriteriaToSequelizeConverter } from '../../../../../Shared/infrastructure/criteria/CriteriaToSequelizeConverter'

export class SequelizeUserRepository extends CriteriaToSequelizeConverter implements UserRepository {

  async searchAll(): Promise<UserPrimitivesOptional[]> {
    return await UserModel.findAll({
      include: ['role']
    }).then(user => JSON.parse(JSON.stringify(user)))
  }

  async matching(criteria: Criteria): Promise<UserPrimitivesOptional[]> {
    const options = this.convert(criteria)
    return await UserModel.findAll(options).then(user => JSON.parse(JSON.stringify(user)))
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
  }

  async delete(id: Primitives<UserId>): Promise<void> {
    await UserModel.destroy({ where: { id } })
  }
}
