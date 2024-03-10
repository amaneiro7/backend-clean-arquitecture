import { type DevicePrimitives } from '../../domain/Device'
import { type DeviceRepository } from '../../domain/DeviceRepository'
import { DeviceModel } from './DeviceSchema'
import { type FindOptions, Op } from 'sequelize'
import { type DevicesApiResponse } from './DeviceResponse'
import type QueryString from 'qs'
import { sequelize } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeConfig'
import { DeviceComputer } from '../../../../Features/Computer/domain/Computer'
import { type Models } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type DeviceId } from '../../domain/DeviceId'
export class SequelizeDeviceRepository implements DeviceRepository {
  private readonly models = sequelize.models as unknown as Models
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
    const t = await sequelize.transaction()
    try {
      const { id, serial, activo, statusId, categoryId, brandId, modelId, locationId } = payload
      const device = await DeviceModel.findByPk(id) ?? null
      if (device === null) {
        await DeviceModel.create({ id, serial, activo, statusId, categoryId, brandId, modelId, locationId }, { transaction: t })
      } else {
        device.set({ id, serial, activo, statusId, categoryId, brandId, modelId })
        await device.save({ transaction: t })
      }

      if (DeviceComputer.isComputerCategory({ categoryId })) {
        await this.creareDeviceComputerIfCategoryMatches(id, payload)
      }

      await t.commit()
    } catch (error) {
      await t.rollback()
    }
  }

  private async creareDeviceComputerIfCategoryMatches (id: Primitives<DeviceId>, payload: DevicePrimitives): Promise<void> {
    await this.models.DeviceComputer.create({ deviceId: id, ...payload })
  }

  async remove (deviceId: string): Promise<void> {
    await DeviceModel.destroy({ where: { id: deviceId } })
  }
}
