import { ModelId } from '../../../model/domain/ModelId'
import { StatusId } from '../../status/domain/StatusId'
import { DeviceActivo } from './DeviceActivo'
import { DeviceId } from './DeviceId'
import { DeviceSerial } from './DeviceSeria'

export interface DevicePrimitives {
  id: string
  serial: string
  activo: string | null
  statusId: number
  modelId: string
}
export class Device {
  constructor (
    private readonly id: DeviceId,
    private readonly serial: DeviceSerial,
    private readonly activo: DeviceActivo,
    private readonly statusId: StatusId,
    private readonly modelId: ModelId
  ) {}

  public static create ({ id, serial, activo, statusId, modelId }: DevicePrimitives) {
    return new Device(
      new DeviceId(id),
      new DeviceSerial(serial),
      new DeviceActivo(activo),
      new StatusId(statusId),
      new ModelId(modelId)
    )
  }

  idValue (): string {
    return this.id.value
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
      id: this.idValue(),
      serial: this.serialValue(),
      activo: this.activoValue(),
      statusId: this.statusIdValue(),
      modelId: this.modelIdValue()
    }
  }
}
