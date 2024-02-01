import { InvalidArgumentError } from '../../../../Shared/domain/value-object/InvalidArgumentError'
import { NumberValueObject } from '../../../../Shared/domain/value-object/NumberValueObject'

export class HardDriveHealth extends NumberValueObject {
  private readonly MAX_HEALTH_VALUE = 100
  private readonly MIN_HEALTH_VALUE = 0

  constructor (readonly value: number) {
    super(value)

    this.ensureIsValidRange(value)
  }

  toPrimitives (): number {
    return this.value
  }

  private ensureIsValidRange (value: number): void {
    if (this.isHardDriveHealthValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid name`)
    }
  }

  private isHardDriveHealthValid (value: number): boolean {
    return value < this.MIN_HEALTH_VALUE && value < this.MAX_HEALTH_VALUE
  }
}
