import { StatusTypes } from '../domain/Status'

export class StatusFinder {
  async run (): Promise<StatusTypes[]> {
    return Array.from(Object.values(StatusTypes))
  }
}
