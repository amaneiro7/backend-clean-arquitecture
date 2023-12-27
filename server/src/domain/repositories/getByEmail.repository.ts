import { type User } from '../entities/user.entity'

export interface GetByEmailRepository {
  exec: ({ email }: { email: string }) => Promise <User | undefined>
}
