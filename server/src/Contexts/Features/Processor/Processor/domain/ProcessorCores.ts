import { InvalidArgumentError } from '../../../../Shared/domain/value-object/InvalidArgumentError'
import { NumberValueObject } from '../../../../Shared/domain/value-object/NumberValueObject'

export class ProcessorCores extends NumberValueObject {
  private readonly MIN = 1
  private readonly MAX = 32

  constructor (readonly value: number) {
    super(value)
    this.ensureIsValidName(value)
  }

  toPrimitives (): number {
    return this.value
  }

  private ensureIsValidName (value: number): void {
    if (!this.isValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not valid value for cores `)
    }
  }

  private isValid (value: number): boolean {
    if (value < this.MIN || value > this.MAX) {
      return false // cores must be between 1 and 32
    }
    if (value % 2 !== 0 && value !== 1) {
      return false // cores must be even or equal to 1
    }
    return true
  }
}
