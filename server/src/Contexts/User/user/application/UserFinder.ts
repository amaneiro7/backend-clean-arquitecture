import { type Repository } from '../../../Shared/domain/Repository'
import { type UserPrimitives } from '../domain/User'
import { type UserEmail } from '../domain/UserEmail'
import { UserId } from '../domain/UserId'
import { UserDoesNotExistError } from '../domain/UserDoesNotExistError'
import { isSuperAdmin } from '../../Role/application/isSuperAdmin'
import { JwtPayloadUser } from '../../../Auth/domain/GenerateToken'
import { Primitives } from '../../../Shared/domain/value-object/Primitives'
import { RoleId } from '../../Role/domain/RoleId'

export class UserFinder {
  constructor(private readonly repository: Repository) { }

  async searchById({ id, user }: { user?: JwtPayloadUser, id: Primitives<UserId> }): Promise<Omit<UserPrimitives, 'password'>> {
    isSuperAdmin({ user })
    const userId = new UserId(id).value
    const findUser = await this.repository.user.searchById(userId)

    if (findUser === null) {
      throw new UserDoesNotExistError(userId)
    }

    if (findUser.roleId === RoleId.Options.ADMIN) {
      throw new UserDoesNotExistError('')
    }
    const { password, ...res } = findUser
    return res
  }

  async searchByEmail({ user, userEmail }: { user?: JwtPayloadUser, userEmail: UserEmail }): Promise<Omit<UserPrimitives, 'password'>> {
    isSuperAdmin({ user })
    const findUser = await this.repository.user.searchByEmail(userEmail.value)

    if (findUser === null) {
      throw new UserDoesNotExistError(userEmail.value)
    }

    if (findUser.roleId === RoleId.Options.ADMIN) {
      throw new UserDoesNotExistError('')
    }
    const { password, ...res } = findUser
    return res
  }
}
