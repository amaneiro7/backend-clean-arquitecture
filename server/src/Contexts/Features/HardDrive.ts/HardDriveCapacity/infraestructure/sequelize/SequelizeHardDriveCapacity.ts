import { type HardDriveCapacityPrimitives } from '../../domain/HardDriveCapacity'
import { type HardDriveCapacityRepository } from '../../domain/HardDriveCapacityRepository'
import { HardDriveCapacityModel } from './HardDriveCapacitySchema'

export class SequelizeHardDriveCapacityRepository implements HardDriveCapacityRepository {
  async searchAll (): Promise<HardDriveCapacityPrimitives[]> {
    return await HardDriveCapacityModel.findAll()
  }

  async searchById (id: number): Promise<HardDriveCapacityPrimitives | null> {
    return await HardDriveCapacityModel.findByPk(id) ?? null
  }
}
