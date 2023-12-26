import { type Id } from '../../types/types'
import { type UpdateRepository } from '../repositories/update.repository'

export class UpdateUseCase<T, Payload> {
  constructor (
    private readonly store: UpdateRepository<T, Payload>
  ) {}

  async exec (id: Id, payload: Payload): Promise<T | undefined> {
    return await this.store.update(id, payload)
  }
}
