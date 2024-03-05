import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject'

export class UserEmail extends StringValueObject {
  private readonly validEmailRegExp =
    /^(?=.*[@](?:bnc\.com\.ve|banconacionaldecredito\.com\.ve)$)[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[a-zA-Z0-9_-]*$/

  constructor (readonly value: string) {
    super(value)

    this.ensureIsValidEmail(value)
  }

  toPrimitives (): string {
    return this.value
  }

  private ensureIsValidEmail (value: string): void {
    if (!this.isValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid email`)
    }
  }

  private isValid (name: string): boolean {
    return this.validEmailRegExp.test(name)
  }
}
