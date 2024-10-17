import { type Criteria } from '../../../../shared/domain/criteria/Criteria'
import { type DevicesApiResponse } from '../../../../shared/domain/types/responseTypes'
import { makeRequest } from '../../../../shared/infraestructure/fetching'
import { type DevicePrimitives, type Device } from '../domain/Device'
import { type DeviceId } from '../domain/DeviceId'
import { type DeviceRepository } from '../domain/DeviceRepository'

export class ApiDeviceRepository implements DeviceRepository {
  private readonly endpoint: string = 'devices'
  async save({ device }: { device: Device }): Promise<void> {
    return await makeRequest({ method: 'POST', endpoint: this.endpoint, data: device.toPrimitives() })
  }

  async update({ id, device }: { id: DeviceId, device: Device }): Promise<void> {
    return await makeRequest({ method: 'PATCH', endpoint: `${this.endpoint}/${id.value}`, data: device.toPrimitives() })
  }

  async getByCriteria(criteria: Criteria): Promise<DevicePrimitives[]> {
    const criteriaPrimitives = criteria.toPrimitives()
    const queryParams = criteria.buildQuery(criteriaPrimitives)
    return await makeRequest<DevicesApiResponse[]>({ method: 'GET', endpoint: `${this.endpoint}?${queryParams}` })
  }

  async download(criteria: Criteria): Promise<void> {
    const now = new Date()
    const filename = `Reporte-Inventario${now.toLocaleString().replace(/[/:]/g, '-')}.xlsx`
    const criteriaPrimitives = criteria.toPrimitives()
    const queryParams = criteria.buildQuery(criteriaPrimitives)
    return await fetch(`http://localhost:5000/api/v1/devices/computers/download?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/vnc.ms-excel'
      },
      credentials: 'include'
    })
      .then(res => {
        if (res.ok) {
          return res.blob() // convert the response to a blob
        }
        throw new Error('Network response was not ok')
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        a.remove()
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation: ', error)
      })
  }

  async getAll(): Promise<DevicePrimitives[]> {
    return await makeRequest<DevicesApiResponse[]>({ method: 'GET', endpoint: this.endpoint })
  }

  async getById({ id }: { id: DeviceId }): Promise<DevicePrimitives> {
    return await makeRequest<DevicesApiResponse>({ method: 'GET', endpoint: `${this.endpoint}/${id.value}` })
  }
}
