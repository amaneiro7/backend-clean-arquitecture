import { HardDriveCapacityId } from '../../HardDrive.ts/HardDriveCapacity/domain/HardDriveCapacityId'
import { HardDriveTypeId } from '../../HardDrive.ts/HardDriveType/domain/HardDriveTypeId'
import { OperatingSystemId } from '../../OperatingSystem/OperatingSystem/domain/OperatingSystemId'
import { OperatingSystemArqId } from '../../OperatingSystem/OperatingSystemArq/domain/OperatingSystemArqID'

export class ComputerStorage {
  readonly hardDriveCapacityId: HardDriveCapacityId | null
  readonly hardDriveTypeId: HardDriveTypeId | null
  readonly operatingSystemId: OperatingSystemId | null
  readonly operatingSystemArqId: OperatingSystemArqId | null
  constructor (
    hardDriveCapacityId: number | null,
    hardDriveTypeId: number | null,
    operatingSystemId: number | null,
    operatingSystemArqId: number | null
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.hardDriveCapacityId = hardDriveCapacityId != null ? new HardDriveCapacityId(hardDriveCapacityId) : null
    this.hardDriveTypeId = hardDriveTypeId != null ? new HardDriveTypeId(hardDriveTypeId) : null
    this.operatingSystemId = operatingSystemId != null ? new OperatingSystemId(operatingSystemId) : null
    this.operatingSystemArqId = operatingSystemArqId != null ? new OperatingSystemArqId(operatingSystemArqId) : null
  }
}
