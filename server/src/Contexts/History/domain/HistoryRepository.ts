import { type HistoryPrimitives } from './History'

export abstract class HistoryRepository {
  abstract searchAll (): Promise<HistoryPrimitives[]>

  abstract save (payload: HistoryPrimitives): Promise<void>
}
