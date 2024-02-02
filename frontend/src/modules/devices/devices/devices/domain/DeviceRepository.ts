import { type DeviceCreate, type Device, type DeviceUpdate } from './Device'

export abstract class DeviceRepository {
  abstract getAll (): Promise<Device[]>

  abstract getById ({ id }: { id: string }): Promise<Device>

  abstract save ({ device }: { device: DeviceCreate }): Promise<void>

  abstract update ({ id, device }: { id: string, device: DeviceUpdate }): Promise<void>
}
