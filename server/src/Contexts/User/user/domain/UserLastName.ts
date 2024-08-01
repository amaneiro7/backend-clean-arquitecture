import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { Primitives } from '../../../Shared/domain/value-object/Primitives'
import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject'
import { User } from './User'

export class UserLastName extends StringValueObject {
  private readonly NAME_MAX_LENGTH = 50
  private readonly NAME_MIN_LENGTH = 3
  private readonly Regex = /^[A-ZÑñÁÉÍÓÚ][a-zñáéíóú]*(?: [A-ZÑñÁÉÍÓÚ][a-zñáéíóú]*)*$/

  constructor(readonly value: string) {
    super(value)

    this.ensureIsValidName(value)
  }

  toPrimitives(): string {
    return this.value
  }
  private ensureIsValidName(value: string): void {
    // Create an empty array to store any validation errors
    const errors = []
    if (value.length < this.NAME_MIN_LENGTH) {
      errors.push(`El apellido del usuario debe ser mayor a ${this.NAME_MIN_LENGTH} caracteres`)
    }
    if (value.length > this.NAME_MAX_LENGTH) {
      errors.push(`El apellido del usuario debe ser menor a ${this.NAME_MAX_LENGTH} caracteres`)
    }
    if (!this.Regex.test(value)) {
      errors.push(`La primera letra debe ser en mayúsculas, el resto en minúsculas, y no puede tener espacios al final al menos que sea un nombre compuesto`)
    }

    if (errors.length > 0) {
      throw new InvalidArgumentError(errors.join(', '))
    }
  }


  static async updateLastNameField({ lastName, entity }: { lastName?: Primitives<UserLastName>, entity: User }): Promise<void> {
    // Si no se ha pasado un nuevo valor del apellido no realiza ninguna acción
    if (lastName === undefined) {
      return
    }
    // Verifica que si el valor del campo del apellido actual y el nuevo valor del apellido son iguales no realiza un cambio
    if (entity.lastNameValue === lastName) {
      return
    }
    // Actualiza el campo del apellido de la entidad {@link User} con el nuevo apellido    
    entity.updateName(lastName)
  }
}
