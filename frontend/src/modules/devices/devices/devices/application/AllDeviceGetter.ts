import { type QueryParams } from '../../../../shared/domain/UrlParams/QueryParams'
import { type Repository } from '../../../../shared/domain/repository'
import { type DevicePrimitives } from '../domain/Device'

export class AllDeviceGetter {
  constructor (private readonly repository: Repository) {}
  async get (query: QueryParams): Promise<DevicePrimitives[]> {
    return await this.repository.device.getAll(query)
  }
}
