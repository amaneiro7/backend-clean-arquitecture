import { JwtPayloadUser } from '../../../Auth/domain/GenerateToken'
import { type Repository } from '../../../Shared/domain/Repository'
import { Primitives } from '../../../Shared/domain/value-object/Primitives'
import { isSuperAdmin } from '../../Role/application/isSuperAdmin'
import { type UserPrimitives } from '../domain/User'
import { UserDoesNotExistError } from '../domain/UserDoesNotExistError'
import { UserEmail } from '../domain/UserEmail'
import { UserId } from '../domain/UserId'

export class UserRemover {
    constructor(private readonly repository: Repository) { }

    async run({ user, email }: { user?: JwtPayloadUser, email: Primitives<UserId> }): Promise<void> {
        // Se valida que el usuario que realiza la accion esta autorizado
        isSuperAdmin({ user })

        // se valida que el email, sea un email valida
        const userEmail = new UserEmail(email).value

        // se busca el usuario a eliminar
        const userToDelete = await this.repository.user.searchByEmail(userEmail)

        // se verifica que el usuario exista, si no existe arrojar un error
        if (userToDelete === null) {
            throw new UserDoesNotExistError(userEmail)
        }

        // eliminar el usuario de la base de datos
        await this.repository.user.delete(userToDelete.id)
    }
}
