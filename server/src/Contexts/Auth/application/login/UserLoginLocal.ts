import { type Repository } from '../../../Shared/domain/Repository'
import { PasswordService } from '../../../User/domain/PasswordService'
import { UserDoesNotExistError } from '../../../User/domain/UserDoesNotExistError'
import { UserEmail } from '../../../User/domain/UserEmail'
import { Token, type TokenPrimitives } from '../../domain/Token'

export class UserLoginLocal {
  constructor (private readonly repository: Repository) {}

  async run ({ email, password }: { email: string, password: string }): Promise<TokenPrimitives> {
    const user = await this.repository.user.searchByEmail(new UserEmail(email))

    if (user === null) {
      throw new UserDoesNotExistError(email.toString())
    }

    PasswordService.compare(password.toString(), user.password)
    const payload = user.toPrimitives()
    return new Token(payload).toPrimitives()
  }
}
