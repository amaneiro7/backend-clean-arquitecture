import { type Repository } from '../../../../Shared/domain/Repository'
import { type HardDrivePrimitives } from '../domain/HardDriveold'

export class SearchAllHardDrive {
  constructor (private readonly repository: Repository) {}

  async search (): Promise<HardDrivePrimitives[]> {
    return await this.repository.hardDrive.searchAll()
  }
}
