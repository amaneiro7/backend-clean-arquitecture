import { STATUS } from '../../domain/entities/Device/status.entity'
import { type StatusValue } from '../../types/types'

export const getStatusValues = (): StatusValue[] => {
  return Array.from(Object.values(STATUS))
}
