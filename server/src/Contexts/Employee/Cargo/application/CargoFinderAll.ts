import { type Repository } from '../../../Shared/domain/Repository'
import { type CargoPrimitives } from '../domain/Cargo'

export class SearchAllCargo {
  constructor (private readonly repository: Repository) {}

  async search (): Promise<CargoPrimitives[]> {
    return await this.repository.cargo.searchAll()
  }
}
