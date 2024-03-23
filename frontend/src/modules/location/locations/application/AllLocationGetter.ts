import { type Repository } from '../../../shared/domain/repository'
import { type LocationPrimitives } from '../domain/location'

export class AllLocationGetter {
  constructor (private readonly repository: Repository) {}

  async get (): Promise<LocationPrimitives[]> {
    return await this.repository.location.getAll()
  }
}
