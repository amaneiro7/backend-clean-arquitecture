import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type MemoryRamTypePrimitives } from '../../domain/MemoryRamType'
import { type MemoryRamTypeId } from '../../domain/MemoryRamTypeId'
import { type MemoryRamTypeRepository } from '../../domain/MemoryRamTypeRepository'
import { MemoryRamTypeModel } from './MemoryRamTypeSchema'

export class SequelizeMemoryRamTypeRepository implements MemoryRamTypeRepository {
  async searchAll (): Promise<MemoryRamTypePrimitives[]> {
    return await MemoryRamTypeModel.findAll()
  }

  async searchById (id: Primitives<MemoryRamTypeId>): Promise<MemoryRamTypePrimitives | null> {
    return await MemoryRamTypeModel.findByPk(id) ?? null
  }
}
