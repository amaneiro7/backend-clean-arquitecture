import { type MemoryRamCapacityPrimitives } from '../../domain/MemoryRamCapacity'
import { type MemoryRamCapacityRepository } from '../../domain/MemoryRamCapacityRepository'
import { MemoryRamCapacityModel } from './MemoryRamCapacitySchema'

export class SequelizeMemoryRamCapacityRepository implements MemoryRamCapacityRepository {
  async searchAll (): Promise<MemoryRamCapacityPrimitives[]> {
    return await MemoryRamCapacityModel.findAll()
  }

  async searchById (id: number): Promise<MemoryRamCapacityPrimitives | null> {
    return await MemoryRamCapacityModel.findByPk(id) ?? null
  }
}
