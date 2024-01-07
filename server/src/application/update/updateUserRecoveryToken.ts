import { type Id } from '../../types/types'
import { type Repository } from '../../domain/repositories/respoitory'
import { type UpdateUserRecoveryToken, type UserOutput } from '../../domain/entities/user.entity'

interface Props {
  id: Id
  payload: UpdateUserRecoveryToken
  repository: Repository
}

export async function updateUserRecovery ({ id, payload, repository }: Props): Promise<UserOutput | undefined> {
  const { recoveryToken } = payload
  return await repository.user.updateUserRecoveryToken(id, { recoveryToken })
}
