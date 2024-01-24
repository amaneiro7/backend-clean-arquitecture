import { type UserPrimitives } from './User'

export abstract class UserRepository {
  abstract save (user: UserPrimitives): Promise<void>

  abstract searchByEmail (userEmail: string): Promise<UserPrimitives | null>
}
