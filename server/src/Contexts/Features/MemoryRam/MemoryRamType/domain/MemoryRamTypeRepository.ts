import { Primitives } from '../../../../Shared/domain/value-object/Primitives';
import { type MemoryRamTypePrimitives } from './MemoryRamType'
import { MemoryRamTypeId } from './MemoryRamTypeId';

export abstract class MemoryRamTypeRepository {
  abstract searchAll (): Promise<MemoryRamTypePrimitives[]>

  abstract searchById (id: Primitives<MemoryRamTypeId>): Promise<MemoryRamTypePrimitives | null>
}
