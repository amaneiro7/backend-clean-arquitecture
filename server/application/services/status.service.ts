import { STATUS } from '../../domain/entities/status.entity'
import { type StatusValue } from '../../types/types'

export const getAll = (): StatusValue[] => {
  return Array.from(Object.values(STATUS))
}
