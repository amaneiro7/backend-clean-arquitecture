import { MemoryRamCapacityId } from './MemoryRamCapacityId'
import { MemoryRamCapacityValue } from './MemoryRamCapacityValue'

export interface MemoryRamCapacityPrimitives {
  id: number
  value: number
}

export class MemoryRamCapacity {
  constructor (
    private readonly id: MemoryRamCapacityId,
    private readonly value: MemoryRamCapacityValue
  ) {}

  static fromPrimitives (primitives: MemoryRamCapacityPrimitives): MemoryRamCapacity {
    return new MemoryRamCapacity(
      new MemoryRamCapacityId(primitives.id),
      new MemoryRamCapacityValue(primitives.value)
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
