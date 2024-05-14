import { makeRequest } from '../../../../../shared/infraestructure/fetching'
import { type HardDriveTypePrimitives } from '../domain/HardDriveType'
import { type HardDriveTypeRepository } from '../domain/HardDriveTypeRepository'

export class ApiHardDriveTypeRepository implements HardDriveTypeRepository {
  private readonly endpoint: string = 'harddrivetypes'
  async getAll (): Promise<HardDriveTypePrimitives[]> {
    return await makeRequest({ method: 'GET', endpoint: this.endpoint })
  }
}
