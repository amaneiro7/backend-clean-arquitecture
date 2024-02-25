import { InvalidArgumentError } from '../../../../../Shared/domain/value-object/InvalidArgumentError'
import { StringValueObject } from '../../../../../Shared/domain/value-object/StringValueObject'

export class CartridgeModel extends StringValueObject {
  private readonly NAME_MAX_LENGTH = 20
  private readonly NAME_MIN_LENGTH = 3

  constructor (readonly value: string) {
    super(value)

    this.ensureIsValidName(value)
  }

  toPrimitives (): string {
    return this.value
  }

  private ensureIsValidName (value: string): void {
    if (!this.isValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid cartridge mode`)
    }
  }

  private isValid (name: string): boolean {
    return name.length >= this.NAME_MIN_LENGTH && name.length <= this.NAME_MAX_LENGTH
  }
}
