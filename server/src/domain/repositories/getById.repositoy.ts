import { type Id } from '../../types/types'

export interface GetByIdRepository<T> {
  exec: ({ id }: { id: Id }) => Promise <T | undefined>
}
