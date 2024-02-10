import { type HardDriveCapacity } from '../../../../../shared/domain/types/responseTypes'
import { API_URL } from '../../../../../shared/infraestructure/config'
import { type HardDriveCapacityPrimitives } from '../domain/HardDriveCapacity'
import { type HardDriveCapacityRepository } from '../domain/HardDriveCapacityRepository'

export class ApiHardDriveCapacityRepository implements HardDriveCapacityRepository {
  async getAll (): Promise<HardDriveCapacityPrimitives[]> {
    return await fetch(`${API_URL}/harddrivecapacities`)
      .then(async response => await (response.json() as Promise<HardDriveCapacity[]>))
      .then((data) => data.map(item => ({
        id: item.id,
        name: item.value
      })))
  }
}
