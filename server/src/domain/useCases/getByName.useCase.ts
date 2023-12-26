import { notFound } from '@hapi/boom'
import { type GetByNameRepository } from '../repositories/getByName.repository'

export class GetByNameUseCase<T> {
  constructor (private readonly store: GetByNameRepository<T>) {}

  async exec ({ name }: { name: string }): Promise<T | undefined> {
    const data = await this.store.getByName({ name })
    if (data === undefined || data === null) {
      throw notFound()
    }
    return data
  }
}
