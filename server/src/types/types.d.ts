import { type STATUS } from '../../domain/entities/status.entity'
import { type ROLE } from '../domain/entities/role.entity'

export type Id = `${string}-${string}-${string}-${string}-${string}`
// export type Id = string
export type StatusValue = typeof STATUS[keyof typeof STATUS]
export type RolesValue = typeof ROLE[keyof typeof ROLE]
