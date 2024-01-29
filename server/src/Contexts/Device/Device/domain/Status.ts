import { EnumValueObject } from '../../../Shared/domain/value-object/EnumValueObject'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'

export enum StatusTypes {
  GOOD = 'Operativo',
  BAD = 'Dañado'
}

export class Status extends EnumValueObject<StatusTypes> {
  constructor (value: StatusTypes) {
    super(value, Object.values(StatusTypes))
  }

  static fromValue (value: string): Status {
    for (const statusTypeValue of Object.values(StatusTypes)) {
      if (value === statusTypeValue.toString()) {
        return new Status(statusTypeValue)
      }
    }

    throw new InvalidArgumentError(`The status type ${value} is invalid`)
  }

  static toPrimitive (): StatusTypes[] {
    return Object.values(StatusTypes)
  }

  public isGood (): boolean {
    return this.value === StatusTypes.GOOD
  }

  public isBad (): boolean {
    return this.value === StatusTypes.BAD
  }

  protected throwErrorForInvalidValue (value: StatusTypes): void {
    throw new InvalidArgumentError(`The status type ${value} is invalid`)
  }
}
