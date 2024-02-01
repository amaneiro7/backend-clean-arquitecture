import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject'

// Define a class for MACAddress that extends the StringValueObject class
export class MACAddress extends StringValueObject {
  // Define a regular expression for MAC address validation
  private readonly macAddressRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/

  // Constructor for MACAddress class
  constructor (readonly value: string) {
    super(value) // Call the constructor of the parent class

    // Ensure that the provided MAC address is valid
    this.ensureIsValidName(value)
  }

  // Convert MAC address to its primitive value
  toPrimitives (): string {
    return this.value
  }

  // Ensure that the provided MAC address is a valid name
  private ensureIsValidName (value: string): void {
    if (!this.isProcessorNameValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid MACAdress`)
    }
  }

  // Check if the provided MAC address is a valid name
  private isProcessorNameValid (name: string): boolean {
    return this.macAddressRegex.test(name)
  }
}
