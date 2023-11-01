import { type StatusValue, type Id } from '../../types/types'
import { type ModelSeries } from './modelSeries.entity'

export interface Device {
  id: Id
  serial: string
  activo: string
  status: StatusValue
  modelId: Id
}

export interface DeviceOutout extends Omit<Device, 'modelId'> {
  modelId: ModelSeries
}

export interface CreateDevice extends Omit<Device, 'id'> {}
export interface UpdateDevice extends Partial<CreateDevice> {}
