import { InvalidArgumentError } from '../../Shared/domain/value-object/InvalidArgumentError'
import { StringValueObject } from '../../Shared/domain/value-object/StringValueObject'

// Define a class for representing hard drive Type as a value object
export class TableName extends StringValueObject {
  // Define a constant map of accepted hard drive capacities
  private readonly ACCEPTED_VALUES: Record<string, string> = {
    USER: 'users',
    BRAND: 'brands',
    DEVICE: 'devices',
    MODEL: 'models',
    COMPUTER: 'computers',
    HARDDRIVE: 'hard_drives',
    PROCESSOR: 'processors'
  }

  // Constructor for the TableName class
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
    if (this.isTableNameValid(value)) {
      throw new InvalidArgumentError(`<${value}> does not exist`)
    }
  }

  // Check if the hard drive Type value is valid
  private isTableNameValid (value: string): boolean {
    // Check if the value is in the accepted values
    return Object.values(this.ACCEPTED_VALUES).includes(value)
  }
}
