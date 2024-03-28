import { type Primitives } from '../../../../shared/domain/value-object/Primitives'
import { ModelId } from '../../../model/domain/ModelId'
import { StatusId } from '../../status/domain/StatusId'
import { DeviceActivo } from './DeviceActivo'
import { type DeviceId } from './DeviceId'
import { DeviceSerial } from './DeviceSerial'

export interface DevicePrimitives {
  id?: Primitives<DeviceId>
  serial: Primitives<DeviceSerial>
  activo: Primitives<DeviceActivo>
  statusId: Primitives<StatusId>
  modelId: Primitives<ModelId>
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

  serialValue (): Primitives<DeviceSerial> {
    return this.serial.value
  }

  activoValue (): Primitives<DeviceActivo> | null {
    return this.activo.value
  }

  statusIdValue (): Primitives<StatusId> {
    return this.statusId.value
  }

  modelIdValue (): Primitives<ModelId> {
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
