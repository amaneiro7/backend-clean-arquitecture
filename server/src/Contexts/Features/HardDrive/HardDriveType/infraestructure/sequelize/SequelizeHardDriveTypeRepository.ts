import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type HardDriveTypePrimitives } from '../../domain/HardDriveType'
import { type HardDriveTypeId } from '../../domain/HardDriveTypeId'
import { type HardDriveTypeRepository } from '../../domain/HardDriveTypeRepository'
import { HardDriveTypeModel } from './HardDriveTypeSchema'

export class SequelizeHardDriveTypeRepository implements HardDriveTypeRepository {
  async searchAll (): Promise<HardDriveTypePrimitives[]> {
    return await HardDriveTypeModel.findAll()
  }

  async searchById (id: Primitives<HardDriveTypeId>): Promise<HardDriveTypePrimitives | null> {
    return await HardDriveTypeModel.findByPk(id) ?? null
  }
}
