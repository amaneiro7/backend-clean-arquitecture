import { User, type UserPrimitives } from '../domain/User'
import { UserEmail } from '../domain/UserEmail'
import { type Repository } from '../../../Shared/domain/Repository'
import { JwtPayloadUser } from '../../../Auth/domain/GenerateToken'
import { isSuperAdmin } from '../../Role/application/isSuperAdmin'
import { UserRole } from '../domain/UserRole'

export class UserRegister {
  constructor(private readonly repository: Repository) { }

  async register({ payload, user }: { payload: UserPrimitives, user?: JwtPayloadUser }): Promise<void> {
    // Primero se valida si el usuario que esta realizando esta accion tiene permisos
    isSuperAdmin({ user })

    // se valida que el correo no exista
    await UserEmail.ensureEmailDoesNotExit({ repository: this.repository.user, email: payload.email })
    // se valida que el roleId exista
    await UserRole.ensureRoleExit({ repository: this.repository.role, role: payload.roleId })

    // se instancia el usuario
    const userEntity = User.create(payload)

    // se persiste el usuario en el repositorio
    await this.repository.user.save(userEntity.toPrimitives())
  }
}
