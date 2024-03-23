import { type Repository } from '../../../shared/domain/repository'
import { type CargoPrimitives } from '../domain/cargo'

export class AllCargoGetter {
  constructor (private readonly repository: Repository) {}

  async get (): Promise<CargoPrimitives[]> {
    return await this.repository.cargo.getAll()
  }
}
