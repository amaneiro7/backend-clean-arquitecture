import { type HardDrivePrimitives } from '../../domain/HardDrive'
import { type HardDriveRepository } from '../../domain/HardDriveRepository'
import { HardDriveModel } from './HardDriveSchema'

export class SequelizeHardDriveRepository implements HardDriveRepository {
  async searchAll (): Promise<HardDrivePrimitives[]> {
    return await HardDriveModel.findAll()
  }

  async searchById (id: string): Promise<HardDrivePrimitives | null> {
    return await HardDriveModel.findByPk(id) ?? null
  }

  async searchByDeviceId (id: string): Promise<HardDrivePrimitives | null> {
    return await HardDriveModel.findOne({ where: { deviceId: id } })
  }

  async save (payload: HardDrivePrimitives): Promise<void> {
    const { id } = payload
    const hardDrive = await HardDriveModel.findByPk(id) ?? null
    if (hardDrive === null) {
      await HardDriveModel.create({ ...payload })
    } else {
      hardDrive.set({ ...payload })
      await hardDrive.save()
    }
  }

  async remove (id: string): Promise<void> {
    await HardDriveModel.destroy({ where: { id } })
  }
}
