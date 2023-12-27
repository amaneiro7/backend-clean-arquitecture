import { notFound } from '@hapi/boom'
import { type Id } from '../../types/types'
import { type GetByIdRepository } from '../repositories/getById.repositoy'

export class GetByIdUseCase<T> {
  constructor (private readonly store: GetByIdRepository<T>) {}

  async exec ({ id }: { id: Id }): Promise<T | undefined> {
    const data = await this.store.exec({ id })
    if (data === undefined || data === null) {
      throw notFound()
    }
    return data
  }
}
