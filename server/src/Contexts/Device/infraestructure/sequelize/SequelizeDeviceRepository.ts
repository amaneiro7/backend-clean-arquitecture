import { models } from '../../../Shared/infrastructure/persistance/Sequelize/SequelizeConfig'
import { type DevicePrimitives } from '../../domain/Device'
import { type DeviceRepository } from '../../domain/DeviceRepository'

export class SequelizeDeviceRepository implements DeviceRepository {
  async searchAll (): Promise<DevicePrimitives[]> {
    return await models.Device.findAll()
  }

  async searchById (deviceId: string): Promise<DevicePrimitives | null> {
    return await models.Device.findByPk(deviceId) ?? null
  }

  async searchByActivo (activo: string): Promise<DevicePrimitives | null> {
    return await models.Device.findOne({ where: { activo } })
  }

  async searchBySerial (serial: string): Promise<DevicePrimitives | null> {
    return await models.Device.findOne({ where: { serial } })
  }

  async save (payload: DevicePrimitives): Promise<void> {
    const { id } = payload
    const device = await models.Device.findByPk(id) ?? null
    if (device === null) {
      await models.Device.create({ ...payload })
    } else {
      device.set({ ...payload })
      await device.save()
    }
  }

  async remove (deviceId: string): Promise<void> {
    await models.Device.destroy({ where: { id: deviceId } })
  }
}
