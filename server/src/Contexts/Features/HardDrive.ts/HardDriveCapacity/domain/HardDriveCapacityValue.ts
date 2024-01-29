import { InvalidArgumentError } from '../../../../Shared/domain/value-object/InvalidArgumentError'
import { NumberValueObject } from '../../../../Shared/domain/value-object/NumberValueObject'

// Define a class for representing hard drive capacity as a value object
export class HardDriveCapacityValue extends NumberValueObject {
  // Define a constant map of accepted hard drive capacities
  private readonly ACCEPTED_VALUES: Record<string, number> = {
    40: 40,
    80: 80,
    120: 120,
    160: 160,
    250: 250,
    320: 320,
    500: 500,
    750: 750,
    1000: 1000
  }

  // Constructor for the HardDriveCapacityValue class
  constructor (readonly value: number) {
    super(value) // Call the constructor of the parent class

    // Ensure the validity of the hard drive capacity value
    this.ensureIsValidName(value)
  }

  // Convert the hard drive capacity value to its primitive representation
  toPrimitives (): number {
    return this.value
  }

  // Ensure the validity of the hard drive capacity value
  private ensureIsValidName (value: number): void {
    if (this.isHardDriveCapacityValueValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid name`)
    }
  }

  // Check if the hard drive capacity value is valid
  private isHardDriveCapacityValueValid (value: number): boolean {
    // Check if the value is in the accepted values
    return Object.values(this.ACCEPTED_VALUES).includes(value)
  }
}
