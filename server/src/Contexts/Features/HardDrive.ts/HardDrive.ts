import { HardDriveCapacity, type HardDriveCapacityType } from './HardDriveCapacity'
import { HardDriveHealth } from './HardDriveHealth'
import { HardDriveId } from './HardDriveId'
import { HardDriveType, type HardDriveTypes } from './HardDriveType'

export interface HardDrivePrimitives {
  id: string
  type: HardDriveTypes
  health: number
  capacity: HardDriveCapacityType
}

export class HardDrive {
  constructor (
    private readonly id: HardDriveId,
    private readonly type: HardDriveType,
    private health: HardDriveHealth,
    private readonly capacity: HardDriveCapacity
  ) {}

  static create ({ type, health, capacity }: { type: HardDriveTypes, health: number, capacity: HardDriveCapacityType }): HardDrive {
    const id = HardDriveId.random().toString()
    return new HardDrive(
      new HardDriveId(id),
      new HardDriveType(type),
      new HardDriveHealth(health),
      new HardDriveCapacity(capacity)
    )
  }

  updateHealth (newHealth: number): void {
    this.health = new HardDriveHealth(newHealth)
  }

  static fromPrimitives (primitives: HardDrivePrimitives): HardDrive {
    return new HardDrive(
      new HardDriveId(primitives.id),
      new HardDriveType(primitives.type),
      new HardDriveHealth(primitives.health),
      new HardDriveCapacity(primitives.capacity)
    )
  }

  toPrimitive (): HardDrivePrimitives {
    return {
      id: this.id.value,
      type: this.type.value,
      health: this.health.value,
      capacity: this.capacity.value
    }
  }

  get idValue (): string {
    return this.id.value
  }

  get typeValue (): string {
    return this.type.value
  }

  get healthValue (): number {
    return this.health.value
  }

  get capacityValue (): string {
    return this.capacity.value
  }
}
