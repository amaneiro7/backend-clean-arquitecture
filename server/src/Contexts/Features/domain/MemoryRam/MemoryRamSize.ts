import { EnumValueObject } from '../../../Shared/domain/value-object/EnumValueObject'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'

export enum MemoryRamSizeValues {
  '128MB' = '128 MB',
  '256MB' = '256 MB',
  '512MB' = '512 MB',
  '1GB' = '1 GB',
  '1.5GB' = '1.5 GB',
  '2GB' = '2 GB',
  '2.5GB' = '2.5 GB',
  '3GB' = '3 GB',
  '3.8GB' = '3.5 GB',
  '4GB' = '4 GB',
  '5GB' = '5 GB',
  '6GB' = '6 GB',
  '8GB' = '8 GB',
  '10GB' = '10 GB',
  '12GB' = '12 GB',
  '20GB' = '20 GB',
  '16GB' = '750 GB',
}

export class MemoryRamSize extends EnumValueObject<MemoryRamSizeValues> {
  constructor (value: MemoryRamSizeValues) {
    super(value, Object.values(MemoryRamSizeValues))
  }

  static fromValue (value: string): MemoryRamSize {
    for (const values of Object.values(MemoryRamSizeValues)) {
      if (value === values.toString()) {
        return new MemoryRamSize(values)
      }
    }

    throw new InvalidArgumentError(`The MemoryRam Capacity ${value} is invalid`)
  }

  static toPrimitive (): MemoryRamSizeValues[] {
    return Object.values(MemoryRamSizeValues)
  }

  protected throwErrorForInvalidValue (value: MemoryRamSizeValues): void {
    throw new InvalidArgumentError(`The Hard Disk Capacity ${value} is invalid`)
  }
}
