import { type StatusValue, type Id } from '../../types/types'

export interface Device {
  id: Id
  serial: string
  activo: string
  status: StatusValue
  modelId: Id
}

export interface CreateDevice extends Omit<Device, 'id'> {}
export interface UpdateDevice extends Partial<CreateDevice> {}
