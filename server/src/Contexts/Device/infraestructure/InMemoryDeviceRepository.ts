import { ModelSeriesId } from '../../ModelSeries/domain/ModelSeriesId'
import { Status, StatusTypes } from '../../Status/domain/Status'
import { Device } from '../domain/Device'
import { DeviceActivo } from '../domain/DeviceActivo'
import { DeviceId } from '../domain/DeviceId'
import { type DeviceRepository } from '../domain/DeviceRepository'
import { DeviceSerial } from '../domain/DeviceSerial'

const devices: Device[] = [
  new Device(
    new DeviceId('5a94384b-2e4d-4cdf-96c9-0065bf7f92a0'),
    new DeviceSerial('MXL5004170'),
    new DeviceActivo('202370'),
    new Status(StatusTypes.GOOD),
    new ModelSeriesId('d3237ea9-2e2b-438b-a3d3-954a3ffae5f7')
  ),
  new Device(
    new DeviceId('5a94384b-2e4d-4cdf-96c9-0065bf7f92a9'),
    new DeviceSerial('CNC7070702'),
    new DeviceActivo('AR001002030'),
    new Status(StatusTypes.BAD),
    new ModelSeriesId('d696340e-cc33-4320-be42-e58554f4bf51')
  ),
  new Device(
    new DeviceId('230b68a0-3fcc-44e8-90fe-f740237dc841'),
    new DeviceSerial('5605209372'),
    new DeviceActivo(null),
    new Status(StatusTypes.GOOD),
    new ModelSeriesId('9f95946f-be67-4ea5-bcef-86ce115618cc')
  ),
  new Device(
    new DeviceId('d5c58353-3024-491b-8956-e0528391e94d'),
    new DeviceSerial('5004095077'),
    new DeviceActivo(null),
    new Status(StatusTypes.GOOD),
    new ModelSeriesId('9f95946f-be67-4ea5-bcef-86ce115618cc')
  ),
  new Device(
    new DeviceId('e6e02d1b-2439-4b2c-bf2c-c48edb202af3'),
    new DeviceSerial('5605274461'),
    new DeviceActivo(null),
    new Status(StatusTypes.GOOD),
    new ModelSeriesId('01a9328f-2554-4a5e-8c88-3375e3a1d88c')
  ),
  new Device(
    new DeviceId('37dd1e98-8b43-4b9e-ac62-72ca37dabae7'),
    new DeviceSerial('CNBJS97096'),
    new DeviceActivo(null),
    new Status(StatusTypes.GOOD),
    new ModelSeriesId('e3d95984-c747-4acf-b29f-46d1f2dd23aa')
  )
]

export class InMemoryDeviceRepository implements DeviceRepository {
  async searchAll (): Promise<Device[]> {
    return devices
  }

  async searchById (id: DeviceId): Promise<Device | null> {
    return devices.find(device => device.id === id.toString()) ?? null
  }

  async searchByActivo (activo: DeviceActivo): Promise<Device | null> {
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

  async searchBySerial (serial: DeviceSerial): Promise<Device | null> {
    return devices.find(device => device.serial !== null ? device?.serial.toLowerCase().trim() === serial.toString().toLowerCase().trim() : null) ?? null
  }

  async save (payload: Device): Promise<void> {
    const index = devices.findIndex(device => device.id === payload.id)
    if (index === -1) {
      devices.push(payload)
    } else {
      devices[index] = payload
    }
  }

  async remove (id: DeviceId): Promise<void> {
    devices.filter(device => device.id !== id.toString())
  }
}
