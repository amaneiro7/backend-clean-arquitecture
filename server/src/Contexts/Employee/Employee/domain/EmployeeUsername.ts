import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { Primitives } from '../../../Shared/domain/value-object/Primitives'
import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject'
import { Employee, EmployeePrimitives } from './Employee'
import { EmployeeAlreadyExistError } from './EmployeeAlreadyExistError'
import { EmployeeRepository } from './EmployeeRepository'

export class EmployeeUserName extends StringValueObject {
  private readonly NAME_MAX_LENGTH = 100
  private readonly NAME_MIN_LENGTH = 2

  constructor (readonly value: string) {
    super(value)

    this.ensureIsValidName(value)
  }

  toPrimitives (): string {
    return this.value
  }

  private ensureIsValidName (value: string): void {
    if (!this.isValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid lastname`)
    }
  }

  private isValid (name: string): boolean {
    return name.length >= this.NAME_MIN_LENGTH && name.length <= this.NAME_MAX_LENGTH
  }

  static async updateUserNameField ({ repository, userName, entity }: { repository: EmployeeRepository, userName?: Primitives<EmployeeUserName>, entity: Employee }): Promise<void> {
    // Si no se ha pasado un nuevo nombre de usuario no realiza ninguna acción
    if (userName === undefined) {
      return
    }
    // Verifica que si el nombre de usuario actual y el nuevo nombre de usuario son iguales no realice una busqueda en el repositorio
    if (entity.userNameValue === userName) {
      return
    }
    // Verifica que el nombre de usuario no exista en la base de datos, si existe lanza un error {@link DeviceAlreadyExistError} con el nombre de usuario pasado
    await EmployeeUserName.ensureEmployeeDoesNotExit({ repository, userName })
    // Actualiza el campo nombre de usuario de la entidad {@link Device} con el nuevo nombre de usuario
    entity.updateUserName(userName)
  }

  static async ensureEmployeeDoesNotExit ({ repository, userName }: { repository: EmployeeRepository, userName: Primitives<EmployeeUserName> }): Promise<void> {
    // If the nombre de usuario is null, it does not exist, so we don't need to do any verification
    if (userName === null) {
      return
    }
    // Searches for a device with the given nombre de usuario in the database
    const emlpoyeeUserName: EmployeePrimitives | null = await repository.searchByUserName(userName)
    // If a device with the given nombre de usuario exists, it means that it already exists in the database,
    // so we need to throw a {@link DeviceAlreadyExistError} with the given nombre de usuario
    if (emlpoyeeUserName !== null) {
      throw new EmployeeAlreadyExistError(userName)
    }
  }
}
