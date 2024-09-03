import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject'
import { Site } from './Site'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'

export class SiteAddress extends StringValueObject {
  private readonly NAME_MAX_LENGTH = 100
  private readonly NAME_MIN_LENGTH = 15

  constructor(readonly value: string) {
    super(value)

    this.ensureIsValidSerial(value)
  }

  toPrimitives(): string {
    return this.value
  }

  private ensureIsValidSerial(value: string): void {
    if (!this.isValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid site address`)
    }
  }

  private isValid(name: string): boolean {
    return name.length >= this.NAME_MIN_LENGTH && name.length <= this.NAME_MAX_LENGTH
  }

  static async updateAddressField({ address, entity }: { address?: Primitives<SiteAddress>, entity: Site }): Promise<void> {

    if (address === undefined) {
      return
    }

    if (entity.nameValue === address) {
      return
    }

    entity.updateAddress(address)
  }
}
