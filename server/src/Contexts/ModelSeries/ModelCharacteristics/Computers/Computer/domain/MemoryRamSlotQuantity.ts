import { InvalidArgumentError } from '../../../../../Shared/domain/value-object/InvalidArgumentError'
import { NumberValueObject } from '../../../../../Shared/domain/value-object/NumberValueObject'

export class MemoryRamSlotQuantity extends NumberValueObject {
  private readonly MAX_SLOTS = 8
  private readonly MIN_SLOTS = 1

  constructor (readonly value: number) {
    super(value)

    this.ensureIsValidRange(value)
  }

  toPrimitives (): number {
    return this.value
  }

  private ensureIsValidRange (value: number): void {
    if (!this.isValid(value)) {
      throw new InvalidArgumentError(`this value <${value}> is not a valid`)
    }
  }

  private isValid (value: number): boolean {
    return value >= this.MIN_SLOTS && value <= this.MAX_SLOTS
  }
}
