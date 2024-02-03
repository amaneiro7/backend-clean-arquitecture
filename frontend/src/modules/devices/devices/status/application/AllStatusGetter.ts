import { type Repository } from '../../../../shared/domain/repository'
import { type StatusPrimitives } from '../domain/Status'

export class AllStatusGetter {
  constructor (private readonly repository: Repository) {}

  async get (): Promise<StatusPrimitives[]> {
    return await this.repository.status.getAll()
  }
}
