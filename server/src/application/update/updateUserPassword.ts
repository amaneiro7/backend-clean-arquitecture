import { type Id } from '../../types/types'
import { type Repository } from '../../domain/repositories/respoitory'
import { type UpdateUserPassword, type UserOutput } from '../../domain/entities/UserAggreagtion/user.entity'
import { notFound } from '@hapi/boom'

interface Props {
  id: Id
  payload: UpdateUserPassword
  repository: Repository
}

export async function updateUserPassword ({ id, payload, repository }: Props): Promise<UserOutput | undefined> {
  const data = await repository.user.updateUserPassword(id, { password: payload.password })
  if (data === undefined) {
    throw notFound('Usuario no encontrada')
  }
  const { password, recoveryToken, ...rta } = data
  return rta
}
