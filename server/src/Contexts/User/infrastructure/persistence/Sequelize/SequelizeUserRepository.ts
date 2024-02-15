import { type UserPrimitives } from '../../../domain/User'
import { type UserRepository } from '../../../domain/UserRepository'
import { UserModel } from './UserSchema'

export class SequelizeUserRepository implements UserRepository {
  async searchByEmail (userEmail: string): Promise<UserPrimitives | null> {
    return await UserModel.findOne({
      where: { email: userEmail },
      include: ['role']
    })
  }

  async save (payload: UserPrimitives): Promise<void> {
    const { id } = payload
    const user = await UserModel.findByPk(id) ?? null
    if (user === null) {
      await UserModel.create({ ...payload })
    } else {
      user.set({ ...payload })
      await user.save()
    }
  }
}
