import { JwtPayloadUser } from '../../../Auth/domain/GenerateToken'
import { DeviceComputer, type DeviceComputerPrimitives } from '../../../Features/Computer/domain/Computer'
import { ComputerHardDriveCapacity } from '../../../Features/Computer/domain/ComputerHardDriveCapacity'
import { ComputerHardDriveType } from '../../../Features/Computer/domain/ComputerHardDriveType'
import { ComputerMemoryRam } from '../../../Features/Computer/domain/ComputerMemoryRam'
import { ComputerMemoryRamCapacity } from '../../../Features/Computer/domain/ComputerMemoryRamCapacity'
import { ComputerName } from '../../../Features/Computer/domain/ComputerName'
import { ComputerOperatingSystem } from '../../../Features/Computer/domain/ComputerOperatingSystem'
import { ComputerOperatingSystemArq } from '../../../Features/Computer/domain/ComputerOperatingSystemArq'
import { ComputerProcessor } from '../../../Features/Computer/domain/ComputerProcessor'
import { IPAddress } from '../../../Features/Computer/domain/IPAddress'
import { MACAddress } from '../../../Features/Computer/domain/MACAddress'
import { DeviceHardDrive, type DeviceHardDrivePrimitives } from '../../../Features/HardDrive.ts/HardDrive/domain/HardDrive'
import { HardDriveHealth } from '../../../Features/HardDrive.ts/HardDrive/domain/HardDriveHealth'
import { HDDCapacity } from '../../../Features/HardDrive.ts/HardDrive/domain/HDDCapacity'
import { HDDType } from '../../../Features/HardDrive.ts/HardDrive/domain/HDDType'
import { HistoryCreator } from '../../../History/application/HistoryCreator'
import { type Repository } from '../../../Shared/domain/Repository'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { Device } from '../domain/Device'
import { DeviceActivo } from '../domain/DeviceActivo'
import { DeviceDoesNotExistError } from '../domain/DeviceDoesNotExistError'
import { DeviceEmployee } from '../domain/DeviceEmployee'
import { DeviceId } from '../domain/DeviceId'
import { DeviceLocation } from '../domain/DeviceLocation'
import { DeviceModelSeries } from '../domain/DeviceModelSeries'
import { DeviceObservation } from '../domain/DeviceObservation'
import { DeviceSerial } from '../domain/DeviceSerial'
import { DeviceStatus } from '../domain/DeviceStatus'
import { type DevicesApiResponse } from '../infrastructure/sequelize/DeviceResponse'
import { type DeviceParams } from './DeviceCreator'

export interface PartialDeviceParams extends DeviceParams { }

export class DeviceUpdater {

  constructor(private readonly repository: Repository) { }
  /**
   * Actualiza el device con los parametros recibidos
   * @param id Id del device
   * @param params Parametros a actualizar
   * @param user Usuario que esta realizando la accion
   */
  async run({ id, params, user }: { id: Primitives<DeviceId>, params: PartialDeviceParams, user?: JwtPayloadUser }): Promise<void> {
    const { categoryId } = params
    // Extraemos el id del device a actualizar
    const deviceId = new DeviceId(id).value

    // Buscamos el device en la base de datos
    const device = await this.repository.device.searchById(deviceId)

    // Si el device no existe, lanzamos una excepcion
    if (device === null) {
      throw new DeviceDoesNotExistError(id)
    }

    // Creamos una instancia de la entidad Device a partir de los datos obtenidos
    let deviceEntity
    let oldDeviceEntity
    if (DeviceComputer.isComputerCategory({ categoryId })) {
      // Si el device es de tipo computadora, obtenemos los datos de la tabla computer
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
        memoryRam: computer.memoryRam,
        memoryRamCapacity: computer.memoryRamCapacity,
        hardDriveCapacityId: computer.hardDriveCapacityId,
        hardDriveTypeId: computer.hardDriveTypeId,
        operatingSystemId: computer.operatingSystemId,
        operatingSystemArqId: computer.operatingSystemArqId,
        macAddress: computer.macAddress,
        ipAddress: computer.ipAddress
      })
      oldDeviceEntity = structuredClone(deviceEntity.toPrimitives())
      // Actualizamos los campos principales del device
      await this.updateMainDevice({ params, deviceEntity })

      // Extraemos los parametros de la clase Computer
      const {
        computerName, processorId, operatingSystemArqId, operatingSystemId, hardDriveCapacityId, hardDriveTypeId, memoryRam, ipAddress, macAddress
      } = params as Partial<DeviceComputerPrimitives>

