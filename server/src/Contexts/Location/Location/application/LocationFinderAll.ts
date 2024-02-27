import { type Repository } from '../../../Shared/domain/Repository'
import { type LocationPrimitives } from '../domain/Location'

export class SearchAllLocation {
  constructor (private readonly repository: Repository) {}

  async search (): Promise<LocationPrimitives[]> {
    return await this.repository.location.searchAll()
  }
}
