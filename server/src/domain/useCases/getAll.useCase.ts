import { type GetAllRepository } from '../repositories/getAll.repository'

export class GetAllUseCase<T> {
  constructor (private readonly store: GetAllRepository<T>) {}

  async exec (): Promise<T[]> {
    return await this.store.exec()
  }
}
