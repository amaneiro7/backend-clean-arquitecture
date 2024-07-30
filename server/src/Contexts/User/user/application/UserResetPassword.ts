import { JwtPayloadUser } from '../../../Auth/domain/GenerateToken'
import { type Repository } from '../../../Shared/domain/Repository'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { UserPassword } from '../domain/UserPassword'
import { User } from '../domain/User'
import { UserDoesNotExistError } from '../domain/UserDoesNotExistError'
import { UserEmail } from '../domain/UserEmail'
import { isSuperAdmin } from '../../Role/application/isSuperAdmin'

export class UserResetPassword {
    constructor(private readonly repository: Repository) { }

    async reset({ email, user }: { email: Primitives<UserEmail>, user?: JwtPayloadUser }): Promise<void> {
        // se valida que el usuario que esta realizando esta operacion tiene privilegios    
        isSuperAdmin({ user })

        // se busca el usuario al cual se le va a actualizar la contraseña
        const userEmail = new UserEmail(email).value
        const userToResetPassword = await this.repository.user.searchByEmail(userEmail)

        // Si no existe, arroja un error
        if (userToResetPassword === null) {
            throw new UserDoesNotExistError(email)
        }

        // se instancia el usuario, se aplica la contraseña por defecto y se actualiza la contraseña
        const userEntity = User.fromPrimitives(userToResetPassword)
        const newPassword = UserPassword.defaultPassword
        userEntity.updatePassword(newPassword)

        // se guarda en base de datos la nueva contraseña
        await this.repository.user.save(userEntity.toPrimitives())
    }
}
