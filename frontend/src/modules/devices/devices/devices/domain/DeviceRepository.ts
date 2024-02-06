import { type QueryParams } from '../../../../shared/domain/UrlParams/QueryParams'
import { type Device, type DevicePrimitives } from './Device'
import { type DeviceId } from './DeviceId'

export abstract class DeviceRepository {
  abstract getAll (query: QueryParams): Promise<DevicePrimitives[]>

  abstract getById ({ id }: { id: DeviceId }): Promise<DevicePrimitives>

  abstract save ({ device }: { device: Device }): Promise<void>

  abstract update ({ id, device }: { id: DeviceId, device: Device }): Promise<void>
}
