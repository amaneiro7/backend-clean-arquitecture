import { AcceptedNullValueObject } from '../../Shared/domain/AcceptedNullValueObjects'
import { InvalidArgumentError } from '../../Shared/domain/InvalidArgumentError'

export class DeviceActivo extends AcceptedNullValueObject<string> {
  private readonly NAME_MAX_LENGTH = 100
  private readonly NAME_MIN_LENGTH = 2

  constructor (readonly value: string | null) {
    super(value)

    this.ensureIsValidActivo(value)
  }

  toPrimitives (): string | null {
    return this.value
  }

  private ensureIsValidActivo (value: string | null): void {
    if (this.isDeviceActivoValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid name`)
    }
  }

  private isDeviceActivoValid (name: string | null): boolean {
    if (name === null) return false
    return name.length <= this.NAME_MIN_LENGTH && name.length >= this.NAME_MAX_LENGTH
  }
}
