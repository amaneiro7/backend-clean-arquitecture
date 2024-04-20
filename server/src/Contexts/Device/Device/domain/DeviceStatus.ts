import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { type StatusPrimitives } from '../../Status/domain/Status'
import { StatusDoesNotExistError } from '../../Status/domain/StatusDoesNotExistError'
import { StatusId } from '../../Status/domain/StatusId'
import { type StatusRepository } from '../../Status/domain/StatusRepository'
import { type Device } from './Device'

export class DeviceStatus extends StatusId {
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
    await DeviceStatus.ensuerStatusExit({ repository, status })
    // Actualiza el campo status de la entidad {@link Device} con el nuevo status
    entity.updateStatus(status)
  }

  static async ensuerStatusExit ({ repository, status }: { repository: StatusRepository, status: Primitives<StatusId> }): Promise<void> {
    // Searches for a device with the given status in the database
    const deviceWithStatus: StatusPrimitives | null = await repository.searchById(new StatusId(status).toString())
    // If a device with the given status exists, it means that it already exists in the database,
    // so we need to throw a {@link DeviceAlreadyExistError} with the given status
    if (deviceWithStatus === null) {
      throw new StatusDoesNotExistError(status)
    }
  }
}