      // Actualizamos los campos de la clase Computer
      await ComputerName.updateComputerNameField({ repository: this.repository.device, computerName, entity: deviceEntity })
      await ComputerMemoryRam.updateMemoryRam({ entity: deviceEntity, memoryRam })
      await ComputerProcessor.updateProcessorField({ repository: this.repository.processor, processor: processorId, entity: deviceEntity })
      await ComputerHardDriveCapacity.updateHardDriveCapacityField({ repository: this.repository.hardDriveCapacity, entity: deviceEntity, hardDriveCapacity: hardDriveCapacityId })
      await ComputerHardDriveType.updateHardDriveTypeField({ repository: this.repository.hardDriveType, hardDriveType: hardDriveTypeId, entity: deviceEntity })
      await ComputerOperatingSystem.updateOperatingSystemField({ repository: this.repository.operatingSystemVersion, operatingSystem: operatingSystemId, entity: deviceEntity })
      await ComputerOperatingSystemArq.updateOperatingSystemArqField({ repository: this.repository.operatingSystemArq, operatingSystemArq: operatingSystemArqId, entity: deviceEntity })
      await IPAddress.updateIPAddressField({ ipAddress, entity: deviceEntity })
      await MACAddress.updateMACAddressField({ macAddress, entity: deviceEntity })
    } else if (DeviceHardDrive.isHardDriveCategory({ categoryId })) {
      // Si el device es de tipo hard drive, obtenemos los datos de la tabla hard_drive
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

      oldDeviceEntity = structuredClone(deviceEntity.toPrimitives())

      // Extraemos los parametros de la clase HardDrive
      const {
        hardDriveCapacityId, hardDriveTypeId, health
      } = params as DeviceHardDrivePrimitives

      // Actualizamos los campos principales del device
      await this.updateMainDevice({ params, deviceEntity })

      // Actualizamos los campos de la clase HardDrive
      await HDDCapacity.updateHardDriveCapacityField({ repository: this.repository.hardDriveCapacity, entity: deviceEntity, hardDriveCapacity: hardDriveCapacityId })
      await HDDType.updateHardDriveTypeField({ repository: this.repository.hardDriveType, hardDriveType: hardDriveTypeId, entity: deviceEntity })
      await HardDriveHealth.updateHealthField({ health, entity: deviceEntity })
    } else {
      // Si el device no es de tipo computadora o hard drive, lo creamos como una instancia de la clase Device
      deviceEntity = Device.fromPrimitives(device)
      oldDeviceEntity = structuredClone(deviceEntity.toPrimitives())

      // Actualizamos los campos principales del device
      await this.updateMainDevice({ params, deviceEntity })
    }
    // Guardamos los cambios en la base de datos    
    await this.repository.device.save(deviceEntity.toPrimitives())
      .then(() => {
        if (!user?.sub) {
          throw new InvalidArgumentError('user is required')
        }
        new HistoryCreator(this.repository).run({
          deviceId: deviceEntity.idValue,
          userId: user?.sub,
          employeeId: deviceEntity.employeeeValue,
          action: 'UPDATE',
          newData: deviceEntity.toPrimitives(),
          oldData: oldDeviceEntity,
          createdAt: new Date()
        })
      })
  }

  /**
   * Actualiza los campos principales del device
   * @param params Parametros a actualizar
   * @param deviceEntity Entidad del device
   */
  private async updateMainDevice({ params, deviceEntity }: { params: PartialDeviceParams, deviceEntity: Device }): Promise<void> {
    const { serial, activo, statusId, categoryId, brandId, modelId, employeeId, locationId, observation } = params
    await DeviceActivo.updateActivoField({ repository: this.repository.device, activo, entity: deviceEntity })
    await DeviceSerial.updateSerialField({ repository: this.repository.device, serial, entity: deviceEntity })
    await DeviceStatus.updateStatusField({ repository: this.repository.status, status: statusId, entity: deviceEntity })
    await DeviceLocation.updateLocationField({ repository: this.repository.location, location: locationId, entity: deviceEntity })
    await DeviceObservation.updateObservationField({ observation, entity: deviceEntity })
    await DeviceEmployee.updateEmployeeField({ repository: this.repository.employee, employee: employeeId, entity: deviceEntity })
    await DeviceModelSeries.updateModelField({ repository: this.repository.modelSeries, modelSeries: modelId, category: categoryId, brand: brandId, entity: deviceEntity })
  }
}
