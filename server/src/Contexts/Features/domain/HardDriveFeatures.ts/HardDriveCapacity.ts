import { EnumValueObject } from '../../../Shared/domain/value-object/EnumValueObject'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'

export enum HardDriveCapacityType {
  '40GB' = '40 GB',
  '80GB' = '80 GB',
  '120GB' = '120 GB',
  '160GB' = '160 GB',
  '250GB' = '250 GB',
  '320GB' = '320 GB',
  '500GB' = '500 GB',
  '750GB' = '750 GB',
  '1 TBB' = '1 TB',
}

export class HardDriveCapacity extends EnumValueObject<HardDriveCapacityType> {
  constructor (value: HardDriveCapacityType) {
    super(value, Object.values(HardDriveCapacityType))
  }

  static fromValue (value: string): HardDriveCapacity {
    for (const values of Object.values(HardDriveCapacityType)) {
      if (value === values.toString()) {
        return new HardDriveCapacity(values)
      }
    }

    throw new InvalidArgumentError(`The Hard Disk Capacity ${value} is invalid`)
  }

  static toPrimitive (): HardDriveCapacityType[] {
    return Object.values(HardDriveCapacityType)
  }

  protected throwErrorForInvalidValue (value: HardDriveCapacityType): void {
    throw new InvalidArgumentError(`The Hard Disk Capacity ${value} is invalid`)
  }
}
