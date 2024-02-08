import { API_URL } from '../../../../../shared/infraestructure/config'
import { type HardDriveTypePrimitives } from '../domain/HardDriveType'
import { type HardDriveTypeRepository } from '../domain/HardDriveTypeRepository'

export class ApiHardDriveTypeRepository implements HardDriveTypeRepository {
  async getAll (): Promise<HardDriveTypePrimitives[]> {
    return await fetch(`${API_URL}/harddrivetypes`)
      .then(async response => await (response.json() as Promise<HardDriveTypePrimitives[]>))
  }
}
