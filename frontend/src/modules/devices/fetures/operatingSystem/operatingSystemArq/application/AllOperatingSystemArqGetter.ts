import { type Repository } from '../../../../../shared/domain/repository'
import { type OperatingSystemArqPrimitives } from '../domain/OperatingSystemArq'

export class AllOperatingSystemArqGetter {
  constructor (readonly repository: Repository) {}

  async get (): Promise<OperatingSystemArqPrimitives[]> {
    return await this.repository.operatingSystem.getAll()
  }
}
