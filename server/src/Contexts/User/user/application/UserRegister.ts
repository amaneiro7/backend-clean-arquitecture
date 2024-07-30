import { User, type UserPrimitives } from '../domain/User'
import { UserEmail } from '../domain/UserEmail'
import { UserAlreadyExistError } from '../domain/UserAlreadyExistError'
import { type Repository } from '../../../Shared/domain/Repository'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { JwtPayloadUser } from '../../../Auth/domain/GenerateToken'
import { isSuperAdmin } from '../../Role/application/isSuperAdmin'

export class UserRegister {
  constructor(private readonly repository: Repository) { }

  async register({ params, user }: { params: UserPrimitives, user?: JwtPayloadUser }): Promise<void> {
    isSuperAdmin({ user })
    this.ensureUserDoesNotExist(params.email)
    const userEntity = User.create(params)

    await this.repository.user.save(userEntity.toPrimitives())
  }

  private ensureUserDoesNotExist(email: Primitives<UserEmail>): void {
    if (this.repository.user.searchByEmail(new UserEmail(email).toString()) !== null) {
      throw new UserAlreadyExistError(email)
    }
  }
}
