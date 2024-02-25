import { BooleanValueObject } from '../../../../../Shared/domain/value-object/BooleanValueObject'
import { InvalidArgumentError } from '../../../../../Shared/domain/value-object/InvalidArgumentError'

export class HasBluetooth extends BooleanValueObject {
  constructor (readonly value: boolean) {
    super(value)

    this.ensureIsValid(value)
  }

  toPrimitives (): boolean {
    return this.value
  }

  private ensureIsValid (value: boolean): void {
    if (!this.isValid(value)) {
      throw new InvalidArgumentError(`This <${value}> is not a valid type`)
    }
  }

  private isValid (value: boolean): boolean {
    return typeof value === 'boolean'
  }
}
