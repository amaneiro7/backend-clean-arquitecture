import { type Uuid } from './Uuid'

export abstract class GenericRepository<T, Name> {
  abstract save (payload: T): void

  abstract searchAll: () => Promise<T[]>

  abstract searchById: (id: Uuid) => Promise<T | null>

  abstract searchByName: (name: Name) => Promise<T | null>

  abstract remove: (id: Uuid) => Promise<void>
}
