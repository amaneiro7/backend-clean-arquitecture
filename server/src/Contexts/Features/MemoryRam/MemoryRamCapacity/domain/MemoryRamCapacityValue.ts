import { InvalidArgumentError } from '../../../../Shared/domain/value-object/InvalidArgumentError'
import { NumberValueObject } from '../../../../Shared/domain/value-object/NumberValueObject'

// Define a class for representing memory ram capacity as a value object
export class MemoryRamCapacityValue extends NumberValueObject {
  // Define a constant map of accepted memory ram capacities
  private readonly ACCEPTED_VALUES: Record<string, number> = {
    128: 128,
    256: 256,
    512: 512,
    1024: 1024,
    2048: 2048,
    4096: 4096,
    8192: 8192,
    16384: 16384
  }

  // Constructor for the MemoryRamCapacityValue class
  constructor (readonly value: number) {
    super(value) // Call the constructor of the parent class

    // Ensure the validity of the memory ram capacity value
    this.ensureIsValidName(value)
  }

  // Convert the memory ram capacity value to its primitive representation
  toPrimitives (): number {
    return this.value
  }

  // Ensure the validity of the memory ram capacity value
  private ensureIsValidName (value: number): void {
    if (this.isMemoryRamCapacityValueValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid name`)
    }
  }

  // Check if the memory ram capacity value is valid
  private isMemoryRamCapacityValueValid (value: number): boolean {
    // Check if the value is in the accepted values
    return Object.values(this.ACCEPTED_VALUES).includes(value)
  }
}
