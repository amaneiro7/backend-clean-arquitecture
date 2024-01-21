import { EnumValueObject } from '../../../Shared/domain/EnumValueObject'
import { InvalidArgumentError } from '../../../Shared/domain/InvalidArgumentError'

export enum ComputerTypes {
  DESKTOP = 'Desktop',
  ALLINONE = 'All in One',
  LAPTOP = 'Laptop',
}

export class ComputerType extends EnumValueObject<ComputerTypes> {
  constructor (value: ComputerTypes) {
    super(value, Object.values(ComputerTypes))
  }

  static fromValue (value: string): ComputerType {
    for (const computerTypeValue of Object.values(ComputerTypes)) {
      if (value === computerTypeValue.toString()) {
        return new ComputerType(computerTypeValue)
      }
    }

    throw new InvalidArgumentError(`The status type ${value} is invalid`)
  }

  static toPrimitive (): ComputerTypes[] {
    return Object.values(ComputerTypes)
  }

  protected throwErrorForInvalidValue (value: ComputerTypes): void {
    throw new InvalidArgumentError(`The computer type ${value} is invalid`)
  }
}
