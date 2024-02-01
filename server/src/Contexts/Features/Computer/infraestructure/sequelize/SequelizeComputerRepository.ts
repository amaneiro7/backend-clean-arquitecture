import { type ComputerPrimitives } from '../../domain/Computer'
import { type ComputerRepository } from '../../domain/ComputerRepository'
import { ComputerModel } from './ComputerSchema'

export class SequelizeComputerRepository implements ComputerRepository {
  async save (payload: ComputerPrimitives): Promise<void> {
    const { id } = payload
    const computer = await ComputerModel.findByPk(id) ?? null
    if (computer === null) {
      await ComputerModel.create({ ...payload })
    } else {
      computer.set({ ...payload })
      await computer.save()
    }
  }

  async searchById (id: string): Promise<ComputerPrimitives | null> {
    return await ComputerModel.findByPk(id, {
      include: ['device']
    }) ?? null
  }

  async searchByDeviceId (deviceId: string): Promise<ComputerPrimitives | null> {
    return await ComputerModel.findOne({
      where: { deviceId },
      include: ['device', 'processor', 'hardDriveCapacity', 'hardDriveType', 'operatingSystem', 'operatingSystemArq']
    }) ?? null
  }
}
