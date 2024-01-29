import { DeviceId } from './DeviceId'
import { DeviceActivo } from './DeviceActivo'
import { DeviceSerial } from './DeviceSerial'
import { ModelSeriesId } from '../../../ModelSeries/domain/ModelSeriesId'
import { StatusId } from '../../Status/domain/StatusId'

export interface DevicePrimitives {
  id: string
  serial: string | null
  activo: string | null
  statusId: number
  modelId: string
}

export class Device {
  constructor (
    private readonly id: DeviceId,
    private serial: DeviceSerial,
    private activo: DeviceActivo,
    private statusId: StatusId,
    private modelId: ModelSeriesId
  ) {}

  static create ({ serial, activo, statusId, modelId }: { serial: string, activo: string, statusId: number, modelId: string }): Device {
    const id = DeviceId.random().toString()
    return new Device(
      new DeviceId(id),
      new DeviceSerial(serial),
      new DeviceActivo(activo),
      new StatusId(statusId),
      new ModelSeriesId(modelId)
    )
  }

  updateSerial (newSerial: string): void {
    this.serial = new DeviceSerial(newSerial)
  }

  updateActivo (newActivo: string): void {
    this.activo = new DeviceActivo(newActivo)
  }

  updateStatus (newStatusId: number): void {
    this.statusId = new StatusId(newStatusId)
  }

  updateModelId (newModelSeriesId: string): void {
    this.modelId = new ModelSeriesId(newModelSeriesId)
  }

  static fromPrimitives (primitives: DevicePrimitives): Device {
    return new Device(
      new DeviceId(primitives.id),
      new DeviceSerial(primitives.serial),
      new DeviceActivo(primitives.activo),
      new StatusId(primitives.statusId),
      new ModelSeriesId(primitives.modelId)
    )
  }

  toPrimitives (): DevicePrimitives {
    return {
      id: this.id.value,
      serial: this.serial.value,
      activo: this.activo.value,
      statusId: this.statusId.value,
      modelId: this.modelId.value
    }
  }

  get idValue (): string {
    return this.id.value
  }

  get serialValue (): string | null {
    return this.serial.value
  }

  get activoValue (): string | null {
    return this.activo.value
  }

  get statusValue (): number {
    return this.statusId.value
  }
}
