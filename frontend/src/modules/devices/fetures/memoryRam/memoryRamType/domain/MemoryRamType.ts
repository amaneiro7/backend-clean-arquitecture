import { type MemoryRamTypeId } from './MemoryRamTypeId'
import { type MemoryRamTypeName } from './MemoryRamTypeName'

export interface MemoryRamTypePrimitives {
  id: number
  name: string
}

export class MemoryRamType {
  constructor (
    private readonly id: MemoryRamTypeId,
    private readonly name: MemoryRamTypeName
  ) {}

  idValue (): number {
    return this.id.value
  }

  nameValue (): string {
    return this.name.value
  }

  toPrimitives (): MemoryRamTypePrimitives {
    return {
      id: this.idValue(),
      name: this.nameValue()
    }
  }
}
