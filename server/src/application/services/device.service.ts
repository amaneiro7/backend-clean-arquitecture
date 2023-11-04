import { type DeviceOutput, type CreateDevice, type UpdateDevice } from '../../domain/entities/device.entity'
import { type DeviceRepository } from '../../domain/repositories/device.repositories'
import { type Id } from '../../types/types'

export class DeviceService {
  constructor (private readonly store: DeviceRepository) {}

  async getAll (): Promise<DeviceOutput[]> {
    return await this.store.getAll()
  }

  async getOne ({ id }: { id: Id }): Promise<DeviceOutput | undefined> {
    const data = await this.store.getOne({ id })
    if (data === undefined || data === null) {
      throw new Error('Device not Found')
    }
    return data
  }

  async create (payload: CreateDevice): Promise<DeviceOutput> {
    // const { name } = payload
    return await this.store.create(payload)
  }

  async update (id: Id, payload: UpdateDevice): Promise<DeviceOutput | undefined> {
    const DeviceToChange = await this.store.getOne({ id })
    if (DeviceToChange === undefined || DeviceToChange === null) {
      throw new Error('Device not Found')
    }
    // if (!payload?.name) {
    //   throw new Error('Falta informacion')
    // }

    // if (DeviceToChange.name === payload.name) {
    //   throw new Error('Sin modificar, es el mismo valor actual')
    // }
    return await this.store.update(id, payload)
  }
}
