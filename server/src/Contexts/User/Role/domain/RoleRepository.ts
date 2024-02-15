import { type RolePrimitives } from './Role'

export abstract class RoleRepository {
  abstract searchAll (): Promise<RolePrimitives[]>
}
