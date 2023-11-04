import { type Id } from '../../src/types/types'
import { type UpdateDevice, type CreateDevice, type DeviceOutput } from '../entities/device.entity'

export interface DeviceRepository {
  getAll: () => Promise<DeviceOutput[]>
  getOne: ({ id }: { id: Id }) => Promise<DeviceOutput | undefined>

  create: (payload: CreateDevice) => Promise<DeviceOutput>
  update: (id: Id, payload: UpdateDevice) => Promise<DeviceOutput | undefined>
}
