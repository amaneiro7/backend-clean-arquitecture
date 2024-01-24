import { type Repository } from '../../../Shared/domain/Repository'
import { type UserPrimitives } from '../../domain/User'
import { UserDoesNotExistError } from '../../domain/UserDoesNotExistError'
import { type UserEmail } from '../../domain/UserEmail'

export class UserFinder {
  constructor (private readonly repository: Repository) {}

  async searchByEmail (userEmail: UserEmail): Promise<UserPrimitives> {
    const user = await this.repository.user.searchByEmail(userEmail.toString())

    if (user === null) {
      throw new UserDoesNotExistError(userEmail.toString())
    }

    return user
  }
}
