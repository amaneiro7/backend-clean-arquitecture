import { notFound } from '@hapi/boom'
import { type Repository } from '../../domain/repositories/respoitory'
import { type Id } from '../../types/types'
import { type UserOutput } from '../../domain/entities/UserAggreagtion/user.entity'

export async function getUserById ({ id, repository }: { id: Id, repository: Repository }): Promise<UserOutput | undefined> {
  const data = await repository.user.findByUserId(id)
  if (data === undefined) {
    throw notFound('Usuario no encontrada')
  }
  const { password, recoveryToken, ...rta } = data
  return rta
}
