import { DeviceStatus } from '../../../Device/Device/domain/DeviceStatus'
import { AcceptedNullValueObject } from '../../../Shared/domain/value-object/AcceptedNullValueObjects'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { type DeviceComputer } from './Computer'

// Define a class IPAddress that extends the StringValueObject class
export class IPAddress extends AcceptedNullValueObject<string> {
  // Define a private regular expression for IP address validation
  private readonly IPADRRESS_VALIDATION = /^([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])){3}$/

  // Constructor that takes a value and ensures it is a valid IP address
  constructor (
    readonly value: string | null,
    private readonly status: Primitives<DeviceStatus>
  ) {
    super(value) // Call the constructor of the parent class
    this.ensureIsStatusIsInUseIPAddressIsRequired(this.status, this.value)
    this.ensureIsValid(value) // Ensure the provided value is a valid IP address
  }

  // Return the value as a primitive string
  toPrimitives (): string | null {
    return this.value
  }

  // Private method to ensure the provided value is a valid IP address
  private ensureIsValid (value: string | null): void {
    if (!this.isValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid IP Address`) // Throw an error if the value is not a valid IP address
    }
  }

  private ensureIsStatusIsInUseIPAddressIsRequired (status: Primitives<DeviceStatus>, ipAddress: Primitives<IPAddress>): void {
    if (status === DeviceStatus.StatusOptions.INUSE && ipAddress === null) {
      throw new InvalidArgumentError('IP Address is required when status is in use') // Throw an error if IP Address is null when computer status is in use
    }
  }

  // Private method to check if the provided value is a valid IP address using the defined regular expression
  private isValid (name: string | null): boolean {
    if (name === null) return false
    return this.IPADRRESS_VALIDATION.test(name)
  }

  static async updateIPAddressField ({ ipAddress, entity }: { ipAddress?: Primitives<IPAddress>, entity: DeviceComputer }): Promise<void> {
    // Si no se ha pasado un nuevo valor de dirección IP no realiza ninguna acción
    if (ipAddress === undefined) {
      return
    }
    // Verifica que si el valor del campo dirección IP actual y el nuevo valor dirección IP son iguales no realiza un cambio
    if (entity.ipAddressValue === ipAddress) {
      return
    }
    // Actualiza el campo dirección IP de la entidad {@link Device} con el nuevo dirección IP
    const status = entity.statusValue
    entity.updateIPAddress(ipAddress, status)
  }
}
