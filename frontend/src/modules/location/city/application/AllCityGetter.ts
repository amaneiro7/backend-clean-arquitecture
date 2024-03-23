import { type Repository } from '../../../shared/domain/repository'
import { type CityPrimitives } from '../domain/city'
export class AllCityGetter {
  constructor (private readonly repository: Repository) {}

  async get (): Promise<CityPrimitives[]> {
    return await this.repository.city.getAll()
  }
}
