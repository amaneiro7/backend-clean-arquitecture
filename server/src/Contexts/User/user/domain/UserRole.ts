import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { RolePrimitives } from '../../Role/domain/Role'
import { RoleDoesNotExistError } from '../../Role/domain/RoleDoesNotExistError'
import { RoleId } from '../../Role/domain/RoleId'
import { RoleRepository } from '../../Role/domain/RoleRepository'
import { User } from './User'

export class UserRole extends RoleId {
  static async updateStatusField({ repository, role, entity }: { repository: RoleRepository, role?: Primitives<RoleId>, entity: User }): Promise<void> {
    // Si no se ha pasado un nuevo role no realiza ninguna acción
    if (role === undefined) {
      return
    }
    // Verifica que si el rol actual y el nuevo rol son iguales para no realice una busqueda en el repositorio
    if (entity.roleValue === role) {
      return
    }
    // Verifica que el rol exista en la base de datos, si no existe lanza un error {@link RoleDoesNotExistError} con el rol pasado
    await UserRole.ensureRoleExit({ repository, role })
    // Actualiza el campo rol de la entidad {@link User} con el nuevo rol
    entity.updateRole(role)
  }

  static async ensureRoleExit({ repository, role }: { repository: RoleRepository, role: Primitives<RoleId> }): Promise<void> {
    // Buscar for un rol con el role dado in la base de datos
    const rolToFind: RolePrimitives | null = await repository.searchById(new RoleId(role).value)
    // Si el rol no existe,
    // se arroja un {@link RoleDoesNotExistError}
    if (rolToFind === null) {
      throw new RoleDoesNotExistError()
    }
  }
}
