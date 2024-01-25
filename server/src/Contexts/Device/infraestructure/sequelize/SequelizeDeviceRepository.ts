import { type DevicePrimitives } from '../../domain/Device'
import { type DeviceRepository } from '../../domain/DeviceRepository'
import { DeviceModel } from './DeviceSchema'

export class SequelizeDeviceRepository implements DeviceRepository {
  async searchAll (): Promise<DevicePrimitives[]> {
    return await DeviceModel.findAll()
  }

  async searchById (deviceId: string): Promise<DevicePrimitives | null> {
    return await DeviceModel.findByPk(deviceId) ?? null
  }

  async searchByActivo (activo: string): Promise<DevicePrimitives | null> {
    return await DeviceModel.findOne({ where: { activo } })
  }

  async searchBySerial (serial: string): Promise<DevicePrimitives | null> {
    return await DeviceModel.findOne({ where: { serial } })
  }

  async save (payload: DevicePrimitives): Promise<void> {
    const { id } = payload
    const device = await DeviceModel.findByPk(id) ?? null
    if (device === null) {
      await DeviceModel.create(payload)
    } else {
      device.set({ ...payload })
      await device.save()
    }
  }

  async remove (deviceId: string): Promise<void> {
    await DeviceModel.destroy({ where: { id: deviceId } })
  }
}
