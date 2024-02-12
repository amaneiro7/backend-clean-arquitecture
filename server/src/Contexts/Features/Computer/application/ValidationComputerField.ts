/* eslint-disable @typescript-eslint/no-extraneous-class */
import { type Repository } from '../../../Shared/domain/Repository'
import { HardDriveCapacityDoesNotExistError } from '../../HardDrive.ts/HardDriveCapacity/domain/HardDriveCapacityDoesNotExist'
import { HardDriveCapacityId } from '../../HardDrive.ts/HardDriveCapacity/domain/HardDriveCapacityId'
import { HardDriveTypeDoesNotExistError } from '../../HardDrive.ts/HardDriveType/domain/HardDriveTypeDoesNotExist'
import { HardDriveTypeId } from '../../HardDrive.ts/HardDriveType/domain/HardDriveTypeId'
import { OperatingSystemDoesNotExistError } from '../../OperatingSystem/OperatingSystem/domain/OperatingSystemDoesNotExist'
import { OperatingSystemId } from '../../OperatingSystem/OperatingSystem/domain/OperatingSystemId'
import { OperatingSystemArqDoesNotExistError } from '../../OperatingSystem/OperatingSystemArq/domain/OperatingSystemArqDoesNotExist'
import { OperatingSystemArqId } from '../../OperatingSystem/OperatingSystemArq/domain/OperatingSystemArqID'
import { ProcessorDoesNotExistError } from '../../Processor/domain/ProcessorDoesNotExistError'
import { ProcessorId } from '../../Processor/domain/ProcessorId'

export class ValidationComputerField {
  static async ensureProcessorIdExist (repository: Repository, id: string): Promise<void> {
    if (await repository.processor.searchById(new ProcessorId(id).value) === null) {
      throw new ProcessorDoesNotExistError(id)
    }
  }

  static async ensureHardDriveCapacityExist (repository: Repository, id: number): Promise<void> {
    if (await repository.hardDriveCapacity.searchById(new HardDriveCapacityId(id).value) === null) {
      throw new HardDriveCapacityDoesNotExistError(id)
    }
  }

  static async ensureHardDriveTypeExist (repository: Repository, id: number): Promise<void> {
    if (await repository.hardDriveType.searchById(new HardDriveTypeId(id).value) === null) {
      throw new HardDriveTypeDoesNotExistError(id)
    }
  }

  static async ensureOperatingSystemExist (repository: Repository, id: number): Promise<void> {
    if (await repository.operatingSystemVersion.searchById(new OperatingSystemId(id).value) === null) {
      throw new OperatingSystemDoesNotExistError(id)
    }
  }

  static async ensureOperatingSystemArqExist (repository: Repository, id: number): Promise<void> {
    if (await repository.operatingSystemArq.searchById(new OperatingSystemArqId(id).value) === null) {
      throw new OperatingSystemArqDoesNotExistError(id)
    }
  }

//   static async ensureMacAddressDoesNotExist (repository: Repository, macAddress: string): Promise<void> {
//     if (await repository.(new MACAddress(macAddress).toString()) !== null) {
//       throw new DeviceAlreadyExistError(macAddress)
//     }
//   }
}
