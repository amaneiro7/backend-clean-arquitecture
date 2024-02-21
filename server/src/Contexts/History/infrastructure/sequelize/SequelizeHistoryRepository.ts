import { type HistoryPrimitives } from '../../domain/History'
import { type HistoryRepository } from '../../domain/HistoryRepository'
import { HistoryModel } from './HistorySchema'

export class SequelizeHistoryRepository implements HistoryRepository {
  async searchAll (): Promise<HistoryPrimitives[]> {
    return await HistoryModel.findAll()
  }

  async save (payload: HistoryPrimitives): Promise<void> {
    await HistoryModel.create(payload)
  }
}
