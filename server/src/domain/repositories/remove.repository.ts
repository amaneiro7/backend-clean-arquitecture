import { type Id } from '../../types/types'

export interface RemoveRepository<T> {
  remove: ({ id }: { id: Id }) => Promise <T | undefined>
}
