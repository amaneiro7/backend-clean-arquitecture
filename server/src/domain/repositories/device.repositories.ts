import { type UpdateDevice, type CreateDevice, type DeviceOutput } from '../entities/device.entity'
import { type CreateRepository } from './create.repository'
import { type GetAllRepository } from './getAll.repository'
import { type GetByIdRepository } from './getById.repositoy'
import { type UpdateRepository } from './update.repository'

// export interface DeviceRepository {
//   getAll: () => Promise<DeviceOutput[]>
//   getOne: ({ id }: { id: Id }) => Promise<DeviceOutput | undefined>

//   create: (payload: CreateDevice) => Promise<DeviceOutput>
//   update: (id: Id, payload: UpdateDevice) => Promise<DeviceOutput | undefined>
// }

export interface DeviceRepository {
  getAll: GetAllRepository<DeviceOutput>
  getById: GetByIdRepository<DeviceOutput>
  create: CreateRepository<DeviceOutput, CreateDevice>
  update: UpdateRepository<DeviceOutput, UpdateDevice>
}
