import { type Repository } from '../../../Shared/domain/Repository'
import { type User } from '../../domain/User'
import { UserDoesNotExistError } from '../../domain/UserDoesNotExistError'
import { type UserEmail } from '../../domain/UserEmail'

export class UserFinder {
  constructor (private readonly repository: Repository) {}

  async searchByEmail (userEmail: UserEmail): Promise<User> {
    const user = await this.repository.user.searchByEmail(userEmail)

    if (user === null) {
      throw new UserDoesNotExistError(userEmail.toString())
    }

    return user
  }
}
