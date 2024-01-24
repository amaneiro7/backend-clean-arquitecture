import { type DevicePrimitives } from './Device'

export abstract class DeviceRepository {
  abstract save (payload: DevicePrimitives): Promise<void>

  abstract searchAll (): Promise<DevicePrimitives[]>

  abstract searchById (deviceId: string): Promise<DevicePrimitives | null>

  abstract searchBySerial (serial: string): Promise<DevicePrimitives | null>

  abstract searchByActivo (activo: string): Promise<DevicePrimitives | null>

  abstract remove (deviceId: string): Promise<void>
}
