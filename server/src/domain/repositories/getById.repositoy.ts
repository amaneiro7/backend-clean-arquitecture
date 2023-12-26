import { type Id } from '../../types/types'

export interface GetByIdRepository<T> {
  getById: ({ id }: { id: Id }) => Promise <T | undefined>
}
