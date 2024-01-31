import { type Repository } from '../../../../Shared/domain/Repository'
import { type OperatingSystemPrimitives } from '../domain/OperatingSystem'

export class SearchAllOperatingSystem {
  constructor (private readonly repository: Repository) {}

  async search (): Promise<OperatingSystemPrimitives[]> {
    return await this.repository.operatingSystemVersion.searchAll()
  }
}
