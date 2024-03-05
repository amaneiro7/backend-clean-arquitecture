import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { NumberValueObject } from '../../../Shared/domain/value-object/NumberValueObject'

export class EmployeeCedula extends NumberValueObject {
  private readonly MAX = 200000000
  private readonly MIN = 1

  constructor (readonly value: number) {
    super(value)

    this.ensureIsValidName(value)
  }

  toPrimitives (): number {
    return this.value
  }

  private ensureIsValidName (value: number): void {
    if (!this.isValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid name`)
    }
  }

  private isValid (cedula: number): boolean {
    return cedula >= this.MIN && cedula <= this.MAX
  }
}
