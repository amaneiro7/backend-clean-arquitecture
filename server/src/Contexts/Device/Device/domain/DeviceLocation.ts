import { type LocationPrimitives } from '../../../Location/Location/domain/Location'
import { LocationDoesNotExistError } from '../../../Location/Location/domain/LocationDoesNotExistError'
import { LocationId } from '../../../Location/Location/domain/LocationId'
import { type LocationRepository } from '../../../Location/Location/domain/LocationRepository'
import { TypeOfSiteId } from '../../../Location/TypeOfSite/domain/TypeOfSiteId'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { type Device } from './Device'
import { DeviceStatus } from './DeviceStatus'

export class DeviceLocation extends LocationId {
  static ensureDeviceBelongsToAppropiateLocationDependsOfStatus (typeOfSite: Primitives<TypeOfSiteId>, status: Primitives<DeviceStatus>): void {
    if (status === DeviceStatus.StatusOptions.INUSE && typeOfSite === TypeOfSiteId.TypeOfSiteOptions.ALMACEN) {
      throw new InvalidArgumentError('The device is in use and cannot be in the warehouse')
    }
    if (status !== DeviceStatus.StatusOptions.INUSE && typeOfSite !== TypeOfSiteId.TypeOfSiteOptions.ALMACEN) {
      throw new InvalidArgumentError('The device is not in use can only be located in the warehouse')
    }
  }

  static async updateLocationField ({ repository, location, entity }: { repository: LocationRepository, location?: Primitives<LocationId>, entity: Device }): Promise<void> {
    // Si no se ha pasado un nuevo location no realiza ninguna acción
    if (location === undefined) {
      return
    }
    // Verifica que si el location actual y el nuevo location son iguales no realice una busqueda en el repositorio
    if (entity.locationValue === location) {
      return
    }
    // Verifica que el location no exista en la base de datos, si existe lanza un error {@link DeviceAlreadyExistError} con el location pasado
    const status = entity.statusValue
    await DeviceLocation.ensureLocationExit({ repository, location, status })
    // Actualiza el campo location de la entidad {@link Device} con el nuevo location
    entity.updateLocation(location)
  }

  static async ensureLocationExit ({ repository, location, status }: { repository: LocationRepository, location: Primitives<LocationId>, status: Primitives<DeviceStatus> }): Promise<void> {
    // Searches for a device with the given location in the database
    const deviceWithLocation: LocationPrimitives | null = await repository.searchById(new LocationId(location).toString())
    // If a device with the given location exists, it means that it already exists in the database,
    // so we need to throw a {@link DeviceAlreadyExistError} with the given location
    if (deviceWithLocation === null) {
      throw new LocationDoesNotExistError(location)
    }
    const typeOfSite = deviceWithLocation.typeOfSiteId
    this.ensureDeviceBelongsToAppropiateLocationDependsOfStatus(typeOfSite, status)
  }
}
