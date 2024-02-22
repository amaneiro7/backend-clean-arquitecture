import { InvalidArgumentError } from '../../../../Shared/domain/value-object/InvalidArgumentError'
import { StringValueObject } from '../../../../Shared/domain/value-object/StringValueObject'

export class ProcessorName extends StringValueObject {
  private readonly NAME_MAX_LENGTH = 100
  private readonly NAME_MIN_LENGTH = 3

  constructor (readonly value: string) {
    super(value)

    this.ensureIsValidName(value)
  }

  toPrimitives (): string {
    return this.value
  }

  private ensureIsValidName (value: string): void {
    if (this.isProcessorNameValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid name`)
    }
  }

  private isProcessorNameValid (name: string): boolean {
    return name.length <= this.NAME_MIN_LENGTH && name.length <= this.NAME_MAX_LENGTH
  }
}
