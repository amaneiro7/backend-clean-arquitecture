import { type StatusPrimitives } from '../../domain/Status'
import { type StatusRepository } from '../../domain/StatusRepository'
import { StatusModel } from './StatusSchema'

export class SequelizeStatusRepository implements StatusRepository {
  async searchAll (): Promise<StatusPrimitives[]> {
    return await StatusModel.findAll()
  }

  async searchById (id: number): Promise<StatusPrimitives | null> {
    return await StatusModel.findByPk(id) ?? null
  }
}
