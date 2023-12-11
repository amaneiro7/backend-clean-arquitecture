import { type STATUS } from '../../domain/entities/status.entity'

export type Id = `${string}-${string}-${string}-${string}-${string}`
// export type Id = string
export interface StatusValue {
  id: Id
  name: typeof STATUS[keyof typeof STATUS]

}
