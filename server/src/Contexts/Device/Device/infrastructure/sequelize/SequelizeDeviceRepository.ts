import { type DevicePrimitives } from '../../domain/Device'
import { type DeviceRepository } from '../../domain/DeviceRepository'
import { DeviceModel } from './DeviceSchema'
import { sequelize } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeConfig'
import { DeviceComputer } from '../../../../Features/Computer/domain/Computer'
import { type Models } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type DeviceId } from '../../domain/DeviceId'
import { type Criteria } from '../../../../Shared/domain/criteria/Criteria'
import { CriteriaToSequelizeConverter } from '../../../../Shared/infrastructure/criteria/CriteriaToSequelizeConverter'
import { Operator } from '../../../../Shared/domain/criteria/FilterOperator'
export class SequelizeDeviceRepository extends CriteriaToSequelizeConverter implements DeviceRepository {
  private readonly models = sequelize.models as unknown as Models
  async matching (criteria: Criteria): Promise<DevicePrimitives[]> {
    const options = this.convert(criteria)

    options.include = [
      'model',
      'category',
      'brand',
      'status',
      'employee',
      {
        association: 'location',
        include: [
          'typeOfSite',
          { association: 'site', include: [{ association: 'city', include: [{ association: 'state', include: ['region'] }] }] }
        ]
      },
      {
        association: 'computer',
        include: ['processor', 'hardDriveCapacity', 'hardDriveType', 'operatingSystem', 'operatingSystemArq']
      },
      {
        association: 'hardDrive',
        include: ['hardDriveCapacity', 'hardDriveType']
      }
    ]

    // eslint-disable-next-line no-prototype-builtins
    if (options.where !== undefined && options?.where.hasOwnProperty('typeOfSite')) {
      options.include = [
        ...options.include,
        {
          association: 'location',
          include: [
            {
              association: 'typeOfSite',
              where: {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                name: options.where.typeOfSite
              }
            }
          ]

        }
      ]
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      delete options.where.typeOfSite
      console.log('La propiedad typeOfSite ha sido eliminada.', options)
    } else {
      console.log('La propiedad typeOfSite no está presente en las opciones.')
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

  async searchByComputerName (computerName: string): Promise<any | null> {
    return await this.models.DeviceComputer.findOne({ where: { computerName } }) ?? null
  }

  async save (payload: DevicePrimitives): Promise<void> {
    const t = await sequelize.transaction()
    try {
      const { id, serial, activo, statusId, categoryId, brandId, modelId, locationId, observation } = payload
      const device = await DeviceModel.findByPk(id) ?? null
      if (device === null) {
        await DeviceModel.create({ id, serial, activo, statusId, categoryId, brandId, modelId, locationId, observation }, { transaction: t })
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
