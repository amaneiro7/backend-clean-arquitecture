import { API_URL } from '../../../../../shared/infraestructure/config'
import { type HardDriveCapacityPrimitives } from '../domain/HardDriveCapacity'
import { type HardDriveCapacityRepository } from '../domain/HardDriveCapacityRepository'

export class ApiHardDriveCapacityRepository implements HardDriveCapacityRepository {
  async getAll (): Promise<HardDriveCapacityPrimitives[]> {
    return await fetch(`${API_URL}/harddrivecapacities`)
      .then(async response => await (response.json() as Promise<HardDriveCapacityPrimitives[]>))
  }
}
