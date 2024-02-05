import type QueryString from 'qs'
import { type DevicePrimitives } from '../../domain/Device'
import { type DeviceRepository } from '../../domain/DeviceRepository'
import { DeviceModel } from './DeviceSchema'
import { type FindOptions } from 'sequelize'
import { type DevicesApiResponse } from './DeviceResponse'

export class SequelizeDeviceRepository implements DeviceRepository {
  async searchAll (queryParams: QueryString.ParsedQs): Promise<DevicePrimitives[]> {
    const options: FindOptions<DevicesApiResponse> = {
      include: [
        {
          association: 'model',
          include: ['category', 'brand']
        },
        'status',
        {
          association: 'computer',
          include: ['processor', 'hardDriveCapacity', 'hardDriveType', 'operatingSystem', 'operatingSystemArq']
        },
        {
          association: 'hardDrive',
          include: ['hardDriveCapacity', 'hardDriveType']
        }
      ],
      where: {},
      order: ['status', 'DESC']

    }
    return await DeviceModel.findAll(options)
  }

  async searchById (id: string): Promise<DevicePrimitives | null> {
    return await DeviceModel.findByPk(id, {
      include: [
        {
          association: 'model',
          include: ['category', 'brand']
        },
        'status',
        {
          association: 'computer',
          include: ['processor', 'hardDriveCapacity', 'hardDriveType', 'operatingSystem', 'operatingSystemArq']
        }
      ]
    }) ?? null
  }

  async searchByActivo (activo: string): Promise<DevicePrimitives | null> {
    return await DeviceModel.findOne({
      where: { activo }
    }) ?? null
  }

  async searchBySerial (serial: string): Promise<DevicePrimitives | null> {
    return await DeviceModel.findOne({ where: { serial } })
  }

  async save (payload: DevicePrimitives): Promise<void> {
    const { id } = payload
    const device = await DeviceModel.findByPk(id) ?? null
    if (device === null) {
      await DeviceModel.create({ ...payload })
    } else {
      device.set({ ...payload })
      await device.save()
    }
  }

  async remove (deviceId: string): Promise<void> {
    await DeviceModel.destroy({ where: { id: deviceId } })
  }
}
