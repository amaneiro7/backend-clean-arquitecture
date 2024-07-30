import { Primitives } from '../../../Shared/domain/value-object/Primitives';
import { type UserPrimitives } from './User'
import { UserId } from './UserId';

export abstract class UserRepository {
  abstract save(user: UserPrimitives): Promise<void>

  abstract searchById(id: Primitives<UserId>): Promise<UserPrimitives | null>

  abstract searchByEmail(userEmail: string): Promise<UserPrimitives | null>

  abstract delete(id: Primitives<UserId>): Promise<void>
}
