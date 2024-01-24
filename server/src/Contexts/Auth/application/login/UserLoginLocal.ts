import { type Repository } from '../../../Shared/domain/Repository'
import { PasswordService } from '../../../User/domain/PasswordService'
import { UserDoesNotExistError } from '../../../User/domain/UserDoesNotExistError'
import { UserEmail } from '../../../User/domain/UserEmail'
import { type Tokens, generateTokens } from '../../domain/GenerateToken'

export class UserLoginLocal {
  constructor (private readonly repository: Repository) {}

  async run ({ email, intoPassword }: { email: string, intoPassword: string }): Promise<Tokens> {
    const user = await this.repository.user.searchByEmail(new UserEmail(email).toPrimitives())

    if (user === null) {
      throw new UserDoesNotExistError(email.toString())
    }

    PasswordService.compare(intoPassword.toString(), user.password)
    const { password, ...payload } = user
    return generateTokens(payload)
  }
}
