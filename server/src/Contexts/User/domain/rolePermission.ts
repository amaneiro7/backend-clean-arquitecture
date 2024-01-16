import { RoleTypes } from './Role'

export const PERMISSION = {
  FULL: 'full',
  READ: 'read',
  WRITE: 'write'
} as const

export const RolePermission = {
  [RoleTypes.ADMIN]: [PERMISSION.FULL],
  [RoleTypes.COORD]: [PERMISSION.FULL, PERMISSION.READ, PERMISSION.WRITE],
  [RoleTypes.GERENTE]: [PERMISSION.READ],
  [RoleTypes.SPECIALIST]: [PERMISSION.READ, PERMISSION.WRITE]
} as const

export type PermissionValue = typeof PERMISSION[keyof typeof PERMISSION]
