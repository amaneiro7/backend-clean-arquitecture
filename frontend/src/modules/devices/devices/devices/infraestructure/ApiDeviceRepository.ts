import { type DevicesMappedApiResponse, type DevicesApiResponse } from '../../../../shared/domain/types/responseTypes'
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

  async getAll (): Promise<DevicePrimitives[]> {
    return await makeRequest<DevicesApiResponse[]>({ method: 'GET', endpoint: this.endpoint })
      .then(res => {
        console.log(res)
        return res
      })
      .then(res => res.map(data => ({
        id: data.id,
        serial: data.serial,
        activo: data.activo ?? 'Sin Serial',
        statusId: data.status.id,
        statusName: data.status.name,
        modelId: data.model.id,
        modelName: data.model.name,
        categoryId: data.model.category.id,
        categoryName: data.model.category.name,
        brandId: data.model.brand.id,
        brandName: data.model.brand.name,
        computer: data.computer,
        hardDrive: data.hardDrive,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      }) satisfies DevicesMappedApiResponse))
  }

  async getById ({ id }: { id: DeviceId }): Promise<DevicePrimitives> {
    return await makeRequest<DevicesApiResponse>({ method: 'GET', endpoint: `${this.endpoint}/${id.value}` })
      .then(data => ({
        id: data.id,
        serial: data.serial,
        activo: data.activo ?? '',
        statusId: data.status.id,
        statusName: data.status.name,
        modelId: data.model.id,
        modelName: data.model.name,
        categoryId: data.model.category.id,
        categoryName: data.model.category.name,
        brandId: data.model.brand.id,
        brandName: data.model.brand.name,
        computer: data.computer,
        hardDrive: data.hardDrive,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      } satisfies DevicesMappedApiResponse))
  }
}
