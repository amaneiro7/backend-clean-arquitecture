import { type Repository } from '../../../../../shared/domain/repository'
import { type OperatingSystemPrimitives } from '../domain/OperatingSystem'

export class AllOperatingSystemGetter {
  constructor (readonly repository: Repository) {}

  async get (): Promise<OperatingSystemPrimitives[]> {
    return await this.repository.operatingSystem.getAll()
  }
}
