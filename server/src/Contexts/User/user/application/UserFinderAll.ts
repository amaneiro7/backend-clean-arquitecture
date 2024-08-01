import { isSuperAdmin } from '../../Role/application/isSuperAdmin'
import { type JwtPayloadUser } from '../../../Auth/domain/GenerateToken'
import { type Repository } from '../../../Shared/domain/Repository'
import { type UserPrimitivesOptional } from '../domain/User'
import { RoleId } from '../../Role/domain/RoleId'

export class UserFinderAll {
  constructor(private readonly repository: Repository) { }

  async search({ user }: { user?: JwtPayloadUser }): Promise<UserPrimitivesOptional[]> {
    isSuperAdmin({ user })

    const users = await this.repository.user.searchAll()
      // Se bloquea exponer los datos del usuario admin
      .then(res => res.filter(user => user.roleId !== RoleId.Options.ADMIN))
      // Se elimina la propiedad password, por alguna razon con sequelize
      .then(res => res.map(user => {
        const { password, ...rest } = user
        return rest
      }))

    return users
  }
}
