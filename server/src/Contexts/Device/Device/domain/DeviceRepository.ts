import { type Criteria } from '../../../Shared/domain/criteria/Criteria'
import { type DevicePrimitives } from './Device'

export abstract class DeviceRepository {
  abstract save(payload: DevicePrimitives): Promise<void>

  abstract searchById(deviceId: string): Promise<DevicePrimitives | null>

  abstract searchBySerial(serial: string): Promise<DevicePrimitives | null>

  abstract searchByComputerName(computerName: string): Promise<any | null>

  abstract searchByActivo(activo: string): Promise<DevicePrimitives | null>

  abstract matching(criteria: Criteria): Promise<{ total: number; data: DevicePrimitives[] }>

  abstract donwload(criteria: Criteria): Promise<{}>

  abstract remove(deviceId: string): Promise<void>
}
