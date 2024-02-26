import { type Repository } from '../../../Shared/domain/Repository'
import { type TypeOfSitePrimitives } from '../domain/TypeOfSite'

export class SearchAllTypeOfSite {
  constructor (private readonly repository: Repository) {}

  async search (): Promise<TypeOfSitePrimitives[]> {
    return await this.repository.typeOfSite.searchAll()
  }
}
