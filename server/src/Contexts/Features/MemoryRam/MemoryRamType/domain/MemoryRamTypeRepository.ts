import { type MemoryRamTypePrimitives } from './MemoryRamType'

export abstract class MemoryRamTypeRepository {
  abstract searchAll (): Promise<MemoryRamTypePrimitives[]>

  abstract searchById (id: number): Promise<MemoryRamTypePrimitives | null>
}
