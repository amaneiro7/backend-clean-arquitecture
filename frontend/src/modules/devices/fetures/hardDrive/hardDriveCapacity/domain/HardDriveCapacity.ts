import { type HardDriveCapacityId } from './HardDriveCapacityId'
import { type HardDriveCapacityValues } from './HardDriveCapacityName'

export interface HardDriveCapacityPrimitives {
  id: number
  name: number
}

export class HardDriveCapacity {
  constructor (
    private readonly id: HardDriveCapacityId,
    private readonly name: HardDriveCapacityValues
  ) {}

  idValue (): number {
    return this.id.value
  }

  nameValue (): number {
    return this.name.value
  }

  toPrimitives (): HardDriveCapacityPrimitives {
    return {
      id: this.idValue(),
      name: this.nameValue()
    }
  }
}
