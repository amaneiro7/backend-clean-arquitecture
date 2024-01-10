import { type HistoryId } from './historyId'

export class History {
  private constructor (
    readonly id: HistoryId,
    readonly device: string,
    readonly status: string,
    readonly date: Date
  ) {}
}
