import { EnumValueObject } from '../../Shared/domain/EnumValueObject'
import { InvalidArgumentError } from '../../Shared/domain/InvalidArgumentError'

export enum StatusTypes {
  GOOD = 'Operativo',
  BAD = 'Dañado'
}

export class StatusType extends EnumValueObject<StatusTypes> {
  constructor (value: StatusTypes) {
    super(value, Object.values(StatusTypes))
  }

  static fromValue (value: string): StatusType {
    for (const statusTypeValue of Object.values(StatusTypes)) {
      if (value === statusTypeValue.toString()) {
        return new StatusType(statusTypeValue)
      }
    }

    throw new InvalidArgumentError(`The status type ${value} is invalid`)
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
