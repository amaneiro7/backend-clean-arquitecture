import { type Id } from '../../types/types'
import { type UpdateDevice, type CreateDevice, type Device } from '../entities/device.entity'

export interface DeviceRepository {
  getAll: () => Promise<Device[]>
  getOne: ({ id }: { id: Id }) => Promise<Device | undefined>

  create: (payload: CreateDevice) => Promise<Device>
  update: (id: Id, payload: UpdateDevice) => Promise<Device | undefined>
}
