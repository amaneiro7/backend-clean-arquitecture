import { type Repository } from '../../../Shared/domain/Repository'
import { type CityPrimitives } from '../domain/City'

export class SearchAllCity {
  constructor (private readonly repository: Repository) {}

  async search (): Promise<CityPrimitives[]> {
    return await this.repository.city.searchAll()
  }
}
