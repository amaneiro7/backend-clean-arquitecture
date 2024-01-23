import { AcceptedNullValueObject } from '../../Shared/domain/value-object/AcceptedNullValueObjects'
import { InvalidArgumentError } from '../../Shared/domain/value-object/InvalidArgumentError'

export class DeviceSerial extends AcceptedNullValueObject<string> {
  private readonly NAME_MAX_LENGTH = 100
  private readonly NAME_MIN_LENGTH = 2

  constructor (readonly value: string | null) {
    super(value)

    this.ensureIsValidSerial(value)
  }

  toPrimitives (): string | null {
    return this.value
  }

  private ensureIsValidSerial (value: string | null): void {
    if (this.isDeviceSerialValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid name`)
    }
  }

  private isDeviceSerialValid (name: string | null): boolean {
    if (name === null) return false
    return name.length <= this.NAME_MIN_LENGTH && name.length >= this.NAME_MAX_LENGTH
  }
}
