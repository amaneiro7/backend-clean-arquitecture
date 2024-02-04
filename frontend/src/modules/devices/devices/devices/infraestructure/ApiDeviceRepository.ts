import { type DevicesMappedApiResponse, type DevicesApiResponse } from '../../../../shared/domain/types/responseTypes'
import { API_URL } from '../../../../shared/infraestructure/config'
import { type DevicePrimitives, type Device } from '../domain/Device'
import { type DeviceId } from '../domain/DeviceId'
import { type DeviceRepository } from '../domain/DeviceRepository'

export class ApiDeviceRepository implements DeviceRepository {
  async save ({ device }: { device: Device }): Promise<void> {
    const devicePrimitives = device.toPrimitives()
    await fetch(`${API_URL}/devices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(devicePrimitives)
    })
  }

  async update ({ id, device }: { id: DeviceId, device: Device }): Promise<void> {
    const devicePrimitives = device.toPrimitives()
    await fetch(`${API_URL}/devices/${id.value}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(devicePrimitives)
    })
  }

  async getAll (): Promise<DevicePrimitives[]> {
    return await fetch(`${API_URL}/devices`)
      .then(async res => await (res.json() as Promise<DevicesApiResponse[]>))
      .then(res => res.map(e => ({
        id: e.id,
        serial: e.serial,
        activo: e.activo,
        statusId: e.status.id,
        statusName: e.status.name,
        modelId: e.model.id,
        modelName: e.model.name,
        categoryId: e.model.category.id,
        categoryName: e.model.category.name,
        brandId: e.model.brand.id,
        brandName: e.model.brand.name,
        createdAt: e.createdAt,
        updatedAt: e.updatedAt
      }) satisfies DevicesMappedApiResponse))
  }

  async getById ({ id }: { id: DeviceId }): Promise<DevicePrimitives | null> {
    return await fetch(`${API_URL}/devices/${id.value}`).then(
      async res => await (res.json())
    )
  }
}
