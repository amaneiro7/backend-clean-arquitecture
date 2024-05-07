import { AcceptedNullValueObject } from '../../../Shared/domain/value-object/AcceptedNullValueObjects'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { type DevicePrimitives, type Device } from './Device'
import { DeviceAlreadyExistError } from './DeviceAlreadyExistError'
import { type DeviceRepository } from './DeviceRepository'

export class DeviceActivo extends AcceptedNullValueObject<string> {
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

    this.ensureIsValidActivo(value)
  }

  toPrimitives(): string | null {
    return this.value
  }

  private ensureIsValidActivo(value: string | null): void {
    if (!this.isValid(value)) {
      throw new InvalidArgumentError(`<${value}> ${this.errors.join(' ')}`)
    }
  }

  private isValid(name: string | null): boolean {
    if (name === null) return false
    const isHasNotSpecialCharacterOnlyGuiones = this.notSpecialCharacterOnlyGuiones.test(name)
    if (!isHasNotSpecialCharacterOnlyGuiones) {
      this.errors.push(`${name}: El Activo no puede contener caracteres especiales`)
    }
    const isNotHasLowerCharacter = this.notLowerCase.test(name)
    if (!isNotHasLowerCharacter) {
      this.errors.push("El Activo debe estar en mayúsculas")
    }
    const isNameValidLength = name.length >= this.NAME_MIN_LENGTH && name.length <= this.NAME_MAX_LENGTH
    if (!isNameValidLength) {
      this.errors.push(`El Activo debe tener entre ${this.NAME_MIN_LENGTH} y ${this.NAME_MAX_LENGTH} caracteres`)
    }
    return isHasNotSpecialCharacterOnlyGuiones && isNotHasLowerCharacter && isNameValidLength
  }

  static async updateActivoField({ repository, activo, entity }: { repository: DeviceRepository, activo?: Primitives<DeviceActivo>, entity: Device }): Promise<void> {
    // Si no se ha pasado un nuevo activo no realiza ninguna acción
    if (activo === undefined) {
      return
    }
    // Verifica que si el activo actual y el nuevo activo son iguales no realice una busqueda en el repositorio
    if (entity.activoValue === activo) {
      return
    }
    // Verifica que el activo no exista en la base de datos, si existe lanza un error {@link DeviceAlreadyExistError} con el activo pasado
    await DeviceActivo.ensureActivoDoesNotExit({ repository, activo })
    // Actualiza el campo activo de la entidad {@link Device} con el nuevo activo
    entity.updateActivo(activo)
  }

  static async ensureActivoDoesNotExit({ repository, activo }: { repository: DeviceRepository, activo: Primitives<DeviceActivo> }): Promise<void> {
    // If the activo is null, it does not exist, so we don't need to do any verification
    if (activo === null) {
      return
    }
    // Searches for a device with the given activo in the database
    const deviceWithActivo: DevicePrimitives | null = await repository.searchByActivo(new DeviceActivo(activo).toString())
    // If a device with the given activo exists, it means that it already exists in the database,
    // so we need to throw a {@link DeviceAlreadyExistError} with the given activo
    if (deviceWithActivo !== null) {
      throw new DeviceAlreadyExistError(activo)
    }
  }
}
