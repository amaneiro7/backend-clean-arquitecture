import { type OperatingSystemPrimitives } from '../../domain/OperatingSystem'
import { type OperatingSystemRepository } from '../../domain/OperatingSystemRepository'
import { OperatingSystemModel } from './OperatingSystemSchema'

export class SequelizeOperatingSystemRepository implements OperatingSystemRepository {
  async searchAll (): Promise<OperatingSystemPrimitives[]> {
    return await OperatingSystemModel.findAll()
  }

  async searchById (id: number): Promise<OperatingSystemPrimitives | null> {
    return await OperatingSystemModel.findByPk(id) ?? null
  }
}
