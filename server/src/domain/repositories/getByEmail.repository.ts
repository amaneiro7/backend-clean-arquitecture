import { type User } from '../entities/user.entity'

export interface GetByEmailRepository {
  getByEmail: ({ email }: { email: string }) => Promise <User | undefined>
}
