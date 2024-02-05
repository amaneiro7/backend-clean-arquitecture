import { type Repository } from '../../../../Shared/domain/Repository'
import { Criteria } from '../../../../Shared/domain/criteria/Criteria'
import { type Filters } from '../../../../Shared/domain/criteria/Filters'
import { type DevicePrimitives } from '../../domain/Device'
import { type SearchDeviceByCriteriaQuery } from './SearchDeviceByCriteriaQuery'

export class SearchAllDevices {
  constructor (private readonly repository: Repository) {}

  async search (query: SearchDeviceByCriteriaQuery): Promise<DevicePrimitives[]> {
    const { filters, order, limit, offset } = query
    const criteria = new Criteria(filters as Filters, order, limit, offset)
    return await this.repository.device.searchAll()
  }
}
