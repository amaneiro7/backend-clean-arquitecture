import { ROLE } from './role.entity'

export const Permission = {
  FULL: 'full',
  READ: 'read',
  WRITE: 'write'
} as const

export const RolePermission = {
  [ROLE.ADMIN]: [Permission.FULL],
  [ROLE.COORD]: [Permission.FULL, Permission.READ, Permission.WRITE],
  [ROLE.GERENTE]: [Permission.READ],
  [ROLE.SPECIALIST]: [Permission.READ, Permission.WRITE]
} as const
