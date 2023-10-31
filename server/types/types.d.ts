import { type STATUS } from '../domain/entities/status.entity'

export type Id = `${string}-${string}-${string}-${string}-${string}`
export type StatusValue = typeof STATUS[keyof typeof STATUS]
