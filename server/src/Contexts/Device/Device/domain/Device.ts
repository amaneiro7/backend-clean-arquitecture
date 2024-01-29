import { Status, type StatusTypes } from './Status'
import { DeviceId } from './DeviceId'
import { DeviceActivo } from './DeviceActivo'
import { DeviceSerial } from './DeviceSerial'
import { ModelSeriesId } from '../../../ModelSeries/domain/ModelSeriesId'

export interface DevicePrimitives {
  id: string
  serial: string | null
  activo: string | null
  status: StatusTypes
  modelId: string
}

export class Device {
  constructor (
    private readonly _id: DeviceId,
    private _serial: DeviceSerial,
    private _activo: DeviceActivo,
    private _status: Status,
    private _modelId: ModelSeriesId
  ) {}

  static create ({ serial, activo, status, modelId }: { serial: string, activo: string, status: StatusTypes, modelId: string }): Device {
    const id = DeviceId.random().toString()
    return new Device(
      new DeviceId(id),
      new DeviceSerial(serial),
      new DeviceActivo(activo),
      new Status(status),
      new ModelSeriesId(modelId)
    )
  }

  updateSerial (newSerial: string): void {
    this._serial = new DeviceSerial(newSerial)
  }

  updateActivo (newActivo: string): void {
    this._activo = new DeviceActivo(newActivo)
  }

  updateStatus (newStatus: StatusTypes): void {
    this._status = new Status(newStatus)
  }

  updateModelId (newModelSeriesId: string): void {
    this._modelId = new ModelSeriesId(newModelSeriesId)
  }

  static fromPrimitives (primitives: DevicePrimitives): Device {
    return new Device(
      new DeviceId(primitives.id),
      new DeviceSerial(primitives.serial),
      new DeviceActivo(primitives.activo),
      new Status(primitives.status),
      new ModelSeriesId(primitives.modelId)
    )
  }

  toPrimitives (): DevicePrimitives {
    return {
      id: this._id.value,
      serial: this._serial.value,
      activo: this._activo.value,
      status: this._status.value,
      modelId: this._modelId.value
    }
  }

  get id (): string {
    return this._id.value
  }

  get serial (): string | null {
    return this._serial.value
  }

  get activo (): string | null {
    return this._activo.value
  }

  get status (): string {
    return this._status.value
  }
}
