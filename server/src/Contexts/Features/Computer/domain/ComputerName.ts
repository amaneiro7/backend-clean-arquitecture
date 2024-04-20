import { type DeviceRepository } from '../../../Device/Device/domain/DeviceRepository'
import { DeviceStatus } from '../../../Device/Device/domain/DeviceStatus'
import { AcceptedNullValueObject } from '../../../Shared/domain/value-object/AcceptedNullValueObjects'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { type DeviceComputer } from './Computer'

export class ComputerName extends AcceptedNullValueObject<string> {
  private readonly NAME_MAX_LENGTH = 1000
  private readonly NAME_MIN_LENGTH = 3

  constructor (
    readonly value: string | null,
    private readonly statusId: Primitives<DeviceStatus>
  ) {
    super(value)

    this.ensureIfStatusIsInUse(this.value, this.statusId)
    this.ensureIsValid(value)
  }

  toPrimitives (): string | null {
    return this.value
  }

  private ensureIfStatusIsInUse (value: Primitives<ComputerName>, statusId: Primitives<DeviceStatus>): void {
    if (statusId !== DeviceStatus.StatusOptions.INUSE && value !== null) {
      throw new InvalidArgumentError('Computer name can only be stablished when the device is in use')
    }
  }

  private ensureIsValid (value: string | null): void {
    if (!this.isValid(value)) {
      throw new InvalidArgumentError(`<${value}> exceeded the maximum length`)
    }
  }

  private isValid (name: string | null): boolean {
    if (name === null || name === '') return true
    return name.length >= this.NAME_MIN_LENGTH && name.length <= this.NAME_MAX_LENGTH
  }

  static async updateComputerNameField ({ repository, computerName, entity }: { repository: DeviceRepository, computerName?: Primitives<ComputerName>, entity: DeviceComputer }): Promise<void> {
    // Si no se ha pasado un nuevo nombre de equipo no realiza ninguna acción
    if (computerName === undefined) {
      return
    }
    // Verifica que si el nombre de equipo actual y el nuevo nombre de equipo son iguales no realice una busqueda en el repositorio
    if (entity.computerNameValue === computerName) {
      return
    }
    // Verifica que el nombre de equipo no exista en la base de datos, si existe lanza un error {@link DeviceAlreadyExistError} con el nombre de equipo pasado
    await ComputerName.ensuerComputerNameDoesNotExit({ repository, computerName })
    // Actualiza el campo nombre de equipo de la entidad {@link Device} con el nuevo nombre de equipo
    const status = entity.statusValue
    entity.updateComputerName(computerName, status)
  }

  static async ensuerComputerNameDoesNotExit ({ repository, computerName }: { repository: DeviceRepository, computerName: Primitives<ComputerName> }): Promise<void> {
    // If the nombre de equipo is null, it does not exist, so we don't need to do any verification
    if (computerName === null) {
      return
    }
    // Searches for a device with the given nombre de equipo in the database
    const deviceWithComputerName = await repository.searchByComputerName(computerName)
    // If a device with the given nombre de equipo exists, it means that it already exists in the database,
    // so we need to throw a {@link DeviceAlreadyExistError} with the given nombre de equipo
    if (deviceWithComputerName !== null) {
      throw new InvalidArgumentError('computerName already exists')
    }
  }
}
