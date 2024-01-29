import { type OperatingSystemArqPrimitives } from '../../domain/OperatingSystemArq'
import { type OperatingSystemArqRepository } from '../../domain/OperatingSystemArqRepository'
import { OperatingSystemArqModel } from './OperatingSystemArqSchema'

export class SequelizeOperatingSystemArqRepository implements OperatingSystemArqRepository {
  async searchAll (): Promise<OperatingSystemArqPrimitives[]> {
    return await OperatingSystemArqModel.findAll()
  }

  async searchById (id: number): Promise<OperatingSystemArqPrimitives | null> {
    return await OperatingSystemArqModel.findByPk(id) ?? null
  }
}
