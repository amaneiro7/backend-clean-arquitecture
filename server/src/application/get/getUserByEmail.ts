import { notFound } from '@hapi/boom'
import { type Repository } from '../../domain/repositories/respoitory'
import { type User } from '../../domain/entities/user.entity'

interface Props {
  email: string
  repository: Repository
}

export async function getUserByEmail ({ email, repository }: Props): Promise<User | undefined> {
  const data = await repository.user.findByUserEmail(email)
  if (data === undefined) {
    throw notFound('Email no encontrado')
  }
  return data
}
