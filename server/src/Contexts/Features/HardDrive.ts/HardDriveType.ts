import { EnumValueObject } from '../../../Shared/domain/value-object/EnumValueObject'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'

export enum HardDriveTypes {
  HDD = 'HDD (Hard Disk Drive)',
  SSD = 'SSD (Solid State Drive',
  SSHD = 'SSHD (Solid State Hybrid Drive)',
  SAS = 'SAS (Serial Attached SCSI)',
  'M.2' = 'M.2',
  SD = 'SD (Secure Digital',
}

export class HardDriveType extends EnumValueObject<HardDriveTypes> {
  constructor (value: HardDriveTypes) {
    super(value, Object.values(HardDriveTypes))
  }

  static fromValue (value: string): HardDriveType {
    for (const values of Object.values(HardDriveTypes)) {
      if (value === values.toString()) {
        return new HardDriveType(values)
      }
    }

    throw new InvalidArgumentError(`The Hard Disk  ${value} is invalid`)
  }

  static toPrimitive (): HardDriveTypes[] {
    return Object.values(HardDriveTypes)
  }

  protected throwErrorForInvalidValue (value: HardDriveTypes): void {
    throw new InvalidArgumentError(`The Hard Disk  ${value} is invalid`)
  }
}
