import { notFound } from '@hapi/boom'
import { type DeviceOutput, type CreateDevice, type UpdateDevice } from '../../domain/entities/device.entity'
import { type Id } from '../../types/types'
import { type DeviceRepositoryInterface } from '../../infrastructure/persistance/local-file-system/device'

export class DeviceService {
  constructor (private readonly store: DeviceRepositoryInterface) {}

  async getAll (): Promise<DeviceOutput[]> {
    return await this.store.getAll.exec()
  }

  async getOne ({ id }: { id: Id }): Promise<DeviceOutput | undefined> {
    const data = await this.store.getById.exec({ id })
    if (data === undefined || data === null) {
      throw notFound('Dispositivo no encontrado')
    }
    return data
  }

  async create (payload: CreateDevice): Promise<DeviceOutput> {
    let { activo, modelId, serial, status } = payload
    serial = this.formatEmptyUndefinedValue(serial)
    activo = this.formatEmptyUndefinedValue(activo)

    const mappedNewDevice = {
      activo,
      serial,
      status,
      modelId
    }
    return await this.store.create.exec(mappedNewDevice)
  }

  formatEmptyUndefinedValue (value: string | undefined | null): string | null {
    if (value === undefined || value === null || value === '') return null
    return value
  }

  async update (id: Id, payload: UpdateDevice): Promise<DeviceOutput | undefined> {
    // await updateFunction({ storeName: 'Dispositivo', id, payload, store: this.store })
    const deviceToChange = await this.store.getById.exec({ id })
    if (deviceToChange === undefined || deviceToChange === null) {
      throw notFound('Modelo no encontrado')
    }
    return await this.store.update.exec(id, payload)
  }
}
