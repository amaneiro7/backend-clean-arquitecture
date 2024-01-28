import { HardDrive } from '../domain/HardDrive.ts/HardDrive'
import { HardDriveCapacity, HardDriveCapacityType } from '../domain/HardDrive.ts/HardDriveCapacity'
import { HardDriveHealth } from '../domain/HardDrive.ts/HardDriveHealth'
import { HardDriveId } from '../domain/HardDrive.ts/HardDriveId'
import { type HardDriveRepository } from '../domain/HardDrive.ts/HardDriveRepository'
import { HardDriveType, HardDriveTypes } from '../domain/HardDrive.ts/HardDriveType'

const hardDrive: HardDrive[] = [
  new HardDrive(
    new HardDriveId('47783593-0acb-4aad-a4b0-89df62573e12'),
    new HardDriveType(HardDriveTypes.HDD),
    new HardDriveHealth(100),
    new HardDriveCapacity(HardDriveCapacityType['500GB'])
  )
]

export class InMemoryHardDriveRepository implements HardDriveRepository {
  async searchAll (): Promise<HardDrive[]> {
    return hardDrive
  }

  async searchById (id: HardDriveId): Promise<HardDrive | null> {
    return hardDrive.find(hdd => hdd.id === id.toString()) ?? null
  }

  async searchByCapacity (capacity: HardDriveCapacityType): Promise<HardDrive | null> {
    return hardDrive.find(hdd => hdd.capacity === capacity) ?? null
  }

  async save (payload: HardDrive): Promise<void> {
    const index = hardDrive.findIndex(hdd => hdd.id === payload.id)
    if (index === -1) {
      hardDrive.push(payload)
    } else {
      hardDrive[index] = payload
    }
  }

  async remove (id: HardDriveId): Promise<void> {
    hardDrive.filter(hdd => hdd.id !== id.toString())
  }
}
