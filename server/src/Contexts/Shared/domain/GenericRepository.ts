export abstract class GenericRepository<T, Id, Name> {
  abstract save (payload: T): void

  abstract searchAll: () => Promise<T[]>

  abstract searchById: (id: Id) => Promise<T | null>

  abstract searchByName: (name: Name) => Promise<T | null>

  abstract remove: (id: Id) => Promise<void>
}
