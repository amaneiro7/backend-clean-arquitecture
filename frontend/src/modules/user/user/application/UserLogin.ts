import { type Repository } from '../../../shared/domain/repository'
import { type UserPrimitives } from '../domain/User'

export class UserLocalLogin {
  constructor (private readonly repository: Repository) {}

  async login (email: string, password: string): Promise<UserPrimitives> {
    return await this.repository.user.loginLocal({ email, password })
  }
}
