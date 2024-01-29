import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject'

export class IPAddress extends StringValueObject {
  private readonly IPADRRESS_VALIDATION = /^([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])){3}$/

  constructor (readonly value: string) {
    super(value)

    this.ensureIsValidName(value)
  }

  toPrimitives (): string {
    return this.value
  }

  private ensureIsValidName (value: string): void {
    if (this.isProcessorNameValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid IPAdress`)
    }
  }

  private isProcessorNameValid (name: string): boolean {
    return this.IPADRRESS_VALIDATION.test(name)
  }
}
