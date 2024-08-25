import { type Repository } from '../../../../Shared/domain/Repository'
import { type HardDriveTypePrimitives } from '../domain/HardDriveType'

export class SearchAllHardDriveType {
  constructor (private readonly repository: Repository) {}

  async search (): Promise<HardDriveTypePrimitives[]> {
    return await this.repository.hardDriveType.searchAll()
  }
}
