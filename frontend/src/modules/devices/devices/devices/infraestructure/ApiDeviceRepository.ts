import { type Criteria } from '../../../../shared/domain/criteria/Criteria'
import { type DevicesApiResponse } from '../../../../shared/domain/types/responseTypes'
import { makeRequest } from '../../../../shared/infraestructure/fetching'
import { type DevicePrimitives, type Device } from '../domain/Device'
import { type DeviceId } from '../domain/DeviceId'
import { type DeviceRepository } from '../domain/DeviceRepository'

export class ApiDeviceRepository implements DeviceRepository {
  private readonly endpoint: string = 'devices'
  async save ({ device }: { device: Device }): Promise<void> {
    await makeRequest({ method: 'POST', endpoint: this.endpoint, data: device.toPrimitives() })
  }

  async update ({ id, device }: { id: DeviceId, device: Device }): Promise<void> {
    await makeRequest({ method: 'PATCH', endpoint: `${this.endpoint}/${id.value}`, data: device.toPrimitives() })
  }

  async getByCriteria (criteria: Criteria): Promise<DevicePrimitives[]> {
    const criteriaPrimitives = criteria.toPrimitives()

    const filters = criteriaPrimitives.filters.length > 0 && criteriaPrimitives.filters.map(
      (filter, index) => {
        const { field, operator, value } = filter.toPrimitives()
        return `filters[${index}][field]=${field}&filters[${index}][operator]=${operator}&filters[${index}][value]=${value}`
      }
    )
    const paramsLimitAndOffset = criteriaPrimitives.limit ? `limit=${criteriaPrimitives.limit}&offset=${criteriaPrimitives.offset}` : undefined
    const paramsOrder = criteriaPrimitives.orderBy ? `orderBy=${criteriaPrimitives.orderBy}&orderType=${criteriaPrimitives.orderType}` : undefined
    const paramsFilters = filters ? `${filters.join('&')}` : undefined
    const queryParams = [paramsFilters, paramsLimitAndOffset, paramsOrder].join('&')
    return await makeRequest<DevicesApiResponse[]>({ method: 'GET', endpoint: `${this.endpoint}?${queryParams}` })      
  }

  async getAll (): Promise<DevicePrimitives[]> {
    return await makeRequest<DevicesApiResponse[]>({ method: 'GET', endpoint: this.endpoint })      
  }

  async getById ({ id }: { id: DeviceId }): Promise<DevicePrimitives> {    
    return await makeRequest<DevicesApiResponse>({ method: 'GET', endpoint: `${this.endpoint}/${id.value}` })
  }
}
