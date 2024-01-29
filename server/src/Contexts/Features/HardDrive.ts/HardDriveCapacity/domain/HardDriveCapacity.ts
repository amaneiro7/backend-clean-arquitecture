import { HardDriveCapacityId } from './HardDriveCapacityId'
import { HardDriveCapacityValue } from './HardDriveCapacityValue'

export interface HardDriveCapacityPrimitives {
  id: number
  value: number
}

export class HardDriveCapacity {
  constructor (
    private readonly id: HardDriveCapacityId,
    private readonly value: HardDriveCapacityValue
  ) {}

  static fromPrimitives (primitives: HardDriveCapacityPrimitives): HardDriveCapacity {
    return new HardDriveCapacity(
      new HardDriveCapacityId(primitives.id),
      new HardDriveCapacityValue(primitives.value)
    )
  }

  toPrimitive (): any {
    return {
      id: this.id.value,
      value: this.value.value
    }
  }

  get idValue (): number {
    return this.id.value
  }

  get valueValue (): number {
    return this.value.value
  }
}
