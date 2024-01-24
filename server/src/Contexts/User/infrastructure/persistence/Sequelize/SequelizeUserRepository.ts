import { type UserPrimitives } from '../../../domain/User'
import { type UserRepository } from '../../../domain/UserRepository'
import { UserModel } from './UserSchema'

export class SequelizeUserRepository implements UserRepository {
  async searchByEmail (userEmail: string): Promise<UserPrimitives | null> {
    return await UserModel.findOne({ where: { email: userEmail } })
  }

  async save (user: UserPrimitives): Promise<void> {
    await UserModel.findOrCreate({ where: { id: user.id } })
  }
}
