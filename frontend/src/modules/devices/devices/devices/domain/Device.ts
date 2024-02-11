import { ModelId } from '../../../model/domain/ModelId'
import { StatusId } from '../../status/domain/StatusId'
import { DeviceActivo } from './DeviceActivo'
import { DeviceSerial } from './DeviceSeria'

export interface DevicePrimitives {
  id?: string
  serial: string
  activo: string | null
  statusId: number
  modelId: string
}
export class Device {
  constructor (
    private readonly serial: DeviceSerial,
    private readonly activo: DeviceActivo,
    private readonly statusId: StatusId,
    private readonly modelId: ModelId
  ) {}

  public static create ({ serial, activo, statusId, modelId }: DevicePrimitives): Device {
    return new Device(
      new DeviceSerial(serial),
      new DeviceActivo(activo),
      new StatusId(statusId),
      new ModelId(modelId)
    )
  }

  serialValue (): string {
    return this.serial.value
  }

  activoValue (): string | null {
    return this.activo.value
  }

  statusIdValue (): number {
    return this.statusId.value
  }

  modelIdValue (): string {
    return this.modelId.value
  }

  toPrimitives (): DevicePrimitives {
    return {
      serial: this.serialValue(),
      activo: this.activoValue(),
      statusId: this.statusIdValue(),
      modelId: this.modelIdValue()
    }
  }
}
