import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject'

export class MACAddress extends StringValueObject {
  private readonly MACADRRESS_VALIDATION = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/

  constructor (readonly value: string) {
    super(value)

    this.ensureIsValidName(value)
  }

  toPrimitives (): string {
    return this.value
  }

  private ensureIsValidName (value: string): void {
    if (this.isProcessorNameValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid MACAdress`)
    }
  }

  private isProcessorNameValid (name: string): boolean {
    return this.MACADRRESS_VALIDATION.test(name)
  }
}
