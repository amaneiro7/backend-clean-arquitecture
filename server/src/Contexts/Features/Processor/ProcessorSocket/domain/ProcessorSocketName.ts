import { InvalidArgumentError } from '../../../../Shared/domain/value-object/InvalidArgumentError'
import { StringValueObject } from '../../../../Shared/domain/value-object/StringValueObject'

// Define a class for representing Operating System Version as a value object
export class ProcessorSocketName extends StringValueObject {
  // Define a constant map of accepted hard drive capacities
  private readonly ACCEPTED_VALUES: Record<string, string> = {
    LGA775: 'LGA 775',
    SOCKETM: 'Socket M',
    LGA771: 'LGA 771',
    SOCKETP: 'Socket P',
    SOCKET441: 'Socket 441',
    LGA1366: 'LGA 1366',
    LGA1156: 'LGA 1156'
  }

  // Constructor for the OperatingSystemName class
  constructor (readonly value: string) {
    super(value) // Call the constructor of the parent class

    // Ensure the validity of the Operating Sustem Version Type value
    this.ensureIsValidName(value)
  }

  // Convert the Operating System Version value to its primitive representation
  toPrimitives (): string {
    return this.value
  }

  // Ensure the validity of the Operating System Version value
  private ensureIsValidName (value: string): void {
    if (this.isValid(value)) {
      throw new InvalidArgumentError(`${value} is not a valid Processor Socket name`)
    }
  }

  // Check if the Operating System Version value is valid
  private isValid (value: string): boolean {
    // Check if the value is in the accepted values
    return Object.values(this.ACCEPTED_VALUES).includes(value)
  }
}
