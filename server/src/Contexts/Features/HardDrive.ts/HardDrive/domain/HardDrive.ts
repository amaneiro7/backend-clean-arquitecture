import { CategoryId } from '../../../../Category/domain/CategoryId'
import { HardDriveHealth } from './HardDriveHealth'
import { HardDriveId } from './HardDriveId'
import { HardDriveCapacityId } from '../../HardDriveCapacity/domain/HardDriveCapacityId'
import { HardDriveTypeId } from '../../HardDriveType/domain/HardDriveTypeId'
import { DeviceId } from '../../../../Device/Device/domain/DeviceId'

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
    private health: HardDriveHealth,
    private readonly hardDriveCapacityId: HardDriveCapacityId,
    private readonly hardDriveTypeId: HardDriveTypeId
  ) {}

  static create ({
    categoryId,
    deviceId,
    health,
    hardDriveCapacityId,
    hardDriveTypeId
  }: {
    categoryId: number
    deviceId: string
    health: number
    hardDriveCapacityId: number
    hardDriveTypeId: number
  }): HardDrive {
    const id = HardDriveId.random().toString()
    return new HardDrive(
      new HardDriveId(id),
      new CategoryId(categoryId),
      new DeviceId(deviceId),
      new HardDriveHealth(health),
      new HardDriveCapacityId(hardDriveCapacityId),
      new HardDriveTypeId(hardDriveTypeId)
    )
  }

  updateHealth (newHealth: number): void {
    this.health = new HardDriveHealth(newHealth)
  }

  static fromPrimitives (primitives: HardDrivePrimitives): HardDrive {
    return new HardDrive(
      new HardDriveId(primitives.id),
      new CategoryId(primitives.categoryId),
      new DeviceId(primitives.deviceId),
      new HardDriveHealth(primitives.health),
      new HardDriveCapacityId(primitives.hardDriveCapacityId),
      new HardDriveTypeId(primitives.hardDriveTypeId)
    )
  }

  toPrimitive (): HardDrivePrimitives {
    return {
      id: this.id.value,
      categoryId: this.categoryId.value,
      deviceId: this.deviceId.value,
      health: this.health.value,
      hardDriveCapacityId: this.hardDriveCapacityId.value,
      hardDriveTypeId: this.hardDriveTypeId.value
    }
  }

  get idValue (): string {
    return this.id.value
  }

  get healthValue (): number {
    return this.health.value
  }

  get hardDriveCapacityIdValue (): number {
    return this.hardDriveCapacityId.value
  }

  get hardDriveTypeIdValue (): number {
    return this.hardDriveTypeId.value
  }
}
