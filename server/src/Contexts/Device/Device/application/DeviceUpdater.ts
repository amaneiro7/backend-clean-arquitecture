import { ValidationComputerField } from '../../../Features/Computer/application/ValidationComputerField'
import { DeviceComputer, type DeviceComputerPrimitives } from '../../../Features/Computer/domain/Computer'
import { type Repository } from '../../../Shared/domain/Repository'
import { Device } from '../domain/Device'
import { DeviceDoesNotExistError } from '../domain/DeviceDoesNotExistError'
import { DeviceId } from '../domain/DeviceId'
import { type DeviceParams } from './DeviceCreator'
import { ValidationField } from './ValidationField'

export interface PartialDeviceParams extends DeviceParams {}

type FieldValidator = (repository: Repository, field: any, entity: any) => Promise<void>
type FieldUpdater = (field: any) => void

interface ValidationConfig {
  field: any
  validator: FieldValidator
  updater: FieldUpdater
}

export class DeviceUpdater {
  constructor (private readonly repository: Repository) {}

  async run ({ id, params }: { id: string, params: PartialDeviceParams }): Promise<void> {
    const { activo, modelId, serial, statusId, categoryId } = params
    const devideId = new DeviceId(id).value

    const device = await this.repository.device.searchById(devideId)

    if (device === null) {
      throw new DeviceDoesNotExistError(id)
    }
    let deviceEntity
    const validations: ValidationConfig[] = []
    if (DeviceComputer.isComputerCategory({ categoryId })) {
      deviceEntity = DeviceComputer.fromPrimitives((device) as DeviceComputerPrimitives)
      const { processorId, operatingSystemArqId, operatingSystemId, hardDriveCapacityId, hardDriveTypeId, memoryRamCapacity, ipAddress, macAddress } = params as Partial<DeviceComputerPrimitives>
      validations.push(
        { field: processorId, validator: ValidationComputerField.ensureProcessorIdExist, updater: deviceEntity.updateProcessor },
        { field: operatingSystemId, validator: ValidationComputerField.ensureOperatingSystemExist, updater: deviceEntity.updateOperatingSystem },
        { field: operatingSystemArqId, validator: ValidationComputerField.ensureOperatingSystemArqExist, updater: deviceEntity.updateOperatingSystemArq },
        { field: hardDriveCapacityId, validator: ValidationComputerField.ensureHardDriveCapacityExist, updater: deviceEntity.updateHardDriveCapacity },
        { field: hardDriveTypeId, validator: ValidationComputerField.ensureHardDriveTypeExist, updater: deviceEntity.updateHardDriveType },
        { field: memoryRamCapacity, validator: ValidationComputerField.ensureMemoryRamCapacityDoesNotExist, updater: deviceEntity.updateMemoryRam },
        { field: ipAddress, validator: ValidationComputerField.ensureIpAddressDoesNotExist, updater: deviceEntity.updateIPAddress },
        { field: macAddress, validator: ValidationComputerField.ensureMacAddressDoesNotExist, updater: deviceEntity.updateMACAddress }
      )
    } else {
      deviceEntity = Device.fromPrimitives(device)
      validations.push(
        { field: activo, validator: ValidationField.ensureActivoDoesNotExist, updater: deviceEntity.updateActivo },
        { field: serial, validator: ValidationField.ensureSerialDoesNotExist, updater: deviceEntity.updateSerial },
        { field: modelId, validator: ValidationField.ensureModelIdExist, updater: deviceEntity.updateModelId },
        { field: statusId, validator: ValidationField.ensureStatusIdExist, updater: deviceEntity.updateStatus }
      )
    }

    for (const validation of validations) {
      if (validation.field !== undefined) {
        await validation.validator(this.repository, validation.field, deviceEntity)
        validation.updater(validation.field)
      }
    }

    await this.repository.device.save(deviceEntity.toPrimitives())
  }
}
