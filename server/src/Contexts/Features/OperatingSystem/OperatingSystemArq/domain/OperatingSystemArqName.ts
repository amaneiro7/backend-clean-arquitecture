import { InvalidArgumentError } from '../../../../Shared/domain/value-object/InvalidArgumentError'
import { StringValueObject } from '../../../../Shared/domain/value-object/StringValueObject'

// Define a class for representing Operating System Aquitecture Type as a value object
export class OperatingSystemArqName extends StringValueObject {
  // Define a constant map of accepted Operating System Aquitecture Types
  private readonly ACCEPTED_VALUES: Record<string, string> = {
    x86: 'x86',
    x64: 'x64'
  }

  // Constructor for the OperatingSystemArqName class
  constructor (readonly value: string) {
    super(value) // Call the constructor of the parent class

    // Ensure the validity of the Operating System Aquitecture Type value
    this.ensureIsValidName(value)
  }

  // Convert the Operating System Aquitecture Type value to its primitive representation
  toPrimitives (): string {
    return this.value
  }

  // Ensure the validity of the Operating System Aquitecture Type value
  private ensureIsValidName (value: string): void {
    if (this.isOperatingSystemArqNameValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid name`)
    }
  }

  // Check if the memory ram Type value is valid
  private isOperatingSystemArqNameValid (value: string): boolean {
    // Check if the value is in the accepted values
    return Object.values(this.ACCEPTED_VALUES).includes(value)
  }
}
