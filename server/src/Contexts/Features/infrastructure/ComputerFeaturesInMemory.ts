import { CategoryId } from '../../Category/domain/CategoryId'
import { DeviceId } from '../../Device/domain/DeviceId'
import { ComputerFeaturesId } from '../Computer/domain/ComputerFeatureId'
import { ComputerFeatures } from '../Computer/domain/ComputerFeatures'
import { type ComputerFeaturesRepository } from '../Computer/domain/ComputerFeaturesRepository'
import { ComputerOSType, ComputerOSTypes } from '../Computer/domain/ComputerOperatingSystem'
import { ComputerProcessorId } from '../Processor/ComputerProcessorId'
import { ComputerType, ComputerTypes } from '../Computer/domain/ComputerType'
import { HardDriveCapacity, HardDriveCapacityType } from '../domain/HardDrive.ts/HardDriveCapacity'
import { MemoryRamSize, MemoryRamSizeValues } from '../MemoryRam/MemoryRamSize'

const computerFeatures: ComputerFeatures[] = [
  new ComputerFeatures(
    new ComputerFeaturesId('580add87-edf7-4344-8985-b8417979b13c'),
    new CategoryId('dcdd0fad-a94c-4810-8acc-5f108d3b18c3'),
    new DeviceId('5a94384b-2e4d-4cdf-96c9-0065bf7f92a0'),
    new ComputerType(ComputerTypes.DESKTOP),
    new ComputerProcessorId('f1e188f8-d686-4d59-8077-ff6defe4e050'),
    new MemoryRamSize(MemoryRamSizeValues['4GB']),
    new ComputerOSType(ComputerOSTypes.WINDOWS7),
    new HardDriveCapacity(HardDriveCapacityType['500GB'])
  )
]

export class InMemoryComputerFeaturesRepository implements ComputerFeaturesRepository {
  async searchById (deviceId: DeviceId): Promise<ComputerFeatures | null> {
    return computerFeatures.find(features => features.deviceId === deviceId.toString()) ?? null
  }

  async save (payload: ComputerFeatures): Promise<void> {
    const index = computerFeatures.findIndex(device => device.id === payload.id)
    if (index === -1) {
      computerFeatures.push(payload)
    } else {
      computerFeatures[index] = payload
    }
  }
}
