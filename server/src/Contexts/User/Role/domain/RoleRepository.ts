import { type Primitives } from '../../../Shared/domain/value-object/Primitives';
import { type RolePrimitives } from './Role'
import { type RoleId } from './RoleId';

export abstract class RoleRepository {
  abstract searchById(id: Primitives<RoleId>): Promise<RolePrimitives | null>
  abstract searchAll(): Promise<RolePrimitives[]>
}
