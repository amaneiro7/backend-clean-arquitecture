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
    await fetch(`${API_URL}/deices/${id.value}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(devicePrimitives)
    })
  }

  async getAll (): Promise<DevicePrimitives[]> {
    return await fetch(`${API_URL}/deices`).then(async res => await (res.json() as Promise<DevicePrimitives[]>))
  }

  async getById ({ id }: { id: DeviceId }): Promise<DevicePrimitives | null> {
    return await fetch(`${API_URL}/deices/${id.value}`).then(
      async res => await (res.json())
    )
  }
}
