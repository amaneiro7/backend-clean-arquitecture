import { type Repository } from '../../../shared/domain/repository'
import { type StatePrimitives } from '../domain/state'
export class AllStateGetter {
  constructor (private readonly repository: Repository) {}

  async get (): Promise<StatePrimitives[]> {
    return await this.repository.state.getAll()
  }
}
