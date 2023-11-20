import { type StatusValue, type Id } from '../../src/types/types'
import { type ModelSeriesOutout } from './modelSeries.entity'

export interface Device {
  id: Id
  serial: string | null
  activo: string | null
  status: StatusValue
  modelId: Id
}

export interface DeviceOutput extends Omit<Device, 'modelId'> {
  model: ModelSeriesOutout
}

export interface CreateDevice extends Omit<Device, 'id'> {}
export interface UpdateDevice extends Partial<CreateDevice> {}
