import { service } from '../../../Shared/infrastructure/persistance/Sequelize/SequelizeConfig'
import { type DevicePrimitives } from '../../domain/Device'
import { type DeviceRepository } from '../../domain/DeviceRepository'

export class SequelizeDeviceRepository implements DeviceRepository {
  async searchAll (): Promise<DevicePrimitives[]> {
    return await service.DeviceModel.findAll()
  }

  async searchById (deviceId: string): Promise<DevicePrimitives | null> {
    return await service.DeviceModel.findByPk(deviceId) ?? null
  }

  async searchByActivo (activo: string): Promise<DevicePrimitives | null> {
    return await service.DeviceModel.findOne({ where: { activo } })
  }

  async searchBySerial (serial: string): Promise<DevicePrimitives | null> {
    return await service.DeviceModel.findOne({ where: { serial } })
  }

  async save (payload: DevicePrimitives): Promise<void> {
    const { id } = payload
    const device = await service.DeviceModel.findByPk(id) ?? null
    if (device === null) {
      await service.DeviceModel.create(payload)
    } else {
      device.set({ ...payload })
      await device.save()
    }
  }

  async remove (deviceId: string): Promise<void> {
    await service.DeviceModel.destroy({ where: { id: deviceId } })
  }
}
