import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject'

// Define a class for representing a Venezuela States as a value object
export class StateName extends StringValueObject {
  // Define a constant map of accepted states names
  private readonly ACCEPTED_VALUES: Record<string, string> = {
    AMAZONAS: 'Amazonas',
    ANZOÁTEGUI: 'Anzoátegui',
    APURE: 'Apure',
    ARAGUA: 'Aragua',
    BARINAS: 'Barinas',
    BOLÍVAR: 'Bolívar',
    CARABOBO: 'Carabobo',
    COJEDES: 'Cojedes',
    DELTAAMACURO: 'Delta Amacuro',
    FALCÓN: 'Falcón',
    GUÁRICO: 'Guárico',
    LARA: 'Lara',
    MÉRIDA: 'Mérida',
    MIRANDA: 'Miranda',
    MONAGAS: 'Monagas',
    NUEVAESPARTA: 'Nueva Esparta',
    PORTUGUESA: 'Portuguesa',
    SUCRE: 'Sucre',
    TÁCHIRA: 'Táchira',
    TRUJILLO: 'Trujillo',
    VARGAS: 'Vargas',
    YARACUY: 'Yaracuy',
    ZULIA: 'Zulia'
  }

  constructor (readonly value: string) {
    super(value)
    // Ensure the validity of the State
    this.ensureIsValidName(value)
  }

  // Convert to its primitive representation
  toPrimitives (): string {
    return this.value
  }

  // Ensure the validity of the name
  private ensureIsValidName (value: string): void {
    if (this.isValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid State`)
    }
  }

  // Check if the Operating System Version value is valid
  private isValid (value: string): boolean {
    // Check if the value is in the accepted values
    return Object.values(this.ACCEPTED_VALUES).includes(value)
  }
}
