import { type Repository } from '../../../../shared/domain/repository'
import { type Device } from '../domain/Device'

export async function AllDeviceGetter ({ repository }: { repository: Repository }): Promise<Device[]> {
  return await repository.device.getAll()
}
