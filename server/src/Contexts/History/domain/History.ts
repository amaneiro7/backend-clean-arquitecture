import { UserId } from '../../User/user/domain/UserId'
import { CreatedAt } from './CreatedAt'
import { Action, type ActionType } from './HistoryAction'
import { HistoryId } from './HistoryId'
import { TableName } from './HistoryTableName'
import { RowId } from './RowId'

export interface HistoryPrimitives {
  id: string
  tableName: string
  rowId: string
  action: ActionType
  createdAt: Date
  userId: string
  oldData: object
  newData: object
}

export class History {
  constructor (
    private readonly id: HistoryId,
    private readonly tableName: TableName,
    private readonly rowId: RowId,
    private readonly action: Action,
    private readonly createdAt: CreatedAt,
    private readonly userId: UserId,
    private readonly oldData: object,
    private readonly newData: object
  ) {}

  static create ({ tableName, rowId, action, userId, oldData, newData, createdAt }: HistoryPrimitives): History {
    const id = HistoryId.random().value
    return new History(
      new HistoryId(id),
      new TableName(tableName),
      new RowId(rowId),
      new Action(action),
      new CreatedAt(createdAt),
      new UserId(userId),
      oldData,
      newData
    )
  }

  toPrimitive (): HistoryPrimitives {
    return {
      id: this.id.value,
      tableName: this.tableNameValue,
      rowId: this.rowIdValue,
      action: this.actionValue,
      createdAt: this.createdAtValue,
      userId: this.userIdValue,
      oldData: this.oldDataValue,
      newData: this.newDataValue
    }
  }

  static fromPrimitives (primitives: HistoryPrimitives): History {
    return new History(
      new HistoryId(primitives.id),
      new TableName(primitives.tableName),
      new RowId(primitives.rowId),
      new Action(primitives.action),
      new CreatedAt(primitives.createdAt),
      new UserId(primitives.userId),
      primitives.oldData,
      primitives.newData
    )
  }

  get idValue (): string {
    return this.id.value
  }

  get tableNameValue (): string {
    return this.tableName.value
  }

  get rowIdValue (): string {
    return this.rowId.value
  }

  get actionValue (): ActionType {
    return this.action.value
  }

  get createdAtValue (): Date {
    return this.createdAt.value
  }

  get userIdValue (): string {
    return this.userId.value
  }

  get oldDataValue (): object {
    return this.oldData
  }

  get newDataValue (): object {
    return this.newData
  }
}
