import { ComputerValidation } from '../../../Features/Computer/application/ComputerValidation'
import { DeviceComputer, type DeviceComputerPrimitives } from '../../../Features/Computer/domain/Computer'
import { HardDriveValidation } from '../../../Features/HardDrive.ts/HardDrive/application/HardDriveValidation'
import { DeviceHardDrive, type DeviceHardDrivePrimitives } from '../../../Features/HardDrive.ts/HardDrive/domain/HardDrive'
import { DeviceMFPPrimitives, MFP } from '../../../Features/MFP/domain/MFP'
import { HistoryCreator } from '../../../History/application/HistoryCreator'
import { type Repository } from '../../../Shared/domain/Repository'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { Primitives } from '../../../Shared/domain/value-object/Primitives'
import { UserId } from '../../../User/user/domain/UserId'
import { Device, type DevicePrimitives } from '../domain/Device'
import { DeviceActivo } from '../domain/DeviceActivo'
import { DeviceEmployee } from '../domain/DeviceEmployee'
import { DeviceLocation } from '../domain/DeviceLocation'
import { DeviceModelSeries } from '../domain/DeviceModelSeries'
import { DeviceSerial } from '../domain/DeviceSerial'
import { DeviceStatus } from '../domain/DeviceStatus'

export interface DeviceParams extends Omit<DevicePrimitives, 'id'> {
  userId?: Primitives<UserId>
}

export class DeviceCreator {
  constructor(private readonly repository: Repository) { }

  async run(params: DeviceParams): Promise<void> {
    const { categoryId } = params
    let device
    // Si es computadora
    if (DeviceComputer.isComputerCategory({ categoryId })) {
      const computerParams = params as DeviceComputerPrimitives
      device = await new ComputerValidation(this.repository).run(computerParams)
    }
    // Si es Disco Duro
    else if (DeviceHardDrive.isHardDriveCategory({ categoryId })) {
      const hddParams = params as DeviceHardDrivePrimitives
      device = await new HardDriveValidation(this.repository).run(hddParams)
    }
    // Si es Impresora Multifuncional
    else if (MFP.isMFPCategory({ categoryId })) {
      const mfpParams = params as DeviceMFPPrimitives
      device = MFP.create(mfpParams)
    }
    // Si es otro
    else {
      device = Device.create(params)
    }
    await DeviceSerial.ensureSerialDoesNotExit({ repository: this.repository.device, serial: params.serial })
    await DeviceActivo.ensureActivoDoesNotExit({ repository: this.repository.device, activo: params.activo })
    await DeviceStatus.ensureStatusExit({ repository: this.repository.status, status: params.statusId })
    await DeviceModelSeries.ensureModelSeriesExit({ repository: this.repository.modelSeries, modelSeries: params.modelId, brand: params.brandId, category: categoryId })
    await DeviceEmployee.ensureEmployeeExit({ repository: this.repository.employee, employee: params.employeeId })
    await DeviceLocation.ensureLocationExit({ repository: this.repository.location, location: params.locationId, status: params.statusId })
    await this.repository.device.save(device.toPrimitives())
      .then(() => {
        if (!params.userId) {
          throw new InvalidArgumentError('user is required')
        }
        new HistoryCreator(this.repository).run({
          deviceId: device.idValue,
          userId: params.userId,
          employeeId: device.employeeeValue,
          action: 'CREATE',
          newData: device.toPrimitives(),
          oldData: {},
          createdAt: new Date()
        })
      })
  }
}
