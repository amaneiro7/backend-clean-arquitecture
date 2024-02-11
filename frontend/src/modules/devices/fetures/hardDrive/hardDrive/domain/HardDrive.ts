import { CategoryDefaultData, type CategoryValues } from '../../../../category/domain/CategoryDefaultData'
import { Device } from '../../../../devices/devices/domain/Device'
import { DeviceActivo } from '../../../../devices/devices/domain/DeviceActivo'
import { DeviceSerial } from '../../../../devices/devices/domain/DeviceSeria'
import { StatusId } from '../../../../devices/status/domain/StatusId'
import { ModelId } from '../../../../model/domain/ModelId'
import { HardDriveCapacityId } from '../../hardDriveCapacity/domain/HardDriveCapacityId'
import { HardDriveTypeId } from '../../hardDriveType/domain/HardDriveTypeId'
import { HardDriveHealth } from './HardDriveHealth'

export interface HardDrivePrimitives {
  serial: string
  activo: string | null
  statusId: number
  modelId: string
  health: number
  hardDriveCapacityId: number
  hardDriveTypeId: number
}

export class HardDrive extends Device {
  constructor (
    serial: DeviceSerial,
    activo: DeviceActivo,
    statusId: StatusId,
    modelId: ModelId,
    private readonly health: HardDriveHealth,
    private readonly hardDriveCapacityId: HardDriveCapacityId,
    private readonly hardDriveTypeId: HardDriveTypeId
  ) {
    super(serial, activo, statusId, modelId)
  }

  static isHardDriveCategory ({ categoryId }: { categoryId: number }): boolean {
    const AcceptedHardDriveCategories: CategoryValues[] = ['Discos Duros']
    return AcceptedHardDriveCategories.includes(CategoryDefaultData[categoryId])
  }

  public static create ({ serial, activo, statusId, modelId, health, hardDriveCapacityId, hardDriveTypeId }: HardDrivePrimitives) {
    return new HardDrive(
      new DeviceSerial(serial),
      new DeviceActivo(activo),
      new StatusId(statusId),
      new ModelId(modelId),
      new HardDriveHealth(health),
      new HardDriveCapacityId(hardDriveCapacityId),
      new HardDriveTypeId(hardDriveTypeId)
    )
  }

  healthValue (): number {
    return this.health.value
  }

  hardDriveCapacityIdValue (): number {
    return this.hardDriveCapacityId.value
  }

  hardDriveTypeIdValue (): number {
    return this.hardDriveTypeId.value
  }

  toPrimitives (): HardDrivePrimitives {
    return {
      serial: this.serialValue(),
      activo: this.activoValue(),
      statusId: this.statusIdValue(),
      modelId: this.modelIdValue(),
      health: this.healthValue(),
      hardDriveCapacityId: this.hardDriveCapacityIdValue(),
      hardDriveTypeId: this.hardDriveTypeIdValue()
    }
  }
}
