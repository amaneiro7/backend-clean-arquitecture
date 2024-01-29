import { type HardDriveTypePrimitives } from '../../domain/HardDriveType'
import { type HardDriveTypeRepository } from '../../domain/HardDriveTypeRepository'
import { HardDriveTypeModel } from './HardDriveTypeSchema'

export class SequelizeHardDriveTypeRepository implements HardDriveTypeRepository {
  async searchAll (): Promise<HardDriveTypePrimitives[]> {
    return await HardDriveTypeModel.findAll()
  }

  async searchById (id: string): Promise<HardDriveTypePrimitives | null> {
    return await HardDriveTypeModel.findByPk(id) ?? null
  }
}
