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
    const url = new URL(window.location.href)
    const searchParams = url.searchParams
    const apiURL = new URL(`${API_URL}/devices`)
    apiURL.search = searchParams.toString()
    return await fetch(apiURL)
      .then(async res => await (res.json() as Promise<DevicesApiResponse[]>))
      .then(res => res.map(e => ({
        id: e.id,
        serial: e.serial,
        activo: e.activo ?? 'Sin Serial',
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

  async getById ({ id }: { id: DeviceId }): Promise<DevicePrimitives> {
    return await fetch(`${API_URL}/devices/${id.value}`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(await res.text())
        }
        return await (await res.json() as Promise<DevicesApiResponse>)
      })
      .then(d => ({
        id: d.id,
        serial: d.serial,
        activo: d.activo ?? '',
        statusId: d.status.id,
        statusName: d.status.name,
        modelId: d.model.id,
        modelName: d.model.name,
        categoryId: d.model.category.id,
        categoryName: d.model.category.name,
        brandId: d.model.brand.id,
        brandName: d.model.brand.name,
        createdAt: d.createdAt,
        updatedAt: d.updatedAt
      } satisfies DevicesMappedApiResponse))
  }
}
