import { Status } from '../domain/Status'

export class StatusFinder {
  async run (): Promise<Status[]> {
    return Array.from(Object.values(Status))
  }
}
