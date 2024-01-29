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
  capacityId: number
  typeId: number
}

export class HardDrive {
  constructor (
    private readonly id: HardDriveId,
    private readonly categoryid: CategoryId,
    private readonly deviceId: DeviceId,
    private health: HardDriveHealth,
    private readonly capacityId: HardDriveCapacityId,
    private readonly typeId: HardDriveTypeId
  ) {}

  static create ({
    categoryId,
    deviceId,
    health,
    capacityId,
    typeId
  }: {
    categoryId: number
    deviceId: string
    health: number
    capacityId: number
    typeId: number
  }): HardDrive {
    const id = HardDriveId.random().toString()
    return new HardDrive(
      new HardDriveId(id),
      new CategoryId(capacityId),
      new DeviceId(deviceId),
      new HardDriveHealth(health),
      new HardDriveCapacityId(capacityId),
      new HardDriveTypeId(typeId)
    )
  }

  updateHealth (newHealth: number): void {
    this.health = new HardDriveHealth(newHealth)
  }

  static fromPrimitives (primitives: HardDrivePrimitives): HardDrive {
    return new HardDrive(
      new HardDriveId(primitives.id),
      new CategoryId(primitives.capacityId),
      new DeviceId(primitives.deviceId),
      new HardDriveHealth(primitives.health),
      new HardDriveCapacityId(primitives.capacityId),
      new HardDriveTypeId(primitives.typeId)
    )
  }

  toPrimitive (): HardDrivePrimitives {
    return {
      id: this.id.value,
      categoryId: this.capacityId.value,
      deviceId: this.deviceId.value,
      health: this.health.value,
      capacityId: this.capacityId.value,
      typeId: this.typeId.value
    }
  }

  get idValue (): string {
    return this.id.value
  }

  get typeValue (): number {
    return this.typeId.value
  }

  get healthValue (): number {
    return this.health.value
  }

  get capacityValue (): number {
    return this.capacityId.value
  }
}
