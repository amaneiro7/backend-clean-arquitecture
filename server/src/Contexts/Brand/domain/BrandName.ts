import { InvalidArgumentError } from '../../Shared/domain/value-object/InvalidArgumentError'
import { StringValueObject } from '../../Shared/domain/value-object/StringValueObject'

export class BrandName extends StringValueObject {
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
    if (!this.isBrandNameValid(value)) {
      throw new InvalidArgumentError(`<${value}> no es un nombre de marca válido`)
    }
  }

  private isBrandNameValid (name: string): boolean {
    return name.length >= this.NAME_MIN_LENGTH && name.length <= this.NAME_MAX_LENGTH
  }
}
