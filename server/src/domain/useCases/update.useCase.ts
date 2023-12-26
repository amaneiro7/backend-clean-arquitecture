import { notFound } from '@hapi/boom'
import { type Id } from '../../types/types'
import { type UpdateRepository } from '../repositories/update.repository'
import { type GetByIdUseCase } from './getById.useCase'

export class UpdateUseCase<T, Payload> {
  constructor (
    private readonly store: UpdateRepository<T, Payload>,
    private readonly storeFind: GetByIdUseCase<T>
  ) {}

  async exec (id: Id, payload: Payload): Promise<T | undefined> {
    const itemToChange = await this.storeFind.exec({ id })
    if (itemToChange === undefined || itemToChange === null) {
      throw notFound()
    }
    return await this.store.update(id, payload)
  }
}
