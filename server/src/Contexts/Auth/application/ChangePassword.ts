import { User } from '../../User/user/domain/User'
import { UserDoesNotExistError } from '../../User/user/domain/UserDoesNotExistError'
import { type Repository } from '../../Shared/domain/Repository'
import { InvalidArgumentError } from '../../Shared/domain/value-object/InvalidArgumentError'
import { UserId } from '../../User/user/domain/UserId'
import { PasswordService } from '../../User/user/domain/PasswordService'
import { JwtPayloadUser } from '../domain/GenerateToken'

export class ChangePassword {
  constructor(private readonly repository: Repository) { }

  async run(
    { payload, password, newPassword, reTypePassword }:
      { payload: JwtPayloadUser; password: string; newPassword: string; reTypePassword: string }
  ): Promise<void> {
    if (payload.sub === undefined) {
      throw new InvalidArgumentError('wrong payload')
    }
    const userId = new UserId(payload.sub).value
    const user = await this.repository.user.searchById(userId)
    if (user === null) {
      throw new UserDoesNotExistError(payload.sub)
    }

    PasswordService.compare(password.toString(), user.password)

    if (newPassword !== reTypePassword) {
      throw new InvalidArgumentError('Passwords do not match')
    }
    const userEntity = User.fromPrimitives(user)
    userEntity.updatePassword(newPassword)
    await this.repository.user.save(userEntity.toPrimitives())
  }
}
