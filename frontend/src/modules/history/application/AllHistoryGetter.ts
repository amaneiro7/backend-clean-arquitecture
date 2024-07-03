import { type StatePrimitives } from '../domain/history'
import { StateRepository } from '../domain/HistoryRepository'
export class AllStateGetter {
  constructor(private readonly repository: StateRepository) { }

  async get(): Promise<StatePrimitives[]> {
    return await this.repository.getAll()
  }
}
