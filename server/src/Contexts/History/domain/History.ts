import { HistoryId } from './HistoryId'
import { DeviceId } from '../../Device/Device/domain/DeviceId'
import { UserId } from '../../User/user/domain/UserId'
import { Action, type ActionType } from './HistoryAction'
import { CreatedAt } from './CreatedAt'
import { HistoryEmployee } from './HistoryEmployee'
import { type Primitives } from '../../Shared/domain/value-object/Primitives'

export interface HistoryPrimitives {
  id: Primitives<HistoryId>
  deviceId: Primitives<DeviceId>
  userId: Primitives<UserId>
  employeeId: Primitives<HistoryEmployee>
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
    private readonly employeeId: HistoryEmployee,
    private readonly action: Action,
    private readonly oldData: object,
    private readonly newData: object,
    private readonly createdAt: CreatedAt
  ) { }

  static create(params: Omit<HistoryPrimitives, 'id'>): History {
    const id = HistoryId.random().value
    return new History(
      new HistoryId(id),
      new DeviceId(params.deviceId),
      new UserId(params.userId),
      new HistoryEmployee(params.employeeId),
      new Action(params.action),
      params.oldData,
      params.newData,
      new CreatedAt(params.createdAt)
    )
  }

  toPrimitives(): HistoryPrimitives {
    return {
      id: this.id.value,
      deviceId: this.deviceValue,
      userId: this.userValue,
      employeeId: this.employeeValue,
      action: this.actionValue,
      oldData: this.oldDataValue,
      newData: this.newDataValue,
      createdAt: this.createdAtValue
    }
  }

  static fromPrimitives(primitives: HistoryPrimitives): History {
    return new History(
      new HistoryId(primitives.id),
      new DeviceId(primitives.deviceId),
      new UserId(primitives.userId),
      new HistoryEmployee(primitives.employeeId),
      new Action(primitives.action),
      primitives.oldData,
      primitives.newData,
      new CreatedAt(primitives.createdAt)
    )
  }

  get idValue(): Primitives<HistoryId> {
    return this.id.value
  }

  get deviceValue(): Primitives<DeviceId> {
    return this.deviceId.value
  }

  get employeeValue(): Primitives<HistoryEmployee> {
    return this.employeeId.value
  }

  get actionValue(): ActionType {
    return this.action.value
  }

  get createdAtValue(): Date {
    return this.createdAt.value
  }

  get userValue(): Primitives<UserId> {
    return this.userId.value
  }

  get oldDataValue(): object {
    return this.oldData
  }

  get newDataValue(): object {
    return this.newData
  }
}
