import { MemoryRamTypeId } from './MemoryRamTypeId'
import { MemoryRamTypeName } from './MemoryRamTypeName'

export interface MemoryRamTypePrimitives {
  id: number
  name: string
}

export class MemoryRamType {
  constructor (
    private readonly id: MemoryRamTypeId,
    private readonly name: MemoryRamTypeName
  ) {}

  static fromPrimitives (primitives: MemoryRamTypePrimitives): MemoryRamType {
    return new MemoryRamType(
      new MemoryRamTypeId(primitives.id),
      new MemoryRamTypeName(primitives.name)
    )
  }

  toPrimitive (): any {
    return {
      id: this.id.value,
      name: this.name.value
    }
  }

  get idValue (): number {
    return this.id.value
  }

  get nameValue (): string {
    return this.name.value
  }
}
