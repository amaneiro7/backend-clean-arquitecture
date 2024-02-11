import { type DevicePrimitives } from '../../domain/Device'
import { type DeviceRepository } from '../../domain/DeviceRepository'
import { DeviceModel } from './DeviceSchema'
import { type FindOptions, Op } from 'sequelize'
import { type DevicesApiResponse } from './DeviceResponse'
import type QueryString from 'qs'
export class SequelizeDeviceRepository implements DeviceRepository {
  async searchAll (query: QueryString.ParsedQs): Promise<DevicePrimitives[]> {
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
      where: {}
    }
    const { limit, offset } = query
    if (limit !== undefined && offset !== undefined) {
      options.limit = Number(limit)
      options.offset = Number(offset)
    }
    const { activo } = query
    if (typeof activo === 'string') {
      options.where = {
        activo: {
          [Op.iLike]: `%${activo}%`
        }
      }
    }
    const { serial } = query
    if (typeof serial === 'string') {
      options.where = {
        serial: {
          [Op.iLike]: `%${serial}%`
        }
      }
    }
    const { statusId } = query
    if (typeof statusId === 'number') {
      options.where = {
        statusId
      }
    }

    const { categoryId } = query
    if (typeof categoryId === 'string' && Array.isArray(options.include)) {
      const id = Number(categoryId)
      options.include.push({
        association: 'model',
        where: {
          categoryId: id
        }
      })
    }
    const { brandId } = query
    if (typeof brandId === 'string' && Array.isArray(options.include)) {
      options.include.push({
        association: 'model',
        where: {
          brandId
        }
      })
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
