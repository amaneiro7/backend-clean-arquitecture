import { type Id } from '../../types/types'
import { type Repository } from '../../domain/repositories/respoitory'
import { type UpdateUserRecoveryToken, type UserOutput } from '../../domain/entities/UserAggreagtion/user.entity'
import { notFound } from '@hapi/boom'

interface Props {
  id: Id
  payload: UpdateUserRecoveryToken
  repository: Repository
}

export async function updateUserRecovery ({ id, payload, repository }: Props): Promise<UserOutput | undefined> {
  const data = await repository.user.updateUserRecoveryToken(id, { recoveryToken: payload.recoveryToken })
  if (data === undefined) {
    throw notFound('Usuario no encontrada')
  }
  const { password, recoveryToken, ...rta } = data
  return rta
}
