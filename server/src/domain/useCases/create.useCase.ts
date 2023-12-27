import { type CreateRepository } from '../repositories/create.repository'

export class CreateUseCase<T, Payload> {
  constructor (
    private readonly store: CreateRepository<T, Payload>
  ) {}

  async exec (payload: Payload): Promise<T> {
    return await this.store.exec(payload)
  }
}
