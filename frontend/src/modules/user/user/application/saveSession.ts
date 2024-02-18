import { type Repository } from '../../../shared/domain/repository'
import { type UserPrimitives } from '../../user/domain/User'

export class SaveSession {
  constructor (private readonly repository: Repository) {}

  async run (user: UserPrimitives): Promise<UserPrimitives> {
    return await this.repository.auth.loginLocal({ email, password }).catch((error) => {
      throw new Error(error.message)
    })
  }
}
