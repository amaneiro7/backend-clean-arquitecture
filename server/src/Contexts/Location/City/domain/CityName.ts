import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject'

// Define a class for representing a Venezuela States as a value object
export class CityName extends StringValueObject {
  private readonly NAME_MAX_LENGTH = 100
  private readonly NAME_MIN_LENGTH = 3

  constructor (readonly value: string) {
    super(value)
    // Ensure the validity of the State
    this.ensureIsValidName(value)
  }

  // Convert to its primitive representation
  toPrimitives (): string {
    return this.value
  }

  // Ensure the validity of the name
  private ensureIsValidName (value: string): void {
    if (!this.isValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid City Name`)
    }
  }

  // Check if the Operating System Version value is valid
  private isValid (value: string): boolean {
    // Check if the value is in the accepted values
    return value.length >= this.NAME_MIN_LENGTH && value.length <= this.NAME_MAX_LENGTH
  }
}
