import { type Status } from './Status'

export abstract class StatusRepository {
  abstract getAll (): Promise<Status[]>
}
