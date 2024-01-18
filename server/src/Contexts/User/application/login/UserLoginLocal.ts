import { type Repository } from '../../../Shared/domain/Repository'
import { PasswordService } from '../../domain/PasswordService'
import { type UserPrimitives } from '../../domain/User'
import { UserDoesNotExistError } from '../../domain/UserDoesNotExistError'
import { UserEmail } from '../../domain/UserEmail'

export class UserLoginLocal {
  constructor (private readonly repository: Repository) {}

  async run ({ email, password }: { email: string, password: string }): Promise<Omit<UserPrimitives, 'password'>> {
    const user = await this.repository.user.searchByEmail(new UserEmail(email))

    if (user === null) {
      throw new UserDoesNotExistError(email.toString())
    }

    PasswordService.compare(password.toString(), user.password)

    return user.toPrimitives()
  }
}
