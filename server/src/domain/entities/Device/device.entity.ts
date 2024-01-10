import { type StatusValue, type Id } from '../../../types/types'
import { type ModelSeriesOutput } from './modelSeries.entity'

export interface Device {
  id: Id
  serial: string | null
  activo: string | null
  status: StatusValue
  modelId: Id
}

export interface DeviceOutput extends Omit<Device, 'modelId'> {
  model: ModelSeriesOutput
}

export interface CreateDevice extends Omit<Device, 'id'> {}
export interface UpdateDevice extends Partial<CreateDevice> {}
