import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject'

// Define a class for representing a Venezuela Region as a value object
export class RegionName extends StringValueObject {
  // Define a constant map of accepted Region names
  private readonly ACCEPTED_VALUES: Record<string, string> = {
    CAPITAL: 'Capital',
    CENTRAL: 'Central',
    CENTROCCIDENTAL: 'Centroccidental',
    GUAYANA: 'Guayana',
    INSULAR: 'Insular',
    LOSANDES: 'Los Andes',
    LOSLLANOS: 'Los Llanos',
    ORIENTAL: 'Oriental',
    OCCIDENTE: 'Occidente'
  }

  constructor (readonly value: string) {
    super(value)
    // Ensure the validity of the Region
    this.ensureIsValidName(value)
  }

  // Convert to its primitive representation
  toPrimitives (): string {
    return this.value
  }

  // Ensure the validity of the name
  private ensureIsValidName (value: string): void {
    if (this.isValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid Region`)
    }
  }

  // Check if the Operating System Version value is valid
  private isValid (value: string): boolean {
    // Check if the value is in the accepted values
    return Object.values(this.ACCEPTED_VALUES).includes(value)
  }
}
