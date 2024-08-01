import { type Primitives } from '../../../Shared/domain/value-object/Primitives';
import { type UserId } from './UserId';
import { UserPrimitivesOptional, type UserPrimitives } from './User'
import { Criteria } from '../../../Shared/domain/criteria/Criteria';

export abstract class UserRepository {
  abstract save(user: UserPrimitives): Promise<void>

  abstract searchAll(): Promise<UserPrimitivesOptional[]>

  abstract matching(criteria: Criteria): Promise<UserPrimitivesOptional[]>

  abstract searchById(id: Primitives<UserId>): Promise<UserPrimitives | null>

  abstract searchByEmail(userEmail: string): Promise<UserPrimitives | null>

  abstract delete(id: Primitives<UserId>): Promise<void>
}
