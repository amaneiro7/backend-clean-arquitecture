import { type Repository } from '../../../Shared/domain/Repository'
import { type RolePrimitives } from '../domain/Role'

export class SearchAllRole {
  constructor (private readonly repository: Repository) {}

  async search (): Promise<RolePrimitives[]> {
    return await this.repository.role.searchAll()
  }
}
