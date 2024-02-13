import { AcceptedNullValueObject } from '../../../Shared/domain/value-object/AcceptedNullValueObjects'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'

// Define a class for MACAddress that extends the StringValueObject class
export class MACAddress extends AcceptedNullValueObject<string> {
  // Define a regular expression for MAC address validation
  private readonly macAddressRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/

  // Constructor for MACAddress class
  constructor (readonly value: string | null) {
    super(value) // Call the constructor of the parent class

    // Ensure that the provided MAC address is valid
    this.ensureIsValid(value)
  }

  // Convert MAC address to its primitive value
  toPrimitives (): string | null {
    return this.value
  }

  // Ensure that the provided MAC address is a valid name
  private ensureIsValid (value: string | null): void {
    if (!this.isValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid MAC Adress`)
    }
  }

  // Check if the provided MAC address is a valid name
  private isValid (name: string | null): boolean {
    if (name === null) return true
    return this.macAddressRegex.test(name)
  }
}
