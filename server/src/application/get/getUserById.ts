import { notFound } from '@hapi/boom'
import { type Repository } from '../../domain/repositories/respoitory'
import { type Id } from '../../types/types'
import { type User } from '../../domain/entities/user.entity'

export async function getUserById ({ id, repository }: { id: Id, repository: Repository }): Promise<User | undefined> {
  const data = await repository.user.findByUserId(id)
  if (data === undefined) {
    throw notFound('Usuario no encontrada')
  }
  return data
}
