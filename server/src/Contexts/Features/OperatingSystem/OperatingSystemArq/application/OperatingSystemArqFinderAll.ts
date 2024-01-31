import { type Repository } from '../../../../Shared/domain/Repository'
import { type OperatingSystemArqPrimitives } from '../domain/OperatingSystemArq'

export class SearchAllOperatingSystemArq {
  constructor (private readonly repository: Repository) {}

  async search (): Promise<OperatingSystemArqPrimitives[]> {
    return await this.repository.operatingSystemArq.searchAll()
  }
}
