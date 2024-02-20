import { type HistoryPrimitives } from './History'

export abstract class HistoryRepository {
  abstract searchAll (): Promise<HistoryPrimitives[]>

  abstract save (payload: HistoryPrimitives): Promise<void>

  abstract searchById (id: string): Promise<HistoryPrimitives | null>

  abstract searchByDeviceId (id: string): Promise<HistoryPrimitives | null>
}
