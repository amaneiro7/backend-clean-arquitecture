import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { Primitives } from '../../../Shared/domain/value-object/Primitives'
import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject'
import { User } from './User'

export class UserName extends StringValueObject {
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
    if (this.isUserNameValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid name`)
    }
  }

  private isUserNameValid(name: string): boolean {
    return name.length <= this.NAME_MIN_LENGTH && name.length <= this.NAME_MAX_LENGTH
  }

  static async updateNameField({ name, entity }: { name?: Primitives<UserName>, entity: User }): Promise<void> {
    // Si no se ha pasado un nuevo valor del nombre no realiza ninguna acción
    if (name === undefined) {
      return
    }
    // Verifica que si el valor del campo del nombre actual y el nuevo valor del nombre son iguales no realiza un cambio
    if (entity.nameValue === name) {
      return
    }
    // Actualiza el campo del nombre de la entidad {@link User} con el nuevo nombre    
    entity.updateName(name)
  }
}
