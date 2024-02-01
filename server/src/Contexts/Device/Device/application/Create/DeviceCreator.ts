import { Computer } from '../../../../Features/Computer/domain/Computer'
import { type Repository } from '../../../../Shared/domain/Repository'
import { Device } from '../../domain/Device'
import { ValidationField } from '../ValidationField'

export class DeviceCreator {
  constructor (private readonly repository: Repository) {}

  async run (params: { activo: string, serial: string, statusId: number, modelId: string }): Promise<void> {
    const { activo, serial, statusId, modelId } = params

    await ValidationField.ensureActivoDoesNotExist(this.repository, activo)
    await ValidationField.ensureSerialDoesNotExist(this.repository, serial)
    await ValidationField.ensureModelIdExist(this.repository, modelId)
    await ValidationField.ensureStatusIdExist(this.repository, statusId)

    const device = Device.create({ activo, serial, statusId, modelId })

    await this.repository.device.save(device.toPrimitives())
    Computer.create({})
  }
}
