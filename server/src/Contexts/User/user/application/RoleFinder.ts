import { Roles, type RoleTypes } from '../domain/Role'

export class RolesFinder {
  async search (): Promise<RoleTypes[]> {
    return Roles.toPrimitive()
  }
}
