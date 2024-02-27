import { InvalidArgumentError } from '../../../../Shared/domain/value-object/InvalidArgumentError'
import { StringValueObject } from '../../../../Shared/domain/value-object/StringValueObject'

export class VcePresidenciaName extends StringValueObject {
  private readonly NAME_MAX_LENGTH = 30
  private readonly NAME_MIN_LENGTH = 15

  constructor (readonly value: string) {
    super(value)

    this.ensureIsValidSerial(value)
  }

  toPrimitives (): string {
    return this.value
  }

  private ensureIsValidSerial (value: string): void {
    if (!this.isValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid VcePresidencia name`)
    }
  }

  private isValid (name: string): boolean {
    return name.length >= this.NAME_MIN_LENGTH && name.length <= this.NAME_MAX_LENGTH
  }
}
