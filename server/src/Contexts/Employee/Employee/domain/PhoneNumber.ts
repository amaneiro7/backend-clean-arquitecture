import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject'

export class PhoneNumber extends StringValueObject {
  private readonly areaCodes = [
    '0414',
    '0424',
    '0412',
    '0416',
    '0426'
  ]

  private readonly numberLenght = 7
  private readonly extension = `^(${this.areaCodes.join('|')})\\d{${this.numberLenght}}$`
  private readonly phoneRegex = new RegExp(this.extension)

  constructor (
    readonly value: string
  ) {
    super(value)

    this.ensureIsValid(value)
  }

  toPrimitives (): string {
    return this.value
  }

  private ensureIsValid (value: string): void {
    if (!this.isValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid Phone Number`)
    }
  }

  private isValid (name: string): boolean {
    return this.phoneRegex.test(name)
  }
}
