import { AcceptedNullValueObject } from '../../../Shared/domain/value-object/AcceptedNullValueObjects'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'

// Define a class LocationSubnet that extends the StringValueObject class
export class LocationSubnet extends AcceptedNullValueObject<string> {
  // Define a private regular expression for IP address validation
  private readonly IPADRRESS_VALIDATION = /^([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])){3}$/

  // Constructor that takes a value and ensures it is a valid IP address
  constructor (readonly value: string | null) {
    super(value) // Call the constructor of the parent class

    this.ensureIsValid(value) // Ensure the provided value is a valid IP address
  }

  // Return the value as a primitive string
  toPrimitives (): string | null {
    return this.value
  }

  // Private method to ensure the provided value is a valid IP address
  private ensureIsValid (value: string | null): void {
    if (!this.isValid(value)) {
      throw new InvalidArgumentError(`this <${value}> is not a valid Subnet`) // Throw an error if the value is not a valid IP address
    }
  }

  // Private method to check if the provided value is a valid IP address using the defined regular expression
  private isValid (name: string | null): boolean {
    if (name === null) return false
    return this.IPADRRESS_VALIDATION.test(name)
  }
}
