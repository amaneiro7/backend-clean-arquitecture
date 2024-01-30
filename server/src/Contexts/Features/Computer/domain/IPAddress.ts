import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject'

// Define a class IPAddress that extends the StringValueObject class
export class IPAddress extends StringValueObject {
  // Define a private regular expression for IP address validation
  private readonly IPADRRESS_VALIDATION = /^([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])){3}$/

  // Constructor that takes a value and ensures it is a valid IP address
  constructor (readonly value: string) {
    super(value) // Call the constructor of the parent class

    this.ensureIsValidName(value) // Ensure the provided value is a valid IP address
  }

  // Return the value as a primitive string
  toPrimitives (): string {
    return this.value
  }

  // Private method to ensure the provided value is a valid IP address
  private ensureIsValidName (value: string): void {
    if (this.isProcessorNameValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid IPAdress`) // Throw an error if the value is not a valid IP address
    }
  }

  // Private method to check if the provided value is a valid IP address using the defined regular expression
  private isProcessorNameValid (name: string): boolean {
    return this.IPADRRESS_VALIDATION.test(name)
  }
}
