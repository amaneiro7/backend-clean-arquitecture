import { StatusTypes } from '../domain/Status'
import { type DevicePrimitives } from '../domain/Device'
import { type DeviceRepository } from '../domain/DeviceRepository'

const devices: DevicePrimitives[] = [
  {
    id: '5a94384b-2e4d-4cdf-96c9-0065bf7f92a0',
    serial: 'MXL5004170',
    activo: '202370',
    status: StatusTypes.GOOD,
    modelId: 'd3237ea9-2e2b-438b-a3d3-954a3ffae5f7'
  },
  {
    id: '5a94384b-2e4d-4cdf-96c9-0065bf7f92a9',
    serial: 'CNC7070702',
    activo: 'AR00100200',
    status: StatusTypes.BAD,
    modelId: 'd696340e-cc33-4320-be42-e58554f4bf51'
  },
  {
    id: '230b68a0-3fcc-44e8-90fe-f740237dc841',
    serial: '5605209372',
    activo: null,
    status: StatusTypes.GOOD,
    modelId: '9f95946f-be67-4ea5-bcef-86ce115618cc'
  },
  {
    id: 'd5c58353-3024-491b-8956-e0528391e94d',
    serial: '5004095077',
    activo: null,
    status: StatusTypes.GOOD,
    modelId: '9f95946f-be67-4ea5-bcef-86ce115618cc'
  },
  {
    id: 'e6e02d1b-2439-4b2c-bf2c-c48edb202af3',
    serial: '5605274461',
    activo: null,
    status: StatusTypes.GOOD,
    modelId: '01a9328f-2554-4a5e-8c88-3375e3a1d88c'
  },
  {
    id: '37dd1e98-8b43-4b9e-ac62-72ca37dabae7',
    serial: 'CNBJS97096',
    activo: null,
    status: StatusTypes.GOOD,
    modelId: 'e3d95984-c747-4acf-b29f-46d1f2dd23aa'
  }
]

export class InMemoryDeviceRepository implements DeviceRepository {
  async searchAll (): Promise<DevicePrimitives[]> {
    return devices
  }

  async searchById (id: string): Promise<DevicePrimitives | null> {
    return devices.find(device => device.id === id.toString()) ?? null
  }

  async searchByActivo (activo: string): Promise<DevicePrimitives | null> {
  // Find the first device in the 'devices' array that matches the given 'activo' value
    const foundDevice = devices.find(device => {
    // Check if the 'activo' property of the device is not null
      if (device.activo !== null) {
      // Compare the lowercase and trimmed 'activo' value of the device with the given 'activo' value
        return device.activo.toLowerCase().trim() === activo.toString().toLowerCase().trim()
      }
      return null
    })

    // If a matching device is found, return it. Otherwise, return null.
    return foundDevice ?? null
  }

  async searchBySerial (serial: string): Promise<DevicePrimitives | null> {
    return devices.find(device => device.serial !== null ? device?.serial.toLowerCase().trim() === serial.toString().toLowerCase().trim() : null) ?? null
  }

  async save (payload: DevicePrimitives): Promise<void> {
    const index = devices.findIndex(device => device.id === payload.id)
    if (index === -1) {
      devices.push(payload)
    } else {
      devices[index] = payload
    }
  }

  async remove (id: string): Promise<void> {
    devices.filter(device => device.id !== id.toString())
  }
}
