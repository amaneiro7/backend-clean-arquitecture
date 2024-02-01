import { ModelSeriesFinder } from '../../../../ModelSeries/ModelSeries/application/ModelSeriesFinder'
import { ModelSeriesId } from '../../../../ModelSeries/ModelSeries/domain/ModelSeriesId'
import { DevicesFeatures } from '../../../../Shared/application/DevicesFeatures'
import { type Repository } from '../../../../Shared/domain/Repository'
import { Device } from '../../domain/Device'
import { ValidationField } from '../ValidationField'

interface Props {
  activo: string
  serial: string
  statusId: number
  modelId: string
  // computer params
  processorId: string
  memoryRamCapacity: number
  // hard drive params
  hardDriveCapacityId: number
  hardDriveTypeId: number
  health: number
  operatingSystemId: number
  operatingSystemArqId: number
  ipAddress: string
  macAddress: string
}

export class DeviceCreator {
  constructor (private readonly repository: Repository) {}

  async run (params: Props): Promise<void> {
    const { activo, serial, statusId, modelId, ...restParams } = params

    await ValidationField.ensureActivoDoesNotExist(this.repository, activo)
    await ValidationField.ensureSerialDoesNotExist(this.repository, serial)
    await ValidationField.ensureModelIdExist(this.repository, modelId)
    await ValidationField.ensureStatusIdExist(this.repository, statusId)

    const device = Device.create({ activo, serial, statusId, modelId })

    const modelSeriesCategory = await new ModelSeriesFinder(this.repository).searchById(new ModelSeriesId(device.modelSeriesValue))

    await this.repository.device.save(device.toPrimitives())
    await new DevicesFeatures().run({
      repository: this.repository,
      category: modelSeriesCategory.category.name,
      categoryId: modelSeriesCategory.category.id,
      deviceId: device.idValue,
      ...restParams
    })
  }
}
