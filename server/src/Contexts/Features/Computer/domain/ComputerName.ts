import { AcceptedNullValueObject } from '../../../Shared/domain/value-object/AcceptedNullValueObjects'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'

export class ComputerName extends AcceptedNullValueObject<string> {
  private readonly NAME_MAX_LENGTH = 1000
  private readonly NAME_MIN_LENGTH = 3

  constructor (readonly value: string | null) {
    super(value)

    this.ensureIsValid(value)
  }

  toPrimitives (): string | null {
    return this.value
  }

  private ensureIsValid (value: string | null): void {
    if (!this.isValid(value)) {
      throw new InvalidArgumentError(`<${value}> exceeded the maximum length`)
    }
  }

  private isValid (name: string | null): boolean {
    if (name === null || name === '') return true
    return name.length >= this.NAME_MIN_LENGTH && name.length <= this.NAME_MAX_LENGTH
  }
}
