import { type Repository } from '../../../shared/domain/repository'
import { type RolePrimitives } from '../domain/Role'

export class AllRoleGetter {
  constructor (private readonly repository: Repository) {}

  async get (): Promise<RolePrimitives[]> {
    return await this.repository.role.getAll()
  }
}
