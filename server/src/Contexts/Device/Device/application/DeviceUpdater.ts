import { ValidationComputerField } from '../../../Features/Computer/application/ValidationComputerField'
import { DeviceComputer, type DeviceComputerPrimitives } from '../../../Features/Computer/domain/Computer'
import { ValidationHardDriveField } from '../../../Features/HardDrive.ts/HardDrive/application/ValidationHardDrive'
import { DeviceHardDrive, type DeviceHardDrivePrimitives } from '../../../Features/HardDrive.ts/HardDrive/domain/HardDrive'
import { type Repository } from '../../../Shared/domain/Repository'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { Device } from '../domain/Device'
import { DeviceActivo } from '../domain/DeviceActivo'
import { DeviceAlreadyExistError } from '../domain/DeviceAlreadyExistError'
import { DeviceDoesNotExistError } from '../domain/DeviceDoesNotExistError'
import { DeviceId } from '../domain/DeviceId'
import { type DevicesApiResponse } from '../infrastructure/sequelize/DeviceResponse'
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
    const { activo, modelId, serial, statusId, categoryId, employeeId, locationId, observation } = params
    const devideId = new DeviceId(id).value

    const device = await this.repository.device.searchById(devideId)

    if (device === null) {
      throw new DeviceDoesNotExistError(id)
    }
    let deviceEntity
    const validations: ValidationConfig[] = []
    if (DeviceComputer.isComputerCategory({ categoryId })) {
      const { computer } = device as unknown as DevicesApiResponse
      if (computer === null) {
        throw new InvalidArgumentError('Computer does not exist')
      }
      deviceEntity = DeviceComputer.fromPrimitives({
        id: device.id,
        serial: device.serial,
        activo: device.activo,
        statusId: device.statusId,
        categoryId: device.categoryId,
        brandId: device.brandId,
        modelId: device.modelId,
        employeeId: device.employeeId,
        locationId: device.locationId,
        observation: device.observation,
        computerName: computer.computerName,
        processorId: computer.processorId,
        memoryRamCapacity: computer.memoryRamCapacity,
        hardDriveCapacityId: computer.hardDriveCapacityId,
        hardDriveTypeId: computer.hardDriveTypeId,
        operatingSystemId: computer.operatingSystemId,
        operatingSystemArqId: computer.operatingSystemArqId,
        macAddress: computer.macAddress,
        ipAddress: computer.ipAddress
      })
      const { computerName, processorId, operatingSystemArqId, operatingSystemId, hardDriveCapacityId, hardDriveTypeId, memoryRamCapacity, ipAddress, macAddress } = params as Partial<DeviceComputerPrimitives>
      validations.push(
        { field: computerName, validator: ValidationComputerField.ensureComputerNameDoesNotExist, updater: deviceEntity.updateComputerName },
        { field: processorId, validator: ValidationComputerField.ensureProcessorIdExist, updater: deviceEntity.updateProcessor },
        { field: operatingSystemId, validator: ValidationComputerField.ensureOperatingSystemExist, updater: deviceEntity.updateOperatingSystem },
        { field: operatingSystemArqId, validator: ValidationComputerField.ensureOperatingSystemArqExist, updater: deviceEntity.updateOperatingSystemArq },
        { field: hardDriveCapacityId, validator: ValidationComputerField.ensureHardDriveCapacityExist, updater: deviceEntity.updateHardDriveCapacity },
        { field: hardDriveTypeId, validator: ValidationComputerField.ensureHardDriveTypeExist, updater: deviceEntity.updateHardDriveType },
        { field: memoryRamCapacity, validator: ValidationComputerField.ensureMemoryRamCapacityDoesNotExist, updater: deviceEntity.updateMemoryRam },
        { field: ipAddress, validator: ValidationComputerField.ensureIpAddressDoesNotExist, updater: deviceEntity.updateIPAddress },
        { field: macAddress, validator: ValidationComputerField.ensureMacAddressDoesNotExist, updater: deviceEntity.updateMACAddress }
      )
    } else if (DeviceHardDrive.isHardDriveCategory({ categoryId })) {
      const { hardDrive } = device as unknown as DevicesApiResponse
      if (hardDrive === null) {
        throw new InvalidArgumentError('HardDrive does not exist')
      }
      deviceEntity = DeviceHardDrive.fromPrimitives({
        id: device.id,
        serial: device.serial,
        activo: device.activo,
        statusId: device.statusId,
        categoryId: device.categoryId,
        brandId: device.brandId,
        modelId: device.modelId,
        employeeId: device.employeeId,
        locationId: device.locationId,
        observation: device.observation,
        hardDriveCapacityId: hardDrive.hardDriveCapacityId,
        hardDriveTypeId: hardDrive.hardDriveTypeId,
        health: hardDrive.health
      })
      const { hardDriveCapacityId, hardDriveTypeId, health } = params as DeviceHardDrivePrimitives
      validations.push(
        { field: health, validator: ValidationHardDriveField.ensureHardDriveHealth, updater: deviceEntity.updateHealth },
        { field: hardDriveCapacityId, validator: ValidationHardDriveField.ensureHardDriveCapacityExist, updater: deviceEntity.updateHardDriveCapacity },
        { field: hardDriveTypeId, validator: ValidationHardDriveField.ensureHardDriveTypeExist, updater: deviceEntity.updateHardDriveType }
      )
    } else {
      deviceEntity = Device.fromPrimitives(device)
    }
    validations.push(
      { field: activo, validator: ValidationField.ensureActivoDoesNotExist, updater: deviceEntity.updateActivo },
      { field: serial, validator: ValidationField.ensureSerialDoesNotExist, updater: deviceEntity.updateSerial },
      { field: modelId, validator: ValidationField.ensureModelIdExist, updater: deviceEntity.updateModelId },
      { field: statusId, validator: ValidationField.ensureStatusIdExist, updater: deviceEntity.updateStatus },
      { field: employeeId, validator: ValidationField.ensureEmployeeIdExist, updater: deviceEntity.updateEmployee },
      { field: locationId, validator: ValidationField.ensureLocationIdExist, updater: deviceEntity.updateLocation },
      { field: observation, validator: ValidationField.ensureObservationIsValid, updater: deviceEntity.updateObservation }
    )
    await this.updateActivoField(activo, deviceEntity)
    console.log(deviceEntity.toPrimitives())
    await this.repository.device.save(deviceEntity.toPrimitives())
  }

  private async updateActivoField (value: Primitives<DeviceActivo>, entity: Device): Promise<void> {
    const newActivo = new DeviceActivo(value)
    if (await this.repository.device.searchByActivo(newActivo.value) !== null) {
      throw new DeviceAlreadyExistError(newActivo.value)
    }
    entity.updateActivo(value)
  }
}
