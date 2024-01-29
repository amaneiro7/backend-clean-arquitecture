import { InvalidArgumentError } from '../../../../Shared/domain/value-object/InvalidArgumentError'
import { StringValueObject } from '../../../../Shared/domain/value-object/StringValueObject'

// Define a class for representing hard drive Type as a value object
export class MemoryRamTypeName extends StringValueObject {
  // Define a constant map of accepted hard drive capacities
  private readonly ACCEPTED_VALUES: Record<string, string> = {
    DDR2: 'DDR2',
    DDR2L: 'DDR2L',
    DDR3: 'DDR3',
    DD3L: 'DD3L',
    DDR4: 'DDR4',
    DDR4L: 'DDR4L',
    DDR5: 'DDR5',
    DDR5L: 'DDR5L'
  }

  // Constructor for the MemoryRamTypeName class
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
    if (this.isMemoryRamTypeNameValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid name`)
    }
  }

  // Check if the memory ram Type value is valid
  private isMemoryRamTypeNameValid (value: string): boolean {
    // Check if the value is in the accepted values
    return Object.values(this.ACCEPTED_VALUES).includes(value)
  }
}
