/* eslint-disable @typescript-eslint/no-extraneous-class */
import { type Repository } from '../../../Shared/domain/Repository'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { HardDriveCapacityDoesNotExistError } from '../../HardDrive.ts/HardDriveCapacity/domain/HardDriveCapacityDoesNotExist'
import { HardDriveCapacityId } from '../../HardDrive.ts/HardDriveCapacity/domain/HardDriveCapacityId'
import { HardDriveTypeDoesNotExistError } from '../../HardDrive.ts/HardDriveType/domain/HardDriveTypeDoesNotExist'
import { HardDriveTypeId } from '../../HardDrive.ts/HardDriveType/domain/HardDriveTypeId'
import { type MemoryRamCapacity } from '../../MemoryRam/MemoryRamCapacity/MemoryRamCapacity'
import { OperatingSystemDoesNotExistError } from '../../OperatingSystem/OperatingSystem/domain/OperatingSystemDoesNotExist'
import { OperatingSystemId } from '../../OperatingSystem/OperatingSystem/domain/OperatingSystemId'
import { OperatingSystemArqDoesNotExistError } from '../../OperatingSystem/OperatingSystemArq/domain/OperatingSystemArqDoesNotExist'
import { OperatingSystemArqId } from '../../OperatingSystem/OperatingSystemArq/domain/OperatingSystemArqID'
import { ProcessorDoesNotExistError } from '../../Processor/Processor/domain/ProcessorDoesNotExistError'
import { ProcessorId } from '../../Processor/Processor/domain/ProcessorId'
import { type DeviceComputer } from '../domain/Computer'
import { type IPAddress } from '../domain/IPAddress'
import { type MACAddress } from '../domain/MACAddress'

export class ValidationComputerField {
  static async ensureProcessorIdExist (repository: Repository, id: Primitives<ProcessorId>, entity?: DeviceComputer): Promise<void> {
    if (entity !== undefined && id === entity.processorValue) {
      return
    }
    if (await repository.processor.searchById(new ProcessorId(id).value) === null) {
      throw new ProcessorDoesNotExistError(id)
    }
  }

  static async ensureHardDriveCapacityExist (repository: Repository, id: Primitives<HardDriveCapacityId>, entity?: DeviceComputer): Promise<void> {
    if (entity !== undefined && id === entity.hardDriveCapacityValue) {
      return
    }
    if (await repository.hardDriveCapacity.searchById(new HardDriveCapacityId(id).value) === null) {
      throw new HardDriveCapacityDoesNotExistError(id)
    }
  }

  static async ensureHardDriveTypeExist (repository: Repository, id: Primitives<HardDriveTypeId>, entity?: DeviceComputer): Promise<void> {
    if (entity !== undefined && id === entity.hardDriveTypeValue) {
      return
    }
    if (await repository.hardDriveType.searchById(new HardDriveTypeId(id).value) === null) {
      throw new HardDriveTypeDoesNotExistError(id)
    }
  }

  static async ensureOperatingSystemExist (repository: Repository, id: Primitives<OperatingSystemId>, entity?: DeviceComputer): Promise<void> {
    if (entity !== undefined && id === entity.operatingSystemValue) {
      return
    }
    if (await repository.operatingSystemVersion.searchById(new OperatingSystemId(id).value) === null) {
      throw new OperatingSystemDoesNotExistError(id)
    }
  }

  static async ensureOperatingSystemArqExist (repository: Repository, id: Primitives<OperatingSystemArqId>, entity?: DeviceComputer): Promise<void> {
    if (entity !== undefined && id === entity.operatingSystemArqValue) {
      return
    }
    if (await repository.operatingSystemArq.searchById(new OperatingSystemArqId(id).value) === null) {
      throw new OperatingSystemArqDoesNotExistError(id)
    }
  }

  static async ensureMacAddressDoesNotExist (repository: Repository, macAddress: Primitives<MACAddress>, entity?: DeviceComputer): Promise<void> {
    if (entity !== undefined && macAddress === entity.macAddressValue) {
      return
    }
    console.log(macAddress)
  }

  static async ensureIpAddressDoesNotExist (repository: Repository, ipAddress: Primitives<IPAddress>, entity?: DeviceComputer): Promise<void> {
    if (entity !== undefined && ipAddress === entity.ipAddressValue) {
      return
    }
    console.log(ipAddress)
  }

  static async ensureMemoryRamCapacityDoesNotExist (repository: Repository, memoryRamCapacity: Primitives<MemoryRamCapacity>, entity?: DeviceComputer): Promise<void> {
    if (entity !== undefined && memoryRamCapacity === entity.memoryRamCapacityValue) {
      return
    }
    console.log(memoryRamCapacity)
  }
}
