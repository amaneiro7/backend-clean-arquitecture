import { EnumValueObject } from '../../../Shared/domain/value-object/EnumValueObject'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'

export enum ComputerOSTypes {
  WINDOWSXP = 'Windows XP',
  WINDOWS7 = 'Windows 7',
  WINDOWS8 = 'Windows 8',
  WINDOWS10 = 'Windows 10',
  WINDOWS11 = 'Windows 11',
  WINDOWSSERVER2008 = 'Windows Server 2008',
  WINDOWSSERVER2012 = 'Windows Server 2012',
  WINDOWSSERVER2016 = 'Windows Server 2016',
  MACOS = 'MAC OS',
  UBUNTU = 'Ubuntu',
  LINUX = 'Linux',
}

export class ComputerOSType extends EnumValueObject<ComputerOSTypes> {
  constructor (value: ComputerOSTypes) {
    super(value, Object.values(ComputerOSTypes))
  }

  static fromValue (value: string): ComputerOSType {
    for (const values of Object.values(ComputerOSTypes)) {
      if (value === values.toString()) {
        return new ComputerOSType(values)
      }
    }

    throw new InvalidArgumentError(`The status type ${value} is invalid`)
  }

  static toPrimitive (): ComputerOSTypes[] {
    return Object.values(ComputerOSTypes)
  }

  protected throwErrorForInvalidValue (value: ComputerOSTypes): void {
    throw new InvalidArgumentError(`The computer type ${value} is invalid`)
  }
}
