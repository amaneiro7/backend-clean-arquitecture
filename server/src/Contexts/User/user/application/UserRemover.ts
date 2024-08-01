import { JwtPayloadUser } from '../../../Auth/domain/GenerateToken'
import { type Repository } from '../../../Shared/domain/Repository'
import { Primitives } from '../../../Shared/domain/value-object/Primitives'
import { isSuperAdmin } from '../../Role/application/isSuperAdmin'
import { UserDoesNotExistError } from '../domain/UserDoesNotExistError'
import { UserId } from '../domain/UserId'

export class UserRemover {
    constructor(private readonly repository: Repository) { }

    async run({ user, id }: { user?: JwtPayloadUser, id: Primitives<UserId> }): Promise<void> {
        // Se valida que el usuario que realiza la accion esta autorizado
        isSuperAdmin({ user })

        // se valida que el id, sea un id valida
        const userId = new UserId(id).value

        // se busca el usuario a eliminar
        const userToDelete = await this.repository.user.searchById(userId)

        // se verifica que el usuario exista, si no existe arrojar un error
        if (userToDelete === null) {
            throw new UserDoesNotExistError(userId)
        }

        // eliminar el usuario de la base de datos
        await this.repository.user.delete(id)
    }
}
