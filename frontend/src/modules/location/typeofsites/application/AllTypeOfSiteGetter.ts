import { type Repository } from '../../../shared/domain/repository'
import { type TypeOfSitePrimitives } from '../domain/typeOfSite'
export class AllTypeOfSiteGetter {
  constructor (private readonly repository: Repository) {}

  async get (): Promise<TypeOfSitePrimitives[]> {
    return await this.repository.typeOfSite.getAll()
  }
}
