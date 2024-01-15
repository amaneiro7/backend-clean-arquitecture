import { type Device } from './Device'
import { type DeviceActivo } from './DeviceActivo'
import { type DeviceId } from './DeviceId'
import { type DeviceSerial } from './DeviceSerial'

export abstract class DeviceRepository {
  abstract save (payload: Device): Promise<void>

  abstract searchAll: () => Promise<Device[]>

  abstract searchById: (deviceId: DeviceId) => Promise<Device | null>

  abstract searchBySerial: (serial: DeviceSerial) => Promise<Device | null>

  abstract searchByActivo: (serial: DeviceActivo) => Promise<Device | null>

  abstract remove: (deviceId: DeviceId) => Promise<void>
}
