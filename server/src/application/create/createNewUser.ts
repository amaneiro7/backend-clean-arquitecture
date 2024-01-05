import { type CreateUser, type User } from '../../domain/entities/user.entity'
import { type Repository } from '../../domain/repositories/respoitory'

interface Props {
  payload: CreateUser
  repository: Repository
}

export async function createNewUser ({ payload, repository }: Props): Promise<User | undefined> {
  return await repository.user.createNewUser(payload)
}
