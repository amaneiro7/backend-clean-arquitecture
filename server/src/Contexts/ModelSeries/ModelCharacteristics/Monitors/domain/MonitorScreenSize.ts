import { InvalidArgumentError } from '../../../../Shared/domain/value-object/InvalidArgumentError'
import { NumberValueObject } from '../../../../Shared/domain/value-object/NumberValueObject'

export class MonitorScreenSize extends NumberValueObject {
  private readonly MIN_SIZE = 14
  private readonly MAX_SIZE = 35

  constructor (readonly value: number) {
    super(value)

    this.ensureIsValidName(value)
  }

  toPrimitives (): string {
    return `${this.value} Inches`
  }

  private ensureIsValidName (value: number): void {
    if (!this.isValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid Monitor Screen Size`)
    }
  }

  private isValid (value: number): boolean {
    return value >= this.MIN_SIZE && value <= this.MAX_SIZE
  }
}
