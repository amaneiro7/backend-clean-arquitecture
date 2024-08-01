import { type Repository } from '../../../Shared/domain/Repository'
import { type RolePrimitives } from '../domain/Role'
import { RoleId } from '../domain/RoleId'

export class SearchAllRole {
  constructor(private readonly repository: Repository) { }

  async search(): Promise<RolePrimitives[]> {
    const data = await this.repository.role.searchAll()
    const dataWithoutAdmin = data.filter(elem => elem.id !== RoleId.Options.ADMIN)
    return dataWithoutAdmin
  }
}
