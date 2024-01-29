import { type StatusPrimitives } from './Status'

export abstract class StatusRepository {
  abstract searchAll (): Promise<StatusPrimitives[]>
}
