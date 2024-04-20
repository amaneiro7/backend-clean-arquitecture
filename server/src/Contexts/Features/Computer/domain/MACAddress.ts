import { AcceptedNullValueObject } from '../../../Shared/domain/value-object/AcceptedNullValueObjects'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { type DeviceComputer } from './Computer'

// Define a class for MACAddress that extends the StringValueObject class
export class MACAddress extends AcceptedNullValueObject<string> {
  // Define a regular expression for MAC address validation
  private readonly macAddressRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/

  // Constructor for MACAddress class
  constructor (readonly value: string | null) {
    super(value) // Call the constructor of the parent class

    // Ensure that the provided MAC address is valid
    this.ensureIsValid(value)
  }

  // Convert MAC address to its primitive value
  toPrimitives (): string | null {
    return this.value
  }

  // Ensure that the provided MAC address is a valid name
  private ensureIsValid (value: string | null): void {
    if (!this.isValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid MAC Adress`)
    }
  }

  // Check if the provided MAC address is a valid name
  private isValid (name: string | null): boolean {
    if (name === null) return true
    return this.macAddressRegex.test(name)
  }

  static async updateMACAddressField ({ macAddress, entity }: { macAddress?: Primitives<MACAddress>, entity: DeviceComputer }): Promise<void> {
    // Si no se ha pasado un nuevo valor de dirección MAC no realiza ninguna acción
    if (macAddress === undefined) {
      return
    }
    // Verifica que si el valor del campo dirección MAC actual y el nuevo valor dirección MAC son iguales no realiza un cambio
    if (entity.macAddressValue === macAddress) {
      return
    }
    // Actualiza el campo dirección MAC de la entidad {@link Device} con el nuevo dirección MAC
    entity.updateMACAddress(macAddress)
  }
}
