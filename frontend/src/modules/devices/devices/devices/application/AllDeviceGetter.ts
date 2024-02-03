import { type Repository } from '../../../../shared/domain/repository'
import { type DevicePrimitives } from '../domain/Device'

export async function AllDeviceGetter ({ repository }: { repository: Repository }): Promise<DevicePrimitives[]> {
  return await repository.device.getAll()
}
