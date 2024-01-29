import { type MemoryRamTypePrimitives } from '../../domain/MemoryRamType'
import { type MemoryRamTypeRepository } from '../../domain/MemoryRamTypeRepository'
import { MemoryRamTypeModel } from './MemoryRamTypeSchema'

export class SequelizeMemoryRamTypeRepository implements MemoryRamTypeRepository {
  async searchAll (): Promise<MemoryRamTypePrimitives[]> {
    return await MemoryRamTypeModel.findAll()
  }

  async searchById (id: number): Promise<MemoryRamTypePrimitives | null> {
    return await MemoryRamTypeModel.findByPk(id) ?? null
  }
}
