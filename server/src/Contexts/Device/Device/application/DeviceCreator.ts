import { ComputerValidation } from '../../../Features/Computer/application/ComputerValidation'
import { DeviceComputer, type DeviceComputerPrimitives } from '../../../Features/Computer/domain/Computer'
import { HardDriveValidation } from '../../../Features/HardDrive.ts/HardDrive/application/HardDriveValidation'
import { DeviceHardDrive, type DeviceHardDrivePrimitives } from '../../../Features/HardDrive.ts/HardDrive/domain/HardDrive'
import { type Repository } from '../../../Shared/domain/Repository'
import { Device, type DevicePrimitives } from '../domain/Device'
import { DeviceActivo } from '../domain/DeviceActivo'
import { DeviceEmployee } from '../domain/DeviceEmployee'
import { DeviceLocation } from '../domain/DeviceLocation'
import { DeviceModelSeries } from '../domain/DeviceModelSeries'
import { DeviceSerial } from '../domain/DeviceSerial'
import { DeviceStatus } from '../domain/DeviceStatus'

export interface DeviceParams extends Omit<DevicePrimitives, 'id'> {}

export class DeviceCreator {
  constructor (private readonly repository: Repository) {}

  async run ({ serial, activo, statusId, categoryId, brandId, modelId, employeeId, locationId, observation, ...otherParams }: DeviceParams): Promise<void> {
    let device

    if (DeviceComputer.isComputerCategory({ categoryId })) {
      const { computerName, processorId, memoryRam, memoryRamCapacity, operatingSystemArqId, operatingSystemId, hardDriveCapacityId, hardDriveTypeId, ipAddress, macAddress } = otherParams as DeviceComputerPrimitives
      device = await new ComputerValidation(this.repository).run({ serial, activo, statusId, categoryId, brandId, modelId, employeeId, locationId, observation, computerName, processorId, memoryRam, operatingSystemArqId, operatingSystemId, hardDriveCapacityId, hardDriveTypeId, ipAddress, macAddress })
    } else if (DeviceHardDrive.isHardDriveCategory({ categoryId })) {
      const { hardDriveCapacityId, hardDriveTypeId, health } = otherParams as DeviceHardDrivePrimitives
      device = await new HardDriveValidation(this.repository).run({ serial, activo, statusId, categoryId, brandId, modelId, employeeId, locationId, observation, hardDriveCapacityId, hardDriveTypeId, health })
    } else {
      device = Device.create({ serial, activo, statusId, categoryId, brandId, modelId, employeeId, locationId, observation })
    }
    await DeviceSerial.ensureSerialDoesNotExit({ repository: this.repository.device, serial })
    await DeviceActivo.ensureActivoDoesNotExit({ repository: this.repository.device, activo })
    await DeviceStatus.ensuerStatusExit({ repository: this.repository.status, status: statusId })
    await DeviceModelSeries.ensureModelSeriesExit({ repository: this.repository.modelSeries, modelSeries: modelId, brand: brandId, category: categoryId })
    await DeviceEmployee.ensureEmployeeExit({ repository: this.repository.employee, employee: employeeId })
    await DeviceLocation.ensureLocationExit({ repository: this.repository.location, location: locationId, status: statusId })

    await this.repository.device.save(device.toPrimitives())
  }
}
