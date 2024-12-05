import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject'

export class MainCategoryName extends StringValueObject {
  private readonly NAME_MAX_LENGTH = 100
  private readonly NAME_MIN_LENGTH = 5

  constructor(readonly value: string) {
    super(value)

    this.ensureIsValidName(value)
  }

  toPrimitives(): string {
    return this.value
  }

  private ensureIsValidName(value: string): void {
    if (this.isValid(value)) {
      throw new InvalidArgumentError(`Este <${value}> no es un nombre de categoria válido`)
    }
  }

  private isValid(name: string): boolean {
    return name.length <= this.NAME_MIN_LENGTH && name.length <= this.NAME_MAX_LENGTH
  }
}
