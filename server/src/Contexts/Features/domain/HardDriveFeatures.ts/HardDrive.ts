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
    private readonly _id: HardDriveId,
    private readonly _type: HardDriveType,
    private _health: HardDriveHealth,
    private readonly _capacity: HardDriveCapacity
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
    this._health = new HardDriveHealth(newHealth)
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
      id: this._id.value,
      type: this._type.value,
      health: this._health.value,
      capacity: this._capacity.value
    }
  }

  get id (): string {
    return this._id.value
  }

  get type (): string {
    return this._type.value
  }

  get health (): number {
    return this._health.value
  }

  get capacity (): string {
    return this._capacity.value
  }
}
