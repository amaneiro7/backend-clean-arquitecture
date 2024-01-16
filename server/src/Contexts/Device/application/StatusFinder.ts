import { Status, type StatusTypes } from '../domain/Status'

export class StatusFinder {
  async search (): Promise<StatusTypes[]> {
    return Status.toPrimitive()
  }
}
