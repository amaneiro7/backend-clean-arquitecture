import { STATUS } from '../../domain/entities/status.entity'
import { type StatusValue } from '../../types/types'
import { randomUUID } from 'node:crypto'
export const getStatusValues = (): StatusValue[] => {
  return Array.from(Object.values(STATUS).map(name => ({
    id: randomUUID(),
    name
  })))
}
