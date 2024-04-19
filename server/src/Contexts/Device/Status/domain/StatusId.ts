import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject'
import { type Device } from '../../Device/domain/Device'
import { type StatusPrimitives } from './Status'
import { StatusDoesNotExistError } from './StatusDoesNotExistError'
import { type StatusRepository } from './StatusRepository'

export class StatusId extends StringValueObject {
  public readonly StatusOptions: Record<string, string> = {
    1: 'En Uso',
    2: 'En Almacen',
    3: 'Por Desincorporar',
    4: 'Desincorporado'
  } as const

  static async updateStatusField ({ repository, status, entity }: { repository: StatusRepository, status?: Primitives<StatusId>, entity: Device }): Promise<void> {
    // Si no se ha pasado un nuevo status no realiza ninguna acción
    if (status === undefined) {
      return
    }
    // Verifica que si el status actual y el nuevo status son iguales no realice una busqueda en el repositorio
    if (entity.statusValue === status) {
      return
    }
    // Verifica que el status no exista en la base de datos, si existe lanza un error {@link DeviceAlreadyExistError} con el status pasado
    await StatusId.ensuerStatusDoesNotExit({ repository, status })
    // Actualiza el campo status de la entidad {@link Device} con el nuevo status
    entity.updateStatus(status)
  }

  static async ensuerStatusDoesNotExit ({ repository, status }: { repository: StatusRepository, status: Primitives<StatusId> }): Promise<void> {
    // Searches for a device with the given status in the database
    const deviceWithStatus: StatusPrimitives | null = await repository.searchById(new StatusId(status).toString())
    // If a device with the given status exists, it means that it already exists in the database,
    // so we need to throw a {@link DeviceAlreadyExistError} with the given status
    if (deviceWithStatus === null) {
      throw new StatusDoesNotExistError(status)
    }
  }
}
