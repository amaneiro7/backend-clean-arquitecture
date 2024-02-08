import { CategoryId } from '../../../../category/domain/CategoryId'
import { DeviceId } from '../../../../devices/devices/domain/DeviceId'
import { HardDriveCapacityId } from '../../hardDriveCapacity/domain/HardDriveCapacityId'
import { HardDriveTypeId } from '../../hardDriveType/domain/HardDriveTypeId'
import { HardDriveHealth } from './HardDriveHealth'
import { HardDriveId } from './HardDriveId'

export interface HardDrivePrimitives {
  id: string
  categoryId: number
  deviceId: string
  health: number
  hardDriveCapacityId: number
  hardDriveTypeId: number
}

export class HardDrive {
  constructor (
    private readonly id: HardDriveId,
    private readonly categoryId: CategoryId,
    private readonly deviceId: DeviceId,
    private readonly health: HardDriveHealth,
    private readonly hardDriveCapacityId: HardDriveCapacityId,
    private readonly hardDriveTypeId: HardDriveTypeId
  ) {}

  public static create ({ id, categoryId, deviceId, health, hardDriveCapacityId, hardDriveTypeId }: HardDrivePrimitives) {
    return new HardDrive(
      new HardDriveId(id),
      new CategoryId(categoryId),
      new DeviceId(deviceId),
      new HardDriveHealth(health),
      new HardDriveCapacityId(hardDriveCapacityId),
      new HardDriveTypeId(hardDriveTypeId)
    )
  }

  idValue (): string {
    return this.id.value
  }

  categoryIdValue (): number {
    return this.categoryId.value
  }

  deviceIdValue (): string {
    return this.deviceId.value
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
      id: this.idValue(),
      categoryId: this.categoryIdValue(),
      deviceId: this.deviceIdValue(),
      health: this.healthValue(),
      hardDriveCapacityId: this.hardDriveCapacityIdValue(),
      hardDriveTypeId: this.hardDriveTypeIdValue()
    }
  }
}
