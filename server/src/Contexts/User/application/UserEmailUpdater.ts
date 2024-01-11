import { UserDoesNotExistError } from '../domain/UserDoesNotExistError'
import { UserEmail } from '../domain/UserEmail'
import { type UserRepository } from '../domain/UserRepository'

export class UserEmailUpdater {
  constructor (private readonly repository: UserRepository) {}

  async update (oldEmail: string, newEmail: string): Promise<void> {
    const user = await this.repository.search(new UserEmail(oldEmail))

    if (user === null) {
      throw new UserDoesNotExistError(oldEmail)
    }

    user.updateEmail(newEmail)

    await this.repository.save(user)
  }
}
