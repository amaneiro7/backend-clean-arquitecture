import { type Id } from '../../types/types'

export interface UpdateRepository<T, Payload> {
  exec: (id: Id, payload: Payload) => Promise <T | undefined>
}
