import type QueryString from 'qs'
import { type Repository } from '../../../Shared/domain/Repository'
import { type DevicePrimitives } from '../domain/Device'

export class SearchAllDevices {
  constructor (private readonly repository: Repository) {}

  async search (query: QueryString.ParsedQs): Promise<DevicePrimitives[]> {
    return await this.repository.device.searchAll(query)
  }
}
