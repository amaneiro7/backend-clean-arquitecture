import { HistoryId } from './HistoryId'
import { DeviceId } from '../../Device/Device/domain/DeviceId'
import { UserId } from '../../User/user/domain/UserId'
import { Action, type ActionType } from './HistoryAction'
import { CreatedAt } from './CreatedAt'
import { type Primitives } from '../../Shared/domain/value-object/Primitives'

export interface HistoryPrimitives {
  id: Primitives<HistoryId>
  deviceId: Primitives<DeviceId>
  userId: Primitives<UserId>
  action: ActionType
  oldData: object
  newData: object
  createdAt: Date
}

export class History {
  constructor(
    private readonly id: HistoryId,
    private readonly deviceId: DeviceId,
    private readonly userId: UserId,
    private readonly action: Action,
    private readonly oldData: object,
    private readonly newData: object,
    private readonly createdAt: CreatedAt
  ) { }

  static create({ deviceId, action, userId, oldData, newData, createdAt }: HistoryPrimitives): History {
    const id = HistoryId.random().value
    return new History(
      new HistoryId(id),
      new DeviceId(deviceId),
      new UserId(userId),
      new Action(action),
      oldData,
      newData,
      new CreatedAt(createdAt)
    )
  }

  toPrimitive(): HistoryPrimitives {
    return {
      id: this.id.value,
      deviceId: this.deviceIdValue,
      action: this.actionValue,
      createdAt: this.createdAtValue,
      userId: this.userIdValue,
      oldData: this.oldDataValue,
      newData: this.newDataValue
    }
  }

  static fromPrimitives(primitives: HistoryPrimitives): History {
    return new History(
      new HistoryId(primitives.id),
      new DeviceId(primitives.deviceId),
      new UserId(primitives.userId),
      new Action(primitives.action),
      primitives.oldData,
      primitives.newData,
      new CreatedAt(primitives.createdAt)
    )
  }

  get idValue(): string {
    return this.id.value
  }

  get deviceIdValue(): string {
    return this.deviceId.value
  }

  get actionValue(): ActionType {
    return this.action.value
  }

  get createdAtValue(): Date {
    return this.createdAt.value
  }

  get userIdValue(): string {
    return this.userId.value
  }

  get oldDataValue(): object {
    return this.oldData
  }

  get newDataValue(): object {
    return this.newData
  }
}
