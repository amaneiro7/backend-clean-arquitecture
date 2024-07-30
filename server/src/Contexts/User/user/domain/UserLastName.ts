import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { Primitives } from '../../../Shared/domain/value-object/Primitives'
import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject'
import { User } from './User'

export class UserLastName extends StringValueObject {
  private readonly NAME_MAX_LENGTH = 15
  private readonly NAME_MIN_LENGTH = 3

  constructor(readonly value: string) {
    super(value)

    this.ensureIsValidName(value)
  }

  toPrimitives(): string {
    return this.value
  }

  private ensureIsValidName(value: string): void {
    if (!this.isUserLastNameValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid lastname`)
    }
  }

  private isUserLastNameValid(name: string): boolean {
    return name.length >= this.NAME_MIN_LENGTH && name.length <= this.NAME_MAX_LENGTH
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
