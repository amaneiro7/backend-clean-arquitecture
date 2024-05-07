import { AcceptedNullValueObject } from '../../../Shared/domain/value-object/AcceptedNullValueObjects'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { type Device, type DevicePrimitives } from './Device'
import { DeviceAlreadyExistError } from './DeviceAlreadyExistError'
import { type DeviceRepository } from './DeviceRepository'

export class DeviceSerial extends AcceptedNullValueObject<string> {
  private readonly NAME_MAX_LENGTH = 100
  private readonly NAME_MIN_LENGTH = 4
  private readonly notLowerCase = /^[^a-z]*$/
  private readonly notSpecialCharacterOnlyGuiones = /^[^\W_]*-?[^\W_]*$/
  private errors: string[] = []

  constructor(readonly value: string | null) {
    super(value)

    // Convertir el valor a mayúsculas si no es nulo
    if (value !== null) {
      this.value = value.toUpperCase().trim()
    }

    this.ensureIsValidSerial(value)
  }

  toPrimitives(): string | null {
    return this.value
  }

  private ensureIsValidSerial(value: string | null): void {
    if (!this.isDeviceSerialValid(value)) {
      throw new InvalidArgumentError(`<${value}> ${this.errors.join(' ')}`)
    }
  }

  private isDeviceSerialValid(name: string | null): boolean {
    if (name === null) return false
    const isHasNotSpecialCharacterOnlyGuiones = this.notSpecialCharacterOnlyGuiones.test(name)
    if (!isHasNotSpecialCharacterOnlyGuiones) {
      this.errors.push(`${name}: El serial no puede contener caracteres especiales`)
    }
    const isNotHasLowerCharacter = this.notLowerCase.test(name)
    if (!isNotHasLowerCharacter) {
      this.errors.push("El serial debe estar en mayúsculas")
    }
    const isNameValidLength = name.length >= this.NAME_MIN_LENGTH && name.length <= this.NAME_MAX_LENGTH
    if (!isNameValidLength) {
      this.errors.push(`El Serial debe tener entre ${this.NAME_MIN_LENGTH} y ${this.NAME_MAX_LENGTH} caracteres`)
    }
    return isHasNotSpecialCharacterOnlyGuiones && isNotHasLowerCharacter && isNameValidLength
  }

  static async updateSerialField({ repository, serial, entity }: { repository: DeviceRepository, serial?: Primitives<DeviceSerial>, entity: Device }): Promise<void> {
    // Si no se ha pasado un nuevo serial no realiza ninguna acción
    if (serial === undefined) {
      return
    }
    // Verifica que si el serial actual y el nuevo serial son iguales no realice una busqueda en el repositorio
    if (entity.serialValue === serial) {
      return
    }
    // Verifica que el serial no exista en la base de datos, si existe lanza un error {@link DeviceAlreadyExistError} con el serial pasado
    await DeviceSerial.ensureSerialDoesNotExit({ repository, serial })
    // Actualiza el campo serial de la entidad {@link Device} con el nuevo serial
    entity.updateSerial(serial)
  }

  static async ensureSerialDoesNotExit({ repository, serial }: { repository: DeviceRepository, serial: Primitives<DeviceSerial> }): Promise<void> {
    // If the serial is null, it does not exist, so we don't need to do any verification
    if (serial === null) {
      return
    }
    // Searches for a device with the given serial in the database
    const deviceWithSerial: DevicePrimitives | null = await repository.searchBySerial(new DeviceSerial(serial).toString())
    // If a device with the given serial exists, it means that it already exists in the database,
    // so we need to throw a {@link DeviceAlreadyExistError} with the given serial
    if (deviceWithSerial !== null) {
      throw new DeviceAlreadyExistError(serial)
    }
  }
}
