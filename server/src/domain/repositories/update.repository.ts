import { type Id } from '../../types/types'

export interface UpdateRepository<T, Payload> {
  update: (id: Id, payload: Payload) => Promise <T | undefined>
}
