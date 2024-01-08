import { type DeviceOutput } from '../../domain/entities/DeviceAggregation/device.entity'
import { type Repository } from '../../domain/repositories/respoitory'

export async function getAllDevices (repository: Repository): Promise<DeviceOutput[]> {
  return await repository.device.getAll()
}
