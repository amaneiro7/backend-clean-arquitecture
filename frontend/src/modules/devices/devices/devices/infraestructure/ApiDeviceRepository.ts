import { type DevicesMappedApiResponse, type DevicesApiResponse } from '../../../../shared/domain/types/responseTypes'
import { API_URL } from '../../../../shared/infraestructure/config'
import { errorApiMessage } from '../../../../shared/infraestructure/errorMessage'
import { makeRequest } from '../../../../shared/infraestructure/fetching'
import { type DevicePrimitives, type Device } from '../domain/Device'
import { type DeviceId } from '../domain/DeviceId'
import { type DeviceRepository } from '../domain/DeviceRepository'

export class ApiDeviceRepository implements DeviceRepository {
  async save ({ device }: { device: Device }): Promise<void> {
    try {
      const res = await fetch(`${API_URL}/devices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(device.toPrimitives())
      })
      if (!res.ok) {
        throw new Error(await res.text())
      }
    } catch (error) {
      throw new Error(errorApiMessage)
    }
  }

  async update ({ id, device }: { id: DeviceId, device: Device }): Promise<void> {
    try {
      // const { serial, activo, statusId, modelId } = device.toPrimitives()
      const res = await fetch(`${API_URL}/devices/${id.value}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(device.toPrimitives())
      })
      if (!res.ok) {
        throw new Error(await res.text())
      }
    } catch (error) {
      throw new Error(errorApiMessage)
    }
  }

  async getAll (): Promise<DevicePrimitives[]> {
    // return await fetch(apiURL, { credentials: 'include' })
    //   .then(async res => {
    //     if (!res.ok) {
    //       throw new Error(await res.text())
    //     }
    //     return await (res.json() as Promise<DevicesApiResponse[]>)
    //   })

    return await makeRequest<DevicesApiResponse[]>({ method: 'GET', endpoint: 'devices' })
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
      .catch(() => {
        throw new Error(errorApiMessage)
      })
  }

  async getById ({ id }: { id: DeviceId }): Promise<DevicePrimitives> {
    return await fetch(`${API_URL}/devices/${id.value}`, { credentials: 'include' })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(await res.text())
        }
        return await (await res.json() as Promise<DevicesApiResponse>)
      })
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
      .catch(() => {
        throw new Error(errorApiMessage)
      })
  }
}
