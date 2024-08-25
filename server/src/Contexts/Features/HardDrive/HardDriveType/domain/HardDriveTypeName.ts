import { InvalidArgumentError } from '../../../../Shared/domain/value-object/InvalidArgumentError'
import { StringValueObject } from '../../../../Shared/domain/value-object/StringValueObject'

// Define a class for representing hard drive Type as a value object
export class HardDriveTypeName extends StringValueObject {
  // Define a constant map of accepted hard drive capacities
  private readonly ACCEPTED_VALUES: Record<string, string> = {
    HDD: 'HDD',
    SDD: 'SDD',
    SDDM2: 'SDD M.2',
    IDE: 'IDE'
  }

  // Constructor for the HardDriveTypeName class
  constructor (readonly value: string) {
    super(value) // Call the constructor of the parent class

    // Ensure the validity of the hard drive Type value
    this.ensureIsValidName(value)
  }

  // Convert the hard drive Type value to its primitive representation
  toPrimitives (): string {
    return this.value
  }

  // Ensure the validity of the hard drive Type value
  private ensureIsValidName (value: string): void {
    if (this.isHardDriveTypeNameValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid name`)
    }
  }

  // Check if the hard drive Type value is valid
  private isHardDriveTypeNameValid (value: string): boolean {
    // Check if the value is in the accepted values
    return Object.values(this.ACCEPTED_VALUES).includes(value)
  }
}
