export abstract class GenericRepository<T> {
  abstract save (payload: T): void

  abstract searchAll (): Promise<T[]>

  abstract searchById (id: string): Promise<T | null>

  abstract searchByName (name: string): Promise<T | null>

  abstract remove (id: string): Promise<void>
}
