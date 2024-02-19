import { HistoryId } from './HistoryId'

interface HistoryPrimitives {
  id: string
  tableName: string
  row_id: string
  action: string
  createdAt: Date
  userId: string
  old_data: object
  new_data: object
}

export class History {
  private constructor (
    readonly id: HistoryId,
    readonly tableName: string,
    readonly rowId: string,
    readonly action: string,
    readonly createdAt: Date,
    readonly userId: string,
    readonly old_data: object,
    readonly new_data: object
  ) {}

  static create ({ id, tableName, row_id, action, userId, old_data, new_data, createdAt }: HistoryPrimitives): History {
    new History(
      new HistoryId()
    )
  }
}
