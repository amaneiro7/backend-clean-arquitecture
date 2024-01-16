import { Status } from '../domain/Status'

export class StatusFinder {
  async search (): Promise<Status[]> {
    return Array.from(Object.values(Status))
  }
}
