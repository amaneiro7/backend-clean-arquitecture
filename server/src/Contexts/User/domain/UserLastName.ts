import { InvalidArgumentError } from '../../Shared/domain/InvalidArgumentError'
import { StringValueObject } from '../../Shared/domain/StringValueObject'

export class UserLastName extends StringValueObject {
  private readonly NAME_MAX_LENGTH = 15
  private readonly NAME_MIN_LENGTH = 3

  constructor (readonly value: string) {
    super(value)

    this.ensureIsValidName(value)
  }

  toPrimitives (): string {
    return this.value
  }

  private ensureIsValidName (value: string): void {
    if (!this.isUserLastNameValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid lastname`)
    }
  }

  private isUserLastNameValid (name: string): boolean {
    return name.length >= this.NAME_MIN_LENGTH && name.length <= this.NAME_MAX_LENGTH
  }
}
