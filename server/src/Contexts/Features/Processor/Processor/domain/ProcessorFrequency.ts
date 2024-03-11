import { InvalidArgumentError } from '../../../../Shared/domain/value-object/InvalidArgumentError'
import { NumberValueObject } from '../../../../Shared/domain/value-object/NumberValueObject'

export class ProcessorFrequency extends NumberValueObject {
  private readonly MIN = 1
  private readonly MAX = 6

  constructor (readonly value: number) {
    super(value)
    this.ensureIsValidName(value)
  }

  toPrimitives (): string {
    const frequencyInGHz = this.value.toFixed(2)
    return `${frequencyInGHz} GHz`
  }

  private ensureIsValidName (value: number): void {
    if (!this.isValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid processor frequency`)
    }
  }

  private isValid (value: number): boolean {
    return value >= this.MIN && value <= this.MAX
  }
}
