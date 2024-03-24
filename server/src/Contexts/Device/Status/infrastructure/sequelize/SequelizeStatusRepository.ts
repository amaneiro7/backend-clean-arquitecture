import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type StatusPrimitives } from '../../domain/Status'
import { type StatusId } from '../../domain/StatusId'
import { type StatusRepository } from '../../domain/StatusRepository'
import { StatusModel } from './StatusSchema'

export class SequelizeStatusRepository implements StatusRepository {
  async searchAll (): Promise<StatusPrimitives[]> {
    return await StatusModel.findAll()
  }

  async searchById (id: Primitives<StatusId>): Promise<StatusPrimitives | null> {
    return await StatusModel.findByPk(id) ?? null
  }
}
