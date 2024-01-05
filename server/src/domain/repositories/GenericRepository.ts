import { type Id } from '../../types/types'

export interface GenericRepository<T, CreatePayload, UpdatePayload> {
  getAll: () => Promise<T[]>
  getById: (id: Id) => Promise<T | undefined>
  getByName: (name: string) => Promise<T | undefined>
  create: (payload: CreatePayload) => Promise<T>
  update: (id: Id, payload: UpdatePayload) => Promise<T | undefined>
  remove: (id: Id) => Promise<void>
}
