import { notFound } from '@hapi/boom'
import { type GetByEmailRepository } from '../repositories/getByEmail.repository'
import { type User } from '../entities/user.entity'

export class GetByEmailUseCase {
  constructor (private readonly store: GetByEmailRepository) {}

  async exec ({ email }: { email: string }): Promise<User | undefined> {
    const data = await this.store.exec({ email })
    if (data === undefined || data === null) {
      throw notFound()
    }
    return data
  }
}
