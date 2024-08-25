import { LocationId } from '../../../Location/Location/domain/LocationId'
import { DeviceStatus } from './DeviceStatus'
import { TypeOfSiteId } from '../../../Location/TypeOfSite/domain/TypeOfSiteId'
import { LocationDoesNotExistError } from '../../../Location/Location/domain/LocationDoesNotExistError'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { type LocationRepository } from '../../../Location/Location/domain/LocationRepository'
import { type LocationPrimitives } from '../../../Location/Location/domain/Location'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { Device } from './Device'
import { AcceptedNullValueObject } from '../../../Shared/domain/value-object/AcceptedNullValueObjects'

export class DeviceLocation extends AcceptedNullValueObject<Primitives<LocationId>> {
  constructor(
    readonly value: Primitives<LocationId> | null,
  ) {
    super(value)
  }
  static ensureDeviceBelongsToAppropiateLocationDependsOfStatus(typeOfSite: Primitives<TypeOfSiteId>, status: Primitives<DeviceStatus>): void {
    if ([
      DeviceStatus.StatusOptions.INUSE,
      DeviceStatus.StatusOptions.PRESTAMO,
      DeviceStatus.StatusOptions.CONTINGENCIA,
      DeviceStatus.StatusOptions.GUARDIA,
      DeviceStatus.StatusOptions.DISPONIBLE
    ].includes(status) && typeOfSite === TypeOfSiteId.TypeOfSiteOptions.ALMACEN) {
      throw new InvalidArgumentError('The device is in use and cannot be in the warehouse')
    }
    if (([
      DeviceStatus.StatusOptions.INALMACEN,
      DeviceStatus.StatusOptions.PORDESINCORPORAR].includes(status) && typeOfSite !== TypeOfSiteId.TypeOfSiteOptions.ALMACEN)) {
      throw new InvalidArgumentError('The device is not in use can only be located in the warehouse')
    }
    if (([
      DeviceStatus.StatusOptions.DESINCORPORADO
    ].includes(status) && typeOfSite !== null)) {
      throw new InvalidArgumentError('The device cannot have a location if status is desincorporated')

    }
  }

  static async updateLocationField({ repository, location, entity }: { repository: LocationRepository, location?: Primitives<DeviceLocation>, entity: Device }): Promise<void> {
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

  static async ensureLocationExit({ repository, location, status }: { repository: LocationRepository, location: Primitives<DeviceLocation>, status: Primitives<DeviceStatus> }): Promise<void> {
    // If the location is null, it does not exist, so we don't need to do any verification
    if (location === null) {
      return
    }
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
