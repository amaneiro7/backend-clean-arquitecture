import { type MemoryRamCapacityPrimitives } from './MemoryRamCapacity'

export abstract class MemoryRamCapacityRepository {
  abstract searchAll (): Promise<MemoryRamCapacityPrimitives[]>

  abstract searchById (id: number): Promise<MemoryRamCapacityPrimitives | null>
}
