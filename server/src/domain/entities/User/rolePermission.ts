import { ROLE } from './role.entity'

export const PERMISSION = {
  FULL: 'full',
  READ: 'read',
  WRITE: 'write'
} as const

export const RolePermission = {
  [ROLE.ADMIN]: [PERMISSION.FULL],
  [ROLE.COORD]: [PERMISSION.FULL, PERMISSION.READ, PERMISSION.WRITE],
  [ROLE.GERENTE]: [PERMISSION.READ],
  [ROLE.SPECIALIST]: [PERMISSION.READ, PERMISSION.WRITE]
} as const
