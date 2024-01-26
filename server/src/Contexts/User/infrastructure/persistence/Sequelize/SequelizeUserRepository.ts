import { models } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeConfig'
import { type UserPrimitives } from '../../../domain/User'
import { type UserRepository } from '../../../domain/UserRepository'

export class SequelizeUserRepository implements UserRepository {
  async searchByEmail (userEmail: string): Promise<UserPrimitives | null> {
    return await models.User.findOne({ where: { email: userEmail } })
  }

  async save (payload: UserPrimitives): Promise<void> {
    const { id } = payload
    const user = await models.User.findByPk(id) ?? null
    if (user === null) {
      await models.User.create({ ...payload })
    } else {
      user.set({ ...payload })
      await user.save()
    }
  }
}
