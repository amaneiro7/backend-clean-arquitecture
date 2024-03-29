import { type Query } from '../../../../shared/domain/criteria/Query'
import { type Repository } from '../../../../shared/domain/repository'
import { type DevicePrimitives } from '../domain/Device'

export class DeviceGetterByCriteria {
  constructor (private readonly repository: Repository) {}
  async get (query: Query): Promise<DevicePrimitives[]> {
    return await this.repository.device.getByCriteria(query)
  }
}
