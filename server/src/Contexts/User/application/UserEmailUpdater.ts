import { type Repository } from '../../Shared/domain/Repository'
import { UserDoesNotExistError } from '../domain/UserDoesNotExistError'
import { UserEmail } from '../domain/UserEmail'

export class UserEmailUpdater {
  constructor (private readonly repository: Repository) {}

  async updateEmail (oldEmail: string, newEmail: string): Promise<void> {
    const user = await this.repository.user.search(new UserEmail(oldEmail))

    if (user === null) {
      throw new UserDoesNotExistError(oldEmail)
    }

    user.updateEmail(newEmail)

    await this.repository.user.save(user)
  }
}
